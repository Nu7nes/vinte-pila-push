import WebPush from "web-push";
import RedisClient from "../models/database";
import { Request, Response } from "express";

interface ISubscription {
    subscription: {
        endpoint: string;
        keys: {
            p256dh: string;
            auth: string;
        };
    };
}

export class PushNotification {
    public publicKey: string;
    private privateKey: string;

    constructor() {
        this.publicKey =
            "BO3AzaMctYPFip0fop0BAUXY4Cp6w1YnU-TGXoNgDIFovSiBjSeK7bZPCwgTIcaD-gm2Mlo99ymfGLCuEscx3Eg";
        this.privateKey = "e4P-p_IR4Ur0mGmKVpKpTQQRz9wa85eI1onfZx1N_10";
        this.init();
    }

    private init() {
        WebPush.setVapidDetails(
            "https://localhost:3000",
            this.publicKey,
            this.privateKey
        );
    }

    public sendKey(req: Request, res: Response): any {
        res.json({ publicKey: this.publicKey });
    }

    public registerSub(req: Request, res: Response) {
        console.log(req.body);
        // RedisClient.updateValue("subscription", JSON.stringify(req.body));
        return res.status(201).json({ data: req.body });
    }

    public async sendPush(req: Request, res: Response) {
        const { subscription } = req.body as ISubscription;

        WebPush.sendNotification(
            subscription,
            JSON.stringify({
                icon: "your-icon-link.png",
                title: "Your title",
                body: "Content of your message",
                imageUrl: "your-image-link.png",
            })
        );

        return res.status(201);
    }
}

export default new PushNotification();
