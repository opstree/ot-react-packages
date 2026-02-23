import { constants } from "fs"
import path from "path"
import { confirm } from "../utils/prompts"
import fs from "fs/promises"

export interface RemoveOptions {
  /** Skip confirmation prompts */
  yes?: boolean
  /** Skip dependent-component safety check (still prompts unless --yes is also set) */
  force?: boolean
  /** Preview what would be removed without touching the filesystem */
  dryRun?: boolean
}

// ─── Helpers ────────────────────────────────────────────────────────────────

async function getComponentsDir(root: string): Promise<string> {
  const configPath = path.join(root, "components.json")
  if (await pathExists(configPath)) {
    try {
      const config = JSON.parse(await fs.readFile(configPath, "utf-8"))
      if (config.aliases?.ui) {
        // Handle alias like "@/components/ui" or "components/ui"
        const uiPath = config.aliases.ui.replace(/^@\//, "")
        return path.join(root, uiPath)
      }
    } catch {
      // Fallback if config is invalid
    }
  }
  return path.join(root, "components/ui")
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await fs.access(p, constants.F_OK)
    return true
  } catch {
    return false
  }
}

/**
 * Returns a normalised component name (no extension, lower-cased) for a given
 * filename, or null if the file doesn't look like a component file.
 */
function componentName(filename: string): string | null {
  const match = filename.match(/^(.+)\.(tsx|ts|js|jsx)$/)
  return match ? match[1].toLowerCase() : null
}


function importsComponent(content: string, component: string): boolean {
  const name = component.toLowerCase()
  // Static ESM imports
  const esmPattern = new RegExp(
    `from\\s+['"](\\.\\./)*${name}(\\.tsx?|\\.jsx?)?['"]`,
    "i"
  )
  // Dynamic require() calls
  const cjsPattern = new RegExp(
    `require\\(\\s*['"](\\.\\./)*${name}(\\.tsx?|\\.jsx?)?['"]\\s*\\)`,
    "i"
  )
  return esmPattern.test(content) || cjsPattern.test(content)
}

/**
 * Recursively scan `componentsDir` for files that import `component`.
 * The component itself is excluded from the results.
 */
async function findDependentComponents(
  component: string,
  componentsDir: string
): Promise<string[]> {
  if (!(await pathExists(componentsDir))) return []

  const entries = await fs.readdir(componentsDir, { withFileTypes: true })
  const dependents: string[] = []

  for (const entry of entries) {
    if (entry.isDirectory()) continue

    const name = componentName(entry.name)
    if (!name) continue
    // Skip the component itself
    if (name === component.toLowerCase()) continue

    const filePath = path.join(componentsDir, entry.name)
    const content = await fs.readFile(filePath, "utf-8")

    if (importsComponent(content, component)) {
      dependents.push(name)
    }
  }

  return dependents
}

// ─── Core removal logic ──────────────────────────────────────────────────────

async function removeTarget(
  targetPath: string,
  dryRun: boolean,
  root: string
): Promise<void> {
  const relative = path.relative(root, targetPath)

  if (dryRun) {
    console.log(`  ~ Would remove: ${relative}`)
    return
  }

  const stat = await fs.lstat(targetPath)
  if (stat.isDirectory()) {
    await fs.rm(targetPath, { recursive: true, force: true })
  } else {
    await fs.rm(targetPath)
  }

  console.log(`  ✓ Removed: ${relative}`)
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function remove(
  components: string[],
  options: RemoveOptions = {}
): Promise<void> {
  const { yes = false, force = false, dryRun = false } = options

  if (!components.length) {
    console.error("Please specify at least one component to remove.")
    process.exit(1)
  }

  const root = process.cwd()
  const componentsDir = await getComponentsDir(root)

  // Validate directory once before iterating
  if (!(await pathExists(componentsDir))) {
    console.error(`! Components directory not found: ${componentsDir}`)
    process.exit(1)
  }

  if (dryRun) {
    console.log("Dry-run mode — no files will be deleted.\n")
  }

  let anyRemoved = false

  for (const component of components) {
    console.log(`\nProcessing: ${component}`)

    // ── 1. Find matching files ─────────────────────────────────────────────
    const allFiles = await fs.readdir(componentsDir)
    const normalizedInput = componentName(component) || component.toLowerCase()

    const matches = allFiles.filter((f) => {
      const name = componentName(f)
      return name !== null && name === normalizedInput
    })

    if (matches.length === 0) {
      console.log(`  ! Not found, skipping.`)
      continue
    }

    // ── 2. Dependent-component safety check ───────────────────────────────
    if (!force) {
      const dependents = await findDependentComponents(component, componentsDir)

      if (dependents.length > 0) {
        console.log(
          `  ! "${component}" is imported by: ${dependents.join(", ")}`
        )
        console.log(
          `    Use --force to remove it anyway (you'll still be prompted).`
        )
        continue
      }
    }

    // ── 3. Confirmation prompt ─────────────────────────────────────────────
    if (!yes) {
      const ok = await confirm(
        `  Remove component "${component}"?`
      )
      if (!ok) {
        console.log(`Skipped.`)
        continue
      }
    }

    // ── 4. Delete ─────────────────────────────────────────────────────────
    for (const match of matches) {
      const targetPath = path.join(componentsDir, match)
      if (await pathExists(targetPath)) {
        await removeTarget(targetPath, dryRun, root)
        anyRemoved = true
      }
    }
  }

  console.log(
    anyRemoved
      ? `\n✔ Done.${dryRun ? " (dry-run — nothing was deleted)" : ""}`
      : "\n✔ Nothing was removed."
  )
}