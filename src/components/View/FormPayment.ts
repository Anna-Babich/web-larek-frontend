import {IEvents} from './base/events';
import {Form} from './Form';
import {IFormState} from './Form'

export class FormPayment extends Form<IFormState> {
    events: IEvents;

    paymentBtn: NodeListOf<HTMLButtonElement>;
    orderButton: HTMLButtonElement;
    
    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this.events = events;

        this.orderButton = this.container.querySelector('.order__button');
        this.paymentBtn = this.container.querySelectorAll('.button_alt');
        
        this.paymentBtn.forEach((item) => {
            item.addEventListener('click', () =>{
                this.events.emit('order:button', {paymentBtn: item.name});
            });
        });
    }

    set valid(value: boolean) {
        this.orderButton.disabled = !value;
    }

    togglePaymant(data: string) {
		this.paymentBtn.forEach((item) => {
			if (item.name === data) {
				item.classList.replace('button_alt', 'button_alt-active');
			} else {
			    item.classList.replace('button_alt-active', 'button_alt');
			}
		});
	}

    buttonClear () {
        this.paymentBtn.forEach((item) => {
            item.classList.remove('button_alt-active');
            item.classList.add('button_alt');
        });
    }
}