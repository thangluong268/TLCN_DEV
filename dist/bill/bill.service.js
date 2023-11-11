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
exports.BillService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bill_schema_1 = require("./schema/bill.schema");
const mongoose_2 = require("mongoose");
const InternalServerErrorExceptionCustom_exception_1 = require("../exceptions/InternalServerErrorExceptionCustom.exception");
const product_bill_dto_1 = require("./dto/product-bill.dto");
const NotFoundExceptionCustom_exception_1 = require("../exceptions/NotFoundExceptionCustom.exception");
let BillService = class BillService {
    constructor(billModel) {
        this.billModel = billModel;
    }
    getTotalPrice(listProducts, promotionValue) {
        const productPrice = listProducts.reduce((total, product) => {
            const productTotal = product.quantity * product.price;
            return total + productTotal;
        }, 0);
        const totalPrice = productPrice - promotionValue;
        return totalPrice;
    }
    async create(user, products, bill) {
        try {
            const newBill = await this.billModel.create(bill);
            newBill.userId = user._id;
            newBill.fullName = user.fullName;
            newBill.email = user.email;
            newBill.phone = user.phone;
            newBill.address = bill.address;
            newBill.storeId = products[0].storeId;
            newBill.storeName = products[0].storeName;
            newBill.listProducts = products.map(product => {
                const productBill = new product_bill_dto_1.ProductBillDto();
                productBill.avatar = product.avatar;
                productBill.productId = product._id;
                productBill.productName = product.productName;
                productBill.quantity = product.quantity;
                productBill.price = product.price;
                productBill.type = product.type;
                return productBill;
            });
            newBill.totalPrice = this.getTotalPrice(newBill.listProducts, bill.promotionValue);
            await newBill.save();
            return newBill;
        }
        catch (err) {
            if (err instanceof mongoose_2.Error)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getAllByStatus(idCondition, pageQuery, limitQuery, searchQuery, statusQuery) {
        const limit = Number(limitQuery) || Number(process.env.LIMIT_DEFAULT);
        const page = Number(pageQuery) || Number(process.env.PAGE_DEFAULT);
        const search = searchQuery
            ? {
                $or: [
                    { storeName: { $regex: searchQuery, $options: "i" } },
                    { listProducts: { $elemMatch: { productName: { $regex: searchQuery, $options: "i" } } } }
                ]
            }
            : {};
        const statusRegex = { status: { $regex: statusQuery, $options: "i" } };
        const skip = limit * (page - 1);
        try {
            const total = await this.billModel.countDocuments({ ...idCondition, ...statusRegex, ...search });
            const bills = await this.billModel.find({ ...idCondition, ...statusRegex, ...search }).limit(limit).skip(skip);
            return { total, bills };
        }
        catch (err) {
            if (err instanceof mongoose_2.Error)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getDetailById(id) {
        try {
            const bill = await this.billModel.findById(id);
            if (!bill) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(bill_schema_1.Bill.name);
            }
            return bill;
        }
        catch (err) {
            if (err instanceof mongoose_2.Error)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async update(id, status) {
        try {
            const bill = await this.billModel.findByIdAndUpdate({ _id: id }, { status });
            if (!bill) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(bill_schema_1.Bill.name);
            }
            return true;
        }
        catch (err) {
            if (err instanceof mongoose_2.Error)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getStatistic(storeId, startTime, endTime, type) {
        if (type === 'doanh thu')
            return await this.getStatisticTotalPrice(storeId, startTime, endTime);
        return await this.getStatisticProductType(storeId, startTime, endTime, type);
    }
    async getStatisticProductType(storeId, startTime, endTime, type) {
        try {
            const search = { listProducts: { $elemMatch: { type: { $regex: type, $options: "i" } } } };
            const bills = await this.billModel.find({ storeId, createdAt: { $gte: startTime, $lte: endTime }, ...search, status: 'Đã đặt' });
            return bills;
        }
        catch (err) {
            if (err instanceof mongoose_2.Error)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getStatisticTotalPrice(storeId, startTime, endTime) {
        try {
            const bills = await this.billModel.find({ storeId, createdAt: { $gte: startTime, $lte: endTime }, status: 'Đã đặt' });
            return bills;
        }
        catch (err) {
            if (err instanceof mongoose_2.Error)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
};
exports.BillService = BillService;
exports.BillService = BillService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bill_schema_1.Bill.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BillService);
//# sourceMappingURL=bill.service.js.map