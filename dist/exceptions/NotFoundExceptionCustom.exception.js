"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundExceptionCustom = void 0;
const common_1 = require("@nestjs/common");
const Translate_1 = require("./Translate");
class NotFoundExceptionCustom extends common_1.HttpException {
    constructor(name) {
        super(`Không tìm thấy ${Translate_1.Translate[name]}`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundExceptionCustom = NotFoundExceptionCustom;
//# sourceMappingURL=NotFoundExceptionCustom.exception.js.map