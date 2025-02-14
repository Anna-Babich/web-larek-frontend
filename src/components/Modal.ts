import {IEvents} from "./base/events";
import {Component} from "./base/Component";

interface IModal {
    content: HTMLElement;
}

export class Modal <IModal> extends Component<IModal> {
    modal: HTMLElement;
    _content: HTMLElement;
    events: IEvents;

    constructor (container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        const closeButton = this.container.querySelector('.modal__close');
        closeButton.addEventListener('click', () => {
            console.log('close');
            this.close.bind(this)
        });

        this.container.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });

        this._content = this.container.querySelector('.modal__content');
        this.handleEscUp = this.handleEscUp.bind(this);
    }

    set content (data: HTMLElement) {
        this._content.replaceChildren(data);
    }

    open () {
        this.container.classList.add('modal_active');
        document.addEventListener('keyup', this.handleEscUp);
    }

    close () {
        this.container.classList.remove('.modal_active');
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


// <!-- <div class="modal" id="modal-container">
// 		<div class="modal__container">
// 			<button class="modal__close" aria-label="закрыть"></button>
// 			<div class="modal__content">

// 			</div>
// 		</div>
// 	</div> -->