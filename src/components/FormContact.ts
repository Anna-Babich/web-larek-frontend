import {IProduct, TFormPayment, TFormContact} from '../types/index';
// import { cloneTemplate } from '../utils/utils';
import {IEvents} from './base/events';
import {Component} from './base/Component';

export class FormContacts extends Component<TFormContact> {
    events: IEvents;

    buttonContacts: HTMLButtonElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        
        this.buttonContacts = this.container.querySelector('.button');


        this.buttonContacts.addEventListener('click', () => {
            this.events.emit('success:open')
        })
    }



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


//  Данный класс расширяет класс Form. Предназначен для реализации формы для ввода данных пользователя: почты и телефона.\
// Поля класса:
// ```
// contacts: HTMLElementTemplate;
// formContacts: HTMLFormElement;
// inputEmail: HTMLInputElement - инпут для ввода пользователем email
// inputPhone: HTMLInputElement - инпут для ввода пользователем телефона 
// ```
// Конструктор:
// ```
// constructor(template: HTMLElementTemplate, events: IEvents)
// ```
// Методы: