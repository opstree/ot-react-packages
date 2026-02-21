import pc from "picocolors"
import { fetchRegistryIndex } from "../utils/registry"

export async function list() {
    try {
        const registry = await fetchRegistryIndex()

        if (registry.length === 0) {
            console.log(pc.yellow("No components found in the registry."))
            return
        }

        console.log(pc.cyan("\nAvailable components:"))

        // Group by type or just list
        registry.forEach((component) => {
            console.log(`${pc.green("✔")} ${pc.bold(component.name.padEnd(20))} ${pc.dim(`(${component.type})`)}`)
        })

        console.log(pc.cyan(`\nTotal components: ${pc.bold(registry.length)}`))
        console.log(pc.dim("Run 'opscli add <component>' to install.\n"))

    } catch (error) {
        console.error(pc.red("Error listing components:"), error)
        process.exit(1)
    }
}
