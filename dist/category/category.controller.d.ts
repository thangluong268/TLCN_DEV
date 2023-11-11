import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoryService } from "./category.service";
import { Category } from "./schema/category.schema";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAllByCategoryName(id: string, status: string): Promise<Category[]>;
}
