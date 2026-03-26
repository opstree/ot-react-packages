import React, { useState } from 'react';
import { Sidebar } from '../docs/Sidebar';
import { MemoryRouter } from 'react-router-dom';

const SidebarUsage = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <MemoryRouter>
            <div className="w-full h-[500px] border rounded-lg bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
                <div className="flex justify-start h-full">
                    {/* Simplified Sidebar Demo */}
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

                    <div className="flex-1 p-10">
                        <h3 className="text-xl font-bold mb-4">Content Area</h3>
                        <p className="text-slate-500 mb-6">
                            The sidebar is currently {isOpen ? 'Open' : 'Closed'}.
                            {isOpen ? ' You can close it using the icon inside.' : ''}
                        </p>

                        {!isOpen && (
                            <button
                                onClick={() => setIsOpen(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                            >
                                Open Sidebar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </MemoryRouter>
    );
};

export default SidebarUsage;
