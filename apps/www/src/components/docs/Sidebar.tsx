import React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { ScrollArea } from "@workspace/ui/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { IconFile, IconFolders, IconStarSparkle } from "nucleo-glass"
type CodeThemeName = "default" | "min" | "vitesse" | "slack" | "nord" | "dracula" | "one-dark-pro" | "catppuccin"


interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    label?: string
    icon?: React.ReactNode
    items?: NavItem[],
    className?: string,
    pathname?: string,
    setIsOpen?: (open: boolean) => void
}

interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[]
}

interface SidebarNavItem extends NavItemWithChildren { }



interface DocsConfig {
    sidebarNav: SidebarNavItem[]
    codeTheme?: CodeThemeName
}

export const docsConfig: DocsConfig = {
    codeTheme: (process.env.CODE_THEME as CodeThemeName) || "nord",
    sidebarNav: [
        {
            title: "Getting Started",
            items: [
                {
                    title: "Introduction",
                    href: "/docs/introduction",
                    items: []
                },
                {
                    title: "Installation",
                    href: "/docs/installation",
                    items: [],
                },
                {
                    title: "Style",
                    href: "/docs/style/style",
                    items: [],
                    icon: <IconStarSparkle size={14} />
                }
            ],
            icon: <IconFile size={16} />
        },
        {
            title: "Components",
            items: [
                {
                    title: "Table",
                    href: "/docs/components/table",
                    items: [],
                },
                {
                    title: "Skeleton",
                    href: "/docs/components/skeleton",
                    items: [],
                }
            ],
            icon: <IconFolders size={16} />
        },
    ],
}

export const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
    return (
        <>
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.aside
                        initial={{ x: 0 }}
                        animate={{ x: 0 }}
                        exit={{ x: -100 }}
                        transition={{ duration: 0.01, ease: "easeInOut" }}
                        className={cn(
                            "[grid-sidebar] h-screen absolute top-0  lg:sticky lg:top-0 lg:pt-4 z-30 hidden shrink-0 md:block dark:bg-[#121212] bg-neutral-200/50 border-r-1 w-[var(--fd-sidebar-width)]")}
                    >
                        <ScrollArea>
                            <DocsSidebarNav items={docsConfig.sidebarNav} setIsOpen={setIsOpen} />
                        </ScrollArea>
                    </motion.aside>
                )}
            </AnimatePresence>

            {!isOpen && (
                <div data-sidebar-placeholder className="absolute left-4 top-4 shadow-lg transition-opacity rounded-xl p-0.5 border dark:border-neutral-800 bg-white dark:bg-neutral-900 z-50 lg:block hidden">
                    <button
                        type="button"
                        aria-label="Expand Sidebar"
                        onClick={() => setIsOpen(true)}
                        className="inline-flex items-center justify-center text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring p-2 rounded-sm cursor-pointer"
                    >
                        <PanelRightClose size={16} className="text-neutral-400" />
                    </button>
                </div>
            )}
        </>
    )
}

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
        <div className={cn("w-full h-full min-h-screen text-[#1e1e1e] relative", "pt-0 py-4 px-1", className)}>
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
                        className="cursor-pointer text-neutral-500 hover:text-foreground transition-colors"
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
