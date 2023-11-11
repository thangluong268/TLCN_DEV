import { InferSubjects, MongoAbility } from "@casl/ability";
import { User } from "src/user/schema/user.schema";
import { Role } from "src/role/schema/role.schema";
import { UserToken } from "src/usertoken/schema/usertoken.schema";
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
export declare enum Action {
    Manage = "manage",
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete",
    Orther = "orther"
}
export type Subjects = InferSubjects<typeof User | typeof Userotp | typeof Role | typeof UserToken | typeof Bill | typeof Cart | typeof Store | typeof Feedback | typeof Product | typeof Evaluation | typeof Notification | typeof Promotion | typeof Category> | 'all';
export type AppAbility = MongoAbility<[Action, Subjects]>;
export declare class AbilityFactory {
    defineAbility(role: string): AppAbility;
}
