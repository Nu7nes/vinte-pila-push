import axios from "axios";
import * as cheerio from "cheerio";
import RedisClient, { RedisConnection } from "../models/database";
import { ExtractedItem } from "../types/html";
import { DataHandler } from "../utils/DataHandler";

export class HTMLHandler {
    // public html: string;

    // constructor() {
    //     this.html = "";
    // }

    private extractData(html: string): ExtractedItem[] {
        const extractedData: ExtractedItem[] = [];
        const $ = cheerio.load(html);

        $("#__container > .ui.segment > .ui.items > .item > .content ").each(
            (index, element) => {
                const id = $(element).find("small").text().slice(1);
                const title = $(element).find("a.header").text().trim();
                const price = $(element)
                    .find("span#project-price")
                    .text()
                    .trim();
                const link = $(element).find("a.header").attr("href");
                const description = $(element)
                    .find("div.description")
                    .children("p")
                    .text()
                    .trim();
                const date = {
                    since: $(element)
                        .find("div.extra")
                        .children("span:first")
                        .text()
                        .trim(),
                    publication: $(element)
                        .find("div.extra")
                        .children("span:first")
                        .attr("data-content")
                        ?.trim(),
                };
                const candidates = $(element)
                    .find("div.extra")
                    .children("span:last")
                    .text()
                    ?.trim();

                extractedData.push({
                    id,
                    title,
                    price,
                    link,
                    description,
                    candidates,
                    date,
                });
            }
        );

        return extractedData;
        // console.log(extractedData[0]);
    }

    public async pick(url: string): Promise<ExtractedItem[]> {
        const response = await axios.get(url);
        const data: ExtractedItem[] = this.extractData(response.data);
        return data;
    }
}
