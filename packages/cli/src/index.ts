#!/usr/bin/env node
import { Command } from "commander"
import { add } from "./command/add"
import { init } from "./command/init"
import { list } from "./command/list"
import { remove } from "./command/remove"
import { type RemoveOptions } from "./command/remove"
import packageJson from "../package.json"

const program = new Command()

async function main() {
  program
    .name("opscli")
    .description("CLI for OPS-UI component library")
    .version(packageJson.version)

  program
    .command("init")
    .description("Initialize your project with OPS-UI")
    .option("-y, --yes", "Skip confirmation prompts", false)
    .option("-f, --force", "Overwrite existing files", false)
    .action(init)

  program
    .command("add")
    .description("Add components to your project")
    .argument("<components...>", "Components to add")
    .option("-y, --yes", "Skip confirmation prompts", false)
    .option("-f, --force", "Overwrite existing files", false)
    .action((components: string[], options: any) => add(components, options))

  program
    .command("remove")
    .description("Remove components from your project")
    .argument("<components...>", "Components to remove")
    .option("-y, --yes", "Skip confirmation prompts", false)
    .option("-f, --force", "Force removal even if there are dependents", false)
    .action((components: string[], options: RemoveOptions) => remove(components, options))

  program
    .command("list")
    .description("List all available components")
    .action(list)

  program.parse()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
