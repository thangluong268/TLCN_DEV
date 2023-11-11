import { Notification } from './schema/notification.schema';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationService {
    private readonly notificationModel;
    constructor(notificationModel: Model<Notification>);
    create(notification: CreateNotificationDto): Promise<Notification>;
    getAllByUserId(userId: string, pageQuery: number, limitQuery: number): Promise<{
        total: number;
        notifications: Notification[];
    }>;
    update(id: string, updateNoti: UpdateNotificationDto): Promise<boolean>;
}
