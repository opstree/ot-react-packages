import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import { fetchRegistryIndex, resolveDependencies } from "../utils/registry"

export const add = new Command()
    .name("add")
    .description("Add a component to your project")
    .argument("<component>", "the component to add")
    .action(async (componentName) => {
        try {
            console.log(`Checking registry for ${componentName}...`)
            const registryIndex = await fetchRegistryIndex()
            const entry = registryIndex.find((entry) => entry.name === componentName)

            if (!entry) {
                console.error(`Component ${componentName} not found in registry.`)
                process.exit(1)
            }

            console.log(`Found ${componentName}. Resolving dependencies...`)

            // TODO: get style from config
            const style = "default"
            const componentsToAdd = await resolveDependencies(componentName, style)

            const targetDir = path.join(process.cwd(), "components/ui")
            if (!fs.existsSync(targetDir)) {
                await fs.ensureDir(targetDir)
            }

            for (const component of componentsToAdd) {
                console.log(`Installing ${component.name}...`)
                if (component.files) {
                    for (const file of component.files) {
                        const fileName = path.basename(file.path)
                        let filePath = path.join(targetDir, fileName)

                        if (file.path.includes("/") && fileName === "index.tsx") {
                            const componentFolder = path.join(targetDir, component.name)
                            await fs.ensureDir(componentFolder)
                            filePath = path.join(componentFolder, "index.tsx")
                        }

                        await fs.writeFile(filePath, file.content)
                        console.log(`✓ Installed ${path.relative(process.cwd(), filePath)}`)
                    }
                }
            }

            console.log(`\nSuccessfully added ${componentName} and its dependencies.`)

        } catch (error) {
            console.error("Error adding component:", error)
            process.exit(1)
        }
    })
