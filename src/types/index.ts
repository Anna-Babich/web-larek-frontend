interface IProduct {
    _id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

interface IUser {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

interface IProductsData {
    products: IProduct[];
    preview: string | null;

    getProduct(productId: string): IProduct;
}

interface IUserData {
    order: IUser;

    checkPaymentValidation(data: Record<keyof TFormPayment, string>): boolean;
    checkContactValidation(data: Record<keyof TFormContact, string>): boolean;
}


type TProductPage = Pick<IProduct, '_id' | 'title' | 'category' | 'image' | 'price'>;
type TProductModal = Pick<IProduct, 'description' | 'image' | 'title' | 'category' | 'price'>;
type TBasket = Pick<IProduct, '_id' | 'title' | 'price'>;
type TFormPayment = Pick<IUser, 'payment' | 'address'>;
type TFormContact = Pick<IUser, 'email' | 'phone'>;

type TBasketData = {
    itemBasket: TBasket[];

    getResult(price: number | null): number;
    addProductBasket(id: string): void;
    deleteProductBasket(id: string): void;
}