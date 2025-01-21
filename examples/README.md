# Examples Folder

This folder contains example scripts to demonstrate the usage of the Acuvity SDK in TypeScript/JavaScript. These examples provide practical use cases and instructions for integrating and using the SDK in your projects.

---

## Files in this Folder

The JS script demonstrates:
- How to load configurations and file paths dynamically.
- How to initialize the Acuvity SDK and use it to run a scan on given messages or files.
- How to handle responses from the scan and log them.
- How to handle potential errors during the scanning process.

---

## Prerequisites

- Node.js installed (v16+ recommended).
- The Acuvity SDK installed via npm in the parent project:
  ```bash
  npm install @acuvity/acuvity
    ```

---

## How to Run the Examples

1. Install the required dependencies:
   ```bash
   npm install
   ```
2. Ensure your ACUVITY_TOKEN environment variable is set. You can do this by adding the following line to a .env file in your project root:
    ```bash
    export ACUVITY_TOKEN=<token>
    ```
3. Run the basic_file.js example:
    ```bash
     node basic_file.js
    ```
