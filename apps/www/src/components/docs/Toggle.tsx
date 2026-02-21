import React from "react"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../theme-provider"
import { cn } from "@workspace/ui/lib/utils"

export const Toggle = () => {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "relative flex items-center justify-center rounded-md transition-all duration-300 py-1.5 px-4 ring-[.5px] ring-black/20",
                "overflow-hidden flex justify-between cursor-pointer relative items-center p-2 dark:ring-[.5px] dark:ring-white/30 hover:ring-white/10 hover:scale-[.98] flex justify-center items-center dark:bg-[var(--bg)] bg-neutral-200 shadow-sm dark:shadow-[var(--shadow-s)] rounded-md outline-0 text-sm gap-2 items-center flex duration-600 ease-inOut ",
                "outline-none focus-visible:ring-primary/50"
            )}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                    <motion.div
                        key="moon"
                        initial={{ y: 20, opacity: 0, rotate: 45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: -45 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <Moon size={16} className="text-neutral-400 group-hover:text-neutral-200" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ y: 20, opacity: 0, rotate: 45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: -45 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <Sun size={16} className="text-yellow-500" />
                    </motion.div>
                )}
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}

