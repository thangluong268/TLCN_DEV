import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
export declare class DataSeed {
    private readonly userService;
    private readonly roleService;
    constructor(userService: UserService, roleService: RoleService);
    hashData(data: string): Promise<string>;
    create(): Promise<void>;
}
