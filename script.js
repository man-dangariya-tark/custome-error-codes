import { ErrorFactory } from "./error.js";

// Custom error without underlying error
export function validateInput() {
    throw ErrorFactory.invalidInput("Invalid input provided."); // Custom error
}

// Custom error with original error
export function fetchScheduledData() {
    try {
        throw new Error("Scheduled fetch failed due to server timeout");
    } catch (err) {
        throw ErrorFactory.fetchScheduledFailed(err); // Custom error wrapping original error
    }
}

// Custom error
 function getPages() {
    console.log("Getting pages...");
    throw ErrorFactory.noPages(); 
}

// Nested custom errors (2-level): launchBrowser -> getPages 
export function launchBrowser() {
    try {
        console.log("Launching browser...");
        getPages(); // triggers nested errors
    } catch (err) {
        throw ErrorFactory.browserLaunchFailed(err);
    }
}

// Custom error with argument
 function validateFacility(facilityName) {
    throw ErrorFactory.facilityValidationFail(`Facility validation failed for ${facilityName}.`); // Custom error
}

// Nested custom error: validateCsvFile -> validateFacility
 function validateCsvFile() {
    try {
        console.log("Validating CSV report...");
        validateFacility("CSV_Facility");
    } catch (err) {
        throw ErrorFactory.invalidCsvFile(err); 
    }
}

// Nested custom error (3-level): downloadCSVReport -> validateCsvFile -> validateFacility
export function downloadCSVReport() {
    try {
        console.log("Downloading CSV report...");
        validateCsvFile();
    } catch (err) {
        throw ErrorFactory.downloadCSVReportFailed(err); 
    }
}

// Standard JavaScript error (non-custom)
export function performNonCustomAction() {
    throw new Error("This is a standard JavaScript error."); // Non-custom error
}
