import { Command } from "commander"
import fs from "fs-extra"
import path from "path"

export const scaffold = new Command()
    .name("scaffold")
    .description("Scaffold a new component with best practices")
    .argument("<name>", "the name of the component")
    .action(async (name) => {
        try {
            const projectRoot = process.cwd()
            const componentsDir = path.join(projectRoot, "components", "ui")
            await fs.ensureDir(componentsDir)

            const componentName = name.charAt(0).toUpperCase() + name.slice(1)
            const componentPath = path.join(componentsDir, `${componentName}.tsx`)

            if (fs.existsSync(componentPath)) {
                console.error(`Error: Component ${componentName} already exists at ${componentPath}`)
                process.exit(1)
            }

            const template = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ${name}Variants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ${componentName}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${name}Variants> {}

const ${componentName} = React.forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${name}Variants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
${componentName}.displayName = "${componentName}"

export { ${componentName}, ${name}Variants }
`
            await fs.writeFile(componentPath, template)
            console.log(`✓ Scaffolded ${componentName} at components/ui/${componentName}.tsx`)

        } catch (error) {
            console.error("Error scaffolding component:", error)
        }
    })
