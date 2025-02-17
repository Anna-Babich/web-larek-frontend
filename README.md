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

Данные товара 
```
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}
```

Данные пользователя
```
interface IUser {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}
```

Интерфейс модели данных товара
```
interface IProductsData {
    _products: IProduct[];
    _preview: string | null;
    
    getResult(arrayBasket: TBasket[]): number;
    setProducts(data: IProduct[]): void;
    getProduct(productId: string): IProduct;
    getResult(arrayBasket: TBasket[]): number;
    addProductBasket(product: IProduct): void;
    deleteProductBasket(productId: string): void;
    setPreview(cardId: string | null): void;
    blockButton (idProduct: string): boolean;
}
```
Интерфейс модели данных пользователя
```
interface IUserData {
    _order: IUser;

    setUserData (): IUser;
    validateOrder(): void;
    set payment (data: string);
    set address (data: string);
    set email (data: string);
    set phone (data: string);
    set total (data: number);
    set items (data: string[]);
}
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
Данные пользователя для всех форм:
```
type TForm = Pick<IUser, 'address' | 'email' | 'phone'>;
```
Ошибки в инпутах:
```
type TFormErrors = Partial<Record<keyof TForm, string>>;
```
Типы методов API:
```
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
```
Интерфейс API:
```
interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
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
В полях класса хранятся следующие данные:
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных
- _products: IProduct[] - массив объектов карточек, свойство protected
- _preview: string | null - id карточки, выбранной для просмотра в модальной окне
-  _basket: TBasket[] - массив товаров в корзине

Конструктор класса принимает инстант брокера событий:
```
constructor(events: IEvents)
```
Так же класс предоставляет набор методов для взаимодействия с этими данными.
- getProduct(productId: string): IProduct - получение полной информации по товару через id
- setProducts(data: IProduct[]) - записывает данные товаров в массив
- getResult(arrayBasket: TBasket[]): number - суммирует цены в корзине
- addProductBasket(product: IProduct): void - добавляет товар в массив корзины
- deleteProductBasket(productId: string): void - удаляет товар из массива корзины
- setPreview(cardId: string | null) - устанавливает поле _preview
- blockButton (idProduct: string): boolean - проверка на включенность товара в корзине
- а так же геттеры и сеттеры

#### Класс UserData
Класс отвечает за хранение и логику работы с данными пользователя для оформления заказа.\
В полях класса хранятся следующие данные:
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных
- _order: IUser - данные заказа
- formError: TFormErrors - для работы с ошибками

Конструктор класса принимает инстант брокера событий:
```
constructor(events: IEvents)
```
Так же класс предоставляет набор методов для взаимодействия с этими данными.
 - setUserData (): IUser - для сбора всех полей к приведенному интерфейсу
 - validateOrder() - валидация формы
 - а так же сеттеры и геттеры для получения данных из полей класса

### Слой представления
В данном разделе представлены классы для слоя представления. Классы представления отвечают за отображение данных внутри DOM-элементов.

#### Класс Component
Класс является дженериком и родителем всех компонентов слоя представления. В дженерик принимает тип объекта, в котором данные будут передаваться в метод render для отображения данных в компоненте.\
В конструктор принимает элемент разметки, являющийся основным родительским контейнером компонента.
```
constructor (protected readonly container: HTMLElement)
```
Содержит метод render, отвечающий за сохранение полученных в параметре данных в полях компонентов через их сеттеры, возвращает обновленный контейнер компонента.
 - setImage(element: HTMLImageElement, src: string, alt?: string) - метод для установки изображения
 - setText(element: HTMLElement, value: unknown) - метод для установки текстового содержимого
 - setDisabled(element: HTMLElement, state: boolean) - метод для установки смены активности кнопки

