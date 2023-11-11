import { Bill } from './schema/bill.schema';
import { Model } from 'mongoose';
import { CreateBillDto } from './dto/create-bill.dto';
import { ProductBillDto } from './dto/product-bill.dto';
import { User } from 'src/user/schema/user.schema';
import { Product } from 'src/product/schema/product.schema';
export declare class BillService {
    private readonly billModel;
    constructor(billModel: Model<Bill>);
    getTotalPrice(listProducts: ProductBillDto[], promotionValue: number): number;
    create(user: User, products: Product[], bill: CreateBillDto): Promise<Bill>;
    getAllByStatus(idCondition: any, pageQuery: number, limitQuery: number, searchQuery: string, statusQuery: string): Promise<{
        total: number;
        bills: Bill[];
    }>;
    getDetailById(id: string): Promise<Bill>;
    update(id: string, status: string): Promise<boolean>;
    getStatistic(storeId: string, startTime: string, endTime: string, type: string): Promise<Bill[]>;
    getStatisticProductType(storeId: string, startTime: string, endTime: string, type: string): Promise<Bill[]>;
    getStatisticTotalPrice(storeId: string, startTime: string, endTime: string): Promise<Bill[]>;
}
