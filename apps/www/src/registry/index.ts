import { ui } from "./ui"
import { components } from "./components"
import { RegistryEntry } from "./schema"

export const registry: Record<string, RegistryEntry[]> = {
    ui,
    components,
}

export type Registry = typeof registry
