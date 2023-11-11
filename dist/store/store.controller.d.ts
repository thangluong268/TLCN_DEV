import { StoreService } from './store.service';
import { Store } from './schema/store.schema';
import { CreateStoreDto } from './dto/create-store.dto';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { UpdateStoreDto } from './dto/update-store.dto';
export declare class StoreController {
    private readonly storeService;
    private readonly userService;
    private readonly roleService;
    constructor(storeService: StoreService, userService: UserService, roleService: RoleService);
    create(store: CreateStoreDto, userId: string): Promise<Store>;
    getById(id: string): Promise<Store>;
    getMyStore(userId: string): Promise<Store>;
    update(store: UpdateStoreDto, userId: string): Promise<Store>;
    delete(userId: string): Promise<boolean>;
    updateWarningCount(id: string, action: string): Promise<Store>;
}
