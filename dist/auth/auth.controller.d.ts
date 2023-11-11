import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RoleService } from 'src/role/role.service';
import { Request } from 'express';
import { UsertokenService } from 'src/usertoken/usertoken.service';
import { UserService } from 'src/user/user.service';
import { UserWithoutPassDto } from '../user/dto/user-without-pass.dto';
import { UserDto } from './dto/user.dto';
import { TokensDto } from './dto/tokens.dto';
export declare class AuthController {
    private readonly authService;
    private readonly roleService;
    private readonly userService;
    private readonly userTokenService;
    constructor(authService: AuthService, roleService: RoleService, userService: UserService, userTokenService: UsertokenService);
    signUp(signUpDto: SignUpDto): Promise<UserWithoutPassDto>;
    login(loginDto: LoginDto): Promise<UserDto>;
    forgetPassword(loginDto: LoginDto): Promise<string>;
    logout(req: Request): Promise<boolean>;
    refreshToken(req: Request): Promise<TokensDto>;
    createUser(signUpDto: SignUpDto): Promise<UserWithoutPassDto>;
}
