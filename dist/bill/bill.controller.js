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
exports.BillController = void 0;
const common_1 = require("@nestjs/common");
const bill_service_1 = require("./bill.service");
const create_bill_dto_1 = require("./dto/create-bill.dto");
const swagger_1 = require("@nestjs/swagger");
const abilities_guard_1 = require("../ability/guards/abilities.guard");
const abilities_decorator_1 = require("../ability/decorators/abilities.decorator");
const payment_service_1 = require("./payment/payment.service");
const payment_gateway_1 = require("./payment/payment.gateway");
const user_service_1 = require("../user/user.service");
const product_service_1 = require("../product/product.service");
const get_current_userid_decorator_1 = require("../auth/decorators/get-current-userid.decorator");
const role_decorator_1 = require("../ability/decorators/role.decorator");
const role_schema_1 = require("../role/schema/role.schema");
const store_service_1 = require("../store/store.service");
let BillController = class BillController {
    constructor(billService, paymentService, userService, productService, storeService) {
        this.billService = billService;
        this.paymentService = paymentService;
        this.userService = userService;
        this.productService = productService;
        this.storeService = storeService;
        this.paymentService.registerPaymentGateway(payment_gateway_1.PAYMENT_METHOD.VNPAY, new payment_gateway_1.VNPayGateway());
        this.paymentService.registerPaymentGateway(payment_gateway_1.PAYMENT_METHOD.MOMO, new payment_gateway_1.MoMoGateway());
        this.paymentService.registerPaymentGateway(payment_gateway_1.PAYMENT_METHOD.GIVE, new payment_gateway_1.GiveGateway());
    }
    async create(bill, userId) {
        const user = await this.userService.getById(userId);
        const products = [];
        bill.listProductId.map(async (productId) => {
            const product = await this.productService.getById(productId);
            products.push(product);
        });
        const newBill = await this.billService.create(user, products, bill);
        await this.userService.updateWallet(userId, newBill.totalPrice, "plus");
        const result = await this.paymentService.processPayment(bill, bill.paymentMethod);
        console.log(result);
        return newBill;
    }
    async getAllByStatusUser(page, limit, search, status, userId) {
        const data = await this.billService.getAllByStatus({ userId: userId }, page, limit, search, status);
        return data;
    }
    async getAllByStatusSeller(page, limit, search, status, userId) {
        const store = await this.storeService.getByUserId(userId);
        const data = await this.billService.getAllByStatus({ storeId: store._id }, page, limit, search, status);
        return data;
    }
    async getDetailById(id) {
        const bill = await this.billService.getDetailById(id);
        return bill;
    }
    async cancelBill(id, userId) {
        const bill = await this.billService.getDetailById(id);
        const result = await this.billService.update(id, "Đã hủy");
        await this.userService.updateWallet(userId, bill.totalPrice, "sub");
        return result;
    }
    async updateStatus(id, status, userId) {
        const bill = await this.billService.getDetailById(id);
        const result = await this.billService.update(id, status);
        if (status === "Đã hủy")
            await this.userService.updateWallet(userId, bill.totalPrice, "sub");
        if (status === "Đã hoàn đơn") {
            await this.userService.updateWallet(userId, bill.totalPrice, "sub");
            await this.userService.updateWallet(userId, bill.totalPrice * 5, "plus");
        }
        return result;
    }
    async getStatistic(startTime, endTime, type, userId) {
        const store = await this.storeService.getByUserId(userId);
        const data = await this.billService.getStatistic(store._id, startTime, endTime, type);
        return data;
    }
};
exports.BillController = BillController;
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.CreateBillAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER),
    (0, common_1.Post)('user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bill_dto_1.CreateBillDto, String]),
    __metadata("design:returntype", Promise)
], BillController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.ReadBillAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER),
    (0, common_1.Get)('user'),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', type: String, required: true }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], BillController.prototype, "getAllByStatusUser", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.ReadBillAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.SELLER),
    (0, common_1.Get)('seller'),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', type: String, required: true }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], BillController.prototype, "getAllByStatusSeller", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.ReadBillAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER),
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillController.prototype, "getDetailById", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateBillAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.USER),
    (0, common_1.Put)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BillController.prototype, "cancelBill", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.UpdateBillAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.SELLER),
    (0, common_1.Put)('seller/:id'),
    (0, swagger_1.ApiQuery)({ name: 'status', type: String, required: true }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BillController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.ReadBillAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.SELLER),
    (0, common_1.Get)('seller/statistic'),
    (0, swagger_1.ApiQuery)({ name: 'startTime', type: String, required: true }),
    (0, swagger_1.ApiQuery)({ name: 'endTime', type: String, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'type', type: String, required: true }),
    __param(0, (0, common_1.Query)('startTime')),
    __param(1, (0, common_1.Query)('endTime')),
    __param(2, (0, common_1.Query)('type')),
    __param(3, (0, get_current_userid_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], BillController.prototype, "getStatistic", null);
exports.BillController = BillController = __decorate([
    (0, common_1.Controller)('bill'),
    (0, swagger_1.ApiTags)('Bill'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    __metadata("design:paramtypes", [bill_service_1.BillService,
        payment_service_1.PaymentService,
        user_service_1.UserService,
        product_service_1.ProductService,
        store_service_1.StoreService])
], BillController);
//# sourceMappingURL=bill.controller.js.map