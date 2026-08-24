import React, { useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Link, useLocation } from "react-router-dom";
import { SidebarNavItem } from "../types/nav";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[],
  className?: string
}

export function DocsSidebarNav({ items, className }: DocsSidebarNavProps) {
  const pathname = useLocation();
  return items.length ? (
    <div className="w-full relative">
      {items.map((item, index) => (
        <div key={index} className={cn("pb-4", index < items.length - 1 && "border-b border-dashed border-neutral-200 dark:border-neutral-800 mb-2")}>
          <div className="flex gap-1 items-center px-2 py-1">
            <span className="mb-1.5">
              {item.icon}
            </span>
            <h4 className={cn("mb-1 rounded-md text-md font-medium text-black", className)}>
              {item.title}
              <sup className="ml-1 text-[10px] text-red-400">{item.label}</sup>
            </h4>
          </div>
          {item?.items?.length && (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null
}

type DocsSidebarNavItemsProps = {
  items: SidebarNavItem[]
  pathname?: any
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-xs font-medium space-y-0.5">
      {items.map((item, index) => (
        <NavItem key={index} item={item} pathname={pathname} />
      ))}
    </div>
  ) : null
}

type NavItemProps = {
  item: SidebarNavItem
  pathname?: string | null
  className?: string
}

function NavItem({ item, pathname, className }: NavItemProps) {
  const isActive = pathname === item.href
  const hasChildren = item.items && item.items.length > 0
  const [isOpen, setIsOpen] = useState(true);
  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex gap-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md  text-[var(--text-primary-color)] font-medium cursor-pointer p-1.5 hover:bg-accent transition-colors">
          <span className="text-sm">{item.title}</span>
          <ChevronDown className={cn("size-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-3 text-xs mt-2 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-out-to-top-2">
          <DocsSidebarNavItems items={item.items!} pathname={pathname} />
        </CollapsibleContent>
      </Collapsible>
    )
  }

  if (item.href && !item.disabled) {
    return (
      <Link
        to={item.href}
        className={cn(
          "group flex w-full items-center rounded-md px-2 py-1.5",
          item.disabled && "cursor-not-allowed opacity-60",
          isActive ? "font-medium text-white" : "text-zinc-400",
          className
        )}
        target={item.external ? "_blank" : ""}
        rel={item.external ? "noreferrer" : ""}
      >
        <p className="text-sm text-neutral-300">{item.title}</p>
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

