import {IProduct, TFormPayment, } from '../types/index';
// import { cloneTemplate } from '../utils/utils';
import {IEvents} from './base/events';
import {Component} from './base/Component';

export interface IFormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> extends Component<T> {
    events: IEvents;

    inputs: NodeListOf<HTMLInputElement>;
    // order: HTMLFormElement;
    formName: string;
    orderButton: HTMLButtonElement;
    contactsButton: HTMLButtonElement;
    errors: HTMLElement;

    buttonPaymentOnline: string;
    buttonPaymentCash: string;
    // inputAddress: HTMLInputElement;
    
    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.inputs = this.container.querySelectorAll<HTMLInputElement>('.form__input');
        // this.order = this.container.querySelector('.form');
        this.formName = this.container.getAttribute('name');
        this.orderButton = this.container.querySelector('.order__button');
        this.contactsButton = this.container.querySelector('.button');


        this.errors = this.container.querySelector('.form__errors');

        // this.inputAddress = this.container.querySelector('.form__input')
        this.buttonPaymentOnline = this.container.getAttribute('card');
        this.buttonPaymentCash = this.container.getAttribute('cash');
        // this.inputAddress = this.order.querySelector('.form__input');
        
        this.container.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.events.emit(`${this.formName}:submit`, this.getInputValues());
        });
        this.container.addEventListener('input', (event: InputEvent) => {
            const target = event.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit(`${this.formName}:input`, { field, value });
        });  
    }


    protected getInputValues() {
        const valuesObject: Record<string, string> = {};
        this.inputs.forEach((element) => {
            valuesObject[element.name] = element.value;
        });
        return valuesObject;
    }

    set valid(value: boolean) {
        console.log(value);
        this.orderButton.disabled = !value;
    }

    set _errors(value: string) {
        this.setText(this.errors, value);
    }

    clearForm() {
		this.inputs.forEach((item) => {
            console.log(item);
            item.value = '';
        })
	}
}

// <template id="order">
// 		<form class="form" name="order">
// 			<div class="order">
// 				<div class="order__field">
// 					<h2 class="modal__title">Способ оплаты</h2>
// 					<div class="order__buttons">
// 						<button name="card" type="button" class="button button_alt">Онлайн</button>
// 						<button name="cash" type="button" class="button button_alt">При получении</button>
// 					</div>
// 				</div>
// 				<label class="order__field">
// 					<span class="form__label modal__title">Адрес доставки</span>
// 					<input name="address" class="form__input" type="text" placeholder="Введите адрес" />
// 				</label>
// 			</div>
// 			<div class="modal__actions">
// 				<button type="submit" disabled class="button order__button">Далее</button>
// 				<span class="form__errors"></span>
// 			</div>
// 		</form>
// 	</template>