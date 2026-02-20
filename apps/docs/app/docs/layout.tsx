import React, { useEffect, useState } from "react"
import Page from "./page"
import { Sidebar } from "./Sidebar"
import { ChevronDown, Circle, PanelRightClose, Search } from "lucide-react"
import { DocsTableOfContents } from "../../src/components/docspagescomponent/Doc-toc"
import { Link, useParams } from "react-router-dom"
import { source } from "../../src/lib/source"
import { cn } from "@/lib/cn"


export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const params = useParams()
  const slug = params["*"] ? params["*"]?.split('/') : []
  const page = source.getPage(slug)
  //@ts-ignore
  const toc = page?.data?.toc ?? []

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return (
    <div className={cn("min-h-[100dvh] sidebar dark:bg-[var(--bg)] bg-neutral-100", "overflow-x-clip")}>
      {!sidebarOpen && (
        <div data-sidebar-placeholder className="fixed flex top-[calc(1rem+var(--fd-docs-row-3,0px))] start-4 shadow-lg transition-opacity rounded-xl p-0.5 border dark:border-neutral-800 bg-white dark:bg-neutral-900 z-10 lg:block hidden">
          <div className="absolute start-0 inset-y-0 w-4"></div>
          <button
            type="button"
            aria-label="Expand Sidebar"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center justify-center text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring p-2 rounded-sm cursor-pointer"
          >
            <PanelRightClose size={16} className="text-neutral-400" />
          </button>
        </div>
      )}
      <div className="[grid-area:header]  sticky top-(--fd-docs-row-1) z-30 flex items-center p-4 border-b transition-colors backdrop-blur-sm h-(--fd-header-height) md:hidden max-md:layout:[--fd-header-height:--spacing(14)] data-[transparent=false]:bg-fd-background/80">
        <Link to="/" rel="stylesheet" >
          <div className="w-full h-full flex items-center gap-2">
            <div className="w-4 h-4 bg-[#adfa1d] rounded-full"></div>
          </div>
        </Link>
        <div className="flex-1"></div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring hover:bg-fd-accent hover:text-fd-accent-foreground [&_svg]:size-4.5 p-2">
          <Search />
        </button>
      </div>
      <div className="fixed w-full top-[var(--fd-docs-row-2)] z-10 [grid-area:toc-popover] h-(--fd-toc-popover-height) xl:hidden max-lg:h:[--fd-toc-popover-height:--spacing(10)]">
        <header className="border-b backdrop-blur-sm transition-colors bg-fd-background/80">
          <button className="flex w-full h-10 items-center text-sm text-fd-muted-foreground gap-2.5 px-4 py-2.5 text-start focus-visible:outline-none [&_svg]:size-4 md:px-6">
            <Circle size={16} />
            <span className="grid flex-1 *:my-auto *:row-start-1 *:col-start-1">Table of Contents</span>
            <ChevronDown size={16} className="text-neutral-400" />
          </button>
        </header>
      </div>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Page />
      <div className="hidden xl:block px-4 [grid-area:toc] h-screen w-[var(--fd-toc-width)]">
        <DocsTableOfContents toc={toc} />
      </div>
    </div>
  )
}



