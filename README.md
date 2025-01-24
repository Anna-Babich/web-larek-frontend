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
Интерфейс для модели данных пользователя
```
interface IUserData {
    order: IUserInfo;
}
```
Данные товара, используемые в модальном окне товара:
```
type TProductModal = Pick<IProduct, 'description' | 'image' | 'title' | 'category' | 'price'>;
```
Данные товара, используемые в карточках на главной странице:
```
type TProductPage = Pick<IProduct, 'title' | 'category' | 'image' | 'price'>;
```
Данные товара, используемые в модальном окне корзина:
```
type TBasket = Pick<IProduct, 'title' | 'price'>;
```
Данные пользователя, используемые в модальном окне формы оплаты:
```
type TFormPayment = Pick<IUser, 'payment' | 'address'>;
```
Данные пользователя, используемые в модальном окне формы контактов:
```
type TFormContact = Pick<IUser, 'email' | 'phone'>;
```
Тип для модели данных корзины
```
type TBasketData = {
    itemBasket: TBasket[];

    getResult(price: number | null): number;
    addProductBasket(id: string): void;
    deleteProductBasket(id: string): void;
}
```

## Архитектура приложения
В данном приложении используется архитектурный паттерн MVP.\
MVP разделяет приложение на три основных компонента:\
1. Слой данных(Model) - отвечает за хранение и изменение данных
2. Слой представления(View) - отвечает за отображение данных на странице
3. Презентер (Presenter) - отвечает за связь представления и данных

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы: 
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие   

### Слой данных
Здесь представлены классы слоя данных:

#### Класс ProductsData
Класс отвечает за хранение и логику работы с данными товаров.\
Конструктор класса принимает инстант брокера событий\
В полях класса хранятся следующие данные:
- _products: IProduct[] - массив объектов карточек, свойство protected
- _preview: string | null - id карточки, выбранной для просмотра в модальной окне
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Так же класс предоставляет набор методов для взаимодействия с этими данными.
- getProduct(productId: string): IProduct - возвращает товар по id
- set _products(data: IProduct[]) - сеттер для храненеия начального массива товаров
- а так же геттеры для получения данных из полей класса

#### Класс UserData
Класс отвечает за хранение и логику работы с данными пользователя для оформления заказа.\
Конструктор класса принимает инстант брокера событий\
В полях класса хранятся следующие данные:
- order: IUserInfo; - заказ пользователя
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Так же класс предоставляет набор методов для взаимодействия с этими данными.
 - set order (data: IUserInfo) - сеттер, позволяет сохранять готовый массив
- а так же геттеры для получения данных из полей класса

#### Класс BasketData
Данный класс работает с данными связанными с корзиной.\
Поля:
 - itemBasket: TBasket[] - массив объектов добавленных в корзину товаров

Методы для работы с данными корзины:
 - getResult(price: number | null): number - метод для подсчета общей стоимости товаров в корзине
 - addProductBasket(id: string): void - функция добавления товара в корзину
 - deleteProductBasket(id: string): void - функция удаления товара из корзины

### Слой представления
В данном разделе представлены классы для слоя представления. Классы представления отвечают за отображение данных внутри DOM-элементов.

#### Класс Page
Класс для выведение контентной части сайта: карточек
Поля класса:
```
page: HTMLElement; - главная страница
pageGallery: HTMLElement; - элемент для отображения галереи товаров
headerBasket: HTMLButtonElement; - кнопка-иконка корзины
headerBasketCounter: HTMLElement; - счетчик товаров в корзине

```
Конструктор:
```
constructor(container: HTMLElement, events: IEvents)
```
#### Класс Modal
Класс для формирования модального окна и выведение какой-либо разметки внутри. Также класс предоставляет действия для работы с модальным окном: открытие окна, закрытие по кнопке и оверлей.
Поля класса:
```
modal: HTMLELement - модальное окно
button: HTMLButtonElement - кнопка-крестик
events: IEvents - брокер событий

```
Конструктор принимает селектор, по которому в разметке страницы будет идентифицировано модальное окно и экземпляр класса `EventEmitter` для возможности инициации событий:
```
constructor(selector: string, events: IEvents)
```
Методы:
- open() - открытие модального окна
- close() - закрытие модального окна
- render() - выводит DOM-элемент для выведения на страницу

