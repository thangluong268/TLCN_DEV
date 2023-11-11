import { FeedbackService } from './feedback.service';
import { Feedback } from './schema/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UserService } from 'src/user/user.service';
export declare class FeedbackController {
    private readonly feedbackService;
    private readonly userService;
    constructor(feedbackService: FeedbackService, userService: UserService);
    create(productId: string, feedback: CreateFeedbackDto, userId: string): Promise<Feedback>;
}
