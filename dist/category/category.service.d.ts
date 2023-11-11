import { CreateCategoryDto } from './dto/create-category.dto';
import { Model } from 'mongoose';
import { Category } from './schema/category.schema';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAllByCategoryName(id: string, status: string): Promise<Category[]>;
}
