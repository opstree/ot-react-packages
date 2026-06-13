import React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { List } from "lucide-react"
import { TOCProvider, TOCScrollArea } from "../toc/index"
import { TOCItems } from "../toc/clerk"

interface DocsTableOfContentsProps {
  toc: any[]
}

export function DocsTableOfContents({ toc }: DocsTableOfContentsProps) {
  return (
    <div className={cn("space-y-2 sticky top-8 h-[calc(100vh-4rem)] overflow-hidden")}>
      <h4 className="text-sm font-medium flex items-center gap-2 mb-4">
        <List size={16} className="text-neutral-400" />
        On this page
      </h4>
      <div className="relative">
        <TOCProvider toc={toc}>
          <TOCItems className="relative" />
        </TOCProvider>
      </div>
    </div>
  )
}

