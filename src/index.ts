import './scss/styles.scss';

interface IProduct {
    _id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    selected?: boolean;
}


interface IUserInfo {
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
    
}


type TProductInfo = Pick<IProduct, 'description' | 'image' | 'title' | 'category' | 'price'>;
type TBasket = Pick<IProduct, 'title' | 'price'>;
type TFormPayment = Pick<IUserInfo, 'payment' | 'address'>;
type TFormContact = Pick<IUserInfo, 'email' | 'phone'>;