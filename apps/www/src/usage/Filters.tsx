import React, { useState } from 'react'
import { Upgradecluster } from '../components/docs/Filters';

const FiltersUsage = () => {
    return (
        <div className="w-full h-[600px] border rounded-lg bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative">
            <div className="h-full overflow-y-auto">
                <Upgradecluster />
            </div>
        </div>
    );
};

export default FiltersUsage;
