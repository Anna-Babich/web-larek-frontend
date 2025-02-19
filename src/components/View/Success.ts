import {IEvents} from '../base/events';
import {Component} from '../base/Component';

interface ISuccess {
    content: HTMLElement;
}

export class Success extends Component<ISuccess> {
    events: IEvents;

    successClose: HTMLButtonElement;
    successDescription: HTMLElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.successClose = this.container.querySelector('.order-success__close');
        this.successDescription = this.container.querySelector('.order-success__description');

        this.successClose.addEventListener('click', () => {
            this.events.emit('success:close');
        })
    }
}