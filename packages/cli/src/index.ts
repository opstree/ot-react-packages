#!/usr/bin/env node

import "./env"
import { add } from "./command/add"
import { init } from "./command/init"
import { list } from "./command/list"
import { theme } from "./command/theme"
import { scaffold } from "./command/scaffold"

const pkg = { version: "0.0.3" }

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  if (!command || command === "-h" || command === "--help" || command === "help") {
    console.log(`
opscli v${pkg.version}
CLI for OPS-UI

Usage:
  opscli <command> [arguments]

Commands:
  init              Initialize your project with OPS-UI
  add <component>   Add an existing component from the registry (e.g., opscli add button)
  list              List all available components in the registry
  theme             Manage and add themes (opscli theme add <name>)
  scaffold <name>   Create a new component template with best practices
  help              Show this help message

Options:
  -v, --version     Show version number
  -h, --help        Show help message
`)
    return
  }

  if (command === "-v" || command === "--version") {
    console.log(pkg.version)
    return
  }

  switch (command) {
    case "init":
      await init()
      break
    case "add":
      await add(args[1])
      break
    case "list":
      await list()
      break
    case "theme":
      await theme()
      break
    case "scaffold":
      await scaffold(args[1])
      break
    default:
      console.error(`Unknown command: ${command}`)
      console.log("Run 'opscli --help' for usage.")
      process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
