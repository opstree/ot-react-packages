import React, { useState } from 'react';
import Upgradefilter from '../docs/MultipleFilter';

const MultipleFilterUsage = () => {
    const [filters, setFilters] = useState({
        region: [],
        type: [],
        tier: [],
    });

    const filterOptions = [
        {
            group: "Region",
            key: "region",
            options: [
                { label: "US East", value: "us-east" },
                { label: "US West", value: "us-west" },
                { label: "EU West", value: "eu-west" },
            ]
        },
        {
            group: "Type",
            key: "type",
            options: [
                { label: "Compute", value: "compute" },
                { label: "Storage", value: "storage" },
                { label: "Network", value: "network" },
            ]
        }
    ];

    return (
        <div className="w-full p-6 space-y-8 min-h-[300px]">
            <div className="flex items-center gap-4">
                <Upgradefilter
                    filterOptions={filterOptions}
                    filters={filters}
                    onFilterChange={setFilters}
                    defaultLabel="Select Resources"
                />

                <div className="text-sm text-slate-500">
                    Selected: {Object.values(filters).flat().length} items
                </div>
            </div>

            <div className="p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900">
                <p className="text-sm font-semibold mb-2">Current State:</p>
                <pre className="text-xs">{JSON.stringify(filters, null, 2)}</pre>
            </div>
        </div>
    );
};

export default MultipleFilterUsage;
