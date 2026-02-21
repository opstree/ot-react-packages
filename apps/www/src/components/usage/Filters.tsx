import React, { useState } from 'react'
import { Upgradecluster } from '../docs/Filters';
import { MemoryRouter } from 'react-router-dom';

const FiltersUsage = () => {
    return (
        <MemoryRouter>
            <div className="w-full h-[600px] border rounded-lg bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative">
                <div className="h-full overflow-y-auto">
                    {/* The component uses internal state and simulate data */}
                    <Upgradecluster />
                </div>
            </div>
        </MemoryRouter>
    );
};

export default FiltersUsage;
