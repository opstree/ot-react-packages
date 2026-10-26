import React, { useMemo } from "react"
import { cn } from "@workspace/ui/lib/utils"

export interface TOCItemType {
  title: React.ReactNode
  url: string
  depth?: number
  children?: TOCItemType[]
}

interface DocsTableOfContentsProps {
  toc: TOCItemType[]
}

function flattenToc(
  items: TOCItemType[],
  defaultDepth = 2
): Array<{ title: React.ReactNode; url: string; depth: number }> {
  const result: Array<{ title: React.ReactNode; url: string; depth: number }> = []
  if (!Array.isArray(items)) return result

  for (const item of items) {
    const depth = typeof item.depth === "number" ? item.depth : defaultDepth
    result.push({
      title: item.title,
      url: item.url.startsWith("#") ? item.url : `#${item.url}`,
      depth,
    })
    if (item.children && Array.isArray(item.children) && item.children.length > 0) {
      result.push(...flattenToc(item.children, depth + 1))
    }
  }
  return result
}

export function DocsTableOfContentsMobile({ toc }: DocsTableOfContentsProps) {
  const items = useMemo(() => flattenToc(toc), [toc])

  if (items.length === 0) return null

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    const id = url.replace(/^#/, "")
    const target = document.getElementById(id)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.pushState(null, "", url)
    }
  }

  return (
    <div className={cn("p-4 w-screen max-w-sm border dark:border-neutral-800 shadow-xl rounded-b-xl bg-white dark:bg-neutral-950")}>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item.url}
            style={{
              paddingInlineStart: `${(item.depth <= 2 ? 0 : (item.depth - 2) * 16)}px`,
            }}
          >
            <a
              href={item.url}
              onClick={(e) => handleLinkClick(e, item.url)}
              className={cn(
                "block text-sm py-1 transition-colors text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
