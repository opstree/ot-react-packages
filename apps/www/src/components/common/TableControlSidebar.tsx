import React, { useEffect, useRef, useState } from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Table } from "../../config/Icons";
import { AlertTriangle, Database, Inbox, Loader2, X } from "lucide-react";

interface TableControlSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  tableState: "data" | "loading" | "error" | "empty";
  setTableState: (state: "data" | "loading" | "error" | "empty") => void;
  enableStickyColumns: boolean;
  setEnableStickyColumns: (val: boolean) => void;
  enableRowExpansion: boolean;
  setEnableRowExpansion: (val: boolean) => void;
  enableSearchAndFilters: boolean;
  setEnableSearchAndFilters: (val: boolean) => void;
  onResetData: () => void;
}

export const TableControlSidebar: React.FC<TableControlSidebarProps> = ({
  isOpen,
  onClose,
  tableState,
  setTableState,
  enableStickyColumns,
  setEnableStickyColumns,
  enableRowExpansion,
  setEnableRowExpansion,
  enableSearchAndFilters,
  setEnableSearchAndFilters,
  onResetData,
}) => {
  const [mounted, setMounted] = useState(isOpen);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const timer = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimating(true);
        });
      });
      return () => cancelAnimationFrame(timer);
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setMounted(false), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex justify-end overflow-hidden">
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)]",
          animating ? "opacity-100 duration-250" : "opacity-0 duration-150"
        )}
      />

      <div
        className={cn(
          "relative z-10 w-80 sm:w-96 h-full bg-white dark:bg-neutral-900 border-l border-slate-200 dark:border-neutral-800 shadow-2xl flex flex-col justify-between transform transition-transform ease-[cubic-bezier(0.22,1,0.36,1)]WillChange-transform",
          animating ? "translate-x-0 duration-250" : "translate-x-full duration-150"
        )}
      >
        <div>
          <div className="flex items-center justify-between px-5 py-2 border-b border-black/30 border-dashed dark:border-neutral-800">
            <div className="flex items-center gap-2.5">
              <Table />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">
                Table Properties
              </h3>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-1 rounded-sm bg-[var(--sand-4)]  hover:scale-[0.96] transition-all cursor-pointer ring-[1px] ring-black/10"
              aria-label="Close panel"
            >
              <X size={14} className="text-black/60" />
            </button>
          </div>
          <div className="px-5 py-2 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-80px)]">
            <div>
              <span className="text-sm text-neutral-600">
                Table View State
              </span>
              {(() => {
                type StateKey = "data" | "loading" | "error" | "empty";
                const states: {
                  key: StateKey;
                  label: string;
                  icon: React.ReactNode;
                  activeText: string;
                  activeBorder: string;
                }[] = [
                    {
                      key: "data",
                      label: "Data",
                      icon: <Database size={13} />,
                      activeText: "text-blue-600 dark:text-blue-400 font-semibold",
                      activeBorder: "border-blue-200 dark:border-blue-900/60",
                    },
                    {
                      key: "loading",
                      label: "Loading",
                      icon: <Loader2 size={13} className="animate-spin" />,
                      activeText: "text-amber-600 dark:text-amber-400 font-semibold",
                      activeBorder: "border-amber-200 dark:border-amber-900/60",
                    },
                    {
                      key: "error",
                      label: "Error",
                      icon: <AlertTriangle size={13} />,
                      activeText: "text-red-600 dark:text-red-400 font-semibold",
                      activeBorder: "border-red-200 dark:border-red-900/60",
                    },
                    {
                      key: "empty",
                      label: "Empty",
                      icon: <Inbox size={13} />,
                      activeText: "text-slate-700 dark:text-slate-300 font-semibold",
                      activeBorder: "border-slate-300 dark:border-neutral-700",
                    },
                  ];

                return (
                  <div className="flex items-center gap-1 p-1 bg-slate-100/80 dark:bg-neutral-900/80 rounded-xl border border-slate-200/80 dark:border-neutral-800 mt-2.5">
                    {states.map((st, idx) => {
                      const isActive = tableState === st.key;
                      return (
                        <React.Fragment key={st.key}>
                          {idx > 0 && (
                            <div className="w-px h-3.5 bg-slate-200/80 dark:bg-neutral-800 shrink-0" />
                          )}
                          <button
                            type="button"
                            onClick={() => setTableState(st.key)}
                            className={cn(
                              "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all duration-150 active:scale-95 select-none",
                              isActive
                                ? cn("bg-white dark:bg-neutral-800 shadow-xs border", st.activeText, st.activeBorder)
                                : "text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-neutral-800/40 border border-transparent"
                            )}
                          >
                            <span className="shrink-0">{st.icon}</span>
                            <span className="truncate">{st.label}</span>
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-neutral-500 uppercase tracking-wider">
                Feature Properties
              </span>
              <div
                onClick={() => setEnableStickyColumns(!enableStickyColumns)}
                className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-neutral-800/50 rounded-xl border border-slate-200/80 dark:border-neutral-800 cursor-pointer hover:border-slate-300 dark:hover:border-neutral-700 active:scale-[0.98] transition-all"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    Sticky Columns
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Fix first & last columns on horizontal scroll
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enableStickyColumns}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    enableStickyColumns ? "bg-blue-600 dark:bg-blue-500" : "bg-slate-300 dark:bg-neutral-700"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out",
                      enableStickyColumns ? "translate-x-4" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Expandable Rows Toggle */}
              <div
                onClick={() => setEnableRowExpansion(!enableRowExpansion)}
                className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-neutral-800/50 rounded-xl border border-slate-200/80 dark:border-neutral-800 cursor-pointer hover:border-slate-300 dark:hover:border-neutral-700 active:scale-[0.98] transition-all"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    Expandable Rows
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Collapse empty metrics into expandable rows
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enableRowExpansion}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    enableRowExpansion ? "bg-blue-600 dark:bg-blue-500" : "bg-slate-300 dark:bg-neutral-700"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out",
                      enableRowExpansion ? "translate-x-4" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Search & Filter Bar Toggle */}
              <div
                onClick={() => setEnableSearchAndFilters(!enableSearchAndFilters)}
                className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-neutral-800/50 rounded-xl border border-slate-200/80 dark:border-neutral-800 cursor-pointer hover:border-slate-300 dark:hover:border-neutral-700 active:scale-[0.98] transition-all"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    Search & Filter Bar
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Enable top search input and dropdown filters
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enableSearchAndFilters}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    enableSearchAndFilters ? "bg-blue-600 dark:bg-blue-500" : "bg-slate-300 dark:bg-neutral-700"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out",
                      enableSearchAndFilters ? "translate-x-4" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

