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
import {CardsContainer} from './components/CardsContainer';
import {Modal} from './components/Modal';
import {Basket} from './components/Basket';

const events = new EventEmitter();

const productData = new ProductData(events);
const userData = new UserData(events);
const modalContainer = document.querySelector('.modal') as HTMLElement;
// const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(CDN_URL, API_URL, settings);
const modal = new Modal(modalContainer, events);


// const ListProductTest = [
//     {
//     "_id": "854cef69-976d-4c2a-a18c-2aa45046c390",
//     "description": "Если планируете решать задачи в тренажёре, берите два.",
//     "image": "/5_Dots.svg",
//     "title": "+1 час в сутках",
//     "category": "софт-скил",
//     "price": 750 }, 
//     {
//     "_id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
//     "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
//     "image": "/Shell.svg",
//     "title": "HEX-леденец",
//     "category": "другое",
//     "price": 1450},
//     {
//     "_id": "b06cde61-912f-4663-9751-09956c0eed67",
//     "description": "Будет стоять над душой и не давать прокрастинировать.",
//     "image": "/Asterisk_2.svg",
//     "title": "Мамка-таймер",
//     "category": "софт-скил",
//     "price": null},
//     {
//     "_id": "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
//     "description": "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.",
//     "image": "/Soft_Flower.svg",
//     "title": "Фреймворк куки судьбы",
//     "category": "дополнительное",
//     "price": 2500
//     }]

// productData.setProducts(ListProductTest);

const UserTest = {
    "payment": "online",
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "Spb Vosstania 1",
    "total": 2200,
    "items": ["854cef69-976d-4c2a-a18c-2aa45046c390", "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"]
}

const basketTest = [{
    "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
    "title": "+1 час в сутках",
    "price": 750 
    },
    {
    "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
    "title": "HEX-леденец",
    "price": 1450
    },
    {
    "id": "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
    "title": "Фреймворк куки судьбы",
    "price": 2500
    }];




// console.log(productData.getProduct("b06cde61-912f-4663-9751-09956c0eed67"));

// console.log(productData.getResult(basketTest));
// productData._basket = basketTest;
// console.log(productData._basket);
// productData.preview = "854cef69-976d-4c2a-a18c-2aa45046c390";
// console.log(productData.preview);

// productData.addProductBasket({"id": "b06cde61-912f-4663-9751-09956c0eed67", "title": "Мамка-таймер", "price": null});
// console.log(productData._basket);

// productData.deleteProductBasket("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
// console.log(productData._basket);

// console.log(userData.setPayment('online'));

// userData.setPayment('online');
// userData.setAddress ('adress');
// userData.setEmail ('email');
// userData.setPhone ('phone');

// userData.setTotal (2200);
// userData.setItems(["854cef69-976d-4c2a-a18c-2aa45046c390", "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"]);

// console.log(userData.payment);
// console.log(userData.address);
// console.log(userData.email);
// console.log(userData.phone);
// console.log(userData.total);
// console.log(userData.items);

// let res = userData.setUserData();

// api.postUser(res)
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.error(err);
//     })

// console.log(userData._order);

events.onAll((event) => {
    console.log(event.eventName, event.data);
})



const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

const cardsContainer = new CardsContainer(document.querySelector('.gallery'), events);
const page = new CardsContainer(document.querySelector('.page'), events);

const cardPreview = ensureElement<HTMLTemplateElement>('#card-preview');

const cardTest = ensureElement<HTMLTemplateElement>('#card-preview');
const bassketTest = ensureElement<HTMLTemplateElement>('#card-basket');

// const gallery = document.querySelector('.gallery');

// const card = new Card(cloneTemplate(cardTemplate), events);
// const card1 = new Card(cloneTemplate(cardTemplate), events);
// const cardArray: HTMLElement[] = [];
// cardArray.push(card.render(ListProductTest[1]));
// cardArray.push(card1.render(ListProductTest[2]));
// cardsContainer.render({catalog: cardArray});

// gallery.prepend(card.render(productData.product[2]));


// Работает
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

// getProduct(productId: string): IProduct {
//     return this._products.find((item) => {
//         item.id === productId
//     });
// }

const cardModal = new Card(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-preview')), events);
events.on('card:select', (data: HTMLElement) => {

    modal.render({
        content:  cardModal.render(productData.getProduct(data.id))
    });

   
})


// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.setLocked(true);
});

// ... и разблокируем
events.on('modal:close', () => {
    page.setLocked(false);
});



// Работа с корзиной
const basket = new Basket(cloneTemplate(ensureElement<HTMLTemplateElement>('#basket')), events);
events.on('basket:open', (data: HTMLElement) => {
    const basketList = new CardsContainer(document.querySelector('.basket__list'), events);
    const array = productData._basket.map((card) => {
    const cardInstant = new Card(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-basket')), events);
    // console.log(card);
    return cardInstant.render(card);
});

    basketList.render({catalog: array});
    // console.log(array);
    console.log(productData.getResult(productData._basket));
    basket.price.textContent = `${productData.getResult(productData._basket)} синапсов`

    page._counter.textContent = `${productData._basket.length}`

    modal.render({
        content:  basket.render()
    });
    
})

events.on('product:buy', (data: HTMLElement) => {;
    const item = productData.getProduct(data.id);
    // console.log(item);
    productData.addProductBasket(item);


})
// ensureElement<HTMLTemplateElement>('#basket')
// const cardBasket = new CardsContainer(document.querySelector('.basket__list'), events);
events.on('basket:changed', () => {
    
    page._counter.textContent = `${productData._basket.length}`
    cardModal.toggleButton(true)
})

events.on('basket:delete', (data: HTMLElement) => {
    productData.deleteProductBasket(data.id);
})

