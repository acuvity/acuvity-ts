# Examples Folder

This folder contains example scripts to demonstrate the usage of the Acuvity SDK in TypeScript/JavaScript. These examples provide practical use cases and instructions for integrating and using the SDK in your projects.

This example scripts have tested from 3 runtimes, Node, Bun, Deno.

---

## Files in this Folder

The JS script demonstrates:
- How to load configurations and file paths dynamically.
- How to initialize the Acuvity SDK and use it to run a scan on given messages or files.
- How to handle responses from the scan and log them.

---

## Prerequisites

### Node
- The Acuvity SDK installed via npm in the project:
  ```bash
  npm install
    ```

### bun
- The Acuvity SDK installed via bun in the project:
  ```bash
  bun install
    ```

### bun
- The Acuvity SDK installed via bun in the project:
  ```bash
  deno install
    ```

---

## How to Run the Examples

### Node

1. Ensure your ACUVITY_TOKEN environment variable is set. You can do this by adding the following line to a .env file in your project root:
    ```bash
    export ACUVITY_TOKEN=<token>
    ```
2. Run the all example:
    ```bash
     npm test
    ```
3. To fetch all the guard names, available PIIs, secrets, run the following, similarly you run individual files from examples:
    ```bash
    node basic_api.js
    ```

### bun

1. Ensure your ACUVITY_TOKEN environment variable is set. You can do this by adding the following line to a .env file in your project root:
    ```bash
    export ACUVITY_TOKEN=<token>
    ```
2. Run the all example:
    ```bash
     npm run test_bun
    ```
3. To fetch all the guard names, available PIIs, secrets, run the following, similarly you run individual files from examples:
    ```bash
     bun basic_api.js
    ```

### deno

1. Ensure your ACUVITY_TOKEN environment variable is set. You can do this by adding the following line to a .env file in your project root:
    ```bash
    export ACUVITY_TOKEN=<token>
    ```
2. Run all examples:
    ```bash
    deno task all
    ```
3. To fetch all the guard names, available PIIs, secrets, run the following, similarly you run individual files from examples:
    ```bash
     deno run --allow-net --allow-read --allow-env basic_api.js
    ```
