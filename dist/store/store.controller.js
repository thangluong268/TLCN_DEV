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
exports.StoreController = void 0;
const common_1 = require("@nestjs/common");
const store_service_1 = require("./store.service");
const swagger_1 = require("@nestjs/swagger");
const abilities_guard_1 = require("../ability/guards/abilities.guard");
const abilities_decorator_1 = require("../ability/decorators/abilities.decorator");
const create_store_dto_1 = require("./dto/create-store.dto");
const user_service_1 = require("../user/user.service");
const role_service_1 = require("../role/role.service");
const role_schema_1 = require("../role/schema/role.schema");
const role_decorator_1 = require("../ability/decorators/role.decorator");
const get_current_userid_decorator_1 = require("../auth/decorators/get-current-userid.decorator");
const update_store_dto_1 = require("./dto/update-store.dto");
let StoreController = class StoreController {
    constructor(storeService, userService, roleService) {
        this.storeService = storeService;
        this.userService = userService;
        this.roleService = roleService;
    }
    async create(store, userId) {
        const user = await this.userService.getById(userId);
        const newStore = await this.storeService.create(user, store);
        await this.roleService.addUserToRole(userId, { name: role_schema_1.RoleName.SELLER });
        return newStore;
    }
    async getById(id) {
        const store = await this.storeService.getById(id);
        return store;
    }
    async getMyStore(userId) {
        const store = await this.storeService.getByUserId(userId);
        return store;
    }
    async update(store, userId) {
        const newStore = await this.storeService.update(userId, store);
        return newStore;
    }
    async delete(userId) {
        await this.storeService.delete(userId);
        const isDeleted = await this.roleService.removeUserRole(userId, role_schema_1.RoleName.SELLER);
        return isDeleted;
    }
    async updateWarningCount(id, action) {
        const store = await this.storeService.updateWarningCount(id, action);
        return store;
    }
};
exports.StoreController = StoreController;
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.CreateStoreAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER),
    (0, common_1.Post)('user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_store_dto_1.CreateStoreDto, String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.ReadStoreAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER),
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getById", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.ReadStoreAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.SELLER),
    (0, common_1.Get)('seller'),
    __param(0, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getMyStore", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateStoreAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.SELLER),
    (0, common_1.Put)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_store_dto_1.UpdateStoreDto, String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.DeleteStoreAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.SELLER),
    (0, common_1.Delete)('seller'),
    __param(0, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateStoreAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.MANAGER),
    (0, common_1.Put)('manager/warningcount/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)("action")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "updateWarningCount", null);
exports.StoreController = StoreController = __decorate([
    (0, common_1.Controller)('store'),
    (0, swagger_1.ApiTags)('Store'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    __metadata("design:paramtypes", [store_service_1.StoreService,
        user_service_1.UserService,
        role_service_1.RoleService])
], StoreController);
//# sourceMappingURL=store.controller.js.map