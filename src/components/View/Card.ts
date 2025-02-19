import {IProduct} from '../../types/index';
import {IEvents} from '../base/events';
import {Component} from '../base/Component';

export class Card extends Component<IProduct> {
    events: IEvents;
    
    titleCard: HTMLElement;
    descriptionCard: HTMLElement;
    categoryCard: HTMLElement;
    imageCard: HTMLImageElement;
    priceCard: HTMLElement;
    basketIndex: HTMLElement;

    cardButton: HTMLButtonElement;
    btnDeleteInBasket: HTMLButtonElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.titleCard = this.container.querySelector('.card__title');
        this.descriptionCard = this.container.querySelector('.card__text')
        this.categoryCard = this.container.querySelector('.card__category');
        this.imageCard = this.container.querySelector('.card__image');
        this.priceCard = this.container.querySelector('.card__price');
        this.basketIndex = this.container.querySelector('.basket__item-index');

        this.cardButton = this.container.querySelector('.card__button');
        this.btnDeleteInBasket = this.container.querySelector('.basket__item-delete');

        if(this.container.classList.contains('gallery__item')){
            this.container.addEventListener('click', () => {
                this.events.emit('card:select', this)
            });
        }

        if(this.container.classList.contains('card_full')) {
            this.cardButton.addEventListener('click', () => {
                this.events.emit('product:buy', this)
                this.setDisabled(this.cardButton, true);
            })
        }

        if(this.container.classList.contains('basket__item')) {
            this.btnDeleteInBasket.addEventListener('click', () => {
                this.events.emit('basket:delete', this)
            })
        }
    }

    set title (title: string) {
        this.titleCard.textContent = title;
    }

    set description (description: string) {
        this.setText(this.descriptionCard, description);
    }

    protected categoryColors = <Record<string, string>>{ 
        "софт-скил": 'soft', 
        "другое": 'other', 
        "кнопка": 'button', 
        "хард-скил": 'hard', 
        "дополнительное": 'additional' 
   }
   set category(value: string) { 
      this.setText(this.categoryCard, value); 
        if (this.categoryCard) { 
          this.categoryCard.className = `card__category card__category_${this.categoryColors[value]}`;
        } 
   }

    set image (img: string) {
        this.setImage(this.imageCard, img);
    }

    set price (price: number) {
        this.priceCard.textContent = String(`${price} ` + `синапсов`);
    }

    set index(index: number) {
		this.basketIndex.textContent = String(index + 1);
	}

    toggleButton(state: boolean) {
		this.setDisabled(this.cardButton, state);
	}

    render(data?: Partial<IProduct>): HTMLElement;
	render(cardData: Partial<IProduct>): HTMLElement;

    render (cardData: Partial<IProduct> | undefined) {
        if(!cardData) return this.container;
        const{...allCardData} = cardData;
        return super.render(allCardData);
    }
}