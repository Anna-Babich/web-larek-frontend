import {IApi, IProduct, IUser} from '../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	
	getProducts(): any {
		return this._baseApi.get<IProduct[]>(`/product`).then((product: any) => product);
	}

	postUser(data: IUser): Promise<IUser> {
		return this._baseApi.post<IUser>(`/order`, data, 'POST').then((res: IUser) => res);
	}

}
