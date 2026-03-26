import React, { useState } from 'react';
import { FilterChip } from '../components/docs/Filterchip';

interface Filters {
    status: string[];
    category: string[];
    [key: string]: string[];
}

const FilterChipUsage = () => {
    const [filters, setFilters] = useState<Filters>({
        status: ['active', 'pending'],
        category: ['frontend'],
    });

    const filterOptions = [
        {
            group: "Status",
            key: "status",
            options: [
                { label: "Active", value: "active" },
                { label: "Pending", value: "pending" },
                { label: "Completed", value: "completed" },
            ]
        },
        {
            group: "Category",
            key: "category",
            options: [
                { label: "Frontend", value: "frontend" },
                { label: "Backend", value: "backend" },
                { label: "DevOps", value: "devops" },
            ]
        }
    ];

    const removeValue = (groupKey: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [groupKey]: (prev[groupKey] || []).filter((v: string) => v !== value)
        }));
    };

    return (
        <div className="w-full p-6 space-y-8 min-h-[200px]">
            <div>
                <h2 className="text-xl font-bold mb-4">Active Filters</h2>
                <div className="p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
                    <FilterChip
                        filterOptions={filterOptions}
                        filters={filters}
                        removeValue={removeValue}
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => setFilters({ status: ['active', 'pending'], category: ['frontend'] })}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                >
                    Reset Demo
                </button>
            </div>
        </div>
    );
};

export default FilterChipUsage;
