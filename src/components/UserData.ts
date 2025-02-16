import {IEvents} from './base/events';
import {IUserData, IUser, TFormErrors} from '../types/index'

export class UserData implements IUserData {
    _order: IUser;

    _payment: string;
    _email: string;
    _phone: string;
    _address: string;
    _total: number;
    _items: string[];

    formError: TFormErrors;
    events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setUserData (): IUser {
        return this._order = {
            payment: this._payment,
            email: this._email,
            phone: this._phone,
            address: this._address,
            total: this._total,
            items: this._items
        }
    }

    set payment (data: string) {
        this._payment = data;
    }
    set address (data: string) {
        this._address = data;
    }
    set email (data: string) {
        this._email = data;
    }
    set phone (data: string) {
        this._phone = data;
    }

    set total (data: number) {
        // Берем данные из productData
        this._total = data;
    }
    set items (data: string[]) {
        // Берем данные из productData
        this._items = data;
    }

    validateOrder() {
        const errors: typeof this.formError = {};
        if (!this._email) {
            errors.email = 'Необходимо указать email.';
        }
        if (!this._phone) {
            errors.phone = 'Необходимо указать телефон.';
        }
        if (!this._address) {
            errors.address = 'Необходимо указать адрес.'
        }
        this.formError = errors;
        this.events.emit('formError:change', this.formError);
        return Object.keys(errors).length === 0;
    }
}


// payment: string;
//     email: string;
//     phone: string;
//     address: string;
//     total: number;
//     items: string[];

// - order: IUser; - заказ пользователя
// - events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

// Так же класс предоставляет набор методов для взаимодействия с этими данными.
//  - set order (data: IUserInfo); - сеттер, позволяет сохранять готовый массив
//  - checkPaymentValidation(data: Record<keyof TFormPayment, string>): boolean;
//  - checkContactValidation(data: Record<keyof TFormContact, string>): boolean;
//  - а так же геттеры для получения данных из полей класса