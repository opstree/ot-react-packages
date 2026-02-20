import { readFile, access } from "fs/promises"
import { constants } from "fs"
import path from "path"

export interface RegistryIndexItem {
    name: string
    type: string
    registryDependencies?: string[]
}

export type RegistryIndex = RegistryIndexItem[]

export interface RegistryItem {
    name: string
    type: string
    dependencies?: string[]
    registryDependencies?: string[]
    files: {
        path: string
        content: string
        type?: string
    }[]
}

// TODO: Update this URL to the production URL or make it configurable
const rawBaseUrl = process.env.BASE_URL || "";
export const REGISTRY_BASE_URL = rawBaseUrl.trim().replace(/^['"]+|['"]+$/g, '')

async function pathExists(p: string): Promise<boolean> {
    try {
        await access(p, constants.F_OK)
        return true
    } catch {
        return false
    }
}

async function findRoot(startDir: string): Promise<string | null> {
    let currentDir = startDir
    while (currentDir !== path.parse(currentDir).root) {
        // Look for common workspace/root markers
        if (
            await pathExists(path.join(currentDir, "pnpm-workspace.yaml")) ||
            await pathExists(path.join(currentDir, "package-lock.json")) ||
            await pathExists(path.join(currentDir, "yarn.lock")) ||
            await pathExists(path.join(currentDir, "turbo.json")) ||
            await pathExists(path.join(currentDir, ".git"))
        ) {
            return currentDir
        }
        currentDir = path.dirname(currentDir)
    }
    return null
}

export async function fetchRegistryIndex(): Promise<RegistryIndex> {
    try {
        // Try local fallback first
        const root = await findRoot(process.cwd())
        if (root) {
            const localPath = path.join(root, "apps/docs/public/registry/index.json")
            if (await pathExists(localPath)) {
                const content = await readFile(localPath, "utf-8")
                return JSON.parse(content) as RegistryIndex
            }
        }

        const url = `${REGISTRY_BASE_URL}/index.json`
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Failed to fetch registry index: ${response.statusText}`)
        return await response.json() as RegistryIndex
    } catch (error) {
        throw new Error(`Failed to fetch registry index: ${error}`)
    }
}

export async function fetchRegistryItem(name: string, style: string = "default"): Promise<RegistryItem> {
    try {
        // Try local fallback first
        const root = await findRoot(process.cwd())
        if (root) {
            const localPath = path.join(root, `apps/docs/public/registry/styles/${style}/${name}.json`)
            if (await pathExists(localPath)) {
                const content = await readFile(localPath, "utf-8")
                return JSON.parse(content) as RegistryItem
            }
        }

        const url = `${REGISTRY_BASE_URL}/styles/${style}/${name}.json`
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Failed to fetch component: ${name}`)
        return await response.json() as RegistryItem
    } catch (error) {
        throw new Error(`Failed to fetch component ${name}: ${error}`)
    }
}

export async function resolveDependencies(
    componentName: string,
    style: string
): Promise<RegistryItem[]> {
    const visited = new Set<string>()
    const results: RegistryItem[] = []

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
