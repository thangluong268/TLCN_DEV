import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './schema/notification.schema';
import { UserService } from 'src/user/user.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    private readonly userService;
    constructor(notificationService: NotificationService, userService: UserService);
    create(notification: CreateNotificationDto): Promise<Notification>;
    getAllByUserId(page: number, limit: number, userId: string): Promise<{
        total: number;
        notifications: Notification[];
    }>;
    update(id: string, updateNoti: UpdateNotificationDto): Promise<boolean>;
}
