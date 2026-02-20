import { Command } from "commander"

export const help = new Command()
    .name("help")
    .description("Display help for ops-cli")
    .action(() => {
        console.log(`
Usage: ops-cli [command] [options]

Commands:
  init      Initialize your project with OPS-UI
  add       Add a component to your project
  list      List all available components
  help      Display this help message

Options:
  -v, --version  output the version number
  -h, --help     display help for command
        `)
    })
