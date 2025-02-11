import {Component} from "./base/Component";

interface ICardContainer {
    catalog: HTMLElement[];
}

export class CardsContainer extends Component<ICardContainer> {
    _catalog: HTMLElement;
    // container: HTMLElement;

    constructor (protected container: HTMLElement) {
        super(container);
        this.container = container;
    }

    set catalog (items: HTMLElement[]) {
        this.container.replaceChildren( ... items);
    }

    // render(data: Partial<ICardContainer>) {
    //     Object.assign(this, data);
    //     return this.container;
    // }
}