export class BrowserAgentError extends Error {
    constructor(message, code = "UNKNOWN_ERROR", originalError = null) {
        super(message);
        this.name = "BrowserAgentError";
        this.code = originalError instanceof BrowserAgentError ? originalError.code : code;
        if (!originalError) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = originalError.stack;
        }
    }
}


const ERROR_CODES = Object.freeze({
    INVALID_INPUT: "INVALID_INPUT",
    FETCH_SCHEDULED_FAILED: "FETCH_SCHEDULED_FAILED",
    BROWSER_LAUNCH_FAILED: "BROWSER_LAUNCH_FAILED",
    NO_PAGES: "NO_PAGES",
    FAC_VALIDATION_FAIL: "FAC_VALIDATION_FAIL",
    INVALID_CSV_FILE: "INVALID_CSV_FILE",
    DOWNLOAD_CSV_REPORT_FAIL: "DOWNLOAD_CSV_REPORT_FAIL",
});

export const ErrorFactory = {
    invalidInput: (message) =>
        new BrowserAgentError(
            message,
            ERROR_CODES.INVALID_INPUT
        ),

    fetchScheduledFailed: (error) =>
        new BrowserAgentError(
            `Failed to fetch scheduled extractions: ${error.message}`,
            ERROR_CODES.FETCH_SCHEDULED_FAILED,
            error
        ),

    browserLaunchFailed: (error) =>
        new BrowserAgentError(
            `Failed to launch browser: ${error.message}`,
            ERROR_CODES.BROWSER_LAUNCH_FAILED,
            error
        ),

    noPages: () =>
        new BrowserAgentError(
            "Browser has no pages available.",
            ERROR_CODES.NO_PAGES
        ),

    facilityValidationFail: (facilityValidationErrorMessage) =>
        new BrowserAgentError(
            facilityValidationErrorMessage,
            ERROR_CODES.FAC_VALIDATION_FAIL
        ),

    invalidCsvFile: (err) =>
        new BrowserAgentError(
            `Invalid CSV file: ${err.message}`,
            ERROR_CODES.INVALID_CSV_FILE,
            err
        ),

    downloadCSVReportFailed: (error) =>
        new BrowserAgentError(
            `Download CSV report resulted in a server error: ${error.message}`,
            ERROR_CODES.DOWNLOAD_CSV_REPORT_FAIL,
            error
        ),

};
