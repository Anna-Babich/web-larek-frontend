export interface IProduct {
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
    _basket: TBasket[];
    
    setProducts(data: IProduct[]): void;
    getProduct(productId: string): IProduct;
    getResult(arrayBasket: TBasket[]): number;
    addProductBasket(product: IProduct): void;
    deleteProductBasket(productId: string): void;
    itemInBasket (idProduct: string): boolean;
}

export interface IUserData {
    _order: IUser;
    errorForm: TFormErrors;
    
    setPayment(data: string): void;
    setField(field: keyof TForm, value: string): void;
    clearForm(): void;
}

export type TFormErrors = Partial<Record<keyof TForm, string>>;
export type TBasket = Pick<IProduct, 'id' | 'title' | 'price'>;
export type TForm = Pick<IUser, 'address' | 'email' | 'phone' | 'payment'>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}