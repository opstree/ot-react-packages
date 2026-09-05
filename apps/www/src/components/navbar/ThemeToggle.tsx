import React from "react"
import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../theme-provider"
import { cn } from "@workspace/ui/lib/utils"

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ", "hover:bg-accent hover:text-accent-foreground h-10 py-2 flex cursor-pointer items-center justify-center px-3 outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none undefined"
            )}
            aria-label="Toggle theme"
        >
            {/* icon swap — polished: var(--icon-swap-dur) 250ms / var(--icon-swap-ease) */}
            <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                    <motion.div
                        key="moon"
                        initial={{ y: 20, opacity: 0, rotate: 45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: -45 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        <Moon size={16} className="text-neutral-400 group-hover:text-neutral-200" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ y: 20, opacity: 0, rotate: 45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: -45 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        <Sun size={16} className="text-yellow-500" />
                    </motion.div>
                )}
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}

export default ThemeToggle
