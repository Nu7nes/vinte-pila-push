import express from "express";
import router from "./routes";
import cors from "cors";
import RedisClient, { RedisConnection } from "./models/database";

export class App {
    public server: express.Application;
    // public database: RedisConnection;

    constructor() {
        this.server = express();
        this.middleware();
        this.router();
        this.cors();
        // this.database = RedisClient;
    }

    private middleware() {
        this.server.use(express.json());
    }

    private router() {
        this.server.use(router);
    }

    private cors() {
        this.server.use(
            cors({
                origin: "*",
            })
        );
    }
}
