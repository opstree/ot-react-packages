import { Grid } from "./components/Grid";
import { cn } from "@workspace/ui/lib/utils";

const ComponentGrid = () => {
    return (
        <section className="relative my-4 h-full w-full max-w-full overflow-visible md:my-12">
            <div className="pointer-events-none absolute -inset-x-32 inset-y-0 top-0 z-10 border-t border-border dark:border-neutral-800" />
            <div className={"w-full overflow-hidden realtive bg-gray-100/50 mask-b-from-30% px-2 pt-2 perspective-distant dark:bg-neutral-900"}>
                <div className="pointer-events-none absolute inset-x-0 -inset-y-32 z-20 border-x border-border mask-y-from-90% dark:border-neutral-800"></div>
                <div className={cn("relative h-140 overflow-hidden  will-change-transform md:h-200 ", "p-1")}>
                    <Grid />
                </div>
            </div>
            <button type="button" onClick={() => { }} className="absolute bottom-20 z-[50] left-[50%] bg-[var(--sand-2)] text-sm font-medium text-[var(--text-primary-color)] cursor-pointer ring-1 ring-black/10 px-4 py-1 rounded-full -translate-y-1/2 -translate-x-1/2">
                see more
            </button>
        </section>
    );
};

export default ComponentGrid;