import * as script from "./script.js";
import { BrowserAgentError } from "./error.js";

try {
    script.downloadCSVReport();
    // script.launchBrowser();
    // script.fetchScheduledData();
    // script.validateInput();
    // script.performNonCustomAction();
} catch (error) {
    console.log(error);
    printError(error);
}


function printError(error) {
    console.log("\n===== Formated Error Detailes =====");

    if (error instanceof BrowserAgentError) {
        console.error("Message: " + error.message);
        console.error("Code   : " + error.code);
        console.log("Type   : " + error.name);
        console.log("Stack  : " + error.stack);

        if (error.originalError) {
            let current = error.originalError;
            let depth = 1;
            while (current) {
                console.log("\n--- Wrapped Error Level " + depth + " ---");
                console.error("Message: " + current.message);
                console.error("Code   : " + (current.code || "N/A"));
                console.log("Type   : " + current.name);
                console.log("Stack  : " + current.stack);
                current = current.originalError;
                depth++;
            }
        }
    } else {
        console.warn("Non-custom error caught!");
        console.error("Message: " + error.message);
        console.error("Code   : " + (error.code || "N/A"));
        console.log("Type   : " + error.name);
        console.log("Stack  : " + error.stack);
    }
}
