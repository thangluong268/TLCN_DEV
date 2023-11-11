import { Feedback } from './schema/feedback.schema';
import { Model } from 'mongoose';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
export declare class FeedbackService {
    private readonly feedbackModel;
    constructor(feedbackModel: Model<Feedback>);
    create(userId: string, productId: string, feedback: CreateFeedbackDto): Promise<Feedback>;
}
