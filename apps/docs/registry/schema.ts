import { z } from "zod"

export const registryItemSchema = z.object({
    name: z.string(),
    type: z.enum(["components:ui", "components:component", "components:example"]),
    title: z.string().optional(),
    description: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    files: z.array(
        z.object({
            path: z.string(),
            content: z.string(),
            type: z.enum(["registry:ui", "registry:component", "registry:example", "registry:hook", "registry:lib", "registry:theme", "registry:page"]).optional(),
            target: z.string().optional(),
        })
    ).optional(),
    meta: z.record(z.string(), z.any()).optional(),
    docs: z.string().optional(),
    categories: z.array(z.string()).optional(),
})

export type RegistryItem = z.infer<typeof registryItemSchema>

export const registryIndexSchema = z.array(
    z.object({
        name: z.string(),
        type: z.enum(["components:ui", "components:component", "components:example"]),
        title: z.string().optional(),
        description: z.string().optional(),
        categories: z.array(z.string()).optional(),
    })
)

export type RegistryIndex = z.infer<typeof registryIndexSchema>
