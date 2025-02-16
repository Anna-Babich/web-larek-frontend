import {IApi, IProduct, IUser} from '../types';
import {Api, ApiListResponse} from './base/api';

export class AppApi extends Api implements IApi{
	readonly cdn: string;

	constructor(cdn: string, baseApi: string, options: RequestInit = {}) {
		super(baseApi, options);
		this.cdn = cdn;
	}

	getProducts(): Promise<IProduct[]> {
		return this.get(`/product`).then((items: ApiListResponse<IProduct>) => 
			items.items.map((item) => ({
				...item,
				image: this.cdn + item.image
			}))
		);
	}

	postUser(data: IUser): Promise<IUser> {
		return this.post(`/order`, data, 'POST').then((res: IUser) => res);
	}
}
// getLotList(): Promise<ILot[]> {
    //     return this.get('/lot').then((data: ApiListResponse<ILot>) =>
    //         data.items.map((item) => ({
    //             ...item,
    //             image: this.cdn + item.image
    //         }))
    //     );
    // }