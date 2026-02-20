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
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
                    exit={{ x: -100 }}
                    transition={{ duration: 0.01, ease: "easeInOut" }}
                    className={cn(
                        "[grid-sidebar] h-screen absolute top-0  lg:sticky lg:top-0 lg:pt-4 z-30 hidden shrink-0 md:block dark:bg-[#121212] bg-neutral-200/50 border-r-1 w-[var(--fd-sidebar-width)]"                    )}
                >
                    <ScrollArea>
                        <DocsSidebarNav items={docsConfig.sidebarNav} setIsOpen={setIsOpen} />
                    </ScrollArea>
                </motion.aside>
            )}
        </AnimatePresence>
    )
}