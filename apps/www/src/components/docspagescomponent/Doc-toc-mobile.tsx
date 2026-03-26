import { cn } from "@workspace/ui/lib/utils"
import { List } from "lucide-react"
import { motion } from "framer-motion"
interface DocsTableOfContentsProps {
    toc: Array<{
        title: React.ReactNode
        url: string
        children?: Array<{
            title: React.ReactNode
            url: string
        }>
    }>
}

export function DocsTableOfContentsMobile({ toc }: DocsTableOfContentsProps) {
    return (
        <div className={cn("space-y-2 absolute top-10 z-[500] bg-white")}>
            <ul className="space-y-1 ml-6 mt-3">
                {toc.map((item) => (
                    <li key={item.url}>
                        <a
                            href={item.url}
                            className={cn(
                                "block text-sm text-muted-foreground transition-colors"
                            )}
                        >
                            {item.title}
                        </a>
                        {item.children && (
                            <ul className="ml-4 mt-1 space-y-1">
                                {item.children.map((child) => (
                                    <li key={child.url}>
                                        <a
                                            href={child.url}
                                            className={cn(
                                                "block text-sm text-muted-foreground hover:text-foreground transition-colors"
                                            )}
                                        >
                                            {child.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
