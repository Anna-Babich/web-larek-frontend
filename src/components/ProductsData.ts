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

        this._basket = [];
    }

    setProducts(data: IProduct[]) {
        this._products = data;
        this.events.emit('data:changed', {_products: this._products});

}


    // Запись массива товаров в класс
    // set product(products: IProduct[]) {
    //     this._products = products;
    //     this.events.emit('products:changed')
    // }

    // Чтение всего массива товаров
    get product () {
        return this._products;
    }

    getBasket () {
        return this._basket;
    }

    // Получение полной информации по товару через id
    getProduct(productId: string): IProduct {
        return this._products.find((item) => {
            if(item.id === productId) {
                return item.id;
            }
        });
    }

    getResult(arrayBasket: any): number{
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

    get preview () {
        return this._preview;
    }

    blockButton (idProduct: string): boolean {
    const found = this._basket.find((item) => {
        return item.id === idProduct;
      });
      return found ? true : false;
      
    //   console.log(found);
    //   return ;
    }

    // blockButton (idProduct: string): boolean {
    //     let x;
    //     console.log(this._basket);
        
    //     this._basket.find((item) => {
    //         console.log("айдипродукт");
    //         console.log(idProduct);
    //         x = (item.id === idProduct) ? true : false;
    //         // if(item.id === idProduct) {
    //         //     // console.log(item.id)
    //         //     // console.log(idProduct);
    //         //     let x = 1;
    //         //     return x;
    //         //     // this.events.emit('button:block');
    //         // } else {
    //         //     // console.log('нет в корзине')
    //         //     let x = 0;
    //         //     return x;
    //         // }
    //         // console.log(x);
    //         if(x === true) {
    //            return;
    //         } 
    //     })
    //     return x;
        
        
    // }
}
