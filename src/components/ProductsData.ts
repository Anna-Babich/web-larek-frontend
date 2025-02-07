import {IEvents} from './base/events';
import {IProduct, IProductsData, TBasket, TProductModal, TProductPage} from '../types/index';

export class ProductData implements IProductsData{
    _products: IProduct[];
    _preview: string | null;

    _page: TProductPage;
    _basket: TBasket[];
    events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    // Запись массива товаров в класс
    set product(products: IProduct[]) {
        this._products = products;
        this.events.emit('products:changed')
    }

    // Чтение всего массива товаров
    get product () {
        return this._products;
    }

    // Получение полной информации по товару через id
    getProduct(productId: string) {
        return this._products.find((item) => item.id === productId);
    }

    getResult(arrayBasket: TBasket[]): number{
        let res: number = 0;
        arrayBasket.forEach((item: TBasket) => {
            res = res + item.price;
        })
        return res;
    }

    addProductBasket(product: TBasket): void {
        this._basket.push(product);
        this.events.emit('products:changed');
    }

    deleteProductBasket(productId: string): void {
        this._basket = this._basket.filter(card => card.id !== productId);
        this.events.emit('products:changed');
    }

    set preview(cardId: string | null) {
        if (!cardId) {
            this._preview = null;
            return;
        }
        const selectedCard = this.getProduct(cardId);
        if (selectedCard) {
            this._preview = cardId;
            this.events.emit('product:selected')
        }
    }

    get preview () {
        return this._preview;
    }

}
