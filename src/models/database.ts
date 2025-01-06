import { createClient, RedisClientType } from "redis";

export class RedisConnection {
    private static instance: RedisConnection;
    private client: RedisClientType;

    private constructor() {
        this.client = createClient();

        this.client.connect().catch((err) => {
            console.error("Erro ao conectar ao Redis:", err);
        });

        console.log("Conexão com Redis inicializada.");
    }

    public static getInstance(): RedisConnection {
        if (!RedisConnection.instance) {
            RedisConnection.instance = new RedisConnection();
        }
        return RedisConnection.instance;
    }

    public async getValue(key: string) {
        const value = await this.client.get(key);
        return value;
    }

    public async updateValue(key: string, value: string) {
        await this.client.set(key, value);
    }

    public async disconnect() {
        await this.client.disconnect();
    }
}

export default RedisConnection.getInstance();
