import React from "react"
import { ArrowDown, ArrowUp, ArrowUpFromLine, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
import { TableProps } from "../../../types/Table";
// import {
//     IconButton,
//     Tooltip
// } from "@mui/material";

export default function Table({
    columns = [],
    data = [],
    isLoading = false,
    actions = [],
    sortConfig = { key: null, direction: null },
    onSort,
    emptyState,
    onRowClick,
    className,
    expandable = false,
    renderExpandedContent,
    rowKey = (row, index) => row.id || index
}: TableProps) {
    const [expandedRows, setExpandedRows] = React.useState(new Set());

    const toggleRow = (key: string | number, e: React.MouseEvent) => {
        e.stopPropagation();
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(key)) {
            newExpandedRows.delete(key);
        } else {
            newExpandedRows.add(key);
        }
        setExpandedRows(newExpandedRows);
    };

    const handleSort = (key: string) => {
        if (onSort) {
            onSort(key);
        }
    };



    return (
        <div className={cn("w-full overflow-hidden rounded-xl glass border-none shadow-sm", className)}>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50">
                            {expandable && (
                                <th className="px-4 py-3 w-8" />
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={cn(
                                        "px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider select-none",
                                        col.className
                                    )}
                                    align={col.align || "left"}
                                >
                                    <div
                                        className={cn(
                                            "flex items-center gap-1",
                                            col.sortable && "cursor-pointer hover:text-blue-600 transition-colors",
                                            col.align === 'right' && "justify-end",
                                            col.align === 'center' && "justify-center"
                                        )}
                                        onClick={() => col.sortable && handleSort(col.key)}
                                    >
                                        {col.label}
                                        {col.sortable && (
                                            <span className="flex items-center opacity-70">
                                                {sortConfig.key === col.key ? (
                                                    sortConfig.direction === "asc" ? (
                                                        <ArrowUp size={14} className="text-blue-600 ml-1" />
                                                    ) : (
                                                        <ArrowDown size={14} className="text-blue-600 ml-1" />
                                                    )
                                                ) : (
                                                    <div className="w-3.5 h-3.5 ml-1" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {actions.length > 0 && (
                                <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right w-[1%] whitespace-nowrap">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-white/10 bg-white">
                        {isLoading ? (
                            [...Array(5)].map((_, index) => (
                                <tr key={`skeleton-${index}`} className="animate-pulse">
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="px-4 py-4">
                                            <Skeleton variant="text" width="80%" height={20} className="bg-white/50" />
                                        </td>
                                    ))}
                                    {actions.length > 0 && (
                                        <td className="px-4 py-4 text-right">
                                            <Skeleton variant="rectangular" width={60} height={24} className="rounded ml-auto bg-white/50" />
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : data.length > 0 ? (
                            data.map((row, rowIndex) => {
                                const key = rowKey(row, rowIndex);
                                const isExpanded = expandedRows.has(key);

                                return (
                                    <React.Fragment key={key}>
                                        <tr
                                            onClick={() => onRowClick && onRowClick(row)}
                                            className={cn(
                                                "transition-colors duration-200 group hover:bg-white/30",
                                                onRowClick && "cursor-pointer",
                                                isExpanded && "bg-white/20"
                                            )}
                                        >
                                            {expandable && (
                                                <td className="px-4 py-3 w-8">
                                                    {/* <IconButton
                                                        size="small"
                                                        onClick={(e: React.MouseEvent) => toggleRow(key, e)}
                                                        className="p-1 hover:bg-white/50"
                                                    >
                                                        {isExpanded ? (
                                                            <ChevronDown size={16} className="text-slate-600" />
                                                        ) : (
                                                            <ChevronRight size={16} className="text-slate-600" />
                                                        )}
                                                    </IconButton> */}
                                                </td>
                                            )}
                                            {columns.map((col) => {
                                                const cellValue = row[col.key];
                                                let displayValue = cellValue;


                                                if (col.key === 'created_at' && cellValue) {
                                                    displayValue = cellValue.length > 10 ? cellValue.slice(0, 4) : cellValue;
                                                }

                                                if (col.render) {
                                                    displayValue = col.render(cellValue, row);
                                                }

                                                if (col.key === 'provider' && cellValue) {
                                                    const val = String(cellValue).toLowerCase();
                                                    if (val.includes('eks') || val.includes('aws')) {
                                                        displayValue = (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">
                                                                AWS
                                                            </span>
                                                        );
                                                    } else if (val.includes('azure')) {
                                                        displayValue = (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                                                                Azure
                                                            </span>
                                                        );
                                                    } else {
                                                        displayValue = (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                                                                {cellValue}
                                                            </span>
                                                        );
                                                    }
                                                }

                                                if (displayValue === undefined || displayValue === null || displayValue === "") {
                                                    displayValue = "-";
                                                }

                                                return (
                                                    <td
                                                        key={col.key}
                                                        className={cn("px-4 py-3 text-sm text-slate-700", col.cellClassName)}
                                                        align={col.align || "left"}
                                                    >
                                                        {displayValue}
                                                    </td>
                                                );
                                            })}
                                            {actions.length > 0 && (
                                                <td className="px-4 py-2 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                                        {actions.map((action, actionIndex) => {
                                                            const isDisabled = action.disabled ? action.disabled(row) : false;
                                                            const ActionIcon = action.icon;
                                                            const linkPath = typeof action.link === 'function' ? action.link(row) : action.link;
                                                            const tooltipTitle = typeof action.tooltip === 'function' ? action.tooltip(row) : (action.tooltip || action.label || '');

                                                            const ButtonContent = (
                                                                // <IconButton
                                                                //     size="small"
                                                                //     onClick={(e: React.MouseEvent) => {
                                                                //         e.stopPropagation();
                                                                //         action.onClick?.(row);
                                                                //     }}
                                                                //     disabled={isDisabled}
                                                                //     className={cn(
                                                                //         "p-1.5 transition-all duration-200 hover:bg-white/60",
                                                                //         isDisabled && "opacity-40 cursor-not-allowed",
                                                                //         action.color === "error" && !isDisabled && "text-red-500 hover:text-red-700 hover:bg-red-50",
                                                                //         action.color === "success" && !isDisabled && "text-green-600 hover:text-green-800 hover:bg-green-50",
                                                                //         (!action.color || action.color === "default") && !isDisabled && "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                                                                //     )}
                                                                // >
                                                                //     {ActionIcon ? <ActionIcon size={16} /> : <ArrowUpFromLine size={16} />}
                                                                // </IconButton>
                                                                <></>
                                                            )

                                                            return (
                                                                <>
                                                                    {/* <Tooltip key={actionIndex} title={tooltipTitle} arrow>
                                                                        {linkPath ? (
                                                                            <Link to={linkPath} onClick={(e) => e.stopPropagation()}>
                                                                                {ButtonContent}
                                                                            </Link>
                                                                        ) : (
                                                                            <span>{ButtonContent}</span>
                                                                        )}
                                                                    </Tooltip> */}
                                                                </>
                                                            );
                                                        })}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                        {isExpanded && renderExpandedContent && (
                                            <tr>
                                                <td
                                                    colSpan={columns.length + (actions.length > 0 ? 1 : 0) + (expandable ? 1 : 0)}
                                                    className="px-8 py-4 bg-slate-50/50 border-y border-slate-100"
                                                >
                                                    {renderExpandedContent(row)}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        ) : (

                            emptyState && (
                                <tr>
                                    <td
                                        colSpan={columns.length + (actions.length > 0 ? 1 : 0) + (expandable ? 1 : 0)}
                                        className="h-32 text-center text-slate-500"
                                    >
                                        {emptyState}
                                    </td>
                                </tr>
                            )

                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}