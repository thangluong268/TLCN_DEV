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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const swagger_1 = require("@nestjs/swagger");
const abilities_guard_1 = require("../ability/guards/abilities.guard");
const abilities_decorator_1 = require("../ability/decorators/abilities.decorator");
const create_product_dto_1 = require("./dto/create-product.dto");
const store_service_1 = require("../store/store.service");
const evaluation_service_1 = require("../evaluation/evaluation.service");
const role_decorator_1 = require("../ability/decorators/role.decorator");
const role_schema_1 = require("../role/schema/role.schema");
const get_current_userid_decorator_1 = require("../auth/decorators/get-current-userid.decorator");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const update_product_dto_1 = require("./dto/update-product.dto");
let ProductController = class ProductController {
    constructor(productService, storeService, evaluationService) {
        this.productService = productService;
        this.storeService = storeService;
        this.evaluationService = evaluationService;
    }
    async create(product, userId) {
        const store = await this.storeService.getByUserId(userId);
        const newProduct = await this.productService.create(store, product);
        await this.evaluationService.create(newProduct._id);
        return newProduct;
    }
    async sellerCreateMultiple(products, userId) {
        const store = await this.storeService.getByUserId(userId);
        products.forEach(async (product) => {
            const newProduct = await this.productService.create(store, product);
            await this.evaluationService.create(newProduct._id);
        });
    }
    async getAllBySearch(page, limit, search, userId) {
        const store = await this.storeService.getByUserId(userId);
        const products = await this.productService.getAllBySearch(store._id, page, limit, search);
        return products;
    }
    async getAllBySearchPublic(page, limit, search) {
        const products = await this.productService.getAllBySearch(null, page, limit, search);
        return products;
    }
    async update(id, product) {
        const newProduct = await this.productService.update(id, product);
        return newProduct;
    }
    async getlistProductLasted(limit) {
        const products = await this.productService.getlistProductLasted(limit);
        return products;
    }
    async mostProductsInStore(limit) {
        const products = await this.productService.mostProductsInStore(limit);
        return products;
    }
    async getById(id) {
        const product = await this.productService.getById(id);
        return product;
    }
    async deleteProduct(id) {
        const store = await this.productService.deleteProduct(id);
        return store;
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.CreateProductAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.SELLER),
    (0, common_1.Post)('seller'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.CreateProductAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.SELLER),
    (0, common_1.Post)('sellerCreateMultiple'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "sellerCreateMultiple", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.ReadProductAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.SELLER),
    (0, common_1.Get)('seller'),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', type: String, required: false }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllBySearch", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', type: String, required: false }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllBySearchPublic", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateProductAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.SELLER),
    (0, common_1.Put)('seller/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/listProductLasted'),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getlistProductLasted", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/mostProductsInStore'),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "mostProductsInStore", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getById", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.DeleteProductAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.MANAGER),
    (0, common_1.Put)('manager/deleteProduct/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    (0, swagger_1.ApiTags)('Product'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        store_service_1.StoreService,
        evaluation_service_1.EvaluationService])
], ProductController);
//# sourceMappingURL=product.controller.js.map