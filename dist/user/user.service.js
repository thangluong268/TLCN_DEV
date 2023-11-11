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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./schema/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const NotFoundExceptionCustom_exception_1 = require("../exceptions/NotFoundExceptionCustom.exception");
const InternalServerErrorExceptionCustom_exception_1 = require("../exceptions/InternalServerErrorExceptionCustom.exception");
const FreedomCustom_exception_1 = require("../exceptions/FreedomCustom.exception");
const update_user_dto_1 = require("./dto/update-user.dto");
let UserService = class UserService {
    constructor(userModel, freedomCustom) {
        this.userModel = userModel;
        this.freedomCustom = freedomCustom;
    }
    async create(signUpDto) {
        try {
            const newUser = await this.userModel.create(signUpDto);
            await newUser.save();
            const userDoc = newUser['_doc'];
            const { password, ...userWithoutPass } = userDoc;
            return userWithoutPass;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getByEmail(email) {
        try {
            const user = await this.userModel.findOne({ email });
            return user;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getById(userId) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(user_schema_1.User.name);
            }
            return user;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async update(userId, req) {
        try {
            const user = await this.userModel.findByIdAndUpdate(userId, req);
            if (!user) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(user_schema_1.User.name);
            }
            return user;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async delete(userId) {
        try {
            const user = await this.userModel.findByIdAndDelete(userId);
            if (!user) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(user_schema_1.User.name);
            }
            return user;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async addFriend(userId, friendId) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(user_schema_1.User.name);
            }
            const friends = user.friends;
            if (friends.includes(friendId.toString())) {
                throw this.freedomCustom.FriendAlreadyExist();
            }
            friends.push(friendId.toString());
            user.friends = friends;
            await user.save();
            return user;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async unFriend(userId, friendId) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(user_schema_1.User.name);
            }
            const friends = user.friends;
            if (!friends.includes(friendId.toString())) {
                throw this.freedomCustom.FriendNotExist();
            }
            const index = friends.indexOf(friendId.toString());
            friends.splice(index, 1);
            user.friends = friends;
            await user.save();
            return user;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async followStore(userId, storeId) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(user_schema_1.User.name);
            }
            const stores = user.followStores;
            if (stores.includes(storeId.toString())) {
                throw this.freedomCustom.FollowedStore();
            }
            stores.push(storeId.toString());
            user.followStores = stores;
            await user.save();
            return user;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async unFollowStore(userId, storeId) {
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(user_schema_1.User.name);
            }
            const stores = user.followStores;
            if (!stores.includes(storeId.toString())) {
                throw this.freedomCustom.NotFollowStore();
            }
            const index = stores.indexOf(storeId.toString());
            stores.splice(index, 1);
            user.followStores = stores;
            await user.save();
            return user;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async updateWallet(userId, money, type) {
        try {
            const user = await this.getById(userId);
            const bonus = (money * 0.2) / 1000;
            const updateUser = new update_user_dto_1.UpdateUserDto();
            updateUser.wallet = type == "plus" ? (user.wallet + bonus) : (user.wallet - bonus);
            await this.update(userId, updateUser);
            return true;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async updateWarningCount(userId, action) {
        try {
            var point = 1;
            if (action === 'minus')
                point = -1;
            const user = await this.userModel.findByIdAndUpdate(userId, { $inc: { warningCount: point } });
            if (!user) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(user_schema_1.User.name);
            }
            return user;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getAll(page, limit, search) {
        try {
            const total = await this.userModel.countDocuments({ $or: [{ email: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }] });
            const users = await this.userModel.find({ $or: [{ email: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }] })
                .skip((page - 1) * limit)
                .limit(limit);
            if (!users) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(user_schema_1.User.name);
            }
            return { total, users };
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async updatePassword(email, password) {
        try {
            return await this.userModel.findOneAndUpdate({ email }, { password });
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        FreedomCustom_exception_1.default])
], UserService);
//# sourceMappingURL=user.service.js.map