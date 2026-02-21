import { z } from "zod";

export const TableScehma = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    code: z.string().min(1, "Code is required"),
    dependencies: z.array(z.string()).optional(),
    devDependencies: z.array(z.string()).optional(),
})

export type TableSchema = z.infer<typeof TableScehma>