#### Класс Card 
Отвечает за отображение карточки товара на главной странице, задавая в карточке данные названия, категории, изображения и цены.\
Поля класса содержат элементы разметки элементов карточки:
```
itemElement: HTMLElement;
title: HTMLElement;
category: HTMLElement;
images: HTMLElement;
price: HTMLElement;
```
В конструктор класса передается DOM элемент темплейта.\
Также конструктор принимает экземпляр `EventEmitter` для инициации событий.\
В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.
```
constructor(template: HTMLElementTemplate, events: IEvents)
```
Методы:
- render(cardData: Partial<TProductPage>): HTMLElement - метод отвечает за выведение разметки карточки товара на главную страницу сайта. Детально: заполняет атрибуты элементов карточки данными, возвращает разметку карточки с установленными слушателями. Слушатель устанавливается на элемент карточки и генерируют соответствующие события через экземпляр брокера событий. Что позволит открыть конкретный товар в модальном окне.

- геттер _id возвращает уникальный id карточки

#### Класс Basket
Класс корзины. Отвечает за выведение разметки корзины.
Имеет поля:
```
basketList: HTMLUListElement; - список товаров в корзине
basketItem: HTMLLIElement; - отдельный товар в корзине
basketItemIndex: HTMLElement; - порядковый номер отдельного товара в корзине
cardTitle: HTMLElement; - наименование отдельного товара в корзине
cardPrice: HTMLElement; - цена отдельного товара в корзине
basketItemDelete: HTMLButtonElement; - кнопка удаления отдельного товара из корзины

basketButton: HTMLButtonElement; - кнопка для оформления заказа
basketPrice: HTMLElement; - общая стоимость покупки
```
В конструктор класса передается DOM элемент темплейта.\
Также конструктор принимает экземпляр `EventEmitter` для инициации событий.\
В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.
```
constructor(template: HTMLElementTemplate, events: IEvents)
```

Методы: 


#### Класс Form
При сабмите инициирует событие передавая в него объект с данными из полей ввода формы. При изменении данных в полях ввода инициирует событие изменения данных. Предоставляет методы для отображения ошибок и управления активностью кнопки сохранения

Поля класса содержат элементы разметки форм:
```
formElement: HTMLFormElement;
inputElement: HTMLInputElement;

```

В конструктор класса передается DOM элемент темплейта.\
```
constructor(formElement: HTMLFormElement, handleFormSubmit: function)
```

Методы:
 - render() - выводит элемент формы для выведения на страницу
 - setValue(value: string) - позволяет заполнять форму
 - getValue() - возвращает значение из поля ввода
 - clearValue(formElement: HTMLFormElement) - очищает форму

#### Класс FormPayment
Данный класс расширяет класс Form. И предназначен для реализации формы для выбора способа оплаты и адреса доставки.\
Поля класса:
```
order: HTMLElementTemplate;
formOrder: HTMLFormElement;
buttonPaymentOnline: HTMLButtonElement - кнопка для выбора способа оплаты (онлайн)
buttonPaymentCash: HTMLButtonElement - кнопка для выбора способа оплаты (при получении)
inputAddress: HTMLInputElement - инпут для ввода пользователем адреса
orderButton: HTMLButtonElement - кнопка для сабмита данных

```
Конструктор:
```
constructor(template: HTMLElementTemplate, events: IEvents)
```
Методы:
- checkPaymentValidation(data: Record<keyof TFormPayment, string>): boolean - проверяет объект с данными пользователя на валидность

#### Класс FormContact
Данный класс расширяет класс Form. Предназначен для реализации формы для ввода данных пользователя: почты и телефона.\
Поля класса:
```
contacts: HTMLElementTemplate;
formContacts: HTMLFormElement;
inputEmail: HTMLInputElement - инпут для ввода пользователем email
inputPhone: HTMLInputElement - инпут для ввода пользователем телефона 
```
Конструктор:
```
constructor(template: HTMLElementTemplate, events: IEvents)
```
Методы:
- checkContactValidation(data: Record<keyof TFormContact, string>): boolean - проверяет объект с данными пользователя на валидность

### Слой коммуникации

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.
