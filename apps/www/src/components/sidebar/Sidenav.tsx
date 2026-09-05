import React, { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@workspace/ui/lib/utils"
import { PanelLeftClose } from "lucide-react";
import type { NavItem } from "../../../types/nav"
import { IconStarSparkle } from "nucleo-glass";
import {
  Sidebar001,
  Sidebar001Content,
  Sidebar001Group,
  Sidebar001Section,
  Sidebar001Item,
} from "../common/SidebarAnimation";

interface NavSection {
  title: string
  items: NavItem[]
}

interface DocsSidebarNavProps {
  items: NavSection[]
  className?: string
  setIsOpen: (open: boolean) => void
}

export function DocsSidebarNav({ items, className, setIsOpen }: DocsSidebarNavProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsOpen?.(false);
    }
  }, [pathname, setIsOpen]);

  if (!items?.length) return null;

  const handleItemClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen?.(false);
    }
  };

  return (
    <aside
      data-lenis-prevent
      data-lenis-prevent-touch
      data-lenis-prevent-wheel
      onWheel={(e) => e.stopPropagation()}
      className={cn("w-full h-full max-h-full flex flex-col min-h-0 overflow-hidden text-foreground", className)}
    >
      <div className="w-full h-full max-h-full flex flex-col min-h-0 overflow-hidden px-2">
        <header className="w-full flex items-center justify-between mb-4 lg:hidden px-2 pt-2 shrink-0">
          <div className="w-full flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <IconStarSparkle size={18} className="mb-1 text-primary" />
              <span className="font-semibold text-lg capitalize text-foreground" style={{ letterSpacing: "-0.3px" }}>Opsdocs</span>
            </Link>
          </div>
          <PanelLeftClose
            onClick={() => setIsOpen(false)}
            size={16}
            className="cursor-pointer text-neutral-500 hover:text-foreground transition-colors"
          />
        </header>

        <Sidebar001 className="w-full h-full max-h-full flex flex-col min-h-0 overflow-hidden bg-transparent border-none">
          <Sidebar001Content className="px-0 py-2">
            {items.map((section, idx) => (
              <Sidebar001Section key={idx} label={section.title}>
                {section.items?.map((item, itemIdx) => {
                  const hasChildren = item.items && item.items.length > 0;
                  if (hasChildren) {
                    const isGroupActive = item.items?.some(sub => sub.href === pathname);
                    return (
                      <Sidebar001Group
                        key={itemIdx}
                        label={item.title}
                        icon={item.icon}
                        defaultOpen={isGroupActive || itemIdx === 0}
                      >
                        {item.items?.map((subItem, subIdx) => (
                          <Sidebar001Item
                            key={subIdx}
                            href={subItem.href || "#"}
                            label={subItem.title}
                            isActive={pathname === subItem.href}
                            isNew={subItem.label === "new"}
                            onClick={handleItemClick}
                          />
                        ))}
                      </Sidebar001Group>
                    );
                  }

                  return (
                    <Sidebar001Item
                      key={itemIdx}
                      href={item.href || "#"}
                      label={item.title}
                      isActive={pathname === item.href}
                      isNew={item.label === "new"}
                      onClick={handleItemClick}
                    />
                  );
                })}
              </Sidebar001Section>
            ))}
          </Sidebar001Content>
        </Sidebar001>
      </div>
    </aside>
  );
}

export function DocsSidebarNavItems({
  items,
  pathname,
  setIsOpen,
}: { items: NavItem[], pathname: string, setIsOpen?: (open: boolean) => void }) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-xs font-medium gap-2">
      {items.map((item, index) => (
        <Sidebar001Item
          key={index}
          href={item.href || "#"}
          label={item.title}
          isActive={pathname === item.href}
          isNew={item.label === "new"}
          onClick={() => {
            if (window.innerWidth < 1024) {
              setIsOpen?.(false);
            }
          }}
        />
      ))}
    </div>
  ) : null
}