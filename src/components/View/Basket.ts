import {Component} from "../base/Component";
import {TBasket} from "../../types";
import {IEvents} from ".././base/events";

interface IBasket {
    items: TBasket[];
}

export class Basket extends Component<IBasket> {
    events: IEvents;

    basket: HTMLElement;
    basketList: HTMLElement;
    basketButton: HTMLButtonElement;
    basketPrice: HTMLElement;
    
    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.basket = this.container.querySelector('.basket');
        this.basketList = this.container.querySelector('.basket__list');
        this.basketButton = this.container.querySelector('.basket__button');
        this.basketPrice = this.container.querySelector('.basket__price');

        this.basketButton.addEventListener('click', () => {
            this.events.emit('open:order')
        })
    }

    get price () {
        return this.basketPrice;
    }

    buttonToggle (state: boolean) {
        this.setDisabled(this.basketButton, state);
    }
}