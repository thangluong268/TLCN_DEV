import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    addUserToRole(userId: string, roleName: CreateRoleDto): Promise<boolean>;
    removeUserRole(userId: string, roleName: string): Promise<boolean>;
    getRoleNameByUserId(userId: string): Promise<string>;
}
