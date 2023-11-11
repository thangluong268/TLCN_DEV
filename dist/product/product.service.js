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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("./schema/product.schema");
const mongoose_2 = require("mongoose");
const InternalServerErrorExceptionCustom_exception_1 = require("../exceptions/InternalServerErrorExceptionCustom.exception");
const NotFoundExceptionCustom_exception_1 = require("../exceptions/NotFoundExceptionCustom.exception");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(store, product) {
        try {
            const newProduct = await this.productModel.create(product);
            newProduct.storeId = store._id;
            newProduct.storeName = store.storeName;
            await newProduct.save();
            return newProduct;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getById(id) {
        try {
            const product = await this.productModel.findById(id);
            if (!product) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(product_schema_1.Product.name);
            }
            return product;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getAllBySearch(storeIdInput, pageQuery, limitQuery, searchQuery) {
        const storeId = storeIdInput ? { storeId: storeIdInput } : {};
        const limit = Number(limitQuery) || Number(process.env.LIMIT_DEFAULT);
        const page = Number(pageQuery) || Number(process.env.PAGE_DEFAULT);
        const search = searchQuery
            ? {
                $or: [
                    { productName: { $regex: searchQuery, $options: "i" } },
                    { category: { $regex: searchQuery, $options: "i" } },
                    { keywords: { $regex: searchQuery, $options: "i" } }
                ]
            }
            : {};
        const skip = limit * (page - 1);
        try {
            const total = await this.productModel.countDocuments({ ...search, ...storeId });
            const products = await this.productModel.find({ ...search, ...storeId }).limit(limit).skip(skip);
            return { total, products };
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async update(id, product) {
        try {
            product = { status: false };
            await this.getById(id);
            const updatedProduct = await this.productModel.findByIdAndUpdate({ _id: id }, product, { new: true });
            return updatedProduct;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async deleteProduct(productId) {
        try {
            const product = await this.productModel.findOneAndDelete({ _id: productId });
            return product;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getlistProductLasted(limit) {
        try {
            const products = await this.productModel.find({}).sort({ createdAt: -1 }).limit(limit);
            return products;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async mostProductsInStore(limit) {
        try {
            const products = await this.productModel.aggregate([
                {
                    $group: {
                        _id: '$storeId',
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $limit: Number(limit)
                }
            ]);
            const storeIds = products.map(product => product._id);
            var arr = [];
            for (let i = 0; i < storeIds.length; i++) {
                const product = await this.productModel.find({ storeId: storeIds[i] }, { _id: 1, avatar: 1, quantity: 1, productName: 1, price: 1, storeName: 1, storeId: 1, type: 1 }).limit(10);
                arr.push(product);
            }
            return arr;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map