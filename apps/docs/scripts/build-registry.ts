import fs from "fs-extra"
import path from "path"
import { z } from "zod"
import { components } from "../registry/components"
import { registryItemSchema, type RegistryItem } from "../registry/schema"

const SRC_DIR = path.join(process.cwd(), "src")
const REGISTRY_DIR = path.join(process.cwd(), "public", "registry")
const STYLES_DIR = path.join(REGISTRY_DIR, "styles", "default") // Assuming 'default' style for now

async function buildRegistry() {
    console.log("Building registry from config...")

    await fs.ensureDir(REGISTRY_DIR)
    await fs.ensureDir(STYLES_DIR)

    const registryIndex: any[] = []

    for (const component of components) {
        console.log(`Processing ${component.name}...`)

        let files: { path: string, content: string, type: "registry:ui" | "registry:component" | "registry:example" }[] = []

        // Handle source file
        const sourcePath = path.join(SRC_DIR, component.source.path)
        if (await fs.pathExists(sourcePath)) {
            const content = await fs.readFile(sourcePath, "utf-8")
            files.push({
                path: component.source.path,
                content,
                type: "registry:ui"
            })
        } else {
            console.warn(`Warning: Source file not found for ${component.id} at ${sourcePath}`)
            continue
        }

        // Construct Registry Item
        const registryItem: RegistryItem = {
            name: component.id,
            type: "components:ui",
            title: component.name,
            description: component.docs?.description,
            dependencies: component.dependencies,
            registryDependencies: component.metadata?.registryDependencies || [],
            files: files,
            meta: component.metadata,
            docs: component.docs?.slug,
            categories: [component.category]
        }

        try {
            // Validate against schema
            const validatedItem = registryItemSchema.parse(registryItem)

            // Write individual component file
            const componentPath = path.join(STYLES_DIR, `${component.id}.json`)
            await fs.writeJSON(componentPath, validatedItem, { spaces: 2 })

            // Add to index
            registryIndex.push({
                name: component.id,
                type: "components:ui",
                title: component.name,
                description: component.docs?.description,
                categories: [component.category]
            })

            console.log(`✓ Generated ${component.id}.json`)

        } catch (error) {
            console.error(`Error validating/writing ${component.id}:`, error)
        }
    }

    // Write Registry Index
    const indexPath = path.join(REGISTRY_DIR, "index.json")
    await fs.writeJSON(indexPath, registryIndex, { spaces: 2 })
    console.log(`✓ Generated registry index at ${indexPath}`)

    // Build Types Registry
    const TYPES_DIR = path.join(process.cwd(), "types")
    const TYPES_OUTPUT_DIR = path.join(REGISTRY_DIR, "types")

    if (await fs.pathExists(TYPES_DIR)) {
        await fs.ensureDir(TYPES_OUTPUT_DIR)
        const typeFiles = await fs.readdir(TYPES_DIR)
        const filteredTypeFiles = typeFiles.filter(file => file.endsWith(".ts") || file.endsWith(".tsx"))

        // Write types.json (manifest)
        await fs.writeJSON(path.join(REGISTRY_DIR, "types.json"), filteredTypeFiles, { spaces: 2 })

        // Copy type files
        for (const file of filteredTypeFiles) {
            await fs.copy(path.join(TYPES_DIR, file), path.join(TYPES_OUTPUT_DIR, file))
        }

        console.log(`✓ Generated types manifest and copied ${filteredTypeFiles.length} files to ${TYPES_OUTPUT_DIR}`)
    }
}

buildRegistry().catch(err => {
    console.error(err)
    process.exit(1)
})
