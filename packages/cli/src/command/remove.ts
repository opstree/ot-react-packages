import { rm, access } from "fs/promises"
import { constants } from "fs"
import path from "path"
import { confirm } from "../utils/prompts"
import fs from "fs/promises"
export interface RemoveOptions {
  yes?: boolean
  force?: boolean
  dryRun?: boolean
}

async function pathExists(p: string) {
  try {
    await access(p, constants.F_OK)
    return true
  } catch {
    return false
  }
}

// Recursively find sub-components that depend on a component
async function findDependentComponents(
  component: string,
  root: string
): Promise<string[]> {
  const componentsDir = path.join(root, "components/ui")
  const files = await fs.readdir(componentsDir)
  const dependents: string[] = []

  for (const file of files) {
    const filePath = path.join(componentsDir, file)
    const content = await fs.readFile(filePath, "utf-8")
    if (content.includes(component)) {
      dependents.push(file.replace(/\.(tsx|ts|js)$/, ""))
    }
  }

  return dependents
}

export async function remove(
  components: string[],
  options: RemoveOptions = {}
) {
  try {
    if (!components.length) {
      throw new Error("Please specify at least one component to remove.")
    }

    const root = process.cwd()
    const componentsDir = path.join(root, "components/ui")

    for (const component of components) {
      const targetPathTsx = path.join(componentsDir, `${component}.tsx`)
      const targetPathTs = path.join(componentsDir, `${component}.ts`)
      const targetPathJs = path.join(componentsDir, `${component}.js`)

      const exists =
        (await pathExists(targetPathTsx)) ||
        (await pathExists(targetPathTs)) ||
        (await pathExists(targetPathJs))

      if (!exists) {
        console.log(`! Component ${component} not found, skipping.`)
        continue
      }

      // Check for dependent components
      const dependents = await findDependentComponents(component, root)
      if (dependents.length && !options.force) {
        console.log(
          `! Cannot remove "${component}" because other components depend on it: ${dependents.join(
            ", "
          )}`
        )
        continue
      }

      // Ask confirmation if not forced
      if (!options.yes && !options.force) {
        const ok = await confirm(`Remove component "${component}"?`)
        if (!ok) {
          console.log(`Skipped ${component}`)
          continue
        }
      }

      // Remove files
      for (const filePath of [targetPathTsx, targetPathTs, targetPathJs]) {
        if (await pathExists(filePath)) {
          if (!options.dryRun) await rm(filePath)
          console.log(`✓ Removed ${path.relative(root, filePath)}`)
        }
      }
    }

    console.log("\n✔ Component removal complete.")
  } catch (err) {
    console.error("\nFailed to remove component:", err)
    process.exit(1)
  }
}