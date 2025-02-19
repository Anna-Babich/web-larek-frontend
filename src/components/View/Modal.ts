import {IEvents} from "../base/events";
import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";

interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    events: IEvents;

    _content: HTMLElement;
    closeButton: HTMLButtonElement;

    constructor (container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this._content = ensureElement<HTMLElement>('.modal__content', container);
        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);

        this.closeButton.addEventListener('click', () => {
                this.close.bind(this)
        });

        this.container.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation());

        this.container.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
        this.handleEscUp = this.handleEscUp.bind(this);
    }

    set content (data: HTMLElement) {
        this._content.replaceChildren(data);
    }

    open () {
        this.container.classList.add('modal_active');
        document.addEventListener('keyup', this.handleEscUp);
        this.events.emit('modal:open');
    }

    close () {
        this.container.classList.remove('modal_active');
        this.events.emit('modal:close');
        document.removeEventListener('keyup', this.handleEscUp);
    }

    handleEscUp (evt: KeyboardEvent) {
        if (evt.key === 'Escape') {
            this.close();
        }
    };

    render(data: IModal): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}