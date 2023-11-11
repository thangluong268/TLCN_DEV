import { CartService } from './cart.service';
import { Request } from 'express';
import { Cart } from './schema/cart.schema';
import { ProductService } from 'src/product/product.service';
export declare class CartController {
    private readonly cartService;
    private readonly productService;
    constructor(cartService: CartService, productService: ProductService);
    processCart(req: Request, productId: string, userId: string): Promise<Cart>;
    getByUserId(page: number, limit: number, search: string, userId: string): Promise<{
        total: number;
        carts: Cart[];
    }>;
}
