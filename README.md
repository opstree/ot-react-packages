# OPS-UI Monorepo

Welcome to the **OPS-UI** monorepo—a modern, high-performance UI component ecosystem. This workspace contains everything from a comprehensive React component library to a blazing-fast CLI for component management.

## 🏗 Project Structure

This is a monorepo managed by **Turbo**, organized into `apps` and `packages`:

### Apps
- **`apps/docs`**: The documentation site and interactive registry. Built with Vite and React, it serves as the living documentation and the source of truth for the component registry.

### Packages
- **`packages/cli`**: **(@demouser22/opscli)** An ultra-light (~11KB), dependency-free CLI used to initialize projects, add components from the registry, and scaffold new component templates.
- **`packages/ui`**: The core React component library. Contains beautiful, accessible, and performant components (Cards, Tables, Filters, etc.) that can be added to any project via the CLI.
- **`packages/typescript-config`**: Shared TypeScript configurations used across the workspace.
- **`packages/eslint-config`**: Shared ESLint rules to maintain code quality.

---

## 🚀 Getting Started

To get the entire development environment running locally:

### 1. Prerequisite
Ensure you have **Node.js v20.12 or later** and **npm** installed.

### 2. Install Dependencies
From the root directory, run:
```bash
npm install
```

### 3. Start Development
Run the documentation site and all dependent packages in development mode:
```bash
npm run dev
```
*The docs site will typically be available at `http://localhost:5173`.*

### 4. Build All Packages
```bash
npm run build
```

---

## 🛠 Using the CLI

The CLI is designed to be the primary way users interact with the OPS-UI library. It allows you to:

- **Add Components**: `opscli add <component-name>` (Installs components directly into your local project from our registry).
- **Scaffold**: `opscli scaffold <name>` (Creates a brand new component following our design patterns).
- **Initialize**: `opscli init` (Sets up a new project to use OPS-UI).

For more details on the CLI, check out the [CLI README](./packages/cli/README.md).

---

## 🎨 Component Mastery

Our components are built with a focus on:
- **Tailwind CSS**: For consistent, utility-first styling.
- **Framer Motion**: For smooth, professional micro-animations.
- **TypeScript**: For a robust developer experience with full type safety.

---

## ⚖️ License
ISC License. Built with ❤️ by Gourav Singh & Prashant Sir for the engineering community.
