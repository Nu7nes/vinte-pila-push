import express from "express";
import router from "./routes";
import cors from "cors";
import morgan from "morgan";
import RedisClient, { RedisConnection } from "./models/database";
import path from "path";

export class App {
    public server: express.Application;
    // public database: RedisConnection;

    constructor() {
        this.server = express();
        this.cors();
        this.middleware();
        this.router();
        // this.database = RedisClient;
    }

    private middleware() {
        this.server.use(express.json());
        this.server.use(morgan("tiny"));
    }

    private router() {
        this.server.use(express.static(path.resolve(__dirname, "../public")));
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
