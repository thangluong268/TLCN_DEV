import { Action, Subjects } from "../ability.factory";
import { Role } from "src/role/schema/role.schema";
import { UserToken } from "src/usertoken/schema/usertoken.schema";
import { User } from "src/user/schema/user.schema";
import { Bill } from "src/bill/schema/bill.schema";
import { Userotp } from "src/userotp/schema/userotp.schema";
import { Cart } from "src/cart/schema/cart.schema";
import { Store } from "src/store/schema/store.schema";
import { Feedback } from "src/feedback/schema/feedback.schema";
import { Product } from "src/product/schema/product.schema";
import { Evaluation } from "src/evaluation/schema/evaluation.schema";
import { Notification } from "src/notification/schema/notification.schema";
import { Promotion } from "src/promotion/schema/promotion.schema";
import { Category } from "src/category/schema/category.schema";
export interface RequiredRule {
    action: Action;
    subject: Subjects;
}
export declare const CHECK_ABILITY = "check_ability";
export declare const CheckAbilities: (...requirements: RequiredRule[]) => import("@nestjs/common").CustomDecorator<string>;
export declare class ReadRoleAbility implements RequiredRule {
    action: Action;
    subject: typeof Role;
}
export declare class UpdateRoleAbility implements RequiredRule {
    action: Action;
    subject: typeof Role;
}
export declare class CreateRoleAbility implements RequiredRule {
    action: Action;
    subject: typeof Role;
}
export declare class CreateUserAbility implements RequiredRule {
    action: Action;
    subject: typeof User;
}
export declare class ReadUserAbility implements RequiredRule {
    action: Action;
    subject: typeof User;
}
export declare class UpdateUserAbility implements RequiredRule {
    action: Action;
    subject: typeof User;
}
export declare class DeleteUserAbility implements RequiredRule {
    action: Action;
    subject: typeof User;
}
export declare class CreateUserotpAbility implements RequiredRule {
    action: Action;
    subject: typeof Userotp;
}
export declare class ManageUserTokenAbility implements RequiredRule {
    action: Action;
    subject: typeof UserToken;
}
export declare class CreateBillAbility implements RequiredRule {
    action: Action;
    subject: typeof Bill;
}
export declare class ReadBillAbility implements RequiredRule {
    action: Action;
    subject: typeof Bill;
}
export declare class UpdateBillAbility implements RequiredRule {
    action: Action;
    subject: typeof Bill;
}
export declare class CreateCartAbility implements RequiredRule {
    action: Action;
    subject: typeof Cart;
}
export declare class CreateStoreAbility implements RequiredRule {
    action: Action;
    subject: typeof Store;
}
export declare class ReadStoreAbility implements RequiredRule {
    action: Action;
    subject: typeof Store;
}
export declare class DeleteStoreAbility implements RequiredRule {
    action: Action;
    subject: typeof Store;
}
export declare class UpdateStoreAbility implements RequiredRule {
    action: Action;
    subject: typeof Store;
}
export declare class ManageStoreAbility implements RequiredRule {
    action: Action;
    subject: typeof Store;
}
export declare class CreateFeedBackAbility implements RequiredRule {
    action: Action;
    subject: typeof Feedback;
}
export declare class CreateProductAbility implements RequiredRule {
    action: Action;
    subject: typeof Product;
}
export declare class ReadProductAbility implements RequiredRule {
    action: Action;
    subject: typeof Product;
}
export declare class UpdateProductAbility implements RequiredRule {
    action: Action;
    subject: typeof Product;
}
export declare class DeleteProductAbility implements RequiredRule {
    action: Action;
    subject: typeof Product;
}
export declare class UpdateEvaluationAbility implements RequiredRule {
    action: Action;
    subject: typeof Evaluation;
}
export declare class ReadNotificationAbility implements RequiredRule {
    action: Action;
    subject: typeof Notification;
}
export declare class UpdateNotificationAbility implements RequiredRule {
    action: Action;
    subject: typeof Notification;
}
export declare class CreatePromotionAbility implements RequiredRule {
    action: Action;
    subject: typeof Promotion;
}
export declare class ReadPromotionAbility implements RequiredRule {
    action: Action;
    subject: typeof Promotion;
}
export declare class UpdatePromotionAbility implements RequiredRule {
    action: Action;
    subject: typeof Promotion;
}
export declare class DeletePromotionAbility implements RequiredRule {
    action: Action;
    subject: typeof Promotion;
}
export declare class CreateFineAbility implements RequiredRule {
    action: Action;
    subject: typeof Promotion;
}
export declare class ReadFineAbility implements RequiredRule {
    action: Action;
    subject: typeof Promotion;
}
export declare class UpdateFineAbility implements RequiredRule {
    action: Action;
    subject: typeof Promotion;
}
export declare class DeleteFineAbility implements RequiredRule {
    action: Action;
    subject: typeof Promotion;
}
export declare class CreatePolicyAbility implements RequiredRule {
    action: Action;
    subject: typeof Promotion;
}
export declare class ReadPolicyAbility implements RequiredRule {
    action: Action;
    subject: typeof Promotion;
}
export declare class UpdatePolicyAbility implements RequiredRule {
    action: Action;
    subject: typeof Promotion;
}
export declare class DeletePolicyAbility implements RequiredRule {
    action: Action;
    subject: typeof Promotion;
}
export declare class CreateCategoryAbility implements RequiredRule {
    action: Action;
    subject: typeof Category;
}
export declare class ReadCategoryAbility implements RequiredRule {
    action: Action;
    subject: typeof Category;
}
