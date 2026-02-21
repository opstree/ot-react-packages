import fs from "fs-extra"
import path from "path"

const SEARCH_DIRS = [
    {
        path: path.join(process.cwd(), "src/components/docs"),
        basePath: "src/components/docs",
        category: "ui"
    },
    {
        path: path.join(process.cwd(), "../../packages/ui/src/components/ui"),
        basePath: "../../packages/ui/src/components/ui",
        category: "ui"
    }
]

const REGISTRY_FILE = path.join(process.cwd(), "src/registry/components.ts")

function extractMetadata(content: string, fileName: string, category: string) {
    const componentName = path.basename(fileName, ".tsx")
    const metadata = {
        name: componentName.toLowerCase(),
        title: componentName,
        description: `A ${componentName} component.`,
        category: category,
    }

    const jsDocRegex = /\/\*\*([\s\S]*?)\*\//
    const match = content.match(jsDocRegex)

    if (match) {
        const jsDoc = match[1]
        const nameMatch = jsDoc.match(/@name\s+(.+)/)
        const descMatch = jsDoc.match(/@description\s+(.+)/)
        const catMatch = jsDoc.match(/@category\s+(.+)/)

        if (nameMatch) metadata.title = nameMatch[1].trim()
        if (descMatch) metadata.description = descMatch[1].trim()
        if (catMatch) metadata.category = catMatch[1].trim()
    }

    return metadata
}

async function syncRegistry() {
    console.log("🚀 Syncing Registry Components...")

    const allComponents: any[] = []

    for (const dirInfo of SEARCH_DIRS) {
        if (!(await fs.pathExists(dirInfo.path))) {
            console.warn(`⚠️  Directory not found: ${dirInfo.path}`)
            continue
        }

        console.log(`📂 Scanning ${path.relative(process.cwd(), dirInfo.path)}...`)
        const files = await fs.readdir(dirInfo.path)

        for (const file of files) {
            if (!file.endsWith(".tsx") || file.includes(".test.")) continue

            const filePath = path.join(dirInfo.path, file)
            const content = await fs.readFile(filePath, "utf-8")
            const meta = extractMetadata(content, file, dirInfo.category)

            allComponents.push({
                name: meta.name,
                type: "registry:ui",
                title: meta.title,
                description: meta.description,
                dependencies: ["clsx", "tailwind-merge"],
                files: [
                    {
                        path: path.join(dirInfo.basePath, file).replace(/\\/g, "/"),
                        type: "registry:ui"
                    }
                ],
                categories: [meta.category]
            })
        }
    }

    console.log(`✅ Formatted ${allComponents.length} components.`)

    const registryContent = `
import { RegistryEntry } from "./schema"

export const components: RegistryEntry[] = ${JSON.stringify(allComponents, null, 2)}
`

    await fs.writeFile(REGISTRY_FILE, registryContent, "utf-8")
    console.log(`✨ Updated ${REGISTRY_FILE}`)
}

syncRegistry().catch(console.error)
