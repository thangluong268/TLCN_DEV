"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictExceptionCustom = void 0;
const common_1 = require("@nestjs/common");
const Translate_1 = require("./Translate");
class ConflictExceptionCustom extends common_1.HttpException {
    constructor(name) {
        super((0, Translate_1.UpperCaseFirstLetter)(`${Translate_1.Translate[name]} đã tồn tại`), common_1.HttpStatus.CONFLICT);
    }
}
exports.ConflictExceptionCustom = ConflictExceptionCustom;
//# sourceMappingURL=ConflictExceptionCustom.exception.js.map