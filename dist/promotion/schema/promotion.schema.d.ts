import mongoose, { Document, Types } from "mongoose";
export declare class Promotion extends Document {
    photo: string[];
    promotionName: string;
    content: string;
    value: number;
    days: number;
    productTypes: string[];
    status: boolean;
}
export declare const PromotionSchema: mongoose.Schema<Promotion, mongoose.Model<Promotion, any, any, any, mongoose.Document<unknown, any, Promotion> & Promotion & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Promotion, mongoose.Document<unknown, {}, Promotion> & Promotion & {
    _id: Types.ObjectId;
}>;
