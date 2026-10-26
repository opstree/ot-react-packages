import { writeFile, mkdir, access, readFile } from "fs/promises"
import { constants } from "fs"
import path from "path"
import { confirm } from "../utils/prompts"
import { REGISTRY_BASE_URL } from "../utils/registry"
import { installDependencies } from "../utils/package-manager"
import ts from "typescript"

export interface AddOptions {
  yes?: boolean
  force?: boolean
  dryRun?: boolean
  skipInstall?: boolean
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

async function getInstalledDeps(root: string): Promise<Record<string, any>> {
  const deps: Record<string, any> = {}
  let currentDir = root
  const parsedRoot = path.parse(currentDir).root

  while (currentDir && currentDir !== parsedRoot) {
    const pkgPath = path.join(currentDir, "package.json")
    if (await pathExists(pkgPath)) {
      try {
        const pkg = JSON.parse(await readFile(pkgPath, "utf-8"))
        Object.assign(deps, pkg.dependencies, pkg.devDependencies, pkg.peerDependencies)
      } catch {
        // ignore parse errors
      }
    }
    const isWorkspace =
      (await pathExists(path.join(currentDir, "pnpm-workspace.yaml"))) ||
      (await pathExists(path.join(currentDir, "turbo.json"))) ||
      (await pathExists(path.join(currentDir, "pnpm-lock.yaml"))) ||
      (await pathExists(path.join(currentDir, "package-lock.json")))

    if (isWorkspace && currentDir !== root) {
      break
    }
    currentDir = path.dirname(currentDir)
    if (path.relative(currentDir, root).split(path.sep).length > 3) break
  }

  return deps
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


async function ensureDir(dir: string, dryRun?: boolean) {
  if (!(await pathExists(dir))) {
    if (!dryRun) await mkdir(dir, { recursive: true })
  }
}

async function resolveAliasToPath(root: string, alias: string): Promise<string> {
  const cleaned = alias.replace(/^[@~]\//, "")

  // Check tsconfig.json or jsconfig.json for paths alias mapping
  for (const configFile of ["tsconfig.json", "jsconfig.json"]) {
    const p = path.join(root, configFile)
    if (await pathExists(p)) {
      try {
        const config = JSON.parse(await readFile(p, "utf-8"))
        const pathsMap = config.compilerOptions?.paths || {}
        const aliasTarget = pathsMap["@/*"]?.[0] || pathsMap["@*"]?.[0]
        if (aliasTarget) {
          // e.g. "./src/*" -> "src", "./*" -> ""
          const prefix = aliasTarget.replace(/^\.\//, "").replace(/\*$/, "").replace(/\/$/, "")
          if (prefix && prefix !== ".") {
            return path.join(prefix, cleaned)
          }
          return cleaned
        }
      } catch {
        // ignore parse error
      }
    }
  }

  // Fallback: If src directory exists and contains components, app, or pages (common Next.js pattern)
  if (await pathExists(path.join(root, "src"))) {
    if (
      (await pathExists(path.join(root, "src", "components"))) ||
      (await pathExists(path.join(root, "src", "app"))) ||
      (await pathExists(path.join(root, "src", "pages")))
    ) {
      return path.join("src", cleaned)
    }
  }

  return cleaned
}

async function getComponentPath(root: string) {
  try {
    const config = JSON.parse(await readFile(path.join(root, "components.json"), "utf-8"))
    const rawUi = config.aliases?.ui || "components/ui"
    return await resolveAliasToPath(root, rawUi)
  } catch {
    return "components/ui"
  }
}

function transformTsxToJsx(content: string): string {
  try {
    const result = ts.transpileModule(content, {
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.Preserve,
      },
    })
    return result.outputText
  } catch {
    return content
  }
}

async function writeComponentFile(
  root: string,
  file: string,
  content: string,
  options: AddOptions,
  isTypeScript: boolean
): Promise<boolean> {
  const componentPath = await getComponentPath(root)
  let targetFileName = file
  let finalContent = content

  if (!isTypeScript) {
    if (targetFileName.endsWith(".tsx")) {
      targetFileName = targetFileName.replace(/\.tsx$/, ".jsx")
      finalContent = transformTsxToJsx(finalContent)
    } else if (targetFileName.endsWith(".ts")) {
      targetFileName = targetFileName.replace(/\.ts$/, ".js")
      finalContent = transformTsxToJsx(finalContent)
    }
  }

  const targetPath = path.join(root, componentPath, targetFileName)
  await ensureDir(path.dirname(targetPath), options.dryRun)

  if (await pathExists(targetPath) && !options.force) {
    if (!options.yes) {
      const overwrite = await confirm(
        `${targetFileName} already exists. Overwrite?`,
        false
      )
      if (!overwrite) {
        console.log(`! Skipped ${targetFileName}`)
        return false
      }
    }
  }

  if (!options.dryRun) {
    await writeFile(targetPath, finalContent)
  }

  console.log(`✓ Added ${path.join(componentPath, targetFileName)}`)
  return true
}

async function processComponent(
  name: string,
  root: string,
  installedDeps: Record<string, any>,
  options: AddOptions,
  visited = new Set<string>(),
  pendingDeps = new Set<string>()
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
      const depAdded = await processComponent(dep, root, installedDeps, options, visited, pendingDeps)
      if (depAdded) componentAdded = true
    }
  }

  // Collect external npm dependencies
  if (manifest.dependencies?.length) {
    for (const dep of manifest.dependencies) {
      if (!installedDeps[dep]) {
        pendingDeps.add(dep)
      }
    }
  }

  // Check if project is TypeScript or JavaScript
  const isTypeScript = await pathExists(path.join(root, "tsconfig.json"))

  // Write component files
  for (const file of manifest.files) {
    try {
      const added = await writeComponentFile(root, file.path, file.content, options, isTypeScript)
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
    const componentPath = await getComponentPath(root)

    await ensureDir(path.join(root, componentPath), options.dryRun)

    const pendingDeps = new Set<string>()
    let anyComponentAdded = false
    for (const component of components) {
      const added = await processComponent(
        component,
        root,
        installedDeps,
        options,
        new Set<string>(),
        pendingDeps
      )
      if (added) anyComponentAdded = true
    }

    // Install all collected external dependencies in a single batch
    if (pendingDeps.size > 0) {
      await installDependencies(root, Array.from(pendingDeps), options)
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
