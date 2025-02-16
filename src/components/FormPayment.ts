import {IProduct, TFormPayment} from '../types/index';
// import { cloneTemplate } from '../utils/utils';
import {IEvents} from './base/events';
import {Component} from './base/Component';

export class FormPayment extends Component<TFormPayment> {
    events: IEvents;

    order: HTMLElement;
    buttonPaymentOnline: string;
    buttonPaymentCash: string;

    inputAddress: HTMLInputElement;
    orderButton: HTMLButtonElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.order = this.container.querySelector('.form');


        
        // this.buttonPaymentOnline = this.order.getAttribute('card');
        // this.buttonPaymentCash = this.order.getAttribute('cash');

        // this.inputAddress = this.order.querySelector('.form__input');
        this.orderButton = this.container.querySelector('.order__button');



        this.orderButton.addEventListener('click', () => {
            this.events.emit('contacts:open')
        })
    }



}




// При сабмите инициирует событие передавая в него объект с данными из полей ввода формы. При изменении данных в полях ввода инициирует событие изменения данных. Предоставляет методы для отображения ошибок и управления активностью кнопки сохранения

// Поля класса содержат элементы разметки форм:
// ```
// formElement: HTMLFormElement;
// inputElement: HTMLInputElement;

// ```
// В конструктор класса передается DOM элемент темплейта.\
// ```
// constructor(formElement: HTMLFormElement, handleFormSubmit: function)
// ```

// Методы:
//  - render() - выводит элемент формы для выведения на страницу
//  - setValue(value: string) - позволяет заполнять форму
//  - getValue() - возвращает значение из поля ввода
//  - clearValue(formElement: HTMLFormElement) - очищает форму

//  #### Класс FormPayment
// Данный класс расширяет класс Form. И предназначен для реализации формы для выбора способа оплаты и адреса доставки.\
// Поля класса:
// ```
// order: HTMLElementTemplate;
// formOrder: HTMLFormElement;
// buttonPaymentOnline: HTMLButtonElement - кнопка для выбора способа оплаты (онлайн)
// buttonPaymentCash: HTMLButtonElement - кнопка для выбора способа оплаты (при получении)
// inputAddress: HTMLInputElement - инпут для ввода пользователем адреса
// orderButton: HTMLButtonElement - кнопка для сабмита данных

// ```
// Конструктор:
// ```
// constructor(template: HTMLElementTemplate, events: IEvents)
// ```
// Методы:

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