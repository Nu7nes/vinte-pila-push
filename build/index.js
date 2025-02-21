"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
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
new app_1.App().server.listen(3000, function () {
    console.log("Rodando 3000");
});
