import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Store } from 'src/store/schema/store.schema';
export declare class ProductService {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    create(store: Store, product: CreateProductDto): Promise<Product>;
    getById(id: string): Promise<Product>;
    getAllBySearch(storeIdInput: string, pageQuery: number, limitQuery: number, searchQuery: string): Promise<{
        total: number;
        products: Product[];
    }>;
    update(id: string, product: any): Promise<Product>;
    deleteProduct(productId: string): Promise<Product>;
    getlistProductLasted(limit: number): Promise<Product[]>;
    mostProductsInStore(limit: number): Promise<Product[]>;
}
