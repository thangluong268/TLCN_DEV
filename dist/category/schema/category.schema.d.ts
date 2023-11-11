import mongoose, { Document, Types } from "mongoose";
export declare class Category extends Document {
    name: string;
    url: string;
    status: boolean;
}
export declare const CategorySchema: mongoose.Schema<Category, mongoose.Model<Category, any, any, any, mongoose.Document<unknown, any, Category> & Category & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Category, mongoose.Document<unknown, {}, Category> & Category & {
    _id: Types.ObjectId;
}>;
