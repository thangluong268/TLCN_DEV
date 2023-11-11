"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenExceptionCustom = void 0;
const common_1 = require("@nestjs/common");
class ForbiddenExceptionCustom extends common_1.HttpException {
    constructor() {
        super("Truy cập thất bại!", common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenExceptionCustom = ForbiddenExceptionCustom;
//# sourceMappingURL=ForbiddenExceptionCustom.exception.js.map