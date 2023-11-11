import { CreatePromotionDto } from './dto/create-promotion.dto';
import { Promotion } from './schema/promotion.schema';
import { Model } from 'mongoose';
export declare class PromotionService {
    private readonly promotionModel;
    constructor(promotionModel: Model<Promotion>);
    create(createPromotionDto: CreatePromotionDto): Promise<Promotion>;
    findAllByProductType(productType: string): Promise<Promotion[]>;
    update(id: string, updatePromotionDto: CreatePromotionDto): Promise<Promotion>;
    remove(id: string): Promise<Promotion>;
}
