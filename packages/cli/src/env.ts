import path from "path"
import { loadEnvFile } from "node:process"

try {
    // Try to load .env from the directory where the CLI is installed (dist/..)
    loadEnvFile(path.join(__dirname, "../.env"))
} catch (e) {
    // Gracefully ignore if file not found
}

try {
    // Also try to load .env from the current working directory
    loadEnvFile()
} catch (e) {
    // Gracefully ignore if file not found
}
