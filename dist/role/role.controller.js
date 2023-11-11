"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const swagger_1 = require("@nestjs/swagger");
const role_schema_1 = require("./schema/role.schema");
const abilities_decorator_1 = require("../ability/decorators/abilities.decorator");
const abilities_guard_1 = require("../ability/guards/abilities.guard");
const role_decorator_1 = require("../ability/decorators/role.decorator");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async addUserToRole(userId, roleName) {
        const result = await this.roleService.addUserToRole(userId, roleName);
        return result;
    }
    async removeUserRole(userId, roleName) {
        const result = await this.roleService.removeUserRole(userId, roleName);
        return result;
    }
    async getRoleNameByUserId(userId) {
        const role = await this.roleService.getRoleNameByUserId(userId);
        return role;
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateRoleAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.ADMIN),
    (0, common_1.Post)('addUserToRole'),
    (0, swagger_1.ApiQuery)({ name: 'userId', type: String, required: true }),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "addUserToRole", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateRoleAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.ADMIN),
    (0, common_1.Delete)('removeUserRole'),
    (0, swagger_1.ApiQuery)({ name: 'userId', type: String, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'roleName', type: String, required: true }),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('roleName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "removeUserRole", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.ReadRoleAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.ADMIN, role_schema_1.RoleName.MANAGER),
    (0, common_1.Get)('getRoleNameByUserId'),
    (0, swagger_1.ApiQuery)({ name: 'userId', type: String, required: true }),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoleNameByUserId", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.Controller)('role/admin'),
    (0, swagger_1.ApiTags)('Role'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
//# sourceMappingURL=role.controller.js.map