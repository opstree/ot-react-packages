
import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COMPONENTS_DIR = path.join(process.cwd(), "src/components/docs")
const REGISTRY_FILE = path.join(process.cwd(), "registry/components.ts")

async function syncRegistry() {
    console.log("Syncing registry...")

    // 1. Get list of existing components from registry/components.ts
    // We'll use a simple regex to find IDs to avoid importing the file (which might cause TS issues if we're in a script)
    // or we could import it. Let's try reading the file content.
    if (!await fs.pathExists(REGISTRY_FILE)) {
        console.error(`Registry file not found at ${REGISTRY_FILE}`)
        process.exit(1)
    }

    let registryContent = await fs.readFile(REGISTRY_FILE, "utf-8")

    // Regex to find 'id: "value"'
    const existingIds: string[] = []
    const idRegex = /id:\s*"([^"]+)"/g
    let match
    while ((match = idRegex.exec(registryContent)) !== null) {
        existingIds.push(match[1])
    }

    console.log(`Found ${existingIds.length} existing components in registry.`)

    // 2. Scan components directory
    if (!await fs.pathExists(COMPONENTS_DIR)) {
        console.error(`Components directory not found at ${COMPONENTS_DIR}`)
        process.exit(1)
    }

    const files = await fs.readdir(COMPONENTS_DIR)
    const newComponents: string[] = []

    for (const file of files) {
        if (!file.endsWith(".tsx")) continue

        const name = path.basename(file, ".tsx")
        const id = name.toLowerCase()

        if (existingIds.includes(id)) {
            continue
        }

        console.log(`Found new component: ${name} (${id})`)

        // 3. Create component definition
        const componentDef = `
  {
    id: "${id}",
    name: "${name}",
    category: "component:ui", 
    framework: "react",
    version: "1.0.0",
    status: "beta",
    tags: ["${id}"],
    source: {
      type: "local",
      path: "components/docs/${file}"
    },
    dependencies: ["clsx", "tailwind-merge","react","react-dom","lucide-react","framer-motion"],
    metadata: {
      props: ["className"],
      variants: [],
      previewUrl: "/docs/components/${id}"
    },
    docs: {
      slug: "/components/${id}",
      title: "${name}",
      description: "Description for ${name}"
    }
  },`
        newComponents.push(componentDef)
    }

    if (newComponents.length === 0) {
        console.log("No new components found.")
        return
    }

    // 4. Append to registry file
    // Assumes the file ends with a closing bracket "]"
    const lastBracketIndex = registryContent.lastIndexOf("]")
    if (lastBracketIndex === -1) {
        console.error("Could not find closing bracket in registry file.")
        process.exit(1)
    }

    const newContent =
        registryContent.slice(0, lastBracketIndex) +
        newComponents.join("") +
        "\n" +
        registryContent.slice(lastBracketIndex)

    await fs.writeFile(REGISTRY_FILE, newContent, "utf-8")
    console.log(`Added ${newComponents.length} new components to registry/components.ts`)
}

syncRegistry().catch(console.error)
