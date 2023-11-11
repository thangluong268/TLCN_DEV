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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const store_schema_1 = require("./schema/store.schema");
const mongoose_2 = require("mongoose");
const InternalServerErrorExceptionCustom_exception_1 = require("../exceptions/InternalServerErrorExceptionCustom.exception");
const NotFoundExceptionCustom_exception_1 = require("../exceptions/NotFoundExceptionCustom.exception");
const ConflictExceptionCustom_exception_1 = require("../exceptions/ConflictExceptionCustom.exception");
let StoreService = class StoreService {
    constructor(storeModel) {
        this.storeModel = storeModel;
    }
    async create(user, store) {
        try {
            const hasStore = await this.storeModel.findOne({ userId: user._id });
            if (hasStore) {
                throw new ConflictExceptionCustom_exception_1.ConflictExceptionCustom(store_schema_1.Store.name);
            }
            const newStore = await this.storeModel.create(store);
            newStore.userId = user._id;
            newStore.phone = [user.phone];
            await newStore.save();
            return newStore;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getById(id) {
        try {
            const store = await this.storeModel.findById(id);
            if (!store) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(store_schema_1.Store.name);
            }
            return store;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getByUserId(userId) {
        try {
            const store = await this.storeModel.findOne({ userId });
            if (!store) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(store_schema_1.Store.name);
            }
            return store;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async update(userId, store) {
        try {
            await this.getByUserId(userId);
            const updatedStore = await this.storeModel.findOneAndUpdate({ userId }, store, { new: true });
            return updatedStore;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async updateWarningCount(storeId, action) {
        try {
            var point = 1;
            if (action === 'minus')
                point = -1;
            const store = await this.storeModel.findByIdAndUpdate(storeId, { $inc: { warningCount: point } });
            if (!store) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(store_schema_1.Store.name);
            }
            return store;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async delete(userId) {
        try {
            const store = await this.storeModel.findOneAndDelete({ userId });
            if (!store) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(store_schema_1.Store.name);
            }
            return true;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(store_schema_1.Store.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StoreService);
//# sourceMappingURL=store.service.js.map