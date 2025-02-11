export interface IProduct {
    _id: string;
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
    // getProduct(productId: string): IProduct;
}

export interface IUserData {
    _order: IUser;

    

    // checkPaymentValidation(data: Record<keyof TFormPayment, string>): boolean;
    // checkContactValidation(data: Record<keyof TFormContact, string>): boolean;
}

export type TFormErrors = Partial<Record<keyof TForm, string>>;


export type TProductPage = Pick<IProduct, '_id' | 'title' | 'category' | 'image' | 'price'>;
export type TProductModal = Pick<IProduct, 'description' | 'image' | 'title' | 'category' | 'price'>;
export type TBasket = Pick<IProduct, '_id' | 'title' | 'price'>;

export type TForm = Pick<IUser, 'address' | 'email' | 'phone'>;
export type TFormPayment = Pick<IUser, 'payment' | 'address'>;
export type TFormContact = Pick<IUser, 'email' | 'phone'>;

export type TBasketData = {
    itemBasket: TBasket[];

    getResult(array: TBasket): number;
    addProductBasket(id: string): void;
    deleteProductBasket(id: string): void;
}



export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}