export type { ButtonProps } from "../files/button"

export type ComponentType = "registry:ui" | "registry:component" | "registry:hook"

export interface RegistryItem {
    name: string
    version: string
    files: string[]
    dependencies?: string[]
    registryDependencies?: string[]
}
