"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionModule = void 0;
const common_1 = require("@nestjs/common");
const promotion_service_1 = require("./promotion.service");
const promotion_controller_1 = require("./promotion.controller");
const promotion_schema_1 = require("./schema/promotion.schema");
const mongoose_1 = require("@nestjs/mongoose");
const ability_module_1 = require("../ability/ability.module");
const role_module_1 = require("../role/role.module");
let PromotionModule = class PromotionModule {
};
exports.PromotionModule = PromotionModule;
exports.PromotionModule = PromotionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Promotion', schema: promotion_schema_1.PromotionSchema }]),
            ability_module_1.AbilityModule,
            role_module_1.RoleModule,
        ],
        controllers: [promotion_controller_1.PromotionController],
        providers: [promotion_service_1.PromotionService],
    })
], PromotionModule);
//# sourceMappingURL=promotion.module.js.map