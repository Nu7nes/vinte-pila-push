import WebPush from "web-push";
import { Request, Response, Router } from "express";
import pushNotification from "../controllers/Notification";
import { join } from "path";

const router = Router();

// router.get("/", (req: Request, res: Response) => {
//     res.json({ a: __dirname, b: __filename });
// });

router.get(
    "/notification/push/public_key",
    pushNotification.sendKey.bind(pushNotification)
);

router.post(
    "/notification/push/send",
    pushNotification.sendPush.bind(pushNotification)
);

router.post(
    "/notification/push/register",
    pushNotification.registerSub.bind(pushNotification)
);

export default router;
