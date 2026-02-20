import React from "react";

interface PaginationDetails {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationControls = ({ currentPage, totalPages = 6, onPageChange }: PaginationDetails) => {
    if (!totalPages || totalPages <= 0) return null;

    return (
        <div className="flex items-center justify-center py-3 ">
            <button
                disabled={currentPage === 1 || totalPages <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={` px-3 py-1 rounded-md cursor-pointer select-none outline-none text-sm ${currentPage === 1 || totalPages <= 1 ? "bg-gray-400 text-white" : "bg-blue-500 text-white shadow-sm"}`}
            >
                Previous
            </button>

            <span className="dark:text-neutral-400 text-gray-600 text-sm mx-4 select-none">
                Page {currentPage} of {totalPages}
            </span>

            <button
                disabled={currentPage === totalPages || totalPages <= 1}
                onClick={() => onPageChange(currentPage + 1)}
                className={` px-4 py-1 rounded-md select-none outline-none text-sm cursor-pointer ${currentPage === totalPages || totalPages <= 1 ? "bg-gray-400 text-white" : "bg-blue-500 text-white shadow-sm"}`}
            >
                Next
            </button>
        </div>
    );
};

export default PaginationControls;
