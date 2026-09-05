import React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { docsConfig } from "../../src/config/docs"
import { DocsSidebarNav } from "../../src/components/sidebar/Sidenav"
import { motion, AnimatePresence } from "framer-motion"

export const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.aside
                    data-lenis-prevent
                    data-lenis-prevent-touch
                    data-lenis-prevent-wheel
                    onWheel={(e) => e.stopPropagation()}
                    className={cn(
                        "fixed inset-y-0 right-0 z-50 w-[20em] lg:w-[var(--fd-sidebar-width)] max-w-[85vw]",
                        "lg:sticky lg:top-12 lg:h-[calc(100vh-3rem)] lg:right-auto lg:left-0 lg:z-30 lg:max-w-none lg:flex lg:flex-col lg:overflow-hidden",
                        "bg-white lg:bg-transparent dark:bg-[#121212] border-r border-black/10 dark:border-white/10 shadow-xl lg:shadow-none"
                    )}
                >
                    <DocsSidebarNav items={docsConfig.sidebarNav} setIsOpen={setIsOpen} />
                </motion.aside>
            )}
        </AnimatePresence>
    )
}