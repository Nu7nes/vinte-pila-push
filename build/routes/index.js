"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Notification_1 = __importDefault(require("../controllers/Notification"));
var router = (0, express_1.Router)();
// router.get("/", (req: Request, res: Response) => {
//     res.json({ a: __dirname, b: __filename });
// });
router.get("/notification/push/public_key", Notification_1.default.sendKey.bind(Notification_1.default));
router.post("/notification/push/send", Notification_1.default.registerSub.bind(Notification_1.default));
router.post("/notification/push/register", Notification_1.default.registerSub.bind(Notification_1.default));
exports.default = router;
