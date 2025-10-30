# 🧩 Custom Error Handling POC

## 📘 Overview

This project is a **Proof of Concept (POC)** demonstrating a structured way to handle and wrap errors in JavaScript using a **custom error class** (`BrowserAgentError`) and a centralized **ErrorFactory**.  

It provides:

- ✅ Consistent error codes  
- ✅ Nested (wrapped) errors for tracing root causes  
- ✅ Formatted, developer-friendly console output  

---

## 📂 Project Structure

```
├── app.js # Entry point - runs test functions and prints   formatted error info
├── script.js # Simulates app logic that throws or wraps errors
└── error.js # Defines custom error class and factory
```

---

## ⚙️ How It Works

### 1. `error.js`
Defines the `BrowserAgentError` class (extends `Error`) and the `ErrorFactory`.  

**Key features:**

- Adds a unique code for each error  
- Supports nested errors using the `originalError` parameter  
- Keeps the stack trace of the original cause  

**Example:**

```javascript
throw ErrorFactory.invalidInput("Invalid input provided.");
```
### 2. `script.js`

Simulates multiple scenarios that trigger both **custom** and **standard** errors.

| Function                  | Description                        | Error Code                 |
|----------------------------|------------------------------------|----------------------------|
| `validateInput()`          | Simple invalid input error         | `INVALID_INPUT`            |
| `fetchScheduledData()`     | Wraps a JS error                   | `FETCH_SCHEDULED_FAILED`   |
| `launchBrowser()`          | Nested custom error                | `BROWSER_LAUNCH_FAILED`    |
| `downloadCSVReport()`      | Deeply nested (3-level) error      | `DOWNLOAD_CSV_REPORT_FAIL` |
| `performNonCustomAction()` | Regular JS Error                    | —                          |

### 3. `app.js`

Entry point that:

- Calls one function at a time (uncomment to test)  
- Catches and identifies whether the error is **custom** or **standard**  
- Prints a nicely formatted error summary

## 🧪 Example Run

**Command:**

```bash
node app.js
```

**Output (example for `downloadCSVReport()`):**

```text
Downloading CSV report...
Validating CSV report...
BrowserAgentError: Facility validation failed for CSV_Facility.
    at Object.facilityValidationFail (file:///D:/Workplace/custome-error-codes/error.js:53:9)
    at validateFacility (file:///D:/Workplace/custome-error-codes/script.js:35:24)
    at validateCsvFile (file:///D:/Workplace/custome-error-codes/script.js:42:9)
    at Module.downloadCSVReport (file:///D:/Workplace/custome-error-codes/script.js:52:9)
    at file:///D:/Workplace/custome-error-codes/app.js:5:12
    at ModuleJob.run (node:internal/modules/esm/module_job:274:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:644:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5) {
  code: 'FAC_VALIDATION_FAIL'
}

===== Formated Error Detailes =====
Message: Download CSV report resulted in a server error: Invalid CSV file: Facility validation failed for CSV_Facility.
Code   : FAC_VALIDATION_FAIL
Type   : BrowserAgentError
Stack  : BrowserAgentError: Facility validation failed for CSV_Facility.
    at Object.facilityValidationFail (file:///D:/Workplace/custome-error-codes/error.js:53:9)
    at validateFacility (file:///D:/Workplace/custome-error-codes/script.js:35:24)
    at validateCsvFile (file:///D:/Workplace/custome-error-codes/script.js:42:9)
    at Module.downloadCSVReport (file:///D:/Workplace/custome-error-codes/script.js:52:9)
    at file:///D:/Workplace/custome-error-codes/app.js:5:12
    at ModuleJob.run (node:internal/modules/esm/module_job:274:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:644:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)

```
