import { useState } from "react";
import { Grid } from "./components/Grid";
import { cn } from "@workspace/ui/lib/utils";

const Task = [
    { title: "Template" },
    { title: "Components" }
]

const ComponentGrid = () => {
    const [active, setAvtive] = useState("template");

    return (
        <section className="relative my-4 w-full max-w-full h-full overflow-hidden rounded-2xl md:my-12">
            {/* <div className="flex items-center justify-start bg-gray-100 py-2 pl-4 dark:bg-neutral-800">
                <div className="mr-6 flex items-center w-full gap-2">
                    <div className="w-full flex items-center justify-center gap-2">
                        <div className="bg-[var(--sand-2)]  flex  gap-2 items-center p-0.5 rounded-sm ring-1 ring-black/10">
                            <div className="flex items-center relative">
                                <button className="bg-[var(--sand-3)] px-4 py-1 rounded-md text-black text-xs cursor-pointer">Components</button>
                            </div>
                            <div className="h-4 w-[1px] bg-black/10"> </div>
                            <div className="flex items-center relative">
                                <button className="bg-[var(--sand-3)] px-4 py-1 rounded-md text-black text-xs cursor-pointer">Template</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className={"w-full overflow-hidden realtive bg-gray-100/50 mask-b-from-30% px-2 pt-2 perspective-distant dark:bg-neutral-900"}>
                <div className={cn("relative h-140 overflow-hidden rounded-tl-xl rounded-tr-xl bg-white shadow-sm ring-1 shadow-black/10 ring-black/10 will-change-transform md:h-200 dark:bg-neutral-950 [&>div]:bg-white dark:[&>div]:bg-neutral-950", "p-3")}>
                    <Grid />
                </div>
            </div>
            <button type="button" onClick={() => { }} className="absolute bottom-20 z-[50] left-[50%] bg-[var(--sand-2)] text-sm font-medium text-[var(--text-primary-color)] cursor-pointer ring-1 ring-black/10 px-4 py-1 rounded-full -translate-y-1/2 -translate-x-1/2">see more</button>
        </section >
    );
};

export default ComponentGrid;