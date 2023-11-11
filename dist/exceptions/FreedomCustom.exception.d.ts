import { HttpException, HttpStatus } from "@nestjs/common";
declare class FreedomCustom extends HttpException {
    FriendAlreadyExist(): {
        statusCode: HttpStatus;
        message: string;
        data: any;
    };
    FriendNotExist(): {
        statusCode: HttpStatus;
        message: string;
        data: any;
    };
    FollowedStore(): {
        statusCode: HttpStatus;
        message: string;
        data: any;
    };
    NotFollowStore(): {
        statusCode: HttpStatus;
        message: string;
        data: any;
    };
    NotMatchOTP(): {
        statusCode: HttpStatus;
        message: string;
        data: any;
    };
    InvalidLogin(): {
        statusCode: HttpStatus;
        message: string;
        data: any;
    };
}
export default FreedomCustom;
