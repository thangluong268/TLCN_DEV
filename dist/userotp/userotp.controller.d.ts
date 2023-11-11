import { UserotpService } from './userotp.service';
import { CreateUserotpDto } from './dto/create-userotp.dto';
import { CheckUserotpDto } from './dto/check-userotp.dto';
import { UserService } from 'src/user/user.service';
export declare class UserotpController {
    private readonly userotpService;
    private readonly userService;
    constructor(userotpService: UserotpService, userService: UserService);
    sendOtp(req: CreateUserotpDto): Promise<any>;
    checkOtp(req: CheckUserotpDto): Promise<void>;
    sendOtpForget(req: CreateUserotpDto): Promise<any>;
}
