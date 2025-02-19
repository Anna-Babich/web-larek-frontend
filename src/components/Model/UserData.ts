import {IEvents} from '../base/events';
import {IUserData, IUser, TFormErrors, TForm} from '../../types/index'

export class UserData implements IUserData {
    events: IEvents;

    _order: IUser = {
        payment: '',
        email: '',
        phone: '',
        address: '',
        total: 0,
        items: []
    }
    errorForm: TFormErrors;

    constructor(events: IEvents) {
        this.events = events;
    }

    get _formError() {
        return this.errorForm;
    }

    setPayment(data: string) {
        this._order.payment = data;
    }

    setField(field: keyof TForm, value: string) {
        this._order[field] = value;
        if (this.validate()) {
            console.log('успешно')
        }
    }

    protected validate() {
        const errors: typeof this.errorForm = {};
        if (!this._order.address) {
            errors.address = 'Необходимо указать адрес';
        }
        if (!this._order.email) {
            errors.email = 'Необходимо указать email';
        }
        if(!this._order.phone) {
            errors.phone = 'Необходимо указать телефон'
        }
        this.errorForm = errors;
        this.events.emit('forms:errors', this.errorForm);
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