import {IEvents} from './base/events';
import {IUserData, IUser, TFormErrors, TForm} from '../types/index'

export class UserData implements IUserData {
    _order: IUser = {
        payment: '',
        email: '',
        phone: '',
        address: '',
        total: 0,
        items: []
    }

    _payment: string;
    _email: string;
    _phone: string;
    address: string;
    _total: number;
    _items: string[];

    errorPayment: TFormErrors;
    errorContacts: TFormErrors;
    events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setUserData (): IUser {
        return this._order = {
            payment: this._payment,
            email: this._email,
            phone: this._phone,
            address: this.address,
            total: this._total,
            items: this._items
        }
    }

    // getPayment() {
	// 	return this.payment;
	// }

    get _formError() {
        return this.errorPayment;
    }

setPayment(data: string) {
    this._order.payment = data;
}


    // set payment (data: any) {
    //     this._payment = data;
    // }
    // set _address (data: string) {
    //     this.address = data;
    // }
    // set email (data: string) {
    //     this._email = data;
    // }
    // set phone (data: string) {
    //     this._phone = data;
    // }

    set total (data: number) {
        // Берем данные из productData
        this._total = data;
    }
    set items (data: string[]) {
        // Берем данные из productData
        this._items = data;
    }

    setPaymentField(field: keyof TForm, value: string) {
        console.log(value);
        this._order[field] = value;

        if (this.validatePayment()) {
            console.log('успешно')
        }
    }

    validatePayment() {
        const errors: typeof this.errorPayment = {};
        if (!this._order.address) {
            errors.email = 'Необходимо указать адрес';
        }
        this.errorPayment = errors;
        this.events.emit('formP:change', this.errorPayment);
        return Object.keys(errors).length === 0;
    }
 // для контактов
    setContactsField(field: keyof TForm, value: string) {
        console.log(value);
        this._order[field] = value;

        if (this.validationContacts()) {
            this.events.emit('order:ready', this._order);

        }
    }

    validationContacts() {
        const errors: typeof this.errorContacts = {};
        if (!this._order.email) {
            errors.email = 'Необходимо указать email';
        }
        if(!this._order.phone) {
            errors.phone = 'Необходимо указать телефон'
        }
        this.errorContacts = errors;
        this.events.emit('formC:change', this.errorContacts);
        return Object.keys(errors).length === 0;
    }


    clearForm() {
        this._order = {
            payment: '',
            email: '',
            phone: '',
            address: '',
            total: 0,
            items: []
        }
    }
}