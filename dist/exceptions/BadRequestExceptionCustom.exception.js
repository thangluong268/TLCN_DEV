"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestExceptionCustom = void 0;
const common_1 = require("@nestjs/common");
class BadRequestExceptionCustom extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BadRequestExceptionCustom = BadRequestExceptionCustom;
//# sourceMappingURL=BadRequestExceptionCustom.exception.js.map