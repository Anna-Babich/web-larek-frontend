import {Component} from "./base/Component";
import {IProduct, TBasket, TBasketData} from "../types";
import {IEvents} from "./base/events";
import {ensureElement, createElement} from "../utils/utils";

interface IBasket {
    items: TBasket[];
}

export class Basket extends Component<IBasket> {
    events: IEvents;

    basket: HTMLElement;
    basketList: HTMLElement;
    basketButton: HTMLButtonElement;
    basketPrice: HTMLElement;

    basketItem: HTMLLIElement;
    basketItemIndex: HTMLElement;
    cardTitle: HTMLElement;
    cardPrice: HTMLElement;
    basketItemDelete: HTMLButtonElement;
    

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.basket = this.container.querySelector('.basket');
        this.basketList = this.container.querySelector('.basket__list');
        this.basketButton = this.container.querySelector('.basket__button');
        this.basketPrice = this.container.querySelector('.basket__price');
        // ensureElement<HTMLElement>('.page__wrapper');



}

get price () {
    return this.basketPrice;
}

set items(items: HTMLElement[]) {
    if (items.length) {
        this.basketList.replaceChildren(...items);
    } else {
        this.basketList.replaceChildren(createElement<HTMLParagraphElement>('p', {
            textContent: 'Корзина пуста'
        }));
    }
  }
}

// <template id="card-basket">
// 		<li class="basket__item card card_compact">
// 			<span class="basket__item-index">1</span>
// 			<span class="card__title">Фреймворк куки судьбы</span>
// 			<span class="card__price">2500 синапсов</span>
// 			<button class="basket__item-delete card__button" aria-label="удалить"></button>
// 		</li>
// 	</template>

// basketItem: HTMLLIElement; - отдельный товар в корзине
// basketItemIndex: HTMLElement; - порядковый номер отдельного товара в корзине
// cardTitle: HTMLElement; - наименование отдельного товара в корзине
// cardPrice: HTMLElement; - цена отдельного товара в корзине
// basketItemDelete: HTMLButtonElement; - кнопка удаления отдельного товара из корзины

// 	<template id="basket">
// 		<div class="basket">
// 			<h2 class="modal__title">Корзина</h2>
// 			<ul class="basket__list"></ul>
// 			<div class="modal__actions">
// 				<button class="button basket__button">Оформить</button>
// 				<span class="basket__price">0 синапсов</span>
// 			</div>
// 		</div>
// 	</template>

// basketList: HTMLUListElement; - список товаров в корзине
// basketButton: HTMLButtonElement; - кнопка для оформления заказа
// basketPrice: HTMLElement; - общая стоимость покупки