import React, { useState, useEffect } from "react"
import { Github, Search } from "lucide-react"
import { Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle.jsx"
import SearchBar from "../Search_bar/Search_bar.jsx"

const Navbar = () => {
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
        <header className="w-full relative top-[.2rem] left-0 z-50 text-sm h-[var(--header-height)] mb-4">
            <nav className=" w-full p-[.5rem] gap-10 flex justify-between items-center border-b border-neutral-300/50 dark:border-neutral-600/50">
                <div className="font-semibold md:block border-r border-neutral-300/50 w-[6rem] py-1">
                    <Link to="/">
                        <p className="flex justify-center items-center">Ops-UI</p>
                    </Link>
                </div>
                <div className="flex gap-4 items-center justify-start w-1/3">
                    <Link to="/docs/introduction" className="font-medium text-sm">
                        Docs
                    </Link>
                    {/* <Link to="/template" className="font-medium text-sm">
                        Template
                    </Link> */}
                </div>
                <div className="flex items-center gap-4 w-2/3 justify-end px-4">
                    <button onClick={() => setOpen(!Open)} className="flex ring-[.5px] dark:ring-white/30 dark:hover:ring-white/10 transition-all duration-300 ease-inOut hover:scale-[.986] justify-between cursor-pointer relative items-center w-42 h-[2em] dark:bg-[var(--bg)] ring-[.5px] ring-black/20  bg-neutral-200 shadow dark:shadow-[var(--shadow-s)]  rounded-md  px-[1rem] py-[1rem] outline-0 text-sm " >
                        <p className="border-r-1 border-neutral-600/50 mr-4 pr-4">
                            <Search className="w-4 h-4" />
                        </p>
                        <div className="right-[10px] flex items-center gap-2 text-[12px] text-neutral-500">
                            <div className=" bg-neutral-300 dark:bg-[var(--bg-light)]  flex items-center justify-center rounded-sm px-[6px] py-[2px]">⌘</div>
                            <div className=" bg-neutral-300 dark:bg-[var(--bg-light)]  flex items-center justify-center rounded-sm px-[8px] py-[2px] ">K</div>
                        </div>
                    </button>
                    <ThemeToggle />
                    <Link to="/">
                        <button className=' flex justify-between ring-[.5px] ring-black/20 cursor-pointer relative items-center p-2 dark:ring-[.5px] dark:ring-white/30 dark:hover:ring-white/10 hover:scale-[.98] flex justify-center items-center dark:bg-[var(--bg)] bg-neutral-200 dark:shadow-[var(--shadow-s)] rounded-md outline-0 text-sm gap-2 items-center flex duration-600 ease-inOut'>
                            <Github size={16} />
                        </button>
                    </Link>
                </div>
            </nav>
            {
                Open &&
                <div onClick={() => setOpen(false)} className='fixed inset-0 h-screen z-[20000] backdrop-blur-[2px]'>
                    <SearchBar Open={setOpen} />
                </div>
            }
        </header>
    )
}
export default Navbar