import mongoose, { Document } from "mongoose";
export declare class UserToken extends Document {
    userId: string;
    hashedRefreshToken: string;
}
export declare const UserTokenSchema: mongoose.Schema<UserToken, mongoose.Model<UserToken, any, any, any, mongoose.Document<unknown, any, UserToken> & UserToken & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserToken, mongoose.Document<unknown, {}, UserToken> & UserToken & {
    _id: mongoose.Types.ObjectId;
}>;
