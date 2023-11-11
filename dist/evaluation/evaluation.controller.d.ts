import { EvaluationService } from './evaluation.service';
import { BodyDto } from './dto/body.dto';
import { Evaluation } from './schema/evaluation.schema';
export declare class EvaluationController {
    private readonly evaluationService;
    constructor(evaluationService: EvaluationService);
    create(productId: string, body: BodyDto, userId: string): Promise<boolean>;
    getByProductId(productId: string): Promise<Evaluation>;
}
