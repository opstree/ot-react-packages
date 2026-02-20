import { writeFile, mkdir, access } from "fs/promises"
import { constants } from "fs"
import path from "path"
import { confirm } from "../utils/prompts"
import { REGISTRY_BASE_URL } from "../utils/registry"

const UTILS_CONTENT = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

const TYPES_URL = `${REGISTRY_BASE_URL}/types/`

async function pathExists(p: string): Promise<boolean> {
    try {
        await access(p, constants.F_OK)
        return true
    } catch {
        return false
    }
}

async function ensureDir(p: string) {
    if (!(await pathExists(p))) {
        await mkdir(p, { recursive: true })
    }
}

export async function init() {
    try {
        const isConfirmed = await confirm("This will initialize OPS-UI in your project. Continue?")

        if (!isConfirmed) {
            process.exit(0)
        }

        const projectRoot = process.cwd()
        const componentsDir = path.join(projectRoot, "components", "ui")
        const libDir = path.join(projectRoot, "lib")
        const typesDir = path.join(projectRoot, "types")

        console.log("\nSetting up directories...")
        await ensureDir(componentsDir)
        await ensureDir(libDir)
        await ensureDir(typesDir)
        console.log("✓ Created components/ui")
        console.log("✓ Created lib")
        console.log("✓ Created types")

        const utilsPath = path.join(libDir, "utils.ts")
        if (!(await pathExists(utilsPath))) {
            await writeFile(utilsPath, UTILS_CONTENT)
            console.log("✓ Created lib/utils.ts")
        } else {
            console.log("! lib/utils.ts already exists, skipping")
        }

        console.log("Fetching types manifest...")
        try {
            // Fetch from the new registry location
            const typesJsonURL = `${REGISTRY_BASE_URL}/types.json`
            const typesJsonResponse = await fetch(typesJsonURL)
            if (!typesJsonResponse.ok) {
                throw new Error(`Failed to fetch types manifest: ${typesJsonResponse.statusText}`)
            }
            const typeFiles = await typesJsonResponse.json() as string[]

            for (const file of typeFiles) {
                const typePath = path.join(typesDir, file)
                if (!(await pathExists(typePath))) {
                    try {
                        const typesResponse = await fetch(`${TYPES_URL}${file}`)
                        if (!typesResponse.ok) {
                            throw new Error(`Failed to fetch ${file}: ${typesResponse.statusText}`)
                        }
                        const content = await typesResponse.text()
                        await writeFile(typePath, content)
                        console.log(`✓ Created types/${file}`)
                    } catch (err) {
                        console.error(`! Could not fetch ${file} from remote.`)
                        throw err
                    }
                } else {
                    console.log(`! types/${file} already exists, skipping`)
                }
            }
        } catch (err) {
            console.error("! Could not fetch types manifest. Falling back to default types.", err)
        }

        const configPath = path.join(projectRoot, "components.json")
        const uiConfigPath = path.join(projectRoot, "ui.config.ts")

        const config = {
            "style": "default",
            "tailwind": {
                "config": (await pathExists(path.join(projectRoot, "tailwind.config.js"))) ? "tailwind.config.js" : "tailwind.config.ts",
                "css": "app/globals.css",
                "baseColor": "zinc",
                "cssVariables": true
            },
            "aliases": {
                "components": "@/components",
                "utils": "@/lib/utils"
            }
        }

        await writeFile(configPath, JSON.stringify(config, null, 2))
        console.log("✓ Created components.json")

        const uiConfigContent = `import { defineConfig } from "./types/config"

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#10b981",
      },
    },
  },
})
`
        if (!(await pathExists(uiConfigPath))) {
            await writeFile(uiConfigPath, uiConfigContent)
            console.log("✓ Created ui.config.ts")
        }

        console.log("\nInstalling base components...")
        console.log("✓ Success! Run 'opscli add template' to see a sample component.")

        console.log("\n✔ Project initialized successfully!")
        console.log("You can now add components using: opscli add <component-name>")

    } catch (error) {
        console.error("Error during initialization:", error)
        process.exit(1)
    }
}
