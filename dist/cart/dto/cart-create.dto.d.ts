import { ProductBillDto } from "src/bill/dto/product-bill.dto";
export declare class CreateCartDto {
    userId: string;
    storeId: string;
    storeName: string;
    listProducts: ProductBillDto[];
    totalPrice: number;
}
