import mongoose, { Document, Types } from "mongoose";
export declare class Userotp extends Document {
    email: string;
    otp: Number;
}
export declare const UserotpSchema: mongoose.Schema<Userotp, mongoose.Model<Userotp, any, any, any, mongoose.Document<unknown, any, Userotp> & Userotp & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Userotp, mongoose.Document<unknown, {}, Userotp> & Userotp & {
    _id: Types.ObjectId;
}>;
