import React from 'react';

export const Techsection: React.FC = () => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-20 mb-10 w-full p-3">
            <div className="flex items-center gap-2 rounded-full border border-black/50 bg-background/50 px-4 py-2 ">
                <span className="text-sm font-medium">React.js</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-black/50 bg-background/50 px-4 py-2 ">
                <span className="text-sm font-medium">Tailwind CSS</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-black/50 bg-background/50 px-4 py-2 ">
                <span className="text-sm font-medium">Motion</span>
            </div>
        </div>
    );
};

