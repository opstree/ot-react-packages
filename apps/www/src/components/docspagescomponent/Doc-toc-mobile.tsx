import React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { TOCProvider, TOCScrollArea } from "../toc/index"
import { TOCItems } from "../toc/clerk"

interface DocsTableOfContentsProps {
    toc: any[]
}

export function DocsTableOfContentsMobile({ toc }: DocsTableOfContentsProps) {
    return (
        <div className={cn("w-screen max-w-full p-4 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-md z-[500]")}>
            <TOCProvider toc={toc}>
                <TOCScrollArea className="max-h-[40vh]">
                    <TOCItems className="relative" />
                </TOCScrollArea>
            </TOCProvider>
        </div>
    )
}

