import { Command } from "commander"
import { z } from "zod"
import fs from "fs-extra"
import path from "path"

const registrySchema = z.array(
    z.object({
        name: z.string(),
        type: z.string(),
    })
)

const REGISTRY_URL = "https://raw.githubusercontent.com/GOURAVSINGH19/Ops-Ui/main/apps/docs/scripts/registry.json"

async function findRoot(startDir: string): Promise<string | null> {
    let currentDir = startDir
    while (currentDir !== path.parse(currentDir).root) {
        if (await fs.pathExists(path.join(currentDir, "pnpm-workspace.yaml"))) {
            return currentDir
        }
        currentDir = path.dirname(currentDir)
    }
    return null
}

export const list = new Command()
    .name("list")
    .description("List all available components")
    .action(async () => {
        try {
            let registryRaw;
            const root = await findRoot(process.cwd())
            const localPath = root ? path.join(root, "apps/docs/scripts/registry.json") : null

            if (localPath && await fs.pathExists(localPath)) {
                registryRaw = await fs.readJSON(localPath)
            } else {
                try {
                    const response = await fetch(REGISTRY_URL)
                    if (!response.ok) throw new Error("Remote registry not reachable")
                    registryRaw = await response.json()
                } catch (e) {
                    console.error("Could not fetch registry from remote or find it locally.")
                    process.exit(1)
                }
            }

            const registry = registrySchema.parse(registryRaw)

            if (registry.length === 0) {
                console.log("No components found in the registry.")
                return
            }

            console.log("\nAvailable components:")
            registry.forEach((component) => {
                console.log(`- ${component.name} (${component.type})`)
            })
            console.log(`\nTotal components: ${registry.length}`)

        } catch (error) {
            console.error("Error listing components:", error)
            process.exit(1)
        }
    })
