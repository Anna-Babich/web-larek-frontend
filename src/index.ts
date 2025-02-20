import './scss/styles.scss';
import {EventEmitter} from '../src/components/base/events';
import {ProductData} from './components/Model/ProductsData';
import {UserData} from './components/Model/UserData';
import {AppApi} from './components/AppAPI';
import {CDN_URL, API_URL, settings} from './utils/constants';
import {Card} from './components/View/Card';
import {ensureElement, cloneTemplate} from './utils/utils';
import {CardsContainer} from './components/View/cardsContainer';
import {Modal} from './components/View/Modal';
import {Basket} from './components/View/Basket';
import {FormPayment} from './components/View/FormPayment'
import {FormContacts} from './components/View/FormContact';
import {Success} from './components/View/Success';
import {TForm} from './types/index';

const events = new EventEmitter();
const productData = new ProductData(events);
const userData = new UserData(events);
const api = new AppApi(CDN_URL, API_URL, settings);

const modalContainer = document.querySelector('.modal') as HTMLElement;
const modal = new Modal(modalContainer, events);
const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardsContainer = new CardsContainer(document.querySelector('.gallery'), events);
const page = new CardsContainer(document.querySelector('.page'), events);

events.onAll((event) => {
    console.log(event.eventName, event.data);
})

// Запрос на сервер для получения товаров
api.getProducts()
    .then((items: any) => {
        productData.setProducts(items);
        events.emit('initialData:loaded'); 
    })
    .catch((err: any) => {
        console.error(err);
    });
events.on('initialData:loaded', () => {
    const cardsArray = productData.product.map((card) => {
        const cardInstant = new Card(cloneTemplate(cardTemplate), events);
        return cardInstant.render(card);
    });
    cardsContainer.render({catalog: cardsArray});
})

// Превью товара
const cardModal = new Card(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-preview')), events);
events.on('card:select', (data: HTMLElement) => {
    // Проверка на нахождения this.товара в корзине
    let boo = productData.itemInBasket(data.id);
    // Юлокировка кнопки "В корзину", если товар уже там
    if(boo === true) {
        cardModal.toggleButton(true)
    } else {
        cardModal.toggleButton(false);
    }
    modal.render({
        content:  cardModal.render(productData.getProduct(data.id))
    });
})


// Работа с корзиной
const basket = new Basket(cloneTemplate(ensureElement<HTMLTemplateElement>('#basket')), events);
events.on('basket:open', () => {
    // Блокировка кнопки "Оформить" в корзине, если массив корзины = 0
    if(productData._basket.length === 0) {
        basket.buttonToggle(true);
    } else { 
        basket.buttonToggle(false);
    }

    const basketList = new CardsContainer(document.querySelector('.basket__list'), events);
    const array = productData._basket.map((card) => {
        const cardInstant = new Card(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-basket')), events);
        cardInstant.index = productData._basket.findIndex((cards) => cards.id === card.id)
        return cardInstant.render(card);
    });

    basketList.render({catalog: array});
    
    // Общая стоимость покупок в корзине
    basket.price.textContent = `${productData.getResult(productData._basket)} синапсов`;
    
    // Изменение счетчика на главыной странице
    page._counter.textContent = `${productData._basket.length}`;
    
    modal.render({
        content:  basket.render()
    });
})

// Добавление товара в корзину
events.on('product:buy', (data: HTMLElement) => {;
    const item = productData.getProduct(data.id);
    productData.addProductBasket(item);
})

// Удаление товара из корзины
events.on('basket:delete', (data: HTMLElement) => {
    productData.deleteProductBasket(data.id);
})

// Изменение счетчика корзины на главной странице
events.on('basket:changed', () => {
    page._counter.textContent = `${productData._basket.length}`;
})


// Форма оплаты
const formPayment = new FormPayment(cloneTemplate(ensureElement<HTMLTemplateElement>('#order')), events);
const formContacts = new FormContacts(cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')), events);

events.on('open:order', () => {
    // Заполнение в _order поля общей стоимости 
    userData._order.total = productData.getResult(productData._basket);
    
    // Заполнение в _order поля массива с id купленных товаров
    let total: string[] = [];
    productData._basket.forEach((item) => {
        total.push(item.id);
        return total;
    })
    userData._order.items = total;

    modal.render({
        content: formPayment.render()
    });
})

// Заполнение в _order поля способа оплаты
events.on('order:button', (data: {paymentBtn: string}) => {
    formPayment.togglePaymant(data.paymentBtn);
    userData.setPayment(data.paymentBtn);
});

// Проверка при каждом вводе в инпут address
events.on('order:input', (data: { field: keyof TForm, value: string }) => {
    userData.setField(data.field, data.value);
});

// Форма контактов
events.on('order:submit', () => {
    modal.render({content: formContacts.render()});
})

// Проверка при каждом вводе в инпут email и phone
events.on('contacts:input', (data: { field: keyof TForm, value: string }) => {
	userData.setField(data.field, data.value);
});

// Выведение ошибок и смена активности кнопок в формах
events.on('forms:errors', (errors: Partial<TForm>) => {
    const { payment, address, email, phone} = errors;
    formPayment.valid = !address && !payment;
    formContacts.valid = !email && !phone;
    formPayment._errors = Object.values({address, payment}).filter(i => !!i).join(', ');
    formContacts._errors = Object.values({email, phone}).filter(i => !!i).join(', ');
})

// Отправки на сервер данных пользователя
events.on('order:post', () => {
    api.postUser(userData._order)
        .then(() => {
            events.emit('success:open'); 
        })
        .catch((err: any) => {
            console.error(err);
        });
})

// окно успешной покупки
const success = new Success(cloneTemplate(ensureElement<HTMLTemplateElement>('#success')), events)
events.on('success:open', () => {
    success.successDescription.textContent = `Списано ${productData.getResult(productData._basket)} синапсов`
    
    modal.render({
        content: success.render()
    });
    
    // Очистка корзины
    productData._basket = [];

    // Обнуление счетчика на главной
    page._counter.textContent = `${productData._basket.length}`;

    // Очистка объекта с данными пользователя
    userData.clearForm();
    // Очистка форм
    formPayment.clearForm();
    formContacts.clearForm();
    formPayment.buttonClear();
    // Блокировка кнопок
    formPayment.valid = false;
    formContacts.valid = false;
})

// Закрытие окна успешной покупки
events.on('success:close', () => {
    modal.close();
})

// Блокирвока прокрутки страницы
events.on('modal:open', () => {
    page.setLocked(true);
});

// Разблокировка прокрутки страницы
events.on('modal:close', () => {
    page.setLocked(false);
});
