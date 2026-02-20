import { fetchRegistryIndex } from "../utils/registry"

export async function list() {
    try {
        const registry = await fetchRegistryIndex()

        if (registry.length === 0) {
            console.log("No components found in the registry.")
            return
        }

        console.log("\nAvailable components:")
        registry.forEach((component) => {
            console.log(`- ${component.name} (${component.type})`)
        })
        console.log(`\nTotal components: ${registry.length}`)

    } catch (error) {
        console.error("Error listing components:", error)
        process.exit(1)
    }
}
