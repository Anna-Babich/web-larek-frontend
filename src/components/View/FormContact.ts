import {IEvents} from './base/events';
import {Form} from './Form';
import {IFormState} from './Form';

export class FormContacts extends Form<IFormState> {
    events: IEvents;

    contactsButton: HTMLButtonElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this.events = events;

        this.contactsButton = this.container.querySelector('.button');
        this.contactsButton.addEventListener('click', () => {
            this.events.emit('order:post')
        })
    }

    set valid(value: boolean) {
        this.contactsButton.disabled = !value;
    }
}