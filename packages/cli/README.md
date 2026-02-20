# @demouser22/opscli

An ultra-lightweight, dependency-free CLI for the **OPS-UI** component library. Built with performance in mind, it leverages native Node.js APIs to keep your dev environment clean and fast.

## 🚀 Key Features

- **Ultra-Lightweight**: Only ~11KB bundle size.
- **Zero Dependencies**: 100% dependency-free at runtime.
- **Interactive Installation**: Review and select dependencies before adding components.
- **Smart Scaffolding**: Generate consistent, professional component templates in seconds.
- **Native Performance**: Uses built-in Node.js features for environment loading, argument parsing, and prompts.

## 📦 Installation

Install the CLI globally or as a dev dependency in your project:

```bash
# Install as dev dependency (recommended)
npm install -D @demouser22/opscli

# Or install globally
npm install -g @demouser22/opscli
```

---

## 🛠 Usage

### 1. Initialize Project
Setup the basic project structure and project configuration.
```bash
opscli init
```

### 2. Add Components
Download and install components from the OPS-UI registry. The CLI will interactively ask if you want to install or skip dependencies.
```bash
opscli add <component-name>

# Example
opscli add table
```

### 3. List Available Components
Browse all components available in the current registry.
```bash
opscli list
```

### 4. Scaffold New Components
Create a brand new component from a professional template. This is ideal for when you want to "invent" a local component that follows the project's best practices.
```bash
npx opscli scaffold <name>

# Example
npx opscli scaffold MyCustomButton
```

### 5. Manage Themes
Add and manage CSS themes for your project.
```bash
opscli theme add <theme-name>
```

---

## 💡 Troubleshooting

If you encounter any issues:
1. Ensure you are using **Node.js v20.12+** (required for native environment loading).
2. Check if your project root has a `package.json` file.
3. Use `opscli --help` for a full list of commands.

---

## ⚖️ License
ISC License. Built with ❤️ by Gourav Singh & Prashant Sir.
