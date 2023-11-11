import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schema/product.schema';
import { StoreService } from 'src/store/store.service';
import { EvaluationService } from 'src/evaluation/evaluation.service';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    private readonly storeService;
    private readonly evaluationService;
    constructor(productService: ProductService, storeService: StoreService, evaluationService: EvaluationService);
    create(product: CreateProductDto, userId: string): Promise<Product>;
    sellerCreateMultiple(products: CreateProductDto[], userId: string): Promise<void>;
    getAllBySearch(page: number, limit: number, search: string, userId: string): Promise<{
        total: number;
        products: Product[];
    }>;
    getAllBySearchPublic(page: number, limit: number, search: string): Promise<{
        total: number;
        products: Product[];
    }>;
    update(id: string, product: UpdateProductDto): Promise<Product>;
    getlistProductLasted(limit: number): Promise<Product[]>;
    mostProductsInStore(limit: number): Promise<Product[]>;
    getById(id: string): Promise<Product>;
    deleteProduct(id: string): Promise<Product>;
}
