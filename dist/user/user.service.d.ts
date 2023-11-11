import { SignUpDto } from 'src/auth/dto/signup.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserWithoutPassDto } from './dto/user-without-pass.dto';
import FreedomCustom from 'src/exceptions/FreedomCustom.exception';
export declare class UserService {
    private readonly userModel;
    private readonly freedomCustom;
    constructor(userModel: Model<User>, freedomCustom: FreedomCustom);
    create(signUpDto: SignUpDto): Promise<UserWithoutPassDto>;
    getByEmail(email: string): Promise<User>;
    getById(userId: string): Promise<User>;
    update(userId: string, req: any): Promise<User>;
    delete(userId: string): Promise<User>;
    addFriend(userId: string, friendId: string): Promise<User>;
    unFriend(userId: string, friendId: string): Promise<User>;
    followStore(userId: string, storeId: string): Promise<User>;
    unFollowStore(userId: string, storeId: string): Promise<User>;
    updateWallet(userId: string, money: number, type: string): Promise<boolean>;
    updateWarningCount(userId: string, action: string): Promise<User>;
    getAll(page: number, limit: number, search: string): Promise<{
        total: number;
        users: User[];
    }>;
    updatePassword(email: string, password: string): Promise<User>;
}
