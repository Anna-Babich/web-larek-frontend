import './scss/styles.scss';
// IProduct - интерфейс со всеми свойствами продукта
// IBasket - интерфейс корзины с ее содержимым и общей стоимостью товаров в ней
// IOrder - интерфейс заказа для отправки на сервер
// TOrder - объединеный тип формы заказа и контактов
// TOrderForm - тип формы заказа
// TContactsForm - тип формы контактов
// IOrderResult - интерфейс результата отправки заказа
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
    _order: IUser[];
}



type TProductPage = Pick<IProduct, '_id' | 'title' | 'category' | 'image' | 'price'>;
type TProductModal = Pick<IProduct, 'description' | 'image' | 'title' | 'category' | 'price'>;
type TBasket = Pick<IProduct, '_id' | 'title' | 'price'>;
type TFormPayment = Pick<IUser, 'payment' | 'address'>;
type TFormContact = Pick<IUser, 'email' | 'phone'>;