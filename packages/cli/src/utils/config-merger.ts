import { readFile, writeFile } from "fs/promises"
import path from "path"

/**
 * Safely merges a JSON configuration file.
 * If the file doesn't exist, it creates it with the new content.
 * If it exists, it merges the top-level keys.
 */
export async function mergeJsonFile(filePath: string, newContent: Record<string, any>) {
    let existingContent: Record<string, any> = {}

    try {
        const fileData = await readFile(filePath, "utf-8")
        existingContent = JSON.parse(fileData)
    } catch (err) {
        // File doesn't exist or is invalid, start with empty object
    }

    const merged = { ...existingContent, ...newContent }

    // Special case for nested objects we want to merge instead of overwrite
    if (existingContent.tailwind && newContent.tailwind) {
        merged.tailwind = { ...existingContent.tailwind, ...newContent.tailwind }
    }

    if (existingContent.aliases && newContent.aliases) {
        merged.aliases = { ...existingContent.aliases, ...newContent.aliases }
    }

    await writeFile(filePath, JSON.stringify(merged, null, 2))
}

/**
 * Updates tsconfig.json to include path aliases safely.
 */
export async function updateTsConfig(root: string, aliases: Record<string, string>) {
    const tsConfigPath = path.join(root, "tsconfig.json")
    try {
        const content = await readFile(tsConfigPath, "utf-8")
        // Use a simple regex-based approach for common tsconfig structures if possible,
        // or parse as JSON if it's strictly valid. tsconfig often has comments, so JSON.parse might fail.
        // For now, we'll try JSON.parse and fallback to a warning.
        const config = JSON.parse(content.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, ""))

        config.compilerOptions = config.compilerOptions || {}
        config.compilerOptions.paths = config.compilerOptions.paths || {}

        for (const [key, val] of Object.entries(aliases)) {
            config.compilerOptions.paths[key] = [val]
        }

        await writeFile(tsConfigPath, JSON.stringify(config, null, 2))
        console.log("✓ Updated tsconfig.json with path aliases")
    } catch (err) {
        console.log("! Could not safely update tsconfig.json. Please add aliases manually.")
    }
}
