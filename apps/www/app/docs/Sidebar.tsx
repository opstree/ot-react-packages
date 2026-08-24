import React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { docsConfig } from "../../src/config/docs"
import { DocsSidebarNav } from "../../src/components/sidebar/Sidenav"
import { ScrollArea } from "@workspace/ui/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

export const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.aside
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={cn(
                        "fixed inset-y-0 right-0 z-50 w-[20em] lg:w-[var(--fd-sidebar-width)] max-w-[85vw]",
                        "lg:sticky lg:relative lg:right-auto lg:max-w-none lg:top-0 lg:z-30 lg:left-0",
                        "bg-white lg:bg-transparent dark:bg-[#121212] border-l shadow-xl"
                    )}
                >
                    <ScrollArea className="border-l-0 h-full">
                        <DocsSidebarNav items={docsConfig.sidebarNav} setIsOpen={setIsOpen} />
                    </ScrollArea>
                </motion.aside>
            )}
        </AnimatePresence>
    )
}