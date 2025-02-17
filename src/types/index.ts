export interface IProduct {
    // index: string;
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IUser {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export interface IProductsData {
    _products: IProduct[];
    _preview: string | null;
    
    getResult(arrayBasket: TBasket[]): number;
    setProducts(data: IProduct[]): void;

    // Получение полной информации по товару через id
    getProduct(productId: string): IProduct;
    getResult(arrayBasket: TBasket[]): number;
    addProductBasket(product: IProduct): void;
    deleteProductBasket(productId: string): void;
    setPreview(cardId: string | null): void;
    blockButton (idProduct: string): boolean;
}

export interface IUserData {
    _order: IUser;

    // setUserData (): IUser;
    // set payment (data: string)
    // set address (data: string)
    // set email (data: string)
    // set phone (data: string)
    // set total (data: number)
    // set items (data: string[])
    
}

export type TFormErrors = Partial<Record<keyof TForm, string>>;
export type TBasket = Pick<IProduct, 'id' | 'title' | 'price'>;
export type TForm = Pick<IUser, 'address' | 'email' | 'phone' | 'payment'>;
export type TFormPayment = Pick<IUser, 'payment' | 'address'>;
export type TFormContact = Pick<IUser, 'email' | 'phone'>;


export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}




// export type TProductPage = Pick<IProduct, 'id' | 'title' | 'category' | 'image' | 'price'>;
// export type TProductModal = Pick<IProduct, 'description' | 'image' | 'title' | 'category' | 'price'>;


// export type TBasketData = {
//     itemBasket: TBasket[];

//     getResult(array: TBasket): number;
//     addProductBasket(id: string): void;
//     deleteProductBasket(id: string): void;
// }