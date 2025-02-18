import {IEvents} from './base/events';
import {IProduct, IProductsData, TBasket} from '../types/index';

export class ProductData implements IProductsData {
    events: IEvents;

    _products: IProduct[];
    _basket: TBasket[];
    
    constructor(events: IEvents) {
        this.events = events;
        this._basket = [];
    }

    // Чтение всего массива товаров
    get product () {
        return this._products;
    }

    setProducts(data: IProduct[]) {
        this._products = data;
        this.events.emit('data:changed', {_products: this._products});
    }

    // Получение полной информации по товару через id
    getProduct(productId: string): IProduct {
        return this._products.find((item) => {
            if(item.id === productId) {
                return item.id;
            }
        });
    }

    getResult(arrayBasket: TBasket[]): number{
        let res: number = 0;
        arrayBasket.forEach((item) => {
            res += item.price;
        })
        return res;
    }

    addProductBasket(product: IProduct): void {
        const {id, title, price} = product;
        const obj = {id, title, price};
        this._basket.push(obj);
        this.events.emit('basket:changed'); 
    }

    deleteProductBasket(productId: string): void {
        this._basket = this._basket.filter(card => card.id !== productId);
        this.events.emit('basket:open');
    }

    itemInBasket (idProduct: string): boolean {
        const found = this._basket.find((item) => {
            return item.id === idProduct;
        });
        return found ? true : false;
    }
}