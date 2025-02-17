import {IProduct, TFormPayment, TForm} from '../types/index';
// import { cloneTemplate } from '../utils/utils';
import {IEvents} from './base/events';
import {Form} from './Form';
import {IFormState} from './Form'


export class FormPayment extends Form<IFormState> {
    events: IEvents;

    paymentBtn: NodeListOf<HTMLButtonElement>;

    // input1: HTMLElement;
    
    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this.events = events;

        // this.input1 = this.container.querySelector('.form__input')

        this.paymentBtn = this.container.querySelectorAll('.button_alt');
        this.paymentBtn.forEach((item) => {
            item.addEventListener('click', () =>{
                this.events.emit('order:button', {paymentBtn: item.name});
                
            })
        })
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