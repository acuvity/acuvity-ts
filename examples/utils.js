export async function getFileURLImport() {
    if (typeof Deno !== "undefined") {
        const { fromFileUrl } = await import("path");
        return fromFileUrl;
    } else {
        const { fileURLToPath } = await import("url");
        return fileURLToPath;
    }
}
