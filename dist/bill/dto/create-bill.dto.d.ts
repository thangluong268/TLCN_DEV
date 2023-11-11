import { PAYMENT_METHOD } from "../payment/payment.gateway";
export declare class CreateBillDto {
    listProductId: string[];
    address: string;
    promotionId: string;
    promotionName: string;
    promotionValue: number;
    paymentMethod: PAYMENT_METHOD;
}
