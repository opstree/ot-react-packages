import React, { useState } from 'react';
import { Sidebar } from '../components/docs/Sidebar';

const SidebarUsage = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="w-full h-[500px] border rounded-lg relative bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <div className="flex justify-start h-full relative">
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    );
};

export default SidebarUsage;
