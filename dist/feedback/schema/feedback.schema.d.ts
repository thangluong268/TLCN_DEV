import mongoose, { Document, Types } from "mongoose";
export declare class Feedback extends Document {
    productId: string;
    userId: string;
    content: string;
    star: number;
}
export declare const FeedbackSchema: mongoose.Schema<Feedback, mongoose.Model<Feedback, any, any, any, mongoose.Document<unknown, any, Feedback> & Feedback & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Feedback, mongoose.Document<unknown, {}, Feedback> & Feedback & {
    _id: Types.ObjectId;
}>;
