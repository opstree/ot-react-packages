import { components } from "./components"
import { RegistryEntry } from "./schema"

export const registry: Record<string, RegistryEntry[]> = {
    components,
}

export type Registry = typeof registry
