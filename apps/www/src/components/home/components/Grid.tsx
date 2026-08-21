import { cn } from "@workspace/ui/lib/utils"

export const Grid = () => {
    return (
        <div className={cn("w-full min-h-[45em] grid grid-cols-2 gap-2 relative")}>
            <div className="relative overflow-hidden rounded-md bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-950"></div>
            <div className="relative overflow-hidden rounded-md bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-950"></div>
            <div className="relative overflow-hidden rounded-md bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-950"></div>
            <div className="relative overflow-hidden rounded-md bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-950"></div>
        </div>
    )
}
