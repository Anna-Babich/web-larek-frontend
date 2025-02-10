import './scss/styles.scss';
import {EventEmitter, IEvents} from '../src/components/base/events';
import {ProductData} from './components/ProductsData';
import {UserData} from './components/UserData';
import {IApi} from './types';
import {AppApi} from './components/AppAPI';
import {Api} from './components/base/api';
import {API_URL, settings} from './utils/constants';
import {Card} from './components/Card';
import {ensureElement} from './utils/utils';

const events = new EventEmitter();

const productData = new ProductData(events);
const userData = new UserData(events);

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);


const ListProductTest = [
    {
    "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "/5_Dots.svg",
    "title": "+1 час в сутках",
    "category": "софт-скил",
    "price": 750 }, 
    {
    "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
    "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
    "image": "/Shell.svg",
    "title": "HEX-леденец",
    "category": "другое",
    "price": 1450},
    {
    "id": "b06cde61-912f-4663-9751-09956c0eed67",
    "description": "Будет стоять над душой и не давать прокрастинировать.",
    "image": "/Asterisk_2.svg",
    "title": "Мамка-таймер",
    "category": "софт-скил",
    "price": null},
    {
    "id": "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
    "description": "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.",
    "image": "/Soft_Flower.svg",
    "title": "Фреймворк куки судьбы",
    "category": "дополнительное",
    "price": 2500
    }]

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



productData.product = ListProductTest;
// console.log(productData.product);

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


api.getProducts()
    .then((initialProducts) => {
        productData.product = initialProducts;
        console.log(productData.product);
    })
    .catch((err) => {
        console.error(err);
    });

const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

const cardTest = ensureElement<HTMLTemplateElement>('#card-preview');
const bassketTest = ensureElement<HTMLTemplateElement>('#card-basket');

const gallery = document.querySelector('.gallery');

const card = new Card(cardTemplate, events);
console.log(card);
console.log(card.setData(productData.product[2]));
gallery.prepend(card.render());

