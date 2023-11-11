import { HttpException } from "@nestjs/common";
export declare class NotFoundExceptionCustom extends HttpException {
    constructor(name: string);
}
