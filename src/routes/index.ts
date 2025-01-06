import WebPush from "web-push";
import { Router } from "express";
import pushNotification from "../controllers/Notification";

const router = Router();

router.get("/notification/push/public_key", pushNotification.sendKey.bind(pushNotification));

router.post("/notification/push/send", pushNotification.registerSub.bind(pushNotification));

export default router;
