import { Role } from './schema/role.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RoleService {
    private readonly roleModel;
    constructor(roleModel: Model<Role>);
    create(role: CreateRoleDto): Promise<Role>;
    addUserToRole(userId: string, roleName: CreateRoleDto): Promise<boolean>;
    getByName(roleName: string): Promise<Role>;
    addUserIntoListUser(roleId: string, userId: string): Promise<boolean>;
    removeUserRole(userId: string, name: string): Promise<boolean>;
    getRoleNameByUserId(userId: string): Promise<string>;
    getByUserId(userId: string): Promise<any>;
}
