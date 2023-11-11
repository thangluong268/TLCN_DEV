import mongoose, { Document, Types } from "mongoose";
import { ProductBillDto } from "src/bill/dto/product-bill.dto";
export declare class Cart extends Document {
    userId: string;
    storeId: string;
    storeName: string;
    listProducts: ProductBillDto[];
    totalPrice: number;
}
export declare const CartSchema: mongoose.Schema<Cart, mongoose.Model<Cart, any, any, any, mongoose.Document<unknown, any, Cart> & Cart & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Cart, mongoose.Document<unknown, {}, Cart> & Cart & {
    _id: Types.ObjectId;
}>;
