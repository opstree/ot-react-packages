import { access, readFile } from "fs/promises"
import { constants } from "fs"
import path from "path"
import { execSync } from "child_process"

export type PackageManager = "pnpm" | "yarn" | "bun" | "npm"

async function pathExists(p: string): Promise<boolean> {
  try {
    await access(p, constants.F_OK)
    return true
  } catch {
    return false
  }
}

/**
 * Detects the package manager used in the target project.
 * Traverses up directory hierarchy to look for lockfiles / workspace configs.
 */
export async function getPackageManager(targetDir: string = process.cwd()): Promise<PackageManager> {
  let currentDir = targetDir
  const parsedRoot = path.parse(currentDir).root

  while (currentDir && currentDir !== parsedRoot) {
    if (
      (await pathExists(path.join(currentDir, "pnpm-lock.yaml"))) ||
      (await pathExists(path.join(currentDir, "pnpm-workspace.yaml")))
    ) {
      return "pnpm"
    }
    if (await pathExists(path.join(currentDir, "yarn.lock"))) {
      return "yarn"
    }
    if (
      (await pathExists(path.join(currentDir, "bun.lockb"))) ||
      (await pathExists(path.join(currentDir, "bun.lock")))
    ) {
      return "bun"
    }
    if (await pathExists(path.join(currentDir, "package-lock.json"))) {
      return "npm"
    }
    currentDir = path.dirname(currentDir)
  }

  // Fallback to npm_config_user_agent
  const userAgent = process.env.npm_config_user_agent || ""
  if (userAgent.startsWith("pnpm")) return "pnpm"
  if (userAgent.startsWith("yarn")) return "yarn"
  if (userAgent.startsWith("bun")) return "bun"

  return "npm"
}

/**
 * Generates the install command tailored to the package manager and target directory.
 */
export async function getInstallCommand(
  targetDir: string,
  pm: PackageManager,
  pkgs: string[]
): Promise<string> {
  const pkgsArg = pkgs.join(" ")

  switch (pm) {
    case "pnpm": {
      // If we are at the root of a pnpm monorepo workspace, pnpm requires -w
      const isWorkspaceRoot = await pathExists(path.join(targetDir, "pnpm-workspace.yaml"))
      return isWorkspaceRoot ? `pnpm add -w ${pkgsArg}` : `pnpm add ${pkgsArg}`
    }
    case "yarn": {
      const isWorkspaceRoot = await pathExists(path.join(targetDir, "yarn.lock"))
      return `yarn add ${pkgsArg}`
    }
    case "bun":
      return `bun add ${pkgsArg}`
    case "npm":
    default:
      return `npm install ${pkgsArg}`
  }
}

/**
 * Installs external dependencies using the detected package manager.
 * Respects --dry-run and --skip-install options.
 */
export async function installDependencies(
  root: string,
  pkgs: string[],
  options: { dryRun?: boolean; skipInstall?: boolean } = {}
): Promise<string[]> {
  if (!pkgs || pkgs.length === 0) return []

  const pm = await getPackageManager(root)
  const installCmd = await getInstallCommand(root, pm, pkgs)

  if (options.skipInstall) {
    console.log(`\nℹ️  Skipped dependency installation (--skip-install).`)
    console.log(`   Dependencies needed: ${pkgs.join(", ")}`)
    console.log(`   You can install them manually using:`)
    console.log(`   ${installCmd}\n`)
    return []
  }

  console.log(`\n📦 Installing dependencies with ${pm}: ${pkgs.join(", ")}...`)
  if (!options.dryRun) {
    try {
      execSync(installCmd, { stdio: "inherit", cwd: root })
      return pkgs
    } catch (err: any) {
      console.error(`\n! Failed to install dependencies with ${pm}. Please run manually:`)
      console.log(`  ${installCmd}\n`)
      return []
    }
  }
  return pkgs
}
