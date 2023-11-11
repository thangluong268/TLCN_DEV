import mongoose, { Document, Types } from "mongoose";
import { ProductBillDto } from "../dto/product-bill.dto";
export declare class Bill extends Document {
    userId: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    storeId: string;
    storeName: string;
    listProducts: ProductBillDto[];
    totalPrice: number;
    promotionId: string;
    promotionName: string;
    promotionValue: number;
    paymentMethod: string;
    status: string;
}
export declare const BillSchema: mongoose.Schema<Bill, mongoose.Model<Bill, any, any, any, mongoose.Document<unknown, any, Bill> & Bill & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Bill, mongoose.Document<unknown, {}, Bill> & Bill & {
    _id: Types.ObjectId;
}>;
