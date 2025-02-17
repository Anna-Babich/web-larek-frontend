import {Component} from "./base/Component";
import { IEvents } from "./base/events";
import {ensureElement} from "../utils/utils";

// interface ICardContainer {
//     catalog: HTMLElement[];
// }

export class CardsContainer<T> extends Component<T> {
    _catalog: HTMLElement;
    _counter: HTMLElement;
    _wrapper: HTMLElement;
    _basket: HTMLElement;

    events: IEvents;

    constructor (protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this.container = container;
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
        this._counter = ensureElement<HTMLElement>('.header__basket-counter');
        this._basket = ensureElement<HTMLElement>('.header__basket');

        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        })
        
    }

    set catalog (items: HTMLElement[]) {
        this.container.replaceChildren( ... items);
    }

    setLocked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }
}