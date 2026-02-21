import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface FilterChipProps {
    filterOptions: {
        group: string;
        key: string;
        options: { label: string; value: string }[];
    }[];
    filters: Record<string, string[]>;
    removeValue: (groupKey: string, value: string) => void;
}

export const FilterChip = ({ filterOptions, filters, removeValue }: FilterChipProps) => {
    return (
        <div className="flex gap-2 overflow-x-auto overflow-hidden">
            {filterOptions.map(group =>
                filters[group.key].map((val) => {
                    const opt = group.options.find((o: any) => o.value === val);
                    return (
                        <motion.div
                            key={`${String(group.key)}-${val}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2 bg-white text-blue-700 px-3 py-1 rounded-full text-[11px] font-medium "
                        >
                            <span className="text-slate-400 font-normal">{group.group}:</span>
                            <span>{opt?.label || val}</span>
                            <button
                                onClick={() => removeValue(group.key, val)}
                                className="text-red-500 cursor-pointer"
                            >
                                <X size={12} />
                            </button>
                        </motion.div>
                    );
                })
            )}
        </div>
    );
};