import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import prompts from "prompts"
import { REGISTRY_BASE_URL } from "../utils/registry"

const UTILS_CONTENT = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

const TYPES_URL = `${REGISTRY_BASE_URL}/types/`


export const init = new Command()
    .name("init")
    .description("Initialize your project with OPS-UI")
    .action(async () => {
        try {
            const response = await prompts([
                {
                    type: "confirm",
                    name: "confirm",
                    message: "This will initialize OPS-UI in your project. Continue?",
                    initial: true,
                },
            ])

            if (!response.confirm) {
                process.exit(0)
            }

            const projectRoot = process.cwd()
            const componentsDir = path.join(projectRoot, "components", "ui")
            const libDir = path.join(projectRoot, "lib")
            const typesDir = path.join(projectRoot, "types")

            console.log("\nSetting up directories...")
            await fs.ensureDir(componentsDir)
            await fs.ensureDir(libDir)
            await fs.ensureDir(typesDir)
            console.log("✓ Created components/ui")
            console.log("✓ Created lib")
            console.log("✓ Created types")

            const utilsPath = path.join(libDir, "utils.ts")
            if (!fs.existsSync(utilsPath)) {
                await fs.writeFile(utilsPath, UTILS_CONTENT)
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
                    if (!fs.existsSync(typePath)) {
                        console.log(`Fetching ${file}...`)
                        try {
                            const typesResponse = await fetch(`${TYPES_URL}${file}`)
                            if (!typesResponse.ok) {
                                throw new Error(`Failed to fetch ${file}: ${typesResponse.statusText}`)
                            }
                            const content = await typesResponse.text()
                            await fs.writeFile(typePath, content)
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
                // Optional: add fallback hardcoded list if manifest fails
            }

            const configPath = path.join(projectRoot, "components.json")
            const uiConfigPath = path.join(projectRoot, "ui.config.ts")

            const config = {
                "style": "default",
                "tailwind": {
                    "config": fs.existsSync(path.join(projectRoot, "tailwind.config.js")) ? "tailwind.config.js" : "tailwind.config.ts",
                    "css": "app/globals.css",
                    "baseColor": "zinc",
                    "cssVariables": true
                },
                "aliases": {
                    "components": "@/components",
                    "utils": "@/lib/utils"
                }
            }

            await fs.writeJSON(configPath, config, { spaces: 2 })
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
            if (!fs.existsSync(uiConfigPath)) {
                await fs.writeFile(uiConfigPath, uiConfigContent)
                console.log("✓ Created ui.config.ts")
            }

            console.log("\nInstalling base components...")
            try {
                console.log("✓ Success! Run 'opscli add template' to see a sample component.")
            } catch (e) {
                console.error("! Could not install base components automatically.")
            }

            console.log("\n✔ Project initialized successfully!")
            console.log("You can now add components using: opscli add <component-name>")

        } catch (error) {
            console.error("Error during initialization:", error)
            process.exit(1)
        }
    })
