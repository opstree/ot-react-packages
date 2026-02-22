# OPS-UI 🚀

A modern, high-performance **React UI component ecosystem** with a built-in CLI for seamless component management. Built as a Turborepo monorepo, OPS-UI provides a curated library of production-ready components that can be installed directly into any React project.

> **Status:** Active Development

---

## ✨ Key Features

- ⚡ **Lightweight CLI** — Initialize projects and add components in seconds via `npx`
- 🎨 **Beautiful Components** — Tailwind CSS + Framer Motion for polished interactions
- 🛡️ **Type Safe** — Fully written in TypeScript
- 📦 **Registry System** — Shadcn-inspired component distribution via JSON manifests
- 🏗️ **Monorepo** — Managed by [Turborepo](https://turbo.build/) for optimized builds

---

## 📁 Project Structure

```
ot-react-packages/
│
├── apps/
│   └── www/                          # 🌐 Documentation site & registry source
│       ├── public/
│       │   └── registry/             # Generated JSON manifests (CLI reads from here)
│       │       ├── components/       # Individual component manifests (with embedded source code)
│       │       ├── registry.json     # Aggregate registry (all components)
│       │       └── index.json        # Lightweight index for `opscli list`
│       ├── scripts/
│       │   ├── build-registry.ts     # Reads registry metadata → generates JSON manifests
│       │   └── sync-registry.ts      # Auto-discovers .tsx files → updates components.ts
│       └── src/
│           ├── components/
│           │   └── docs/             # 📝 Documentation-specific components (Cards, Table, etc.)
│           ├── registry/
│           │   ├── schema.ts         # Zod schema for validating registry entries
│           │   ├── index.ts          # Aggregates all registry lists (ui + components)
│           │   ├── ui.ts             # Registry entries for core UI primitives
│           │   └── components.ts     # Registry entries for doc/custom components
│           └── ...                   # Routes, hooks, styles, etc.
│
├── packages/
│   ├── cli/                          # ⚡ CLI tool (@opstreepackage/opscli)
│   │   └── src/
│   │       ├── index.ts              # Entry point — registers all commands
│   │       ├── command/
│   │       │   ├── init.ts           # `opscli init` — project setup
│   │       │   ├── add.ts            # `opscli add` — install components from registry
│   │       │   ├── remove.ts         # `opscli remove` — remove installed components
│   │       │   ├── list.ts           # `opscli list` — show available components
│   │       │   └── theme.ts          # `opscli theme` — generate theme config
│   │       └── utils/
│   │           ├── registry.ts       # Fetch logic for registry JSON endpoints
│   │           ├── config-merger.ts  # Safely merge JSON config files
│   │           └── prompts.ts        # Interactive CLI prompts
│   │
│   ├── ui/                           # 🎨 Core component library
│   │   └── src/components/ui/        # Primitives: accordion, button, badge, tabs, etc.
│   │
│   ├── typescript-config/            # 📐 Shared tsconfig presets
│   └── eslint-config/                # 📏 Shared ESLint rules
│
├── turbo.json                        # Turborepo pipeline configuration
└── package.json                      # Root workspaces & scripts
```

### Why This Structure?

| Directory | Purpose |
|---|---|
| `apps/www` | The documentation website **and** the source of truth for the component registry. Components listed here are what the CLI distributes. |
| `apps/www/public/registry/` | **Generated output.** The CLI fetches component manifests and source files from this directory (served via GitHub raw URLs or a deployed site). |
| `apps/www/src/registry/` | **Registry metadata.** Defines which components exist, their dependencies, and where their source files live. This drives the build scripts. |
| `apps/www/src/components/docs/` | Documentation-specific component implementations (Cards, Table, Sidebar, etc.) that are registered and distributed via the CLI. |
| `packages/ui/` | Core UI primitives (button, accordion, badge, etc.) — shared across the monorepo and also registered for CLI distribution. |
| `packages/cli/` | The published npm package `@opstreepackage/opscli`. Users install this to add components to their projects. |

---

## 🛠️ Getting Started (Development)

### Prerequisites
- **Node.js** v20.12+
- **npm** v10+

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/opstree/ot-react-packages.git
cd ot-react-packages

# 2. Install all dependencies
npm install

# 3. Start development (docs site + all packages in watch mode)
npm run dev
```

The documentation site will be available at `http://localhost:5173`.

### Build Everything

```bash
npm run build
```

---

## 📦 Using the CLI

The **OPS-UI CLI** (`@opstreepackage/opscli`) lets you add components directly into your project — no need to copy-paste code.

### Quick Start (For End Users)

```bash
# Step 1: Initialize OPS-UI in your project
npx @opstreepackage/opscli@latest init

# Step 2: Add a component
opscli add button

# Step 3: Import and use
import { Button } from "@/components/docs/button"
```

### All Commands

| Command | Description |
|---|---|
| `opscli init` | Sets up your project with `components.json`, path aliases, and required dependencies |
| `opscli add <name>` | Downloads a component and installs its npm dependencies |
| `opscli add <name> -y` | Same as above, skips confirmation prompts |
| `opscli add <name> -f` | Force overwrite if the component already exists |
| `opscli remove <name>` | Removes a component from your project |
| `opscli list` | Lists all available components in the registry |
| `opscli theme` | Generates a theme configuration file |

### What `init` Does

1. Detects your framework (Next.js, Vite, React, etc.)
2. Creates directory structure (`components/`, `lib/`, `hooks/`, `utils/`)
3. Installs required dependencies (`clsx`, `tailwind-merge`, etc.)
4. Generates `components.json` config and a `cn()` utility helper
5. Updates `tsconfig.json` with path aliases

### How the CLI Works

```
  USER runs: opscli init
  ┌──────────────────────────────┐
  │  Detect framework (Vite,     │
  │  Next.js, React, etc.)       │
  └────────────┬─────────────────┘
               │
               ▼
  ┌──────────────────────────────┐
  │  Create directories:         │
  │  components/, lib/, hooks/   │
  └────────────┬─────────────────┘
               │
               ▼
  ┌──────────────────────────────┐
  │  Install deps, generate      │
  │  components.json, cn(),      │
  │  update tsconfig aliases     │
  └──────────────────────────────┘


  USER runs: opscli add button
  ┌──────────────────────────────┐
  │  Fetch manifest from         │
  │  public/registry/            │
  │  components/button.json      │   (hosted on GitHub / deployed site)
  └────────────┬─────────────────┘
               │
               ▼
  ┌──────────────────────────────┐
  │  Install npm dependencies    │
  │  (clsx, framer-motion, etc.) │
  └────────────┬─────────────────┘
               │
               ▼
  ┌──────────────────────────────┐
  │  Extract embedded source     │
  │  code from JSON manifest     │
  └────────────┬─────────────────┘
               │
               ▼
  ┌──────────────────────────────┐
  │  Write file to your project: │
  │  components/docs/button.tsx  │
  └──────────────────────────────┘
```

---

## ✨ How to Add a New Component

Want to add a new component to the OPS-UI registry? Follow these steps:

### Step 1: Write the Component

Place your `.tsx` file in one of these directories:

| Location | When to Use |
|---|---|
| `apps/www/src/components/docs/` | Custom/documentation components (recommended for new components) |
| `packages/ui/src/components/ui/` | Core UI primitives shared across the monorepo |

### Step 2: Register It

Open the corresponding registry file in `apps/www/src/registry/`:

- **`components.ts`** — for components in `apps/www/src/components/docs/`
- **`ui.ts`** — for components in `packages/ui/src/components/ui/`

Add an entry like this:

```typescript
{
  name: "my-component",          // kebab-case name (used in `opscli add my-component`)
  type: "registry:ui",
  title: "My Component",
  description: "A brief description of what it does.",
  dependencies: ["clsx", "tailwind-merge"],  // npm packages it requires
  registryDependencies: [],      // other registry components it depends on
  files: [
    {
      path: "src/components/docs/MyComponent.tsx",  // relative to apps/www
      type: "registry:ui",
    },
  ],
  categories: ["General"],
}
```

### Step 3: Sync & Build the Registry

The registry has two scripts that work together as a pipeline:

#### `npm run registry:sync` — Auto-discover components
Scans `apps/www/src/components/docs/` for `.tsx` files, extracts metadata (name, description, category from JSDoc comments), and **overwrites** `apps/www/src/registry/components.ts` with the discovered entries. This means you don't have to manually write the registry entry if you just drop a `.tsx` file in the `docs/` folder.

#### `npm run registry:build` — Generate JSON manifests
Reads all entries from `apps/www/src/registry/components.ts`, then reads the actual source code directly from `src/components/docs/`, transforms imports (e.g., `@workspace/ui/lib/utils` → `@/lib/utils`), and embeds the source code into JSON manifest files in `apps/www/public/registry/`:

| Generated File | Purpose |
|---|---|
| `components/<name>.json` | Individual manifest with embedded source code (CLI fetches this) |
| `registry.json` | Aggregate of all components |
| `index.json` | Lightweight index used by `opscli list` |

#### The Flow

```
  ┌──────────────────────────┐
  │  src/components/docs/    │   .tsx files (your components)
  └────────────┬─────────────┘
               │
               ▼  npm run registry:sync
  ┌──────────────────────────┐
  │  src/registry/           │   components.ts (auto-generated metadata)
  │  components.ts           │
  └────────────┬─────────────┘
               │
               ▼  npm run registry:build
  ┌──────────────────────────┐
  │  public/registry/        │   JSON manifests (CLI reads from here)
  │  ├── components/*.json   │
  │  ├── registry.json       │
  │  └── index.json          │
  └──────────────────────────┘
```

#### Run Both Commands

```bash
cd apps/www

# Step A: Auto-discover new .tsx files → updates components.ts
npm run registry:sync

# Step B: Generate JSON manifests → updates public/registry/
npm run registry:build
```

### Step 4: Verify

```bash
# Check that it appears in the list
cd packages/cli
npm run build
node dist/index.js list

# Test adding it
node dist/index.js add my-component -y
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/my-feature`
3. **Make your changes** following the patterns in the codebase
4. **Test locally**: Run `npm run dev` and verify your changes in the docs site
5. **Submit a Pull Request** with a clear description of what you changed and why

### Contribution Ideas
- Add new components to the registry
- Improve existing component accessibility or animations
- Enhance CLI commands or add new ones
- Write documentation or usage examples
- Fix bugs or improve error handling

### Development Scripts

| Script | Where to Run | What It Does |
|---|---|---|
| `npm run dev` | Root | Starts all packages in watch mode |
| `npm run build` | Root | Builds all packages |
| `npm run registry:sync` | `apps/www` | Auto-discovers components and updates registry metadata |
| `npm run registry:build` | `apps/www` | Generates JSON manifests from registry metadata |
| `npm run build` | `packages/cli` | Builds the CLI to `dist/` |

---

## ⚖️ License

Licensed under the [ISC](./LICENSE) License.
Built with 🔥 by **Gourav Singh** & **Prashant Sir** for the engineering community.
