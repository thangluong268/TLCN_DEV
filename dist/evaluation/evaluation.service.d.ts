import { Evaluation } from './schema/evaluation.schema';
import { Model } from 'mongoose';
export declare class EvaluationService {
    private readonly evaluationModel;
    constructor(evaluationModel: Model<Evaluation>);
    create(productId: string): Promise<Evaluation>;
    update(userId: string, productId: string, body: string): Promise<boolean>;
    updateEmoji(userId: string, body: string, evaluation: Evaluation): Promise<boolean>;
    getByProductId(productId: string): Promise<Evaluation>;
}
