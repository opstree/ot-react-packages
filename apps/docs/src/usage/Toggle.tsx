import React from 'react';
import { Toggle } from '../components/docs/Toggle';

const ToggleUsage = () => {
    return (
        <div className="w-full p-6 space-y-8 flex flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-lg min-h-[200px]">
            <h3 className="text-lg font-semibold mb-4">Theme Toggle Button</h3>
            <Toggle />
            <p className="text-xs text-slate-500 mt-2">Example of the theme switcher button used in the application.</p>
        </div>
    );
};

export default ToggleUsage;
