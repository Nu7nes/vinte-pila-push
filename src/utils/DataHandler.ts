import { ExtractedItem } from "../types/html";
import RedisClient from "../models/database";

const cacheKey = "notifications";

export class DataHandler {
    private async checkInDataBase(newData: ExtractedItem[]): Promise<boolean> {
        const storagedData = await RedisClient.getValue(cacheKey);

        if (!storagedData) {
            this.save(newData);
            return false;
        }

        return true;
    }

    private async compare(
        newData: ExtractedItem[]
    ): Promise<[ExtractedItem[], ExtractedItem[]] | undefined> {
        const storagedData = await RedisClient.getValue(cacheKey);
        if (!storagedData) return;

        const parsedStoragedData: ExtractedItem[] = JSON.parse(storagedData);

        const filteredDifferentData = newData.filter((newItem) => {
            return !parsedStoragedData.find(
                (storagedItem) => storagedItem.id === newItem.id
            );
        });

        console.log(`Novos itens: ${filteredDifferentData?.length}`);

        return [filteredDifferentData, parsedStoragedData];
    }

    private async save(newData: ExtractedItem[]) {
        if (newData.length > 50) newData.splice(50);

        await RedisClient.updateValue(cacheKey, JSON.stringify(newData));
    }

    public async compareAndSave(
        newData: ExtractedItem[]
    ): Promise<ExtractedItem[] | undefined> {
        const hasDataOnDataBase = await this.checkInDataBase(newData);
        if (!hasDataOnDataBase) return;

        const comparedData = await this.compare(newData);

        if (!comparedData) return;

        const [filteredDifferentData, parsedStoragedData] = comparedData;
        const realTotalData = [...filteredDifferentData, ...parsedStoragedData];
        this.save(realTotalData);
        return filteredDifferentData;
    }
}

export default new DataHandler();
