import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface UpgradefilterDetails {
    filterOptions: {
        group: string;
        key: string;
        options: {
            value: string;
            label: string;
        }[];
    }[];
    filters: Record<string, string[]>;
    onFilterChange: (filter: any) => void;
    defaultLabel?: string;
}

const Upgradefilter = ({
    filterOptions,
    filters,
    onFilterChange,
    defaultLabel = "Filter",
}: UpgradefilterDetails) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const totalSelected = Object.values(filters).flat().length;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current?.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleValue = (groupKey: string, value: string) => {
        onFilterChange((prev: any) => {
            const exists = prev[groupKey].includes(value);
            return {
                ...prev,
                [groupKey]: exists
                    ? prev[groupKey].filter((v: any) => v !== value)
                    : [...prev[groupKey], value],
            };
        });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-45 px-4 py-1.5 text-sm bg-white  backdrop-blur-sm text-black rounded-lg shadow-sm cursor-pointer outline:none select-none"
            >
                <span>{defaultLabel}</span>
                {totalSelected > 0 && (
                    <span className="ml-2 text-xs bg-blue-600 text-white rounded-full px-2">
                        {totalSelected}
                    </span>
                )}
                <ChevronDown
                    className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-65 bg-white rounded-xl shadow-xl cursor-pointer">
                    {filterOptions.map((group) => (
                        <div key={group.key}>
                            <p className="px-4 py-2 text-xs font-semibold text-black">
                                {group.group}
                            </p>
                            {group.options.map((opt) => {
                                const isSelected = filters[group.key].includes(opt.value);
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => toggleValue(group.key, opt.value)}
                                        className={cn(
                                            "flex w-full items-center justify-between px-4 py-2 text-sm",
                                            isSelected
                                                ? "bg-blue-50 text-blue-700"
                                                : "hover:bg-slate-50 text-slate-600"
                                        )}
                                    >
                                        {opt.label}
                                        {isSelected && <Check className="w-4 h-4" />}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Upgradefilter