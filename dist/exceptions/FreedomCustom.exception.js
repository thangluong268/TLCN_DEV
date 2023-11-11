"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class FreedomCustom extends common_1.HttpException {
    FriendAlreadyExist() {
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: "Bạn đã là bạn bè với người này rồi!",
            data: null
        };
    }
    FriendNotExist() {
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: "Bạn không phải là bạn bè với người này!",
            data: null
        };
    }
    FollowedStore() {
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: "Bạn đã theo dõi cửa hàng này rồi!",
            data: null
        };
    }
    NotFollowStore() {
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: "Bạn chưa theo dõi cửa hàng này!",
            data: null
        };
    }
    NotMatchOTP() {
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: "Bạn chưa nhập đúng OTP!",
            data: null
        };
    }
    InvalidLogin() {
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: "Email hoặc mật khẩu không đúng!",
            data: null
        };
    }
}
exports.default = FreedomCustom;
//# sourceMappingURL=FreedomCustom.exception.js.map