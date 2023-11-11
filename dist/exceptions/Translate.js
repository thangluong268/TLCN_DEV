"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpperCaseFirstLetter = exports.Translate = void 0;
exports.Translate = {
    Policy: "chính sách",
    Role: "vai trò",
    User: "người dùng",
    Product: "sản phẩm",
    Email: "email",
    Bill: "hóa đơn",
    Store: "cửa hàng",
    PaymentMethod: "phương thức thanh toán",
    Action: "hành động",
    Feedback: "feedback",
    Evaluation: "đánh giá",
    Notification: "thông báo",
};
const UpperCaseFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.UpperCaseFirstLetter = UpperCaseFirstLetter;
//# sourceMappingURL=Translate.js.map