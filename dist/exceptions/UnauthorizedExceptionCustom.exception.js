"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedExceptionCustom = void 0;
const common_1 = require("@nestjs/common");
class UnauthorizedExceptionCustom extends common_1.HttpException {
    constructor() {
        super("Người dùng chưa được xác thực!", common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedExceptionCustom = UnauthorizedExceptionCustom;
//# sourceMappingURL=UnauthorizedExceptionCustom.exception.js.map