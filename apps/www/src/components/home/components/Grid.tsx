import { cn } from "@workspace/ui/lib/utils"

export const Grid = () => {
    return (
        <div className={cn("w-full min-h-[45em] grid grid-cols-3 gap-2 relative")}>
            <div className="mb-2 block break-inside-avoid rounded-xl bg-card p-2 shadow-sm ring-1 ring-foreground/6.5 transition-shadow hover:shadow-md hover:ring-foreground/7.5 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-ring"></div>
            <div className="mb-2 block break-inside-avoid rounded-xl bg-card p-2 shadow-sm ring-1 ring-foreground/6.5 transition-shadow hover:shadow-md hover:ring-foreground/7.5 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-ring"></div>
            <div className="mb-2 block break-inside-avoid rounded-xl bg-card p-2 shadow-sm ring-1 ring-foreground/6.5 transition-shadow hover:shadow-md hover:ring-foreground/7.5 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-ring"></div>
            <div className="mb-2 block break-inside-avoid rounded-xl bg-card p-2 shadow-sm ring-1 ring-foreground/6.5 transition-shadow hover:shadow-md hover:ring-foreground/7.5 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-ring"></div>
            <div className="mb-2 block break-inside-avoid rounded-xl bg-card p-2 shadow-sm ring-1 ring-foreground/6.5 transition-shadow hover:shadow-md hover:ring-foreground/7.5 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-ring"></div>
            <div className="mb-2 block break-inside-avoid rounded-xl bg-card p-2 shadow-sm ring-1 ring-foreground/6.5 transition-shadow hover:shadow-md hover:ring-foreground/7.5 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-ring"></div>
        </div>
    )
}
