import React, { Dispatch, SetStateAction, useEffect, useRef, useState, useMemo } from 'react'
import { ArrowRight, X, CornerUpLeft, CircleDashed } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { docsConfig } from '../../config/docs';
import { SidebarNavItem } from '../../../types/nav';

const Search_bar = ({ Open }: { Open: Dispatch<SetStateAction<boolean>> }) => {
    const [Search, setSearch] = useState('');
    const Inputref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (Inputref.current) {
            Inputref.current.focus();
        }
    }, [])

    const handlenavigate = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
        if (e.key === 'Escape' && Open) {
            Open(false)
        }
    }

    const handleclick = () => {
        if (Open) {
            Open(false);
        }
    }

    const allItems = useMemo(() => {
        const items: Array<{ title: string; href: string; category: string }> = [];

        docsConfig.sidebarNav.forEach((section: any) => {
            const flattenItems = (navItems: SidebarNavItem[], category: string) => {
                navItems.forEach((item) => {
                    if (item.href) {
                        items.push({
                            title: item.title,
                            href: item.href,
                            category: category
                        });
                    }
                    if (item.items && item.items.length > 0) {
                        flattenItems(item.items, category);
                    }
                });
            };

            flattenItems(section.items, section.title);
        });

        return items;
    }, []);

    const filteredItems = useMemo(() => {
        if (!Search.trim()) {
            return [];
        }

        const searchLower = Search.toLowerCase().trim();
        return allItems.filter(item =>
            item.title.toLowerCase().includes(searchLower) ||
            item.category.toLowerCase().includes(searchLower)
        );
    }, [Search, allItems]);

    const groupedResults = useMemo(() => {
        const groups: Record<string, Array<{ title: string; href: string }>> = {};

        filteredItems.forEach(item => {
            if (!groups[item.category]) {
                groups[item.category] = [];
            }
            groups[item.category].push({ title: item.title, href: item.href });
        });

        return groups;
    }, [filteredItems]);

    const handleItemClick = () => {
        if (Open) {
            Open(false);
        }
    }

    const handleResetSearch = (e: React.MouseEvent<SVGElement>) => {
        e.preventDefault();
        setSearch("");
        Inputref.current?.focus();
    }
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, animationDuration: 800 }} className='w-[90%] md:w-[80%] lg:w-[60%] mx-auto absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 bg-[var(--sand-4)] p-1 rounded-xl overscroll-contain ring-1 ring-black/10'>
                <div className='relative min-h-10 flex items-center '>
                    <input ref={Inputref} type="text" value={Search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' className='w-full py-2 px-2 rounded-lg  min-h-12  bg-neutral-50 dark:bg-[var(--bg)] shadow-[var(--shadow)] outline-none border-none text-black dark:text-[var(--foreground)]' />
                    <X onClick={handleResetSearch} className='hover:scale-[.9] hover:bg-[var(--sand-3)] flex cursor-pointer items-center justify-center px-1 rounded-md outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none cursor-pointer absolute right-[1rem] top-[50%] -translate-y-[50%]' />
                </div>
                {/* <div className='w-full'>
                    <p onClick={handleclick} onKeyDown={handlenavigate} tabIndex={0} className='rounded-full px-4 py-2 bg-neutral-50 dark:bg-[var(--bg)] flex items-center gap-2 w-max shadow-[var(--shadow)] cursor-pointer hover:shadow-[var(--shadow-l)] '>
                        <CornerUpLeft className='w-3 h-3 dark:text-white text-black' />
                        <span className='text-sm dark:text-[#ffffff68]'>Esc</span>
                    </p>
                </div> */}
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, animationDuration: 800 }}
                className="w-[90%] md:w-[80%] lg:w-[60%] overflow-y-auto scrollbar-hide overscroll-contain flex flex-col items-start justify-start text-[12px] mt-4 mb-5 absolute top-[65.5%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[var(--sand-3)] px-4 py-2 rounded-xl ring-1 ring-black/10"
                style={{ scrollbarWidth: "none" }}
            >
                {Search.trim() ? (
                    filteredItems.length > 0 ? (
                        <>
                            {Object.entries(groupedResults).map(([category, items]) => (
                                <div key={category} className='w-full mb-4'>
                                    <h2 className='text-xs text-black mb-2 capitalize'>{category}</h2>
                                    {items.map((item) => (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            onClick={handleItemClick}
                                        >
                                            <div className='rounded-sm p-2 text-[14px] hover:bg-[var(--bg)] hover:shadow-[var(--shadow)] text-black cursor-pointer flex items-center gap-2'>
                                                <span className='text-black'><CircleDashed className='w-[12px]' /></span>
                                                {item.title}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className='w-full flex items-center justify-center h-full'>
                            <p className='text-[14px] dark:text-[#ffffff68] text-black'>No results found</p>
                        </div>
                    )
                ) : (
                    <>
                        <div className='py-1'></div>
                        {docsConfig.sidebarNav.map((section: any) => (
                            <div key={section.title} className='w-full mb-2 '>
                                <h2 className='text-xs text-black mb-2 capitalize border-b border-black/10 border-dashed w-full pb-1'>{section.title}</h2>
                                {section.items.filter((item: any) => item.href).map((item: any) => (
                                    <Link
                                        key={item.href}
                                        to={item.href!}
                                        onClick={handleItemClick}
                                    >
                                        <div className='rounded-sm p-2 text-[14px] dark:hover:bg-[var(--bg)] dark:hover:shadow-[var(--shadow)] dark:text-white text-black cursor-pointer flex items-center gap-2'>
                                            <span className='dark:text-zinc-500 text-zinc-800'><CircleDashed className='w-[10px] text-black' /></span>
                                            {item.title}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </>
                )}
            </motion.div>
        </div>
    )
}

export default Search_bar