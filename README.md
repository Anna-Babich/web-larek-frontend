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

Данные товара: 
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

Данные пользователя:
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
    _basket: TBasket[];
    
    setProducts(data: IProduct[]): void;
    getProduct(productId: string): IProduct;
    getResult(arrayBasket: TBasket[]): number;
    addProductBasket(product: IProduct): void;
    deleteProductBasket(productId: string): void;
    itemInBasket (idProduct: string): boolean;
}
```
Интерфейс модели данных пользователя
```
interface IUserData {
    _order: IUser;
    errorForm: TFormErrors;
    
    setPayment(data: string): void;
    setField(field: keyof TForm, value: string): void;
    clearForm(): void;
}
```

Данные товара, используемые в модальном окне корзины:
```
type TBasket = Pick<IProduct, 'title' | 'price'>;
```

Тип данных форм:
```
type TForm = Pick<IUser, 'address' | 'email' | 'phone'>;
```
Тип данных ошибок:
```
type TFormErrors = Partial<Record<keyof TForm, string>>;
```
Методы запросов API:
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
- _basket: TBasket[] - массив товаров в корзине

Конструктор класса принимает инстант брокера событий:
```
constructor(events: IEvents)
```

Так же класс предоставляет набор методов для взаимодействия с этими данными.

- setProducts(data: IProduct[]): void - для записи и хранения массива данных товара
- getProduct(productId: string): IProduct - возвращает товар по id
- getResult(arrayBasket: TBasket[]): number - суммирует цены товаров в корзине
- addProductBasket(product: IProduct): void - добавляет товар в массив корзины
- deleteProductBasket(productId: string): void - удаляет товар из массива корзины
- itemInBasket (idProduct: string): boolean - проверяет на наличие элемента в массиве
- а так же геттеры и сеттеры для получения данных из полей класса

#### Класс UserData
Класс отвечает за хранение и логику работы с данными пользователя для оформления заказа.\
В полях класса хранятся следующие данные:
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных
- _order: IUser; - заказ пользователя
- formError: TFormErrors - ошибки

Конструктор класса принимает инстант брокера событий:
```
constructor(events: IEvents)
```

Так же класс предоставляет набор методов для взаимодействия с этими данными:
- setPayment(data: string): void - установка способа оплаты
- setField(field: keyof TForm, value: string): void - сбор значений из инпутов
- validate () - protected, валидация и записывание ошибок  
- clearForm(): void - очистка всех данных пользователя
- а так же сеттеры и геттеры для получения данных из полей класса

### Слой представления
В данном разделе представлены классы для слоя представления. Классы представления отвечают за отображение данных внутри DOM-элементов.

#### Базовый Класс Component
Класс является дженериком и родителем всех компонентов слоя представления. В дженерик принимает тип объекта, в котором данные будут передаваться в метод render для отображения данных в компоненте.\
В конструктор принимает элемент разметки, являющийся основным родительским контейнером компонента. 
```
constructor (protected readonly container: HTMLElement)
```
Содержит метод render, отвечающий за сохранение полученных в параметре данных в полях компонентов через их сеттеры, возвращает обновленный контейнер компонента.
- setImage(element: HTMLImageElement, src: string, alt?: string) - метод для установки изображения
- setText(element: HTMLElement, value: unknown) - метод для устанвоки текстового содержимого
- setDisabled(element: HTMLElement, state: boolean) - метод для смены активности кнопки

#### Класс CardsContainer
Отвечает за отображение блока с карточками на главной странице.\
Поля:
- _counter: HTMLElement - счетчик
- _wrapper: HTMLElement - обертка
- _basket: HTMLElement - корзина

В конструктор принимает контейнер, в котором размещаются карточки. 
```
constructor (protected container: HTMLElement, events: IEvents)
```
Методы:
- set catalog (items: HTMLElement[]) - для устанвоки содержимого
- setLocked(value: boolean) - для блокирвоки прокрутки страницы

#### Класс Modal
Класс для формирования модального окна и выведение какой-либо разметки внутри. Также класс предоставляет действия для работы с модальным окном: открытие окна, закрытие по кнопке и оверлей.\

Поля класса:
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных
- _content: HTMLElement - контейнер для вставки разметки
- closeButton: HTMLButtonElement - кнопка-крестик закрытия окна

Конструктор принимает элемент, по которому в разметке страницы будет идентифицировано модальное окно и экземпляр класса EventEmitter для возможности инициации событий:
```
constructor (container: HTMLElement, events: IEvents)
```
Методы:
- set content() - для установки контента
- open() - открытие модального окна
- close() - закрытие модального окна
- handleEscUp (evt: KeyboardEvent) - закрытие окна черех esc
- render() - выводит DOM-элемент в модальном окне

#### Класс Card 
Отвечает за отображение карточки товара на главной странице, задавая в карточке данные названия, категории, изображения и цены.\
Также отображение карточки товара в превью. И отображение карточки товара в корзине.\
Поля класса содержат элементы разметки элементов карточки:
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных
- titleCard: HTMLElement - название товара
- descriptionCard: HTMLElement - описание товара
- categoryCard: HTMLElement - категория товара
- imageCard: HTMLImageElement - изображение товара
- priceCard: HTMLElement - цена товара
- basketIndex: HTMLElement - индекс товара в корзине
- cardButton: HTMLButtonElement - кнопка "В корзину"
- btnDeleteInBasket: HTMLButtonElement - кнопка удаления товара из корзины

В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.
Конструктор:
```
constructor(protected container: HTMLElement, events: IEvents)
```
Методы:
- render (cardData: Partial<IProduct> | undefined) - метод отвечает за выведение разметки карточки товара на главную страницу сайта.
- toggleButton(state: boolean) - смена активности кнопки
- а также геттеры и сеттеры

#### Класс Basket
Класс корзины. Отвечает за выведение разметки корзины.\
Имеет поля:
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных
- basket: HTMLElement - корзина 
- basketList: HTMLUListElement; - список товаров в корзине
- basketButton: HTMLButtonElement; - кнопка для оформления заказа
- basketPrice: HTMLElement; - общая стоимость покупки

В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.
Конструктор:
```
constructor(protected container: HTMLElement, events: IEvents)
```
Методы:
- get price () - получение стоимости
- buttonToggle (state: boolean) - блокировка кнопки

#### Класс Form
При сабмите инициирует событие передавая в него объект с данными из полей ввода формы. При изменении данных в полях ввода инициирует событие изменения данных. Предоставляет методы для отображения ошибок и управления активностью кнопки сохранения

Поля класса содержат элементы разметки форм:
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных
- inputs: NodeListOf<HTMLInputElement> - все инпуты
- formName: string - 'имена' инпутов
- errors: HTMLElement - для выведения ошибок

В конструктор класса передается DOM элемент темплейта.\
```
constructor(protected container: HTMLElement, events: IEvents)
```

Методы:
- set _errors(value: string) - установка ошибок
- protected getInputValues() - формирование объектов 'имя инпута':'значение'
- clearForm() - очистка форм

#### Класс FormPayment
Данный класс расширяет класс Form.\
И предназначен для реализации формы для выбора способа оплаты и адреса доставки.\
Поля класса:
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных
- paymentBtn: NodeListOf<HTMLButtonElement> - кнопки способа оплаты
- orderButton: HTMLButtonElement - кнопка submit формы

Конструктор:
```
constructor(protected container: HTMLElement, events: IEvents)
```
Методы:
- set valid(value: boolean) - активность кнопки подтверждения
- togglePaymant(data: string) - смена отображения при выбранной кнопке
- buttonClear () - очистка кнопок

#### Класс FormContact
Данный класс расширяет класс Form.\
Предназначен для реализации формы для ввода данных пользователя: почты и телефона.\
Поля класса:
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных
- contactsButton: HTMLButtonElement - кнопка оплаты заказа

Конструктор:
```
constructor(protected container: HTMLElement, events: IEvents)
```
Методы:
- set valid(value: boolean) - активность кнопки подтверждения

#### Класс SuccessOrder
Данный класс формирует разметку сообщения об успешном создании заказа.
Поля:
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных
- successClose: HTMLButtonElement - кнопка для закртия окна
- successDescription: HTMLElement - общая стоимость списанных синапсов

Конструктор:
```
constructor(protected container: HTMLElement, events: IEvents)
```
### Слой коммуникации

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

*Список всех событий, которые могут генерироваться в системе:*\
*События изменения данных (генерируются классами моделями данных)*
- `initialData:loaded` - массив товаров прибыл
- `data:changed` - изменение массива товаров
- `basket:changed` - изменен массив корзины
- `product:selected` - изменение в превью
- `forms:errors` - изменение ошибок при вводе в инпут

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `card:select` - открытие модального окна с товаром
- `basket:open` - открытие моджального окна с корзиной
- `product:buy` - генерируется при нажатии у товара кнопки "В Корзину"
- `basket:delete` - генерируется при нажатии кнопки удаления в моодальном окне корзины
- `open:order` - открытие модального окна с формой оплаты
- `contacts:open` - открытие модального окна с формой контактов
- `order:input` - при вводе в инпут address
- `contacts:input` - при вводе в инпут email и phone
- `order:button` - генерируется при нажатии на кнопки выбора способа оплаты
- `order:submit` - при нажатии кнопки 'Далее' в первой форме
- `contacts:submit` - при нажатии кнопки 'Оплатить' в первой форме
- `order:post` - генерируется по кнопке 'Оплатить' => запрос на сервер
- `success:open` - открытие модального окна при удачной покупке
- `success:close` - генерируется при нажатии кнопки в модальном окне удачной покупки
- `modal:open` - состояние открытого модального окна
- `modal:close` -  состояние закрытого модального окна

  


