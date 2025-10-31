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

export const ERROR_CODES = Object.freeze({
    INVALID_INPUT: "INVALID_INPUT",
    FETCH_SCHEDULED_FAILED: "FETCH_SCHEDULED_FAILED",
    BROWSER_LAUNCH_FAILED: "BROWSER_LAUNCH_FAILED",
    NO_PAGES: "NO_PAGES",
    FAC_VALIDATION_FAIL: "FAC_VALIDATION_FAIL",
    INVALID_CSV_FILE: "INVALID_CSV_FILE",
    DOWNLOAD_CSV_REPORT_FAIL: "DOWNLOAD_CSV_REPORT_FAIL",
});
