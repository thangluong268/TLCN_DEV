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
exports.UserotpController = void 0;
const common_1 = require("@nestjs/common");
const userotp_service_1 = require("./userotp.service");
const swagger_1 = require("@nestjs/swagger");
const create_userotp_dto_1 = require("./dto/create-userotp.dto");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const check_userotp_dto_1 = require("./dto/check-userotp.dto");
const user_service_1 = require("../user/user.service");
let UserotpController = class UserotpController {
    constructor(userotpService, userService) {
        this.userotpService = userotpService;
        this.userService = userService;
    }
    async sendOtp(req) {
        const user = await this.userService.getByEmail(req.email);
        if (user) {
            return { data: null, message: 'Email đã tồn tại', status: 400 };
        }
        const otp = await this.userotpService.sendotp(req.email);
        const userotp = await this.userotpService.findUserotpByEmail(req.email);
        if (userotp?.email) {
            await this.userotpService.update(req.email, otp);
        }
        else {
            await this.userotpService.create(req.email, otp);
        }
    }
    async checkOtp(req) {
        const otp = await this.userotpService.checkotp(req.otp, req.email);
        if (otp.message) {
            return otp;
        }
        else {
            return await this.userotpService.deleteotp(req.email);
        }
    }
    async sendOtpForget(req) {
        const user = await this.userService.getByEmail(req.email);
        if (user) {
            const otp = await this.userotpService.sendotp(req.email);
            const userotp = await this.userotpService.findUserotpByEmail(req.email);
            if (userotp?.email) {
                await this.userotpService.update(req.email, otp);
            }
            else {
                await this.userotpService.create(req.email, otp);
            }
        }
        else {
            return { data: null, message: 'Email không tồn tại', status: 400 };
        }
    }
};
exports.UserotpController = UserotpController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('user/sendotp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_userotp_dto_1.CreateUserotpDto]),
    __metadata("design:returntype", Promise)
], UserotpController.prototype, "sendOtp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('user/checkotp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_userotp_dto_1.CheckUserotpDto]),
    __metadata("design:returntype", Promise)
], UserotpController.prototype, "checkOtp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('user/sendotp-forget'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_userotp_dto_1.CreateUserotpDto]),
    __metadata("design:returntype", Promise)
], UserotpController.prototype, "sendOtpForget", null);
exports.UserotpController = UserotpController = __decorate([
    (0, common_1.Controller)('userotp'),
    (0, swagger_1.ApiTags)('Userotp'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    __metadata("design:paramtypes", [userotp_service_1.UserotpService,
        user_service_1.UserService])
], UserotpController);
//# sourceMappingURL=userotp.controller.js.map