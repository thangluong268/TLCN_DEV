import { UserWithoutPassDto } from "src/user/dto/user-without-pass.dto";
import { TokensDto } from "./tokens.dto";
export declare class UserDto {
    providerData: UserWithoutPassDto[];
    stsTokenManager: TokensDto;
}
