import { z } from "zod"


export const registryIndexSchema = z.array(
    z.object({
        name: z.string(),
        type: z.string(),
        registryDependencies: z.array(z.string()).optional(),
    })
)

export const registryItemSchema = z.object({
    name: z.string(),
    type: z.string(),
    dependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    files: z.array(
        z.object({
            path: z.string(),
            content: z.string(),
            type: z.string().optional(), // registry:ui, etc.
        })
    ),
})

// TODO: Update this URL to the production URL or make it configurable
export const REGISTRY_BASE_URL = "https://raw.githubusercontent.com/GOURAVSINGH19/Ops-Ui/main/apps/docs/public/registry"

export async function fetchRegistryIndex() {
    try {
        const response = await fetch(`${REGISTRY_BASE_URL}/index.json`)
        if (!response.ok) throw new Error("Failed to fetch registry index")
        return registryIndexSchema.parse(await response.json())
    } catch (error) {
        throw new Error(`Failed to fetch registry index: ${error}`)
    }
}

export async function fetchRegistryItem(name: string, style: string = "default") {
    try {
        const response = await fetch(`${REGISTRY_BASE_URL}/styles/${style}/${name}.json`)
        if (!response.ok) throw new Error(`Failed to fetch component: ${name}`)
        return registryItemSchema.parse(await response.json())
    } catch (error) {
        throw new Error(`Failed to fetch component ${name}: ${error}`)
    }
}

export async function resolveDependencies(
    componentName: string,
    style: string
): Promise<z.infer<typeof registryItemSchema>[]> {
    const visited = new Set<string>()
    const results: z.infer<typeof registryItemSchema>[] = []

    async function resolve(name: string) {
        if (visited.has(name)) return
        visited.add(name)

        const item = await fetchRegistryItem(name, style)
        results.push(item)

        if (item.registryDependencies) {
            for (const dep of item.registryDependencies) {
                await resolve(dep)
            }
        }
    }

    await resolve(componentName)
    return results
}

export function getRegistryStyle() {
    return "default"
}

export function getRegistryBaseColor() {
    return "slate"
}
