import {IProduct, TFormPayment, TFormContact} from '../types/index';
// import { cloneTemplate } from '../utils/utils';
import {IEvents} from './base/events';
import {Component} from './base/Component';

export class Success extends Component<IProduct> {
    events: IEvents;

    successClose: HTMLButtonElement;
    successDescription: HTMLElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;


        this.successClose = this.container.querySelector('.order-success__close');
        this.successDescription = this.container.querySelector('.order-success__description');

        this.successClose.addEventListener('click', () => {
            this.events.emit('success:close');
        })
    }



}


// <template id="success">
// 		<div class="order-success">
// 			<h2 class="order-success__title">Заказ оформлен</h2>
// 			<p class="order-success__description">Списано 0 синапсов</p>
// 			<button class="button order-success__close">За новыми покупками!</button>
// 		</div>
// 	</template>