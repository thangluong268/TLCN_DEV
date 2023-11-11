import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { RoleService } from 'src/role/role.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddIdDto } from './dto/add-friend-store.dto';
export declare class UserController {
    private readonly userService;
    private readonly roleService;
    constructor(userService: UserService, roleService: RoleService);
    findOne(id: string): Promise<User>;
    update(id: string, UpdateUserDto: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<User>;
    addFriend(id: string, req: AddIdDto): Promise<User>;
    unFriend(id: string, req: AddIdDto): Promise<User>;
    addStore(id: string, req: AddIdDto): Promise<User>;
    unFollowStore(id: string, req: AddIdDto): Promise<User>;
    updateWarningCount(id: string, action: string): Promise<User>;
    getAll(page: number, limit: number, search: string): Promise<{
        total: number;
        users: User[];
    }>;
}
