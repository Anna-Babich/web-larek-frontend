import {IEvents} from './base/events';
import {IProduct, IProductsData, TBasket} from '../types/index';

export class ProductData implements IProductsData{
    _products: IProduct[];
    _preview: string | null;

    // _page: TProductPage;
    _basket: TBasket[];
    events: IEvents;

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
        arrayBasket.forEach((item: any) => {
            res = res + item.price;
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

    setPreview(cardId: string | null) {
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

    blockButton (idProduct: string): boolean {
        const found = this._basket.find((item) => {
            return item.id === idProduct;
        });
        return found ? true : false;
    }
}


// Запись массива товаров в класс
    // set product(products: IProduct[]) {
    //     this._products = products;
    //     this.events.emit('products:changed')
    // }

    // getBasket () {
    //     return this._basket;
    // }

    // get preview () {
    //     return this._preview;
    // }