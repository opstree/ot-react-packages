import React, { useState, useEffect } from "react"
import { Github, PanelRightClose, Search } from "lucide-react"
import { Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle.js"
import SearchBar from "../Search_bar/Search_bar.js"
import { cn } from "@workspace/ui/lib/utils"
import { IconStarSparkle } from "nucleo-glass"

const Navbar = ({ onSidebarToggle }: { onSidebarToggle?: (open: boolean) => void }) => {
    const [Open, setOpen] = useState(false)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault()
                setOpen(true)
            }
            if (event.key === 'Escape' && Open) {
                setOpen(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [Open])
    return (
        <header className="sticky top-0 z-100 w-full border-b border-black/10 bg-white dark:border-white/10 dark:bg-black">
            <div className="mx-auto flex h-12 items-center px-8">
                <Link to="/" className=" w-20 flex items-center justify-center text-center text-xs font-bold">
                    Ops-UI
                </Link>
                <nav className=" w-full flex justify-end items-center xl:flex mr-3 ">
                    <Link to="/docs/introduction" className="hidden space-x-1 rounded-md text-xs hover:bg-accent hover:text-accent-foreground py-2 flex cursor-pointer items-center justify-center px-2 outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none undefined font-medium hover:bg-gray-100 sm:flex dark:hover:bg-neutral-900">
                        Docs
                    </Link>
                </nav>
                <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
                    <button onClick={() => setOpen(!Open)} className="flex ring-[.5px] dark:ring-white/30 dark:hover:ring-white/10 transition-all duration-300 ease-inOut hover:scale-[.986] justify-between cursor-pointer relative items-center w-42 h-[1em] bg-white ring-[.5px] ring-black/20  bg-[#f5f5f5]  dark:shadow-[var(--shadow-s)]  rounded-md  px-[.3rem] py-[1rem] outline-0 text-sm hidden lg:flex" >
                        <p className="mr-4 pl-2 flex items-center gap-2">
                            <Search className="size-3" />
                            <span className="text-medium text-xs">Search</span>
                        </p>
                        <div className="flex items-center gap-2 text-[12px] text-neutral-500 bg-neutral-100 ring-1 ring-black/10 rounded-sm" >
                            <div className="  flex items-center justify-center px-[6px] py-[2px]">⌘</div>
                            <div className="h-2 w-[1px] bg-black"></div>
                            <div className=" flex items-center justify-center px-[8px] py-[2px] ">K</div>
                        </div>
                    </button>
                    <Search className="size-4 lg:hidden cursor-pointer text-zinc-500" onClick={() => setOpen(!Open)} />
                    {/* <ThemeToggle /> */}
                    <Link to="https://github.com/opstree/ot-react-packages" target="_blank" rel="noopener noreferrer" className={cn("whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ", "hover:bg-accent hover:text-accent-foreground py-2 flex cursor-pointer items-center justify-center px-2 outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none undefined")}>
                        <Github size={14} className="text-zinc-500" />
                    </Link>
                    <PanelRightClose
                        onClick={() => onSidebarToggle?.(false)}
                        size={16}
                        className="cursor-pointer text-neutral-500 transition-colors lg:hidden"
                    />
                </div>
                {
                    Open &&
                    <div onClick={() => setOpen(false)} className='fixed inset-0 h-screen z-[20000] backdrop-blur-[2px] overscroll-contain overflow-hidden'>
                        <SearchBar Open={setOpen} />
                    </div>
                }
                <div className="w-[2px] h-6 bg-neutral-400/30 mr-2">
                </div >
                <Link to="/login" className="hidden space-x-1 rounded-md text-xs hover:bg-accent hover:text-accent-foreground py-2 flex cursor-pointer items-center justify-center px-2 outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none undefined font-medium hover:bg-gray-100 sm:flex dark:hover:bg-neutral-900">
                    Login
                </Link>
            </div>
        </header>
    )
}
export default Navbar