import { BrowserAgentError, ERROR_CODES } from "./error.js";

// Custom error without underlying error
export function validateInput() {
    throw new BrowserAgentError(
        "Invalid input provided.",
        ERROR_CODES.INVALID_INPUT
    );
}

// Custom error with original error
export function fetchScheduledData() {
    try {
        throw new Error("Scheduled fetch failed due to server timeout");
    } catch (error) {
        throw new BrowserAgentError(
            `Failed to fetch scheduled extractions: ${error.message}`,
            ERROR_CODES.FETCH_SCHEDULED_FAILED,
            error
        );
    }
}

// Custom error
 function getPages() {
    console.log("Getting pages...");
    throw new BrowserAgentError(
        "Browser has no pages available.",
        ERROR_CODES.NO_PAGES
    );
}

// Nested custom errors (2-level): launchBrowser -> getPages 
export function launchBrowser() {
    try {
        console.log("Launching browser...");
        getPages(); // triggers nested errors
    } catch (error) {
        throw new BrowserAgentError(
            `Failed to launch browser: ${error.message}`,
            ERROR_CODES.BROWSER_LAUNCH_FAILED,
            error
        );
    }
}

// Custom error with argument
 function validateFacility(facilityName) {
    throw new BrowserAgentError(
        `Facility validation failed for ${facilityName}.`,
        ERROR_CODES.FAC_VALIDATION_FAIL
    );
}

// Nested custom error: validateCsvFile -> validateFacility
 function validateCsvFile() {
    try {
        console.log("Validating CSV report...");
        validateFacility("CSV_Facility");
    } catch (error) {
        throw new BrowserAgentError(
            `Invalid CSV file: ${error.message}`,
            ERROR_CODES.INVALID_CSV_FILE,
            error
        );
    }
}

// Nested custom error (3-level): downloadCSVReport -> validateCsvFile -> validateFacility
export function downloadCSVReport() {
    try {
        console.log("Downloading CSV report...");
        validateCsvFile();
    } catch (error) {
        throw new BrowserAgentError(
            `Download CSV report resulted in a server error: ${error.message}`,
            ERROR_CODES.DOWNLOAD_CSV_REPORT_FAIL,
            error
        );
    }
}

// Standard JavaScript error (non-custom)
export function performNonCustomAction() {
    throw new Error("This is a standard JavaScript error.");
}
