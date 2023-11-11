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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signup_dto_1 = require("./dto/signup.dto");
const login_dto_1 = require("./dto/login.dto");
const swagger_1 = require("@nestjs/swagger");
const role_service_1 = require("../role/role.service");
const role_schema_1 = require("../role/schema/role.schema");
const abilities_guard_1 = require("../ability/guards/abilities.guard");
const abilities_decorator_1 = require("../ability/decorators/abilities.decorator");
const jwt_rt_auth_guard_1 = require("./guards/jwt-rt-auth.guard");
const public_decorator_1 = require("./decorators/public.decorator");
const usertoken_service_1 = require("../usertoken/usertoken.service");
const user_service_1 = require("../user/user.service");
const role_decorator_1 = require("../ability/decorators/role.decorator");
const BadRequestExceptionCustom_exception_1 = require("../exceptions/BadRequestExceptionCustom.exception");
let AuthController = class AuthController {
    constructor(authService, roleService, userService, userTokenService) {
        this.authService = authService;
        this.roleService = roleService;
        this.userService = userService;
        this.userTokenService = userTokenService;
    }
    async signUp(signUpDto) {
        const hashedPassword = await this.authService.hashData(signUpDto.password);
        signUpDto.password = hashedPassword;
        const newUser = await this.userService.create(signUpDto);
        const payload = { userId: newUser._id };
        const tokens = await this.authService.getTokens(payload);
        await this.userTokenService.createUserToken(newUser._id, tokens.refreshToken);
        await this.roleService.addUserToRole(newUser._id, { name: role_schema_1.RoleName.USER });
        return newUser;
    }
    async login(loginDto) {
        const user = await this.userService.getByEmail(loginDto.email);
        if (!user)
            throw new BadRequestExceptionCustom_exception_1.BadRequestExceptionCustom("Email hoặc mật khẩu không chính xác!");
        const { password, ...userWithoutPass } = user['_doc'];
        const isMatch = await this.authService.compareData(loginDto.password, password);
        if (!isMatch)
            throw new BadRequestExceptionCustom_exception_1.BadRequestExceptionCustom("Email hoặc mật khẩu không chính xác!");
        const payload = { userId: user._id };
        const tokens = await this.authService.getTokens(payload);
        const userToken = await this.userTokenService.getUserTokenById(user._id);
        userToken ? await this.userTokenService.updateUserToken(user._id, tokens.refreshToken)
            : await this.userTokenService.createUserToken(user._id, tokens.refreshToken);
        return { providerData: [userWithoutPass], stsTokenManager: tokens };
    }
    async forgetPassword(loginDto) {
        const { email, password } = loginDto;
        const hashedPassword = await this.authService.hashData(password);
        const user = await this.userService.updatePassword(email, hashedPassword);
        return user.email;
    }
    async logout(req) {
        const userId = req.user['userId'];
        return await this.userTokenService.deleteUserToken(userId);
    }
    async refreshToken(req) {
        const userId = req.user['userId'];
        const refreshToken = req.user['refreshToken'];
        const userToken = await this.userTokenService.getUserTokenById(userId);
        await this.authService.compareData(refreshToken, userToken.hashedRefreshToken);
        const payload = { userId: userToken.userId };
        const tokens = await this.authService.getTokens(payload);
        await this.userTokenService.updateUserToken(userToken.userId, tokens.refreshToken);
        return tokens;
    }
    async createUser(signUpDto) {
        const hashedPassword = await this.authService.hashData(signUpDto.password);
        signUpDto.password = hashedPassword;
        const newUser = await this.userService.create(signUpDto);
        const payload = { userId: newUser._id };
        const tokens = await this.authService.getTokens(payload);
        await this.userTokenService.createUserToken(newUser._id, tokens.refreshToken);
        return newUser;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('forgetPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.ManageUserTokenAbility()),
    (0, common_1.Delete)('logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(jwt_rt_auth_guard_1.JwtRTAuthGuard, abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.ManageUserTokenAbility()),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.UseGuards)(abilities_guard_1.AbilitiesGuard),
    (0, abilities_decorator_1.CheckAbilities)(new abilities_decorator_1.CreateUserAbility()),
    (0, role_decorator_1.CheckRole)(role_schema_1.RoleName.ADMIN),
    (0, common_1.Post)('createUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        role_service_1.RoleService,
        user_service_1.UserService,
        usertoken_service_1.UsertokenService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map