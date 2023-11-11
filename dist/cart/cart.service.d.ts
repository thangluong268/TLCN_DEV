import { Model } from 'mongoose';
import { Cart } from './schema/cart.schema';
import { ProductBillDto } from 'src/bill/dto/product-bill.dto';
import { Product } from 'src/product/schema/product.schema';
export declare class CartService {
    private readonly cartModel;
    constructor(cartModel: Model<Cart>);
    getTotalPrice(listProducts: ProductBillDto[]): number;
    create(userId: string, product: Product): Promise<Cart>;
    getAllByUserId(userId: string): Promise<Cart[]>;
    update(product: Product, cart: Cart): Promise<Cart>;
    addProductIntoCart(userId: string, product: Product): Promise<Cart>;
    getByUserId(userId: string, pageQuery: number, limitQuery: number, searchQuery: string): Promise<{
        total: number;
        carts: Cart[];
    }>;
}
