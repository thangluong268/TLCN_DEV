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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const cart_schema_1 = require("./schema/cart.schema");
const cart_create_dto_1 = require("./dto/cart-create.dto");
const InternalServerErrorExceptionCustom_exception_1 = require("../exceptions/InternalServerErrorExceptionCustom.exception");
const product_bill_dto_1 = require("../bill/dto/product-bill.dto");
const product_schema_1 = require("../product/schema/product.schema");
const ConflictExceptionCustom_exception_1 = require("../exceptions/ConflictExceptionCustom.exception");
let CartService = class CartService {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    getTotalPrice(listProducts) {
        const totalPrice = listProducts.reduce((total, product) => {
            const productTotal = product.quantity * product.price;
            return total + productTotal;
        }, 0);
        return totalPrice;
    }
    async create(userId, product) {
        try {
            const cart = new cart_create_dto_1.CreateCartDto();
            cart.userId = userId;
            cart.storeId = product.storeId;
            cart.storeName = product.storeName;
            const productInfo = new product_bill_dto_1.ProductBillDto();
            productInfo.avatar = product.avatar;
            productInfo.productId = product._id;
            productInfo.productName = product.productName;
            productInfo.quantity = product.quantity;
            productInfo.price = product.price;
            productInfo.type = product.type;
            cart.listProducts = [productInfo];
            cart.totalPrice = this.getTotalPrice(cart.listProducts);
            const newCart = await this.cartModel.create(cart);
            return newCart;
        }
        catch (err) {
            if (err instanceof mongoose_1.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getAllByUserId(userId) {
        try {
            const carts = await this.cartModel.find({ userId });
            return carts;
        }
        catch (err) {
            if (err instanceof mongoose_1.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async update(product, cart) {
        try {
            const productInfo = new product_bill_dto_1.ProductBillDto();
            productInfo.avatar = product.avatar;
            productInfo.productId = product._id;
            productInfo.productName = product.productName;
            productInfo.quantity = product.quantity;
            productInfo.price = product.price;
            productInfo.type = product.type;
            cart.listProducts.push(productInfo);
            cart.totalPrice = this.getTotalPrice(cart.listProducts);
            await cart.save();
            return cart;
        }
        catch (err) {
            if (err instanceof mongoose_1.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async addProductIntoCart(userId, product) {
        const allCart = await this.getAllByUserId(userId);
        if (!allCart) {
            const newCart = await this.create(userId, product);
            return newCart;
        }
        else {
            const cart = allCart.find(cart => cart.storeId.toString() === product.storeId.toString());
            if (!cart) {
                const newCart = await this.create(userId, product);
                return newCart;
            }
            else {
                const hasProduct = cart.listProducts.find(productCart => productCart.productId.toString() === product._id.toString());
                if (hasProduct) {
                    throw new ConflictExceptionCustom_exception_1.ConflictExceptionCustom(product_schema_1.Product.name);
                }
                const updatedCart = await this.update(product, cart);
                return updatedCart;
            }
        }
    }
    async getByUserId(userId, pageQuery, limitQuery, searchQuery) {
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
        const skip = limit * (page - 1);
        try {
            const total = await this.cartModel.countDocuments({ ...search, userId });
            const carts = await this.cartModel.find({ ...search, userId }).limit(limit).skip(skip);
            return { total, carts };
        }
        catch (err) {
            if (err instanceof mongoose_1.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map