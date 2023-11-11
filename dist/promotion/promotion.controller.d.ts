import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { Promotion } from './schema/promotion.schema';
export declare class PromotionController {
    private readonly promotionService;
    constructor(promotionService: PromotionService);
    create(createPromotionDto: CreatePromotionDto): Promise<Promotion>;
    findAllByProductType(productType: string): Promise<Promotion[]>;
    update(id: string, updatePromotionDto: CreatePromotionDto): Promise<Promotion>;
    remove(id: string): Promise<Promotion>;
}
