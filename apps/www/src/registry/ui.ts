import { RegistryEntry } from "./schema"

export const ui: RegistryEntry[] = [
    {
        name: "button",
        type: "registry:ui",
        title: "Button",
        description: "Highly customizable button component with multiple variants.",
        dependencies: ["clsx", "tailwind-merge", "react", "lucide-react", "framer-motion"],
        registryDependencies: [],
        files: [
            {
                path: "registry/default/ui/button.tsx",
                type: "registry:ui",
            },
        ],
        categories: ["General"],
    },
    {
        name: "accordion",
        type: "registry:ui",
        title: "Accordion",
        description: "A vertically stacked set of interactive headings that each reveal a section of content.",
        dependencies: ["clsx", "tailwind-merge", "react", "lucide-react", "framer-motion", "@radix-ui/react-accordion"],
        registryDependencies: [],
        files: [
            {
                path: "registry/default/ui/accordion.tsx",
                type: "registry:ui",
            },
        ],
        categories: ["Disclosure"],
    },
    // Add more components here as they are migrated or discovered
]
