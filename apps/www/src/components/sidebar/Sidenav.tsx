import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"
import { PanelLeftClose, ChevronDown } from "lucide-react";
import type { NavItem } from "../../../types/nav"
import { IconStarSparkle } from "nucleo-glass";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/ui/collapsible";

interface NavSection {
  title: string
  items: NavItem[]
}

interface NavItemProps {
  item: NavItem,
  pathname: string,
  className?: string
}

interface DocsSidebarNavProps {
  items: NavSection[]
  className?: string
  setIsOpen: (open: boolean) => void
}

export function DocsSidebarNav({ items, className, setIsOpen }: DocsSidebarNavProps) {
  const { pathname } = useLocation();
  return items.length ? (
    <aside className={cn("w-full lg:*:w-[var(--fd-sidebar-width)] duration-250 h-full min-h-screen text-[#1e1e1e]",
      "pt-0 py-4 px-1",
      className)}>
      <div className="w-full h-full px-4">
        <header className="w-full flex items-center justify-between mb-4 lg:hidden">
          <div className="w-full h-full flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <IconStarSparkle size={18} style={{
                '--nc-gradient-1-color-1': '#b95959ff',
                '--nc-gradient-2-color-2': "pink",
              } as React.CSSProperties}
                className="mb-1"
              />
              <span className="font-semibold text-lg capitalize dark:text-white text-black" style={{ letterSpacing: "-0.3px" }}>Opsdocs</span>
            </Link>
          </div>
          <PanelLeftClose
            onClick={() => setIsOpen(false)}
            size={16}
            className="cursor-pointer text-neutral-500 transition-colors"
          />
        </header>
        <div className="space-y-4">
          {items.map((section, index) => (
            <div key={index} className="space-y-1.5">
              <h4 className="text-sm font-medium border-b border-dashed border-black border-neutral-300" style={{ letterSpacing: "-0.3px" }}>
                {section.title}
              </h4>
              <DocsSidebarNavItems items={section.items} pathname={pathname} />
            </div>
          ))}
        </div>
      </div>
    </aside>
  ) : null
}


export function DocsSidebarNavItems({
  items,
  pathname,
}: { items: NavItem[], pathname: string }) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-xs font-medium  gap-2">
      {items.map((item, index) => (
        <NavItem key={index} item={item} pathname={pathname} />
      ))}
    </div>
  ) : null
}


function NavItem({ item, pathname, className }: NavItemProps) {
  const isActive = pathname === item.href
  const hasChildren = item.items && item.items.length > 0
  const [isOpen, setIsOpen] = useState(false);

  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md text-[var(--text-primary-color)] font-medium cursor-pointer px-2 py-1.5 hover:bg-accent transition-colors">
          <div className="flex items-center gap-2">
            {item.icon}
            <span className="text-sm">{item.title}</span>
          </div>
          <ChevronDown className={cn("size-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-3 text-xs mt-2 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-out-to-top-2">
          <DocsSidebarNavItems items={item.items!} pathname={pathname} />
        </CollapsibleContent>
        <div className="border-b border-dashed pb-2 w-full h-1"></div>
      </Collapsible >
    )
  }

  if (item.href && !item.disabled) {
    return (
      <Link
        to={item.href}
        onClick={() => !item.external && setIsOpen(false)}
        className={cn(
          "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 transition-all duration-200",
          item.disabled && "cursor-not-allowed opacity-60",
          isActive
            ? "font-medium bg-white text-black shadow-sm ring-1 ring-black/5 dark:bg-zinc-800 dark:text-white"
            : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50",
          className
        )}
        target={item.external ? "_blank" : ""}
        rel={item.external ? "noreferrer" : ""}
      >
        <p className="">{item.title}</p>
        {item.label === "new" && (
          <span className="ml-2 rounded-md border border-black bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
            {item.label}
          </span>
        )}
        {item.label === "recent" && (
          <span className="ml-2 rounded-md border border-black  px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
            {item.label}
          </span>
        )}
        {item.label === "updated" && (
          <span className="ml-2 rounded-md border border-black bg-pink-400 px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
            {item.label}
          </span>
        )}
      </Link>
    )
  }

  return (
    <span
      className={cn(
        "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
        item.disabled && "cursor-not-allowed opacity-60"
      )}
    >
      {item.title}
      {item.label && (
        <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
          {item.label}
        </span>
      )}
    </span>
  )
}