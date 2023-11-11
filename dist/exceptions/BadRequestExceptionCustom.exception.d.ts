import { HttpException } from "@nestjs/common";
export declare class BadRequestExceptionCustom extends HttpException {
    constructor(message: string);
}
