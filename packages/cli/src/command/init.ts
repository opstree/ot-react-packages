import { writeFile, mkdir, access, readFile } from "fs/promises"
import { constants } from "fs"
import path from "path"
import { execSync } from "child_process"
import { confirm } from "../utils/prompts"
import { REGISTRY_BASE_URL } from "../utils/registry"
import { mergeJsonFile, updateTsConfig } from "../utils/config-merger"

export interface InitOptions {
  yes?: boolean
  force?: boolean
  dryRun?: boolean
}

const UTILS_TS = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

const UTILS_JS = `import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`

const TAILWIND_CONFIG = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
`

async function pathExists(p: string) {
  try {
    await access(p, constants.F_OK)
    return true
  } catch {
    return false
  }
}

async function ensureDir(p: string, dryRun?: boolean) {
  if (!(await pathExists(p))) {
    if (!dryRun) await mkdir(p, { recursive: true })
    console.log(`✓ Created ${path.relative(process.cwd(), p)}`)
  }
}

function installDeps(pkgs: string[], dryRun?: boolean) {
  if (!pkgs.length) return
  console.log(`Installing dependencies: ${pkgs.join(", ")}...`)
  if (!dryRun) {
    try {
      execSync(`npm install ${pkgs.join(" ")}`, { stdio: "inherit" })
    } catch (err) {
      console.error("! Failed to install dependencies. Please run manually:")
      console.log(`npm install ${pkgs.join(" ")}`)
    }
  }
}

async function getPackageJson(root: string) {
  const pkgPath = path.join(root, "package.json")
  if (!(await pathExists(pkgPath))) {
    throw new Error("No package.json found. Run inside a project.")
  }
  return JSON.parse(await readFile(pkgPath, "utf-8"))
}

function detectFramework(deps: Record<string, any>) {
  if (deps["next"]) return "next"
  if (deps["vite"]) return "vite"
  if (deps["@angular/core"]) return "angular"
  if (deps["vue"]) return "vue"
  if (deps["react"]) return "react"
  return "unknown"
}

export async function init(options: InitOptions = {}) {
  try {
    const { yes, force, dryRun } = options
    const root = process.cwd()

    if (!yes) {
      const proceed = await confirm(
        "This will initialize OPS-UI in your project. Continue?"
      )
      if (!proceed) process.exit(0)
    }

    console.log("\n Detecting environment...")

    const pkg = await getPackageJson(root)
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }

    const isTypeScript = await pathExists(path.join(root, "tsconfig.json"))
    const hasTailwind =
      (await pathExists(path.join(root, "tailwind.config.js"))) ||
      (await pathExists(path.join(root, "tailwind.config.ts")))

    const framework = detectFramework(deps)

    console.log(`✓ Framework: ${framework}`)
    console.log(`✓ TypeScript: ${isTypeScript ? "Yes" : "No"}`)
    console.log(`✓ Tailwind: ${hasTailwind ? "Yes" : "No"}`)

    // --------------------
    // Setup Directories
    // --------------------
    const componentsDir = path.join(root, "components/ui")
    const libDir = path.join(root, "lib")
    const hooksDir = path.join(root, "hooks")
    const utilsDir = path.join(root, "utils")
    const stylesDir = path.join(root, "styles")
    const typesDir = path.join(root, "types")

    console.log("\n Setting up directories...")
    await ensureDir(componentsDir, dryRun)
    await ensureDir(libDir, dryRun)
    await ensureDir(hooksDir, dryRun)
    await ensureDir(utilsDir, dryRun)
    await ensureDir(stylesDir, dryRun)
    await ensureDir(typesDir, dryRun)

    // --------------------
    // Install Dependencies
    // --------------------
    const requiredDeps = ["clsx", "tailwind-merge", "tailwindcss-animate", "class-variance-authority", "react", "react-dom"]
    const missingDeps = requiredDeps.filter((d) => !deps[d])

    if (!hasTailwind) {
      missingDeps.push("tailwindcss", "postcss", "autoprefixer")
    }

    installDeps(missingDeps, dryRun)

    // --------------------
    // Setup Utils (cn helper)
    // --------------------
    const utilsFile = path.join(libDir, isTypeScript ? "utils.ts" : "utils.js")

    if (!(await pathExists(utilsFile)) || force) {
      if (!dryRun)
        await writeFile(utilsFile, isTypeScript ? UTILS_TS : UTILS_JS)
      console.log(`✓ Created ${path.relative(root, utilsFile)}`)
    } else {
      console.log("! utils file exists, skipping")
    }

    // --------------------
    // Config Files
    // --------------------
    console.log("\n⚙️  Generating configuration files...")

    // components.json
    const configPath = path.join(root, "components.json")
    const baseConfig = {
      style: "default",
      tailwind: {
        config: isTypeScript ? "tailwind.config.ts" : "tailwind.config.js",
        css: framework === "next" ? "app/globals.css" : "src/index.css",
        baseColor: "zinc",
        cssVariables: true
      },
      aliases: {
        components: "@/src/components",
        utils: "@/src/utils",
        hooks: "@/src/hooks"
      }
    }

    if (!dryRun) {
      await mergeJsonFile(configPath, baseConfig)
      console.log("✓ Updated components.json")
    }

    // tailwind.config.js
    if (!hasTailwind && !dryRun) {
      const twPath = path.join(root, isTypeScript ? "tailwind.config.ts" : "tailwind.config.js")
      await writeFile(twPath, TAILWIND_CONFIG)
      console.log(`✓ Created ${path.relative(root, twPath)}`)
    }

    // tsconfig aliases
    if (isTypeScript && !dryRun) {
      await updateTsConfig(root, {
        "@/*": "./*",
        "@/lib/*": "./src/lib/*"
      })
    }

    // --------------------
    // Fetch Registry Types
    // --------------------
    console.log("\n🌐 Fetching registry types...")

    try {
      const manifestRes = await fetch(`${REGISTRY_BASE_URL}/types.json`)
      if (!manifestRes.ok) throw new Error("Failed to fetch manifest")

      const files: string[] = await manifestRes.json()

      for (const file of files) {
        const filePath = path.join(typesDir, file)

        if (!(await pathExists(filePath)) || force) {
          const res = await fetch(`${REGISTRY_BASE_URL}/types/${file}`)
          if (!res.ok) throw new Error(`Failed to fetch ${file}`)
          const content = await res.text()

          if (!dryRun) await writeFile(filePath, content)
          console.log(`✓ Created types/${file}`)
        }
      }
    } catch {
      console.log("! Could not fetch remote types (skipped)")
    }

    // --------------------
    // ui.config creation
    // --------------------
    const uiConfigPath = path.join(root, isTypeScript ? "ui.config.ts" : "ui.config.js")
    const uiConfigContent = `export default {
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))"
      },
      borderRadius: {
        lg: "var(--radius)"
      }
    }
  }
}
`
    if (!(await pathExists(uiConfigPath)) || force) {
      if (!dryRun) await writeFile(uiConfigPath, uiConfigContent)
      console.log("✓ Created ui.config")
    }

    // --------------------
    // Success Output
    // --------------------
    console.log("\n✔ OPS-UI initialized successfully!\n")
    console.log("Next steps:")
    console.log("1. Add a component: opscli add button")
    console.log("2. Import in your project: import { Button } from \"@/components/ui/button\"")
    console.log("3. Build something amazing! 🚀")

  } catch (err) {
    console.error("\n❌ Initialization failed:", err)
    process.exit(1)
  }
}