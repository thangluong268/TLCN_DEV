import mongoose, { Document, Types } from "mongoose";
export declare class Fine extends Document {
    times: number;
    content: string;
}
export declare const FineSchema: mongoose.Schema<Fine, mongoose.Model<Fine, any, any, any, mongoose.Document<unknown, any, Fine> & Fine & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Fine, mongoose.Document<unknown, {}, Fine> & Fine & {
    _id: Types.ObjectId;
}>;
