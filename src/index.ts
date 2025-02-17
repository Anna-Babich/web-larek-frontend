import './scss/styles.scss';
import {EventEmitter, IEvents} from '../src/components/base/events';
import {ProductData} from './components/ProductsData';
import {UserData} from './components/UserData';
import {IApi, IProduct} from './types';
import {AppApi} from './components/AppAPI';
import {Api} from './components/base/api';
import {CDN_URL, API_URL, settings} from './utils/constants';
import {Card} from './components/Card';
import {ensureElement, cloneTemplate} from './utils/utils';
import {CardsContainer} from './components/cardsContainer';
import {Modal} from './components/Modal';
import {Basket} from './components/Basket';
import {Form} from './components/Form';
import {FormPayment} from './components/FormPayment'
import {FormContacts} from './components/FormContact';
import {Success} from './components/Success';
import {TForm} from './types/index';

const events = new EventEmitter();
const productData = new ProductData(events);
const userData = new UserData(events);
const modalContainer = document.querySelector('.modal') as HTMLElement;
const api = new AppApi(CDN_URL, API_URL, settings);
const modal = new Modal(modalContainer, events);

events.onAll((event) => {
    console.log(event.eventName, event.data);
})

const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardsContainer = new CardsContainer(document.querySelector('.gallery'), events);
const page = new CardsContainer(document.querySelector('.page'), events);


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


const cardModal = new Card(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-preview')), events);
events.on('card:select', (data: HTMLElement) => {
    let boo = productData.blockButton(data.id);
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
events.on('basket:open', (data: HTMLElement) => {
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
    basket.price.textContent = `${productData.getResult(productData._basket)} синапсов`
    page._counter.textContent = `${productData._basket.length}`
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
events.on('basket:changed', (data: HTMLElement) => {
    page._counter.textContent = `${productData._basket.length}`;
})


// Форма оплаты
const formPayment = new FormPayment(cloneTemplate(ensureElement<HTMLTemplateElement>('#order')), events)
events.on('open:order', () => {
    userData._order.total = productData.getResult(productData._basket);
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

events.on('order:button', (data: {paymentBtn: string}) => {
    console.log(data.paymentBtn);
    formPayment.togglePaymant(data.paymentBtn);
    userData.setPayment(data.paymentBtn);
    console.log(userData._order);
});

events.on('order:input', (data: { field: keyof TForm, value: string }) => {
    userData.setPaymentField(data.field, data.value);
});


// Форма контактов
const formContacts = new FormContacts(cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')), events)
events.on('order:submit', () => {
    modal.render({content: formContacts.render()});
})

events.on('contacts:input', (data: { field: keyof TForm, value: string }) => {
	userData.setContactsField(data.field, data.value);
    
});

events.on('formP:change', (errors: Partial<TForm>) => {
    const { address } = errors;
    formPayment.valid = !address;
    formPayment._errors = Object.values({address}).filter(i => !!i).join('; ');
})




events.on('formC:change', (errors: Partial<TForm>) => {
    const { email, phone } = errors;
    formContacts.valid = !email && !phone;
    formContacts._errors = Object.values({email, phone}).filter(i => !!i).join('; ');
})


events.on('order:post', () => {
    api.postUser(userData._order)
        .then((data) => {
            console.log(data);
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
    modal.render({content: success.render()});
    productData._basket = [];
    page._counter.textContent = `${productData._basket.length}`;

    userData.clearForm();
    formPayment.clearForm();
    formContacts.clearForm();
    formPayment.valid = false;
    formContacts.valid = false;
    console.log(userData._order);
})

// закрыть окно успешной покупки
events.on('success:close', () => {
    modal.close();
})

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.setLocked(true);
});

// ... и разблокируем
events.on('modal:close', () => {
    page.setLocked(false);
});
