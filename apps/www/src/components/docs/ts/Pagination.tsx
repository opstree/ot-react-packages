import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationDetails {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationControls = ({ currentPage, totalPages = 6, onPageChange }: PaginationDetails) => {
    if (!totalPages || totalPages <= 0) return null;

    return (
        <div className="flex items-center justify-center py-4 gap-1">
            <button
                className="inline-flex items-center gap-1 h-8 px-3 text-[13px] font-medium rounded-md border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
                disabled={currentPage === 1 || totalPages <= 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <ChevronLeft size={14} />
                Previous
            </button>

            <div className="flex items-center gap-1 mx-2">
                <span className="h-6 min-w-[32px] px-2 inline-flex items-center justify-center text-xs font-medium text-neutral-900 bg-neutral-100 rounded-md border border-neutral-200">
                    {currentPage}
                </span>
                <span className="text-xs text-neutral-400 mx-1">of</span>
                <span className="text-xs font-medium text-neutral-600">
                    {totalPages}
                </span>
            </div>

            <button
                className="inline-flex items-center gap-1 h-8 px-3 text-[13px] font-medium rounded-md border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
                disabled={currentPage === totalPages || totalPages <= 1}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
                <ChevronRight size={14} />
            </button>
        </div>
    );
};

export default PaginationControls;
