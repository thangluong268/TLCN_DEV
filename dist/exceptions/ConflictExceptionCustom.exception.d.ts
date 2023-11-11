import { HttpException } from "@nestjs/common";
export declare class ConflictExceptionCustom extends HttpException {
    constructor(name: string);
}
