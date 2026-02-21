import { z } from "zod"

export const registryEntrySchema = z.object({
    $schema: z.string().optional(),
    name: z.string(),
    type: z.enum([
        "registry:ui",
        "registry:block",
        "registry:component",
        "registry:example",
        "registry:hook",
        "registry:lib",
        "registry:theme",
        "registry:page"
    ]),
    title: z.string().optional(),
    description: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    devDependencies: z.array(z.string()).optional(),
    registryDependencies: z.array(z.string()).optional(),
    files: z.array(
        z.object({
            path: z.string(),
            content: z.string().optional(),
            type: z.enum([
                "registry:ui",
                "registry:block",
                "registry:component",
                "registry:example",
                "registry:hook",
                "registry:lib",
                "registry:theme",
                "registry:page",
                "registry:file"
            ]).optional(),
            target: z.string().optional(),
        })
    ).optional(),
    meta: z.record(z.string(), z.any()).optional(),
    docs: z.string().optional(),
    categories: z.array(z.string()).optional(),
})

export type RegistryEntry = z.infer<typeof registryEntrySchema>

/**
 * For legacy compatibility and internal use while transitioning.
 */
export const registryItemSchema = registryEntrySchema
export type RegistryItem = RegistryEntry

export const registryIndexSchema = z.array(
    z.object({
        name: z.string(),
        type: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        categories: z.array(z.string()).optional(),
    })
)

export type RegistryIndex = z.infer<typeof registryIndexSchema>
