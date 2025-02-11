import {IProduct} from '../types/index';
// import { cloneTemplate } from '../utils/utils';
import {IEvents} from './base/events';
import {Component} from './base/Component';

export class Card extends Component<IProduct>{
    element: HTMLElement;

    btnGallery: HTMLButtonElement;
    btnAddInBasket: HTMLButtonElement;
    btnDeleteInBasket: HTMLButtonElement;
    cardButton: HTMLButtonElement;
    titleCard: HTMLElement;
    descriptionCard: HTMLElement;
    categoryCard: HTMLElement;
    imageCard: HTMLImageElement;
    priceCard: HTMLElement;
    basketIndex: HTMLElement;

    idCard: string;

    events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        // this.element = cloneTemplate(container);

        this.btnGallery = this.container.querySelector('.gallery__item');
        this.cardButton = this.container.querySelector('.card__button');
        this.titleCard = this.container.querySelector('.card__title');
        this.descriptionCard = this.container.querySelector('.card__text')
        this.categoryCard = this.container.querySelector('.card__category');
        this.imageCard = this.container.querySelector('.card__image');
        this.priceCard = this.container.querySelector('.card__price');
        this.basketIndex = this.container.querySelector('.basket__item-index');

        // this.btnGallery.addEventListener('click', () => {
        //     this.events.emit('card:select', {card: this})
        // });

        // this.btnAddInBasket.addEventListener('click', () => {
        //     this.events.emit('card:add', {card: this})
        // });

        // this.btnDeleteInBasket.addEventListener('click', () => {
        //     this.events.emit('card:delete', {card: this})
        // });
    }

    render(data?: Partial<IProduct>): HTMLElement;
	// render(cardData: Partial<IProduct>): HTMLElement;


    render (cardData: Partial<IProduct> | undefined) {
        if(!cardData) return this.container;

        const{...allCardData} = cardData;
        return super.render(allCardData);
        // Object.assign(this, allCardData);
        // return this.element;
    }

    set price (price: number) {
        this.priceCard.textContent = String(`${price} ` + `синапсов`);
    }

    set image (img: string) {
        // this.imageCard.setAttribute('src', `${img}`);
        console.log(img);
        this.setImage(this.imageCard, img);
    }

    set title (title: string) {
        this.titleCard.textContent = title;
    }

    set category (category: string) {
        this.categoryCard.textContent = category;
    }

    set _id(id) {
		this.idCard = id;
	}
	get _id() {
		return this.idCard;
	}

    
   
}

// <template id="card-preview">
// 		<div class="card card_full">
// 			<img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
// 			<div class="card__column">
// 				<span class="card__category card__category_other">другое</span>
// 				<h2 class="card__title">Бэкенд-антистресс</h2>
// 				<p class="card__text">Если планируете решать задачи в тренажёре, берите два.</p>
// 				<div class="card__row">
// 					<button class="button card__button">В корзину</button>
// 					<span class="card__price">1000 синапсов</span>
// 				</div>
// 			</div>
// 		</div>
// 	</template>

// 	<template id="card-basket">
// 		<li class="basket__item card card_compact">
// 			<span class="basket__item-index">1</span>
// 			<span class="card__title">Фреймворк куки судьбы</span>
// 			<span class="card__price">2500 синапсов</span>
// 			<button class="basket__item-delete card__button" aria-label="удалить"></button>
// 		</li>
// 	</template>

// <template id="card-catalog">
// 		<button class="gallery__item card">
// 			<span class="card__category card__category_soft">софт-скил</span>
// 			<h2 class="card__title">+1 час в сутках</h2>
// 			<img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
// 			<span class="card__price">750 синапсов</span>
// 		</button>
// 	</template>



// Отвечает за отображение карточки товара на главной странице, задавая в карточке данные названия, категории, изображения и цены.\
// Поля класса содержат элементы разметки элементов карточки:
// ```
// element: HTMLElement;

// buttonCard: HTMLButtonElement;
// titleCard: HTMLElement;
// categoryCard: HTMLElement;
// imageCard: HTMLElement;
// priceCard: HTMLElement;
// idCard: string;

// events: IEvents;
// ```
// В конструктор класса передается DOM элемент темплейта.\
// Также конструктор принимает экземпляр `EventEmitter` для инициации событий.\
// В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.
// ```
// constructor(template: HTMLElementTemplate, events: IEvents)
// ```
// Методы:
// - render(cardData: Partial<TProductPage>): HTMLElement - метод отвечает за выведение разметки карточки товара на главную страницу сайта. Детально: заполняет атрибуты элементов карточки данными, возвращает разметку карточки с установленными слушателями. Слушатель устанавливается на элемент карточки и генерируют соответствующие события через экземпляр брокера событий. Что позволит открыть конкретный товар в модальном окне.

// - геттер _id возвращает уникальный id карточки