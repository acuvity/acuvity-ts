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

### Node
- Node.js installed (v16+ recommended).
- The Acuvity SDK installed via npm in the project:
  ```bash
  npm install @acuvity/acuvity
    ```

### bun
- bun installed
- The Acuvity SDK installed via bun in the project:
  ```bash
  bun install @acuvity/acuvity
    ```

---

## For local development, after build the local acuvity package.

### Node
  ```bash
  npm link @acuvity/acuvity
  ```

### bun
  ```bash
  bun link @acuvity/acuvity
  ```

---

## How to Run the Examples

### Node
1. Install the required dependencies:
   ```bash
   npm install
   ```
2. Ensure your ACUVITY_TOKEN environment variable is set. You can do this by adding the following line to a .env file in your project root:
    ```bash
    export ACUVITY_TOKEN=<token>
    ```
3. To fetch all the guard names, available PIIs, secrets, run the following:
    ```bash
    node basic_api.js
    ```
4. Run the files example:
    ```bash
     node basic_file.js
    ```

### bun

1. Install the required dependencies:
   ```bash
   bun install
   ```
2. Ensure your ACUVITY_TOKEN environment variable is set. You can do this by adding the following line to a .env file in your project root:
    ```bash
    export ACUVITY_TOKEN=<token>
    ```
3. To fetch all the guard names, available PIIs, secrets, run the following:
    ```bash
    bun basic_api.js
    ```
4. Run the files example:
    ```bash
     bun basic_file.js
    ```
