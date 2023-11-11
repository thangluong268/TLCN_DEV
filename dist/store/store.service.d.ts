import { Store } from './schema/store.schema';
import { Model } from 'mongoose';
import { CreateStoreDto } from './dto/create-store.dto';
import { User } from 'src/user/schema/user.schema';
export declare class StoreService {
    private readonly storeModel;
    constructor(storeModel: Model<Store>);
    create(user: User, store: CreateStoreDto): Promise<Store>;
    getById(id: string): Promise<Store>;
    getByUserId(userId: string): Promise<Store>;
    update(userId: string, store: any): Promise<Store>;
    updateWarningCount(storeId: string, action: string): Promise<Store>;
    delete(userId: string): Promise<boolean>;
}