#### Класс CardsContainer
Отвечает за отображение блока с карточками на главной странице. 
Поля:
```
_counter: HTMLElement - счетчик на главной странице
_wrapper: HTMLElement - для установки блокировки прокрутки
_basket: HTMLElement - иконка корзины
```
В конструктор принимает контейнер, в котором размещаются карточки.
```
constructor (protected container: HTMLElement, events: IEvents)
```


#### Класс Modal
Класс для формирования модального окна и выведение какой-либо разметки внутри. Также класс предоставляет действия для работы с модальным окном: открытие окна, закрытие по кнопке и оверлей.\

Поля класса:
```
modal: HTMLELement - модальное окно
button: HTMLButtonElement - кнопка-крестик
events: IEvents - брокер событий

```
Конструктор принимает селектор, по которому в разметке страницы будет идентифицировано модальное окно и экземпляр класса EventEmitter для возможности инициации событий:

```
constructor(selector: string, events: IEvents)
```
Методы:

 - open() - открытие модального окна
 - close() - закрытие модального окна
 - render() - выводит DOM-элемент в модальном окне

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

Класс корзины. Отвечает за выведение разметки корзины.\

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

В конструктор класса передается DOM элемент темплейта.
Также конструктор принимает экземпляр EventEmitter для инициации событий.

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


#### Класс SuccessOrder
Данный класс формирует разметку сообщения об успешном создании заказа.\
Поля:
```
success: HTMLElementTemplate; - темплейт разметки сообщения об успешном завершении создания заказа
orderSuccess: HTMLElement;
orderSuccessTitle: HTMLElement;
orderSuccessDescription: HTMLElement; - общая стоимость списанных синапсов
orderSuccessButton: HTMLButtonElement; - кнопка для закртия окна
```
Конструктор:
```
constructor(template: HTMLElementTemplate, events: IEvents)
```


#### Класс SuccessOrder
Данный класс формирует разметку сообщения об успешном создании заказа.
Поля:
```
success: HTMLElementTemplate; - темплейт разметки сообщения об успешном завершении создания заказа
orderSuccess: HTMLElement;
orderSuccessTitle: HTMLElement;
orderSuccessDescription: HTMLElement; - общая стоимость списанных синапсов
orderSuccessButton: HTMLButtonElement; - кнопка для закртия окна
```
Конструктор:
```
constructor(template: HTMLElementTemplate, events: IEvents)
```
### Слой коммуникации

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.



!!! Пример из места, заменить!!!
*Список всех событий, которые могут генерироваться в системе:*\
*События изменения данных (генерируются классами моделями данных)*
- `user:changed` - изменение данных пользователя
- `cards:changed` - изменение массива карточек
- `card:selected` - изменение открываемой в модальном окне картинки карточки
- `card:previewClear` - необходима очистка данных выбранной для показа в модальном окне карточки

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `userEdit:open` - открытие модального окна с формой редактирования данных пользователя
- `newCard:open` - открытие модального окна создания новой карточки
- `avatar:open` - открытие модального окна с формой редактирования аватара пользователя
- `card:select` - выбор карточки для отображения в модальном окне
- `card:delete` - выбор карточки для удаления
- `card:like` - изменение состояния лайка на карточке
- `edit-profile:input` - изменение данных в форме с данными пользователя
- `edit-avatar:input` - изменение данных в форме с аватаром пользователя
- `new-place:input` - изменение данных в форме создания новой карточки
- `edit-profile:submit` - сохранение данных пользователя в модальном окне
- `edit-avatar:submit` - сохранение аватара пользователя в модальном окне
- `new-place:submit` - событие, генерируемое при создании новой карточки в форме
- `remove-card:submit` - событие, генерируемое при нажатии "Да" в форме подтверждения
- `edit-profile:validation` - событие, сообщающее о необходимости валидации формы профиля
- `edit-avatar:validation` - событие, сообщающее о необходимости валидации формы аватара пользователя
- `new-place:validation` - событие, сообщающее о необходимости валидации формы создания новой карточки

