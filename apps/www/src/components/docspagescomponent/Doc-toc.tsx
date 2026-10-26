import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { List } from "lucide-react"

export interface TOCItemType {
  title: React.ReactNode
  url: string
  depth?: number
  children?: TOCItemType[]
}

export interface DocsTableOfContentsProps {
  toc: TOCItemType[]
  className?: string
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

function getLineOffset(depth: number): number {
  if (depth <= 2) return 4
  if (depth === 3) return 18
  return 28
}

function getItemPadding(depth: number): number {
  if (depth <= 2) return 18
  if (depth === 3) return 32
  return 42
}

export function DocsTableOfContents({ toc, className }: DocsTableOfContentsProps) {
  const items = useMemo(() => flattenToc(toc), [toc])
  const containerRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const [activeAnchors, setActiveAnchors] = useState<string[]>([])
  const [svg, setSvg] = useState<{
    path: string
    width: number
    height: number
  }>()

  // Calculate SVG stepped notched path connecting all headings
  useLayoutEffect(() => {
    if (!containerRef.current || items.length === 0) {
      return
    }

    const container = containerRef.current

    function computePath() {
      if (container.clientHeight === 0) return
      let maxOffset = 0
      let maxHeight = 0
      const pathSegments: string[] = []

      for (let i = 0; i < items.length; i++) {
        const id = items[i].url.replace(/^#/, "")
        const element = container.querySelector<HTMLElement>(`a[href="#${id}"]`)
        if (!element) continue

        const styles = getComputedStyle(element)
        const padTop = parseFloat(styles.paddingTop) || 0
        const padBottom = parseFloat(styles.paddingBottom) || 0
        const offset = getLineOffset(items[i].depth)

        const top = element.offsetTop + padTop
        const bottom = element.offsetTop + element.clientHeight - padBottom

        maxOffset = Math.max(maxOffset, offset)
        maxHeight = Math.max(maxHeight, bottom)

        pathSegments.push(`${i === 0 ? "M" : "L"} ${offset} ${top}`)
        pathSegments.push(`L ${offset} ${bottom}`)
      }

      if (pathSegments.length > 0) {
        setSvg({
          path: pathSegments.join(" "),
          width: maxOffset + 8,
          height: maxHeight + 4,
        })
      }
    }

    const frameId = requestAnimationFrame(computePath)
    const observer = new ResizeObserver(computePath)
    observer.observe(container)

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [items])

  // Track active anchors on scroll
  useEffect(() => {
    if (items.length === 0) return

    const headingIds = items.map((item) => item.url.replace(/^#/, ""))

    function updateActiveAnchors() {
      const headingElements = headingIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)

      if (headingElements.length === 0) return

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const visibleHeadings: string[] = []

      for (const el of headingElements) {
        const rect = el.getBoundingClientRect()
        // Active if heading is within top 65% of viewport
        if (rect.top >= -20 && rect.top <= viewportHeight * 0.65) {
          visibleHeadings.push(el.id)
        }
      }

      if (visibleHeadings.length > 0) {
        setActiveAnchors(visibleHeadings)
      } else {
        // Fallback: heading closest to the top of viewport
        let closestId: string | null = null
        let minDistance = Number.MAX_VALUE

        for (const el of headingElements) {
          const rect = el.getBoundingClientRect()
          const distance = Math.abs(rect.top - 120)
          if (distance < minDistance) {
            minDistance = distance
            closestId = el.id
          }
        }

        if (closestId) {
          setActiveAnchors([closestId])
        }
      }
    }

    updateActiveAnchors()

    const scrollContainer = document.querySelector('article[data-slot="docs"]')

    window.addEventListener("scroll", updateActiveAnchors, { passive: true })
    window.addEventListener("resize", updateActiveAnchors, { passive: true })
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", updateActiveAnchors, { passive: true })
    }

    return () => {
      window.removeEventListener("scroll", updateActiveAnchors)
      window.removeEventListener("resize", updateActiveAnchors)
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", updateActiveAnchors)
      }
    }
  }, [items])

  // Update thumb position based on active anchors using direct DOM styles for 60fps performance
  useEffect(() => {
    const thumbEl = thumbRef.current
    const container = containerRef.current
    if (!thumbEl || !container || activeAnchors.length === 0) {
      if (thumbEl) thumbEl.style.opacity = "0"
      return
    }

    let upper = Number.MAX_VALUE
    let lower = 0
    let hasMatch = false

    for (const id of activeAnchors) {
      const element = container.querySelector<HTMLElement>(`a[href="#${id}"]`)
      if (!element) continue

      hasMatch = true
      const styles = getComputedStyle(element)
      const padTop = parseFloat(styles.paddingTop) || 0
      const padBottom = parseFloat(styles.paddingBottom) || 0

      const top = element.offsetTop + padTop
      const bottom = element.offsetTop + element.clientHeight - padBottom

      upper = Math.min(upper, top)
      lower = Math.max(lower, bottom)
    }

    if (hasMatch && lower > upper) {
      thumbEl.style.top = `${upper}px`
      thumbEl.style.height = `${lower - upper}px`
      thumbEl.style.opacity = "1"
    } else {
      thumbEl.style.opacity = "0"
    }
  }, [activeAnchors, svg])

  if (items.length === 0) {
    return null
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    const id = url.replace(/^#/, "")
    const target = document.getElementById(id)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.pushState(null, "", url)
      setActiveAnchors([id])
    }
  }

  return (
    <div className={cn("space-y-3 sticky top-8 text-sm", className)}>
      <h4 className="text-sm font-medium flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
        <List size={16} className="text-neutral-400" />
        On this page
      </h4>

      <div className="relative mt-3">
        {/* Continuous gray baseline track with diagonal steps */}
        {svg && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${svg.width} ${svg.height}`}
            className="absolute start-0 top-0 pointer-events-none text-neutral-200 dark:text-neutral-800"
            style={{ width: svg.width, height: svg.height }}
            aria-hidden="true"
          >
            <path
              d={svg.path}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )}

        {/* Stepped active purple thumb indicator */}
        {svg && (
          <div
            className="absolute start-0 top-0 pointer-events-none"
            style={{
              width: svg.width,
              height: svg.height,
              maskImage: `url("data:image/svg+xml,${encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" /></svg>`
              )}")`,
              WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" /></svg>`
              )}")`,
            }}
            aria-hidden="true"
          >
            <div
              ref={thumbRef}
              className="absolute w-full bg-purple-600 dark:bg-purple-400 opacity-0 transition-[top,height,opacity] duration-200 ease-out"
            />
          </div>
        )}

        {/* Navigation items list */}
        <div ref={containerRef} className="flex flex-col">
          {items.map((item) => {
            const id = item.url.replace(/^#/, "")
            const isActive = activeAnchors.includes(id)

            return (
              <a
                key={item.url}
                href={item.url}
                onClick={(e) => handleLinkClick(e, item.url)}
                data-active={isActive}
                style={{
                  paddingInlineStart: `${getItemPadding(item.depth)}px`,
                }}
                className={cn(
                  "py-1.5 text-sm transition-colors block select-none leading-relaxed",
                  isActive
                    ? "text-purple-600 dark:text-purple-400 font-medium"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 font-normal"
                )}
              >
                {item.title}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
