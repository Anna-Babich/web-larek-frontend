import {IEvents} from './base/events';
import {Component} from './base/Component';

export interface IFormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> extends Component<T> {
    events: IEvents;

    inputs: NodeListOf<HTMLInputElement>;
    formName: string;
    errors: HTMLElement;
    
    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.inputs = this.container.querySelectorAll<HTMLInputElement>('.form__input');
        this.formName = this.container.getAttribute('name');
        this.errors = this.container.querySelector('.form__errors');

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

    set _errors(value: string) {
        this.setText(this.errors, value);
    }

    protected getInputValues() {
        const valuesObject: Record<string, string> = {};
        this.inputs.forEach((element) => {
            valuesObject[element.name] = element.value;
        });
        return valuesObject;
    }

    clearForm() {
		this.inputs.forEach((item) => {
            item.value = '';
        })
	}
}
