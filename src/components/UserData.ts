import {IEvents} from './base/events';
import {IUserData, IUser, TFormErrors} from '../types/index'

export class UserData implements IUserData {
    _order: IUser;

    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];

    formError: TFormErrors;
    events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setUserData (): IUser {
        // this._order.payment = this.payment;
        // this._order.email = this.email;
        // this._order.phone = this.phone;
        // this._order.address = this.address;
        // this._order.total = this.total;
        // this._order.items = this.items;
        // return this._order;
        return this._order = {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
            total: this.total,
            items: this.items
        }
    }

    setPayment (data: string) {
        this.payment = data;
    }
    setAddress (data: string) {
        this.address = data;
    }
    setEmail (data: string) {
        this.email = data;
    }
    setPhone (data: string) {
        this.phone = data;
    }

    setTotal (data: number) {
        // Берем данные из productData
        this.total = data;
    }
    setItems (data: string[]) {
        // Берем данные из productData
        this.items = data;
    }



    validateOrder() {
        const errors: typeof this.formError = {};
        if (!this.email) {
            errors.email = 'Необходимо указать email.';
        }
        if (!this.phone) {
            errors.phone = 'Необходимо указать телефон.';
        }
        if (!this.address) {
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