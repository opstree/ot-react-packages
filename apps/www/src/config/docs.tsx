import { SidebarNavItem } from "../../types/nav"
import React from "react"
import { IconFile, IconFolders, IconStarSparkle } from "nucleo-glass"
type CodeThemeName = "default" | "min" | "vitesse" | "slack" | "nord" | "dracula" | "one-dark-pro" | "catppuccin"

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
                },
                {
                    title: "FilterChip",
                    href: "/docs/components/filterchip",
                    items: [],
                },
                {
                    title: "Cards",
                    href: "/docs/components/cards",
                    items: [],
                },
                {
                    title: "SpiderView",
                    href: "/docs/components/spiderview",
                    items: [],
                },
                {
                    title: "Filters",
                    href: "/docs/components/filters",
                    items: [],
                },
                {
                    title: "Chatbot",
                    href: "/docs/components/chatbot",
                    items: [],
                },
                {
                    title: "Header",
                    href: "/docs/components/header",
                    items: [],
                },
                {
                    title: "Pagination",
                    href: "/docs/components/pagination",
                    items: [],
                },
                {
                    title: "Sidebar",
                    href: "/docs/components/sidebar",
                    items: [],
                },
                {
                    title: "Timeline",
                    href: "/docs/components/timeline",
                    items: [],
                },
                {
                    title: "Toggle",
                    href: "/docs/components/toggle",
                    items: [],
                },
            ],
            icon: <IconFolders size={16} />
        },
    ],
}
