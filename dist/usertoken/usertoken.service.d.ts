import { UserToken } from './schema/usertoken.schema';
import { Model } from 'mongoose';
export declare class UsertokenService {
    private readonly userTokenModel;
    constructor(userTokenModel: Model<UserToken>);
    hashData(data: string): Promise<string>;
    createUserToken(userId: string, refreshToken: string): Promise<UserToken>;
    updateUserToken(userId: string, refreshToken: string): Promise<boolean>;
    deleteUserToken(userId: string): Promise<boolean>;
    getUserTokenById(userId: string): Promise<any>;
}
