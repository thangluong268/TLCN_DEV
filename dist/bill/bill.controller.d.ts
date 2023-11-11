import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { Bill } from './schema/bill.schema';
import { PaymentService } from './payment/payment.service';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { StoreService } from 'src/store/store.service';
export declare class BillController {
    private readonly billService;
    private readonly paymentService;
    private readonly userService;
    private readonly productService;
    private readonly storeService;
    constructor(billService: BillService, paymentService: PaymentService, userService: UserService, productService: ProductService, storeService: StoreService);
    create(bill: CreateBillDto, userId: string): Promise<Bill>;
    getAllByStatusUser(page: number, limit: number, search: string, status: string, userId: string): Promise<{
        total: number;
        bills: Bill[];
    }>;
    getAllByStatusSeller(page: number, limit: number, search: string, status: string, userId: string): Promise<{
        total: number;
        bills: Bill[];
    }>;
    getDetailById(id: string): Promise<Bill>;
    cancelBill(id: string, userId: string): Promise<boolean>;
    updateStatus(id: string, status: string, userId: string): Promise<boolean>;
    getStatistic(startTime: string, endTime: string, type: string, userId: string): Promise<Bill[]>;
}
