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
exports.EvaluationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const evaluation_schema_1 = require("./schema/evaluation.schema");
const mongoose_2 = require("mongoose");
const InternalServerErrorExceptionCustom_exception_1 = require("../exceptions/InternalServerErrorExceptionCustom.exception");
const emoji_dto_1 = require("./dto/emoji.dto");
const NotFoundExceptionCustom_exception_1 = require("../exceptions/NotFoundExceptionCustom.exception");
let EvaluationService = class EvaluationService {
    constructor(evaluationModel) {
        this.evaluationModel = evaluationModel;
    }
    async create(productId) {
        try {
            const newEvaluation = await this.evaluationModel.create({ productId });
            return newEvaluation;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async update(userId, productId, body) {
        const evaluation = await this.evaluationModel.findOne({ productId });
        return this.updateEmoji(userId, body, evaluation);
    }
    async updateEmoji(userId, body, evaluation) {
        try {
            const index = evaluation.Emojis.findIndex(emoji => emoji.userId.toString() === userId.toString());
            const newEmoji = new emoji_dto_1.EmojiDto();
            newEmoji.userId = userId;
            newEmoji.name = body;
            if (index == -1) {
                evaluation.Emojis.push(newEmoji);
            }
            else {
                if (evaluation.Emojis[index].name == body) {
                    evaluation.Emojis.splice(index, 1);
                }
                else {
                    evaluation.Emojis[index] = newEmoji;
                }
            }
            await evaluation.save();
            return true;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
    async getByProductId(productId) {
        try {
            const evaluation = await this.evaluationModel.findOne({ productId });
            if (!evaluation) {
                throw new NotFoundExceptionCustom_exception_1.NotFoundExceptionCustom(evaluation_schema_1.Evaluation.name);
            }
            return evaluation;
        }
        catch (err) {
            if (err instanceof mongoose_2.MongooseError)
                throw new InternalServerErrorExceptionCustom_exception_1.InternalServerErrorExceptionCustom();
            throw err;
        }
    }
};
exports.EvaluationService = EvaluationService;
exports.EvaluationService = EvaluationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(evaluation_schema_1.Evaluation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EvaluationService);
//# sourceMappingURL=evaluation.service.js.map