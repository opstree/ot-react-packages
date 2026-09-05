import { cn } from "@workspace/ui/lib/utils"

export const Button = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-4"><path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5"></path><path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5"></path><path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5"></path><path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"></path><path d="M5 3l-1 -1"></path><path d="M4 7h-1"></path><path d="M14 3l1 -1"></path><path d="M15 6h1"></path></svg>
    )
}

export const Table = ({ className = "" }: { className?: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className={cn("icon icon-tabler icons-tabler-outline icon-tabler-chart-bar size-4", className)}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6" />
            <path d="M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10" />
            <path d="M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14" />
            <path d="M4 20h14" />
        </svg>
    )
}