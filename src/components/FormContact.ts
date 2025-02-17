import {IProduct, TFormContact} from '../types/index';
// import { cloneTemplate } from '../utils/utils';
import {IEvents} from './base/events';
import {Component} from './base/Component';
import {Form} from './Form';
import {IFormState} from './Form';

export class FormContacts extends Form<IFormState> {
    events: IEvents;

    buttonContacts: HTMLButtonElement;
    // input1: HTMLElement;
    // input2: HTMLElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this.events = events;

        // this.input1 = this.container.querySelector('.form__input');
        // this.input2 = this.container.querySelector('.form__input');

        this.buttonContacts = this.container.querySelector('.button');
        this.buttonContacts.addEventListener('click', () => {
            this.events.emit('order:post')
        })
    }

    set valid(value: boolean) {
        console.log(value);
        this.contactsButton.disabled = !value;
    }

    // clear () {
    //     this.input1.textContent = '';
    //     this.input2.textContent = '';
    // }

}


// <template id="contacts">
// 		<form class="form" name="contacts">
// 			<div class="order">
// 				<label class="order__field">
// 					<span class="form__label modal__title">Email</span>
// 					<input name="email" class="form__input" type="text" placeholder="Введите Email" />
// 				</label>
// 				<label class="order__field">
// 					<span class="form__label modal__title">Телефон</span>
// 					<input name="phone" class="form__input" type="text" placeholder="+7 (" />
// 				</label>
// 			</div>
// 			<div class="modal__actions">
// 				<button type="submit" disabled class="button">Оплатить</button>
// 				<span class="form__errors"></span>
// 			</div>
// 		</form>
// 	</template>