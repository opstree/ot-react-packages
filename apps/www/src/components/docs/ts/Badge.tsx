import { useState } from "react";
import { Folder, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

type Badge = {
    id: number;
    label: string;
};

const initialBadges: Badge[] = [
    { id: 1, label: "Revenue forecast" },
    { id: 2, label: "Q4 Report" },
    { id: 3, label: "Marketing" },
    { id: 4, label: "Customers" },
    { id: 5, label: "Growth analysis" },
];

export default function AnimatedBadgeDemo() {
    const [badges, setBadges] = useState(initialBadges);
    const [removing, setRemoving] = useState<number[]>([]);

    const removeBadge = (id: number) => {
        setRemoving((prev) => [...prev, id]);

        setTimeout(() => {
            setBadges((prev) => prev.filter((item) => item.id !== id));
            setRemoving((prev) => prev.filter((x) => x !== id));
        }, 300);
    };

    return (
        <div className="min-h-screen bg-zinc-950 p-10">
            <h1 className="mb-6 text-2xl font-bold text-white">
                Animated Remove Badge
            </h1>

            <div className="flex flex-wrap gap-2">
                {badges.map((badge) => {
                    const isRemoving = removing.includes(badge.id);

                    return (
                        <div
                            key={badge.id}
                            className={cn(" overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", `${isRemoving} ? "max-w-0 opacity-0 scale-75" : "max-w-[220px] opacity-100 scale-100`)}
                        >
                            <button
                                className={cn("group relative flex h-9 items-center rounded-full", "border border-zinc-800 bg-zinc-900 pl-3 pr-3 text-sm text-zinc-100 transition-colors hover:bg-zinc-800 hover:border-zinc-700")}
                            >
                                <Folder
                                    size={14}
                                    className="mr-2 shrink-0 text-zinc-400"
                                />

                                <span className="pr-5 whitespace-nowrap">
                                    {badge.label}
                                </span>

                                <button
                                    onClick={() => removeBadge(badge.id)}
                                    className={cn(" absolute right-3 opacity-0 scale-75 translate-x-1 transition-all duration-200 ", "group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0")}
                                >
                                    <X
                                        size={14}
                                        className={cn("text-zinc-500", "hover:text-white")}
                                    />
                                </button>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}