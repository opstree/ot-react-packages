import fs from "fs-extra"
import path from "path"
import { registry } from "../src/registry"
import { registryEntrySchema, type RegistryEntry } from "../src/registry/schema"

const REGISTRY_DIR = path.join(process.cwd(), "public", "registry")
const MANIFESTS_DIR = path.join(REGISTRY_DIR, "components")

async function buildRegistry() {
    console.log("🚀 Building OPS-UI Registry...")

    await fs.ensureDir(REGISTRY_DIR)
    await fs.ensureDir(MANIFESTS_DIR)

    const fullRegistry: RegistryEntry[] = []

    for (const [category, items] of Object.entries(registry)) {
        for (const item of items) {
            console.log(`📦 Processing ${item.name}...`)

            const processedFiles = await Promise.all(
                (item.files || []).map(async (file) => {
                    let sourcePath = path.resolve(process.cwd(), "src", file.path)

                    if (!(await fs.pathExists(sourcePath))) {
                        sourcePath = path.resolve(process.cwd(), file.path)
                    }

                    if (await fs.pathExists(sourcePath)) {
                        let content = await fs.readFile(sourcePath, "utf-8")
                        console.log(`  🔍 Read ${item.name} from ${sourcePath}`)

                        // Transform imports for the registry
                        const originalContent = content;
                        content = content.replace(/from ["']@workspace\/ui\/lib\/utils["']/g, 'from "@/lib/utils"')
                        content = content.replace(/from ["']\.\.\/\.\.\/lib\/(cn|utils)["']/g, 'from "@/lib/utils"')
                        content = content.replace(/from ["']@\/lib\/cn["']/g, 'from "@/lib/utils"')

                        if (content !== originalContent) {
                            console.log(`  ✨ Transformed imports in ${item.name}`)
                        }

                        const fileName = path.basename(file.path)
                        return {
                            ...file,
                            path: fileName, // Update path to just be the filename for the manifest
                            content,
                        }
                    } else {
                        console.warn(`⚠️File not found: ${file.path} at ${sourcePath}`)
                        return file
                    }
                })
            )

            const entry: RegistryEntry = {
                ...item,
                files: processedFiles,
            }

            try {
                const validatedItem = registryEntrySchema.parse(entry)

                // Write individual manifest
                const componentPath = path.join(MANIFESTS_DIR, `${item.name}.json`)
                await fs.writeJSON(componentPath, validatedItem, { spaces: 2 })

                fullRegistry.push(validatedItem)
                console.log(`  ✓ Generated manifest ${item.name}.json`)
            } catch (error) {
                console.error(`  ❌ Validation error for ${item.name}:`, error)
            }
        }
    }

    // Write aggregate registry.json
    await fs.writeJSON(path.join(REGISTRY_DIR, "registry.json"), fullRegistry, { spaces: 2 })
    console.log(`✨ Generated aggregate registry.json`)

    // Compatibility index.json
    const index = fullRegistry.map(item => ({
        name: item.name,
        type: item.type,
        title: item.title,
        description: item.description,
        categories: item.categories
    }))
    await fs.writeJSON(path.join(REGISTRY_DIR, "index.json"), index, { spaces: 2 })
    console.log(`✨ Generated compatibility index.json`)
}

buildRegistry().catch(err => {
    console.error(err)
    process.exit(1)
})
