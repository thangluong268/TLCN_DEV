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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasPermitRoleMiddleware = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const NotFoundExceptionCustom_exception_1 = require("../../exceptions/NotFoundExceptionCustom.exception");
const user_schema_1 = require("../schema/user.schema");
const role_schema_1 = require("../../role/schema/role.schema");
const role_service_1 = require("../../role/role.service");
const InternalServerErrorExceptionCustom_exception_1 = require("../../exceptions/InternalServerErrorExceptionCustom.exception");
let HasPermitRoleMiddleware = class HasPermitRoleMiddleware {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async use(req, res, next) {
        if (req.params.id) {
            try {
                const id = req.params.id;
                const roles = await this.roleService.getRoleNameByUserId(id);
                if (!roles) {
                    throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(role_schema_1.Role.name);
                }
                if (roles.includes(role_schema_1.RoleName.ADMIN) || roles.includes(role_schema_1.RoleName.MANAGER)) {
                    throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(user_schema_1.User.name);
                }
            }
            catch (err) {
                if (err instanceof mongoose_1.MongooseError)
                    throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
                throw err;
            }
        }
        console.log("Pass HasPermitRoleMiddleware");
        next();
    }
};
exports.HasPermitRoleMiddleware = HasPermitRoleMiddleware;
exports.HasPermitRoleMiddleware = HasPermitRoleMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], HasPermitRoleMiddleware);
//# sourceMappingURL=HasPermitRole.middleware.js.map