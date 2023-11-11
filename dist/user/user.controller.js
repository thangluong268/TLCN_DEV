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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const abilities_decorator_1 = require("../ability/decorators/abilities.decorator");
const abilities_guard_1 = require("../ability/guards/abilities.guard");
const role_service_1 = require("../role/role.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const add_friend_store_dto_1 = require("./dto/add-friend-store.dto");
const role_decorator_1 = require("../ability/decorators/role.decorator");
const role_schema_1 = require("../role/schema/role.schema");
let UserController = class UserController {
    constructor(userService, roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    async findOne(id) {
        const user = await this.userService.getById(id);
        return user;
    }
    async update(id, UpdateUserDto) {
        const user = await this.userService.update(id, UpdateUserDto);
        return user;
    }
    async delete(id) {
        const user = await this.userService.delete(id);
        return user;
    }
    async addFriend(id, req) {
        const me = await this.userService.addFriend(id, req.id);
        const myfriend = await this.userService.addFriend(req.id, id);
        return me;
    }
    async unFriend(id, req) {
        const me = await this.userService.unFriend(id, req.id);
        const myfriend = await this.userService.unFriend(req.id, id);
        return me;
    }
    async addStore(id, req) {
        const user = await this.userService.followStore(id, req.id);
        return user;
    }
    async unFollowStore(id, req) {
        const user = await this.userService.unFollowStore(id, req.id);
        return user;
    }
    async updateWarningCount(id, action) {
        const user = await this.userService.updateWarningCount(id, action);
        return user;
    }
    async getAll(page, limit, search) {
        const data = await this.userService.getAll(page, limit, search);
        return data;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.ReadUserAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER, role_schema_1.RoleName.ADMIN),
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateUserAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER, role_schema_1.RoleName.ADMIN),
    (0, common_1.Put)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.DeleteUserAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER, role_schema_1.RoleName.ADMIN),
    (0, common_1.Delete)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateUserAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER),
    (0, common_1.Post)('user/addFriend/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_friend_store_dto_1.AddIdDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addFriend", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateUserAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER),
    (0, common_1.Post)('user/unFriend/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_friend_store_dto_1.AddIdDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unFriend", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateUserAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER),
    (0, common_1.Post)('user/followStore/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_friend_store_dto_1.AddIdDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addStore", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateUserAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER),
    (0, common_1.Post)('user/unFollowStore/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_friend_store_dto_1.AddIdDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unFollowStore", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateUserAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.MANAGER),
    (0, common_1.Put)('manager/warningcount/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)("action")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateWarningCount", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.ReadUserAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.ADMIN),
    (0, common_1.Get)('admin'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        role_service_1.RoleService])
], UserController);
//# sourceMappingURL=user.controller.js.map