import React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"
import { PanelLeftClose } from "lucide-react";
import type { NavItem } from "../../../types/nav"
import { IconStarSparkle } from "nucleo-glass";

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
    <div className={cn("w-full h-full min-h-screen text-[#1e1e1e]", "pt-0 py-4 px-1", className)}>
      <div className="w-full h-full px-4">
        <header className="w-full flex items-center justify-between mb-4">
          <div className="w-full h-full flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <IconStarSparkle size={18} style={{
                '--nc-gradient-1-color-1': '#b95959ff',
                '--nc-gradient-2-color-2': "pink",
              } as React.CSSProperties}
              className="mb-1"
              />
              <span className="font-semibold text-lg uppercase tracking-tight dark:text-white text-black">Opsdocs</span>
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
              <h4 className="text-sm font-semibold uppercase tracking-tight dark:text-neutral-200">
                {section.title}
              </h4>
              <DocsSidebarNavItems items={section.items} pathname={pathname} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null
}


export function DocsSidebarNavItems({
  items,
  pathname,
}: { items: NavItem[], pathname: string }) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-xs font-medium ml-2">
      {items.map((item, index) => (
        <NavItem key={index} item={item} pathname={pathname} />
      ))}
    </div>
  ) : null
}


function NavItem({ item, pathname, className }: NavItemProps) {
  const isActive = pathname === item.href
  const hasChildren = item.items && item.items.length > 0

  if (hasChildren) {
    return (
      <div>
        <span className={`flex w-full cursor-default items-center rounded-md text-md text-neutral-200 font-medium `}>
          {item.title}
        </span>
        <div className={`ml-3 border-l border-border pl-3 text-xs ${isActive ? "text-white" : "light:text-[#1e1e1e]"}`}>
          <DocsSidebarNavItems items={item.items!} pathname={pathname} />
        </div>
      </div>
    )
  }

  if (item.href && !item.disabled) {
    return (
      <Link
        to={item.href}
        className={cn(
          "group flex w-full items-center rounded-md border border-transparent px-2 py-1",
          item.disabled && "cursor-not-allowed opacity-60",
          isActive ? "font-medium dark:text-white text-neutral-900" : "text-zinc-500",
          className
        )}
        target={item.external ? "_blank" : ""}
        rel={item.external ? "noreferrer" : ""}
      >
        <p className=" hover:underline ">{item.title}</p>
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
