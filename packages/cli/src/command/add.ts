import { writeFile, mkdir, access, readFile } from "fs/promises"
import { constants } from "fs"
import path from "path"
import { execSync } from "child_process"
import { confirm } from "../utils/prompts"
import { REGISTRY_BASE_URL } from "../utils/registry"

interface AddOptions {
  yes?: boolean
  force?: boolean
  dryRun?: boolean
}

interface ComponentManifest {
  name: string
  files: {
    path: string
    content: string
    type?: string
  }[]
  dependencies?: string[]
  registryDependencies?: string[]
}

async function pathExists(p: string) {
  try {
    await access(p, constants.F_OK)
    return true
  } catch {
    return false
  }
}

function installDeps(pkgs: string[], dryRun?: boolean) {
  if (!pkgs.length) return
  console.log(`\n📦 Installing external dependencies: ${pkgs.join(", ")}...`)
  if (!dryRun) {
    try {
      execSync(`npm install ${pkgs.join(" ")}`, { stdio: "inherit" })
    } catch (err) {
      console.error("! Failed to install dependencies. Please run manually:")
      console.log(`npm install ${pkgs.join(" ")}`)
    }
  }
}

async function getProjectRoot() {
  const root = process.cwd()
  const configPath = path.join(root, "components.json")

  if (!(await pathExists(configPath))) {
    throw new Error(
      "OPS-UI is not initialized. Run `opscli init` first."
    )
  }

  return root
}

async function getInstalledDeps(root: string) {
  try {
    const pkg = JSON.parse(
      await readFile(path.join(root, "package.json"), "utf-8")
    )
    return {
      ...pkg.dependencies,
      ...pkg.devDependencies
    }
  } catch (err) {
    return {}
  }
}

async function fetchManifest(name: string): Promise<ComponentManifest> {
  const res = await fetch(
    `${REGISTRY_BASE_URL}/components/${name}.json`
  )
  if (!res.ok) {
    throw new Error(`Component "${name}" not found in registry (HTTP ${res.status}).`)
  }
  return res.json()
}

async function fetchFile(file: string): Promise<string> {
  const res = await fetch(`${REGISTRY_BASE_URL}/files/${file}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch file ${file} (HTTP ${res.status})`)
  }
  return res.text()
}

async function ensureDir(dir: string, dryRun?: boolean) {
  if (!(await pathExists(dir))) {
    if (!dryRun) await mkdir(dir, { recursive: true })
  }
}

async function writeComponentFile(
  root: string,
  file: string,
  content: string,
  options: AddOptions
): Promise<boolean> {
  const targetPath = path.join(root, "components/docs", file)
  await ensureDir(path.dirname(targetPath), options.dryRun)

  if (await pathExists(targetPath) && !options.force) {
    if (!options.yes) {
      const overwrite = await confirm(
        `${file} already exists. Overwrite?`,
        false
      )
      if (!overwrite) {
        console.log(`! Skipped ${file}`)
        return false
      }
    }
  }

  if (!options.dryRun) {
    await writeFile(targetPath, content)
  }

  console.log(`✓ Added components/docs/${file}`)
  return true
}

async function resolveAndInstallExternalDeps(
  manifest: ComponentManifest,
  installedDeps: Record<string, any>,
  dryRun?: boolean
) {
  const externalDeps = manifest.dependencies || []
  const missing = externalDeps.filter((d) => !installedDeps[d])

  if (missing.length > 0) {
    installDeps(missing, dryRun)
  }
}

async function processComponent(
  name: string,
  root: string,
  installedDeps: Record<string, any>,
  options: AddOptions,
  visited = new Set<string>()
): Promise<boolean> {
  if (visited.has(name)) return false
  visited.add(name)

  let componentAdded = false
  console.log(`\n🚚 Adding ${name}...`)

  let manifest: ComponentManifest
  try {
    manifest = await fetchManifest(name)
  } catch (err: any) {
    console.error(`! Could not fetch manifest for ${name}: ${err.message}`)
    return false
  }

  // Resolve registry dependencies (sub-components) FIRST
  if (manifest.registryDependencies?.length) {
    for (const dep of manifest.registryDependencies) {
      const depAdded = await processComponent(dep, root, installedDeps, options, visited)
      if (depAdded) componentAdded = true
    }
  }

  // Install external npm dependencies
  await resolveAndInstallExternalDeps(manifest, installedDeps, options.dryRun)

  // Write component files
  for (const file of manifest.files) {
    try {
      const added = await writeComponentFile(root, file.path, file.content, options)
      if (added) componentAdded = true
    } catch (err: any) {
      console.error(`! Failed to add ${file.path}: ${err.message}`)
    }
  }

  return componentAdded
}

export async function add(
  components: string[],
  options: AddOptions = {}
) {
  try {
    if (!components || components.length === 0) {
      throw new Error("Please specify at least one component (e.g., opscli add button).")
    }

    const root = await getProjectRoot()
    const installedDeps = await getInstalledDeps(root)

    await ensureDir(path.join(root, "components/docs"), options.dryRun)

    let anyComponentAdded = false
    for (const component of components) {
      const added = await processComponent(
        component,
        root,
        installedDeps,
        options
      )
      if (added) anyComponentAdded = true
    }

    if (anyComponentAdded) {
      console.log("\n✔ Components added successfully!")
      console.log("\nYou can now import them in your project:")
      console.log("\n")
    }
  } catch (err: any) {
    console.error("\n❌ Failed to add components:", err.message)
    process.exit(1)
  }
}
