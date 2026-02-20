import { writeFile, mkdir, access } from "fs/promises"
import { constants } from "fs"
import path from "path"
import { confirm } from "../utils/prompts"

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

export async function theme() {
    const args = process.argv.slice(3)
    const subCommand = args[0]

    if (subCommand === "add") {
        const name = args[1]
        if (!name) {
            console.error("Please specify a theme name.")
            process.exit(1)
        }

        try {
            const projectRoot = process.cwd()
            const stylesDir = path.join(projectRoot, "styles")
            await ensureDir(stylesDir)

            const themePath = path.join(stylesDir, `${name}.css`)

            if (await pathExists(themePath)) {
                const overwrite = await confirm(`Theme ${name} already exists. Overwrite?`)
                if (!overwrite) return
            }

            const themeContent = `:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  /* Add more theme variables here */
}
`
            await writeFile(themePath, themeContent)
            console.log(`✓ Created theme: styles/${name}.css`)
            console.log(`Tip: Import this file in your main CSS or layout.`)

        } catch (error) {
            console.error("Error adding theme:", error)
        }
    } else {
        console.log(`
Usage: opscli theme <command>

Commands:
  add <name>   Add a new theme to your project
`)
    }
}
