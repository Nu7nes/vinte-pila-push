import dataHandler from "./utils/DataHandler";
import { App } from "./app";
import { HTMLHandler } from "./services/HTMLHandler";

// const htmlHandler = new HTMLHandler();
// const dataHandler = new DataHandler();

// (async function initExtraction() {
//     const extractedData = await htmlHandler.pick(
//         "https://www.vintepila.com.br/trabalhos-freelance/?order=desc&sort=20"
//     );

//     const filteredDifferentData = await dataHandler.compareAndSave(extractedData);
//     console.log(filteredDifferentData);

//     setTimeout(initExtraction, 30 * 1000);
// })();

new App().server.listen(3000);
