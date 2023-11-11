import { MailerService } from '@nestjs-modules/mailer';
import { Model } from 'mongoose';
import { Userotp } from './schema/userotp.schema';
import FreedomCustom from 'src/exceptions/FreedomCustom.exception';
export declare class UserotpService {
    private mailService;
    private userotpModel;
    private readonly freedomCustom;
    constructor(mailService: MailerService, userotpModel: Model<Userotp>, freedomCustom: FreedomCustom);
    sendotp(email: string): Promise<string>;
    create(email: string, otp: string): Promise<Userotp>;
    update(email: string, otp: string): Promise<Boolean>;
    findUserotpByEmail(email: string): Promise<any>;
    checkotp(otp: Number, email: string): Promise<any>;
    deleteotp(email: string): Promise<any>;
}
