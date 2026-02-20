import React, { useState } from 'react';
import PaginationControls from '../docs/Pagination';

const PaginationUsage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    return (
        <div className="w-full p-6 space-y-8">
            <div className="flex flex-col items-center gap-4">
                <h3 className="text-lg font-semibold">Standard Pagination</h3>
                <div className="p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900 w-full flex justify-center">
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
                <p className="text-sm text-slate-500">Currently viewing page {currentPage} of {totalPages}</p>
            </div>

            <div className="flex flex-col items-center gap-4">
                <h3 className="text-lg font-semibold">Single Page Case</h3>
                <div className="p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900 w-full flex justify-center">
                    <PaginationControls
                        currentPage={1}
                        totalPages={1}
                        onPageChange={() => { }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaginationUsage;
