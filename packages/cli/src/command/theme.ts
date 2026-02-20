import { Command } from "commander"
import fs from "fs-extra"
import path from "path"
import prompts from "prompts"

export const theme = new Command()
    .name("theme")
    .description("Manage themes for your project")

theme
    .command("add")
    .description("Add a new theme to your project")
    .argument("<name>", "the name of the theme")
    .action(async (name) => {
        try {
            const projectRoot = process.cwd()
            const stylesDir = path.join(projectRoot, "styles")
            await fs.ensureDir(stylesDir)

            const themePath = path.join(stylesDir, `${name}.css`)

            if (fs.existsSync(themePath)) {
                const response = await prompts({
                    type: "confirm",
                    name: "overwrite",
                    message: `Theme ${name} already exists. Overwrite?`,
                    initial: false
                })
                if (!response.overwrite) return
            }

            const themeContent = `:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  /* Add more theme variables here */
}
`
            await fs.writeFile(themePath, themeContent)
            console.log(`✓ Created theme: styles/${name}.css`)
            console.log(`Tip: Import this file in your main CSS or layout.`)

        } catch (error) {
            console.error("Error adding theme:", error)
        }
    })
