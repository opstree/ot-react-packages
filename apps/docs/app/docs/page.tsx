import { Link, useParams } from "react-router-dom"
import { mdxComponents } from "../../mdx-component"
import {
    ArrowLeft,
    ArrowRight,
} from "lucide-react"

import { source } from "../../src/lib/source"
import { cn } from "@workspace/ui/lib/utils"
import { docsConfig } from "../../src/config/docs"
import { Suspense } from "react"
import React from "react"

function flattenNav(items: any[]): Array<{ url: string; name: string }> {
    const result: Array<{ url: string; name: string }> = []
    for (const item of items) {
        if (item.href) {
            result.push({ url: item.href, name: item.title })
        }
        if (item.items && item.items.length > 0) {
            result.push(...flattenNav(item.items))
        }
    }
    return result
}

function findNeighboursFromConfig(currentUrl: string) {
    const pages = docsConfig.sidebarNav.flatMap(section => flattenNav(section.items))
    const currentIndex = pages.findIndex(p => p.url === currentUrl)

    if (currentIndex === -1) return { previous: null, next: null }

    return {
        previous: currentIndex > 0 ? pages[currentIndex - 1] : null,
        next: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null,
    }
}
export default function Page() {
    const params = useParams()
    const slug = params["*"] ? params["*"]?.split('/') : []
    const page = source.getPage(slug)

    if (!page) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
                    <p className="text-muted-foreground">The requested documentation page could not be found.</p>
                </div>
            </div>
        )
    }

    const doc = page.data
    //@ts-ignore
    const MDX = doc.body

    const neighbours = findNeighboursFromConfig(page.url)
    //@ts-ignore
    const links = doc.links as { doc?: string; api?: string } | undefined
    return (
        <article
            data-slot="docs"
            className={cn("flex flex-col flex-wrap max-w-screen mx-auto md:pt-6 xl:pt-0 xl:layout:[--fd-toc-width:268px] lg:overflow-y-auto lg:h-screen relative overflow-hidden")}
        >
            <div className="flex min-w-0 flex-1 flex-col">
                <div className="mx-auto flex w-full max-w-6xl min-w-0 flex-1 gap-8 px-0 py-0 lg:px-4 lg:py-6 text-neutral-800 lg:py-8 lg:px-4 dark:text-neutral-300">
                    <div className="flex-1 py-4 px-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between w-full">
                                    <h1 className="scroll-m-20 text-2xl lg:text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                                        {doc.title}
                                    </h1>
                                    <div className="docs-nav fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 px-6 py-4 backdrop-blur-sm static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                                        {neighbours.previous &&
                                            <Link to={neighbours.previous.url}>
                                                <button className='rounded-full py-2 px-2 button-3 dark:bg-white flex items-center gap-2 w-max  cursor-pointer '>
                                                    <ArrowLeft className="w-3 h-3 dark:text-neutral-800 text-neutral-900" />
                                                </button>
                                            </Link>
                                        }
                                        {neighbours.next &&
                                            <Link to={neighbours.next.url}>
                                                <button className='rounded-full py-2 px-2  button-3 dark:bg-white flex items-center gap-2 w-max  cursor-pointer '>
                                                    <ArrowRight className="w-3 h-3 dark:text-neutral-800 text-neutral-900" />
                                                </button>
                                            </Link>}
                                    </div>
                                </div>
                                {doc.description && (
                                    <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                                        {doc.description}
                                    </p>
                                )}
                            </div>
                            {links ? (
                                <div className="flex items-center space-x-2 pt-4">
                                    {links?.doc && (
                                        <Link to={links.doc} target="_blank" rel="noreferrer" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent border">
                                            Docs
                                        </Link>
                                    )}
                                    {links?.api && (
                                        <Link to={links.api} target="_blank" rel="noreferrer" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent border">
                                            API Reference
                                        </Link>
                                    )}
                                </div>
                            ) : null}
                        </div>
                        <div data-slot="docs-content" className="w-full flex-1 mt-8 *:data-[slot=alert]:first:mt-0]">
                            {MDX ? (
                                <Suspense fallback={<div className="text-neutral-400">Loading...</div>}>
                                    <MDX components={mdxComponents} />
                                </Suspense>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-neutral-800 rounded-xl text-neutral-500">
                                    <p className="text-sm">Documentation content is coming soon.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
