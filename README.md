# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных используемые в приложениях

Товар 

```

interface IProduct {
    _id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    selected?: boolean;
}
```

Данные пользователя

```

interface IUserInfo {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

```

Интерфейс для модели данных товара

```
interface IProductsData {
    products: IProduct[];
    preview: string | null;
}
```
Данные товара, используемые в модальном окне товара

```
type TProductInfo = Pick<IProduct, 'description' | 'image' | 'title' | 'category' | 'price'>;
```
Данные товара, используемые в модальном окне корзина
```
type TBasket = Pick<IProduct, 'title' | 'price'>;
```
Данные пользователя, используемые в модальном окне формы оплаты

```
type TFormPayment = Pick<IUserInfo, 'payment' | 'address'>;
```
Данные пользователя, используемые в модальном окне формы контактов

```
type TFormContact = Pick<IUserInfo, 'email' | 'phone'>;