import React, { useState, useEffect, useMemo, useRef } from "react";
import { Box, Skeleton, Tooltip } from "@mui/material";
import ReactDOM from "react-dom";


const FilterDropdown = ({ label, value = [], options = [], onChange }) => {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const ref = useRef(null);
    const buttonRef = useRef(null);

    const selected = Array.isArray(value) ? value : value ? [value] : [];

    useEffect(() => {
        const handler = (e) => {
            if (
                ref.current &&
                !ref.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const openDropdown = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + 4,
                left: rect.left,
                width: rect.width,
            });
        }
        setOpen((o) => !o);
    };

    const visibleOptions = options.filter((o) => o !== "all");
    const allSelected =
        visibleOptions.length > 0 && selected.length === visibleOptions.length;

    const toggleOption = (opt) => {
        let next;
        if (selected.includes(opt)) {
            next = selected.filter((v) => v !== opt);
        } else {
            next = [...selected, opt];
        }
        onChange(next.length === 0 ? [] : next);
    };
    const toggleAll = () => {
        if (allSelected) {
            onChange([]);
        } else {
            onChange([...visibleOptions]);
        }
    };

    const selectedCount = selected.length;

    return (
        <div style={{ position: "relative" }}>
            <button
                ref={buttonRef}
                onClick={openDropdown}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "0 12px",
                    height: "40px",
                    fontSize: 12,
                    fontWeight: 500,
                    border: `1px solid ${selectedCount > 0 ? "#0086FF" : "rgba(230, 230, 230, 1)"}`,
                    borderRadius: 8,
                    background: selectedCount > 0 ? "#F0F7FF" : "#fff",
                    color: "#2F2F2F",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                }}
            >
                <span style={{ color: "#8B91A8" }}>{label}</span>

                {selectedCount > 0 && (
                    <span
                        style={{
                            background: "#0086FF",
                            color: "#fff",
                            borderRadius: "10px",
                            padding: "1px 7px",
                            fontSize: 11,
                            fontWeight: 700,
                            lineHeight: 1.6,
                        }}
                    >
                        {selectedCount}
                    </span>
                )}

                <i
                    className={`ri-arrow-${open ? "up" : "down"}-s-line`}
                    style={{ fontSize: 15, color: "#8B91A8" }}
                />
            </button>

            {open &&
                ReactDOM.createPortal(
                    <div
                        ref={ref}
                        style={{
                            position: "fixed",
                            top: coords.top,
                            left: coords.left,
                            minWidth: Math.max(coords.width, 180),
                            maxHeight: "260px",
                            background: "#fff",
                            border: "1px solid #E0E4EF",
                            borderRadius: 8,
                            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                            zIndex: 3000,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "8px 12px",
                                borderBottom: "1px solid #F0F1F5",
                                gap: "8px",
                            }}
                        >
                            <div
                                onClick={toggleAll}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    cursor: "pointer",
                                    flex: 1,
                                }}
                            >
                                <div
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: 4,
                                        border: `2px solid ${allSelected ? "#0086FF" : "#D1D5DB"}`,
                                        background: allSelected ? "#0086FF" : "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        transition: "all 0.1s",
                                    }}
                                >
                                    {allSelected && (
                                        <span className="ri-check-line font-14 color-white" />
                                    )}
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 600, color: "#1A1A2E" }}>
                                    All
                                </span>
                            </div>

                            {selectedCount > 0 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onChange([]);
                                    }}
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 600,
                                        color: "#EF4444",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: 0,
                                        fontFamily: "inherit",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        <div style={{ overflowY: "auto", flex: 1 }}>
                            {visibleOptions.map((opt) => {
                                const checked = selected.includes(opt);
                                return (
                                    <div
                                        key={opt}
                                        onClick={() => toggleOption(opt)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            padding: "9px 12px",
                                            cursor: "pointer",
                                            background: checked ? "#F0F7FF" : "#fff",
                                            transition: "background 0.1s",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!checked) e.currentTarget.style.background = "#F8F9FB";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = checked
                                                ? "#F0F7FF"
                                                : "#fff";
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 16,
                                                height: 16,
                                                borderRadius: 4,
                                                border: `2px solid ${checked ? "#0086FF" : "#D1D5DB"}`,
                                                background: checked ? "#0086FF" : "#fff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                                transition: "all 0.1s",
                                            }}
                                        >
                                            {checked && (
                                                <span className="ri-check-line font-14 color-white" />
                                            )}
                                        </div>
                                        <span
                                            style={{
                                                fontSize: 13,
                                                fontWeight: checked ? 600 : 400,
                                                color: checked ? "#0086FF" : "#2F2F2F",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {opt}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
};

const SkeletonRows = ({ columns, rows = 5 }) =>
    Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx} style={{ background: "#fff" }}>
            {columns.map((col) => (
                <td
                    key={col.key}
                    style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid #F0F1F5",
                        minWidth: col.minWidth ?? "auto",
                        ...(col.key === "service" && {
                            position: "sticky",
                            left: 0,
                            zIndex: 2,
                            background: "#fff",
                            borderRight: "1px solid #E0E4EF",
                        }),
                        ...(col.key === "_action" && {
                            position: "sticky",
                            right: 0,
                            zIndex: 2,
                            background: "#fff",
                            borderLeft: "1px solid #E0E4EF",
                        }),
                    }}
                >
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        height={28}
                        sx={{ borderRadius: "6px", bgcolor: "#F0F1F5" }}
                    />
                </td>
            ))}
        </tr>
    ));
const DefaultCell = ({ value }) => <span>{value ?? "—"}</span>;

const Pagination = ({ current, total, onChange }) => {
    const [goInput, setGoInput] = useState("");

    const pages = Array.from({ length: Math.min(5, total) }, (_, i) => {
        if (total <= 5) return i + 1;
        if (current <= 3) return i + 1;
        if (current >= total - 2) return total - 4 + i;
        return current - 2 + i;
    });

    const handleGo = () => {
        const n = parseInt(goInput, 10);
        if (!isNaN(n) && n >= 1 && n <= total) {
            onChange(n);
            setGoInput("");
        }
    };

    const btnBase = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "36px",
        fontSize: 13,
        fontWeight: 600,
        border: "1px solid #E0E4EF",
        borderRadius: 8,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s",
        background: "#fff",
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "14px",
                paddingTop: "12px",
                borderTop: "1px solid #F0F1F5",
                flexWrap: "wrap",
                gap: "8px",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                    onClick={() => onChange(Math.max(1, current - 1))}
                    disabled={current === 1}
                    style={{
                        ...btnBase,
                        padding: "0 16px",
                        color: current === 1 ? "#B0B5C8" : "#124D9B",
                        background: current === 1 ? "#FAFBFC" : "#fff",
                        cursor: current === 1 ? "not-allowed" : "pointer",
                    }}
                >
                    Previous
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onChange(page)}
                        style={{
                            ...btnBase,
                            width: 36,
                            background: page === current ? "#0086FF" : "#fff",
                            color: page === current ? "#fff" : "#4B5168",
                            border: `1px solid ${page === current ? "#0086FF" : "#E0E4EF"}`,
                        }}
                    >
                        {page}
                    </button>
                ))}

                {total > 5 && current < total - 2 && (
                    <>
                        <span
                            style={{
                                fontSize: 13,
                                color: "#9098b1",
                                padding: "0 2px",
                                letterSpacing: 2,
                            }}
                        >
                            · · ·
                        </span>
                        <button
                            onClick={() => onChange(total)}
                            style={{ ...btnBase, width: 44, color: "#4B5168" }}
                        >
                            {total}
                        </button>
                    </>
                )}

                <button
                    onClick={() => onChange(Math.min(total, current + 1))}
                    disabled={current === total}
                    style={{
                        ...btnBase,
                        padding: "0 16px",
                        color: current === total ? "#B0B5C8" : "#124D9B",
                        background: current === total ? "#FAFBFC" : "#fff",
                        cursor: current === total ? "not-allowed" : "pointer",
                    }}
                >
                    Next
                </button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                    style={{
                        fontSize: 12,
                        color: "#8B91A8",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                    }}
                >
                    Go to Page Number:
                </span>
                <input
                    type="number"
                    min={1}
                    max={total}
                    value={goInput}
                    onChange={(e) => setGoInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleGo()}
                    placeholder="enter no."
                    style={{
                        width: 90,
                        height: 34,
                        padding: "0 10px",
                        fontSize: 12,
                        border: "1px solid #E0E4EF",
                        borderRadius: 8,
                        fontFamily: "inherit",
                        color: "#4B5168",
                        outline: "none",
                    }}
                />
                <button
                    onClick={handleGo}
                    style={{
                        height: 34,
                        padding: "0 16px",
                        fontSize: 12,
                        fontWeight: 700,
                        border: "1px solid #0086FF",
                        borderRadius: 8,
                        background: "#fff",
                        color: "#0086FF",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        letterSpacing: 0.3,
                    }}
                >
                    GO
                </button>
            </Box>
        </Box>
    );
};

const DorametricsGenericTable = ({
    data = [],
    columns = [],
    pageSize = 10,
    title,
    subtitle,
    tooltip,
    icon = "ri-settings-3-line",
    emptyMessage = "No data available.",
    loading = false,
    skeletonRows = 10,
    filters = [],
    searchable = false,
    searchKeys,
    onFilterChange,
    onSecondaryFilterChange,
    onTertiaryFilterChange,
    onSearch,
    externalPagination = false,
    currentPage: externalPage = 1,
    totalPages: externalTotal,
    onPageChange,
    error = null,
    sx = {},
    noDataRowMessage = "No data is available for the selected date.",
    isRowEmpty = (row) => row?._raw?.has_data === false,
    showUnscannedFilter = false,
    onUnscannedFilterChange,
    initialFilterValues = {},
    sortColumn = null,
    sortAsc = false,
    onSortChange,
}) => {
    const [internalPage, setInternalPage] = useState(1);
    const [filterValues, setFilterValues] = useState(initialFilterValues);
    const [searchQuery, setSearchQuery] = useState("");
    const [unscannedOnly, setUnscannedOnly] = useState(false);
    const searchDebounceRef = useRef(null);
    const searchInputRef = useRef(null);

    useEffect(() => {
        setFilterValues(initialFilterValues);
    }, [JSON.stringify(initialFilterValues)]);

    useEffect(() => {
        setInternalPage(1);
    }, [data, filterValues, searchQuery, unscannedOnly]);

    // ── Filtering + searching ────────────────────────────────────────────────────
    const filteredData = useMemo(() => {
        let result = data;

        Object.entries(filterValues).forEach(([key, vals]) => {
            if (vals && vals.length > 0) {
                result = result.filter((row) =>
                    vals.some(
                        (v) => String(row[key] ?? "").toLowerCase() === v.toLowerCase(),
                    ),
                );
            }
        });

        if (searchable && searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            const keys = searchKeys ?? columns.map((c) => c.key);
            result = result.filter((row) =>
                keys.some((k) =>
                    String(row[k] ?? "")
                        .toLowerCase()
                        .includes(q),
                ),
            );
        }

        return result;
    }, [data, filterValues, searchQuery, searchable, searchKeys, columns]);

    // ── Pagination ───────────────────────────────────────────────────────────────
    const isExternal = externalPagination;
    const currentPage = isExternal ? externalPage : internalPage;
    const totalPages = isExternal
        ? (externalTotal ?? 1)
        : Math.ceil(filteredData.length / pageSize) || 1;

    const rows = isExternal
        ? data
        : filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        if (isExternal) onPageChange?.(page);
        else setInternalPage(page);
    };

    const showSkeleton = loading && columns.length > 0;
    const showError = !loading && !!error;
    const showEmpty = !loading && !error && rows.length === 0;

    const hasFiltersOrSearch =
        filters.length > 0 || searchable || showUnscannedFilter;

    const hasActiveFilters =
        Object.values(filterValues).some((v) => Array.isArray(v) && v.length > 0) ||
        !!searchQuery ||
        unscannedOnly;

    return (
        <Box
            sx={{
                border: "1px solid #E6E6E6",
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "0px 14px 13px 0px #0000000F",
                background: "#fff",
                ...sx,
            }}
        >
            {/* ── Header row ── */}
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                        marginBottom: "16px",
                        flexWrap: "wrap",
                    }}
                >
                    <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <Skeleton variant="circular" width={24} height={24} />
                        <Box>
                            <Skeleton variant="text" width={220} height={28} />
                            <Skeleton variant="text" width={320} height={20} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                        <Skeleton variant="rounded" width={180} height={40} />
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "16px",
                        marginBottom: "16px",
                        flexWrap: "wrap",
                    }}
                >
                    {title && (
                        <Box
                            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                        >
                            <i
                                className={`${icon} color-tertiary font-20`}
                                style={{ marginTop: "4px", flexShrink: 0 }}
                            />
                            <Box>
                                <Box
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 700,
                                        color: "#1A1A2E",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                    }}
                                >
                                    {title}
                                    {tooltip && (
                                        <Tooltip title={tooltip} placement="top" arrow>
                                            <span>
                                                <i
                                                    className="ri-information-line color-tertiary font-14"
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </span>
                                        </Tooltip>
                                    )}
                                </Box>
                                {subtitle && (
                                    <Box sx={{ fontSize: 12, color: "#8B91A8", fontWeight: 400, marginTop: "2px" }}>
                                        {subtitle}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )}

                    {hasFiltersOrSearch && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                flexWrap: "wrap",
                            }}
                        >
                            {filters.map((f, idx) => (
                                <FilterDropdown
                                    key={f.key}
                                    label={f.label}
                                    value={filterValues[f.key] ?? []}
                                    options={f.options}
                                    onChange={(vals) => {
                                        setFilterValues((prev) => ({ ...prev, [f.key]: vals }));
                                        const isAllSelected =
                                            vals.length > 0 &&
                                            vals.length ===
                                            f.options.filter((o) => o !== "all").length;
                                        const joined =
                                            vals.length === 0 || isAllSelected
                                                ? "all"
                                                : vals.join(",");
                                        if (idx === 0) onFilterChange?.(joined);
                                        else if (idx === 1) onSecondaryFilterChange?.(joined);
                                        else if (idx === 2) onTertiaryFilterChange?.(joined);
                                    }}
                                />
                            ))}

                            {/* {showUnscannedFilter && (
                  <button
                    onClick={() => {
                      const next = !unscannedOnly;
                      setUnscannedOnly(next);
                      onUnscannedFilterChange?.(next);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "0 12px",
                      height: "40px",
                      fontSize: 12,
                      fontWeight: 500,
                      border: `1px solid ${unscannedOnly ? "#0086FF" : "rgba(230, 230, 230, 1)"}`,
                      borderRadius: 8,
                      background: unscannedOnly ? "#F0F7FF" : "#fff",
                      color: unscannedOnly ? "#0086FF" : "#2F2F2F",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        border: `2px solid ${unscannedOnly ? "#0086FF" : "#D1D5DB"}`,
                        background: unscannedOnly ? "#0086FF" : "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {unscannedOnly && <span className="ri-check-line font-14 color-white" />}
                    </div>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgb(139, 145, 168)",
                    }}>Unscanned Services</span>
                  </button>
                )} */}

                            {searchable && (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "2px 12px",
                                        border: "1px solid #E0E4EF",
                                        borderRadius: 8,
                                        background: "#fff",
                                        minWidth: 180,
                                        height: 40,
                                    }}
                                >
                                    <i
                                        className="ri-search-line"
                                        style={{ fontSize: 15, color: "#8B91A8" }}
                                    />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        className="dorametrics-search-input"
                                        value={searchQuery}
                                        onBlur={() => {
                                            if (searchQuery.length >= 3) {
                                                requestAnimationFrame(() =>
                                                    searchInputRef.current?.focus(),
                                                );
                                            }
                                        }}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setSearchQuery(val);

                                            // Clear immediately when input is emptied
                                            if (val === "") {
                                                clearTimeout(searchDebounceRef.current);
                                                onSearch?.("");
                                                return;
                                            }

                                            // Only fire API after at least 3 characters, debounced 300ms
                                            if (val.length < 3) return;

                                            clearTimeout(searchDebounceRef.current);
                                            searchDebounceRef.current = setTimeout(() => {
                                                onSearch?.(val);
                                            }, 300);
                                        }}
                                        placeholder="Search..."
                                        style={{
                                            border: "none",
                                            outline: "none",
                                            fontSize: 12,
                                            color: "#2F2F2F",
                                            background: "transparent",
                                            fontFamily: "inherit",
                                            width: "100%",
                                        }}
                                    />
                                    {searchQuery && (
                                        <i
                                            className="ri-close-line"
                                            style={{
                                                fontSize: 14,
                                                color: "#8B91A8",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                setSearchQuery("");
                                                onSearch?.("");
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                        </Box>
                    )}
                </Box>
            )}

            {/* ── Table ── */}
            <Box
                sx={{
                    overflowX: "auto",
                    border: "1px solid #E6E6E6",
                    borderRadius: "8px",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        minWidth: "max-content",
                        borderCollapse: "separate",
                        borderSpacing: 0,
                        fontFamily: "inherit",
                    }}
                >
                    <thead>
                        <tr>
                            {columns.map((col) => {
                                const isJSXLabel = col.label !== null && typeof col.label === "object";
                                const isSortable = !!col.sortable;
                                const isActiveSort = isSortable && sortColumn === col.sortKey;

                                return (
                                    <th
                                        key={col.key}
                                        onClick={isSortable ? () => onSortChange?.(col.sortKey) : undefined}
                                        style={{
                                            textAlign: "center",
                                            padding: "14px 16px",
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: "#1A1A2E",
                                            borderBottom: "1px solid #E8EAF0",
                                            background: "#FAFBFC",
                                            whiteSpace: isJSXLabel ? "normal" : "nowrap",
                                            minWidth: col.minWidth ?? "auto",
                                            cursor: isSortable ? "pointer" : "default",
                                            userSelect: "none",
                                            verticalAlign: "top",
                                            ...(col.key === "service" && {
                                                position: "sticky",
                                                left: 0,
                                                zIndex: 5,
                                                background: "#FAFBFC",
                                                borderRight: "1px solid #E0E4EF",
                                                boxShadow: "2px 0 4px -2px rgba(0,0,0,0.06)",
                                            }),
                                            ...(col.key === "_action" && {
                                                position: "sticky",
                                                paddingRight: "22px",
                                                right: 0,
                                                zIndex: 5,
                                                background: "#FAFBFC",
                                                borderLeft: "1px solid #E0E4EF",
                                                boxShadow: "-2px 0 4px -2px rgba(0,0,0,0.06)",
                                            }),
                                        }}
                                    >
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                                            <Box sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                                {col.label}

                                                {isSortable && (
                                                    <i
                                                        className={isActiveSort ? (sortAsc ? "ri-sort-asc" : "ri-sort-desc") : "ri-expand-up-down-line"}
                                                        style={{
                                                            fontSize: 14,
                                                            color: isActiveSort ? "#0086FF" : "#C3C7D4",
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                            {col.subtitle && (
                                                <Box sx={{ fontSize: 11, fontWeight: 400, color: "#9098AB" }}>
                                                    {col.subtitle}
                                                </Box>
                                            )}
                                        </Box>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {showSkeleton ? (
                            <SkeletonRows columns={columns} rows={skeletonRows} />
                        ) : showError ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    style={{
                                        textAlign: "center",
                                        padding: "48px 16px",
                                        borderBottom: "none",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "inline-flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                    >
                                        <i
                                            className="ri-error-warning-line"
                                            style={{ fontSize: 28, color: "#EF4444" }}
                                        />
                                        <span
                                            style={{
                                                fontSize: 13,
                                                color: "#EF4444",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {error}
                                        </span>
                                    </Box>
                                </td>
                            </tr>
                        ) : showEmpty ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    style={{
                                        textAlign: "center",
                                        padding: "48px 16px",
                                        fontSize: 13,
                                        color: "#8B91A8",
                                        borderBottom: "none",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: "50%",
                                                background: "#F4F6F8",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <span
                                                className="ri-database-2-line"
                                                style={{ fontSize: 26, color: "#A0A7B8" }}
                                            />
                                        </Box>
                                        <span
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                color: "rgba(91, 91, 91, 1)",
                                            }}
                                        >
                                            {emptyMessage}
                                        </span>
                                    </Box>
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, rowIdx) => {
                                const rowEmpty = isRowEmpty(row);
                                const baseBg = "#fff";
                                if (rowEmpty) {
                                    const actionIdx = columns.findIndex(
                                        (c) => c.key === "_action",
                                    );
                                    const hasAction = actionIdx !== -1;

                                    const isCollapsible = (col) => col.isMetricColumn === true;

                                    const lastMiddleIdx = hasAction
                                        ? actionIdx - 1
                                        : columns.length - 1;

                                    const cellsToRender = [];
                                    let messageSpan = 0;
                                    let messageInserted = false;

                                    for (let i = 1; i <= lastMiddleIdx; i++) {
                                        const col = columns[i];
                                        if (isCollapsible(col)) {
                                            messageSpan += 1;
                                            if (!messageInserted) {
                                                cellsToRender.push({ type: "message" });
                                                messageInserted = true;
                                            }
                                        } else {
                                            cellsToRender.push({ type: "normal", idx: i });
                                        }
                                    }

                                    return (
                                        <tr
                                            key={rowIdx}
                                            style={{
                                                background: "#fff",
                                                transition: "background 0.12s",
                                            }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.background = "#FAFBFF")
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.background = "#fff")
                                            }
                                        >
                                            <td
                                                style={{
                                                    textAlign: columns[0]?.align ?? "left",
                                                    padding: "12px",
                                                    fontSize: 13,
                                                    color: "#4B5168",
                                                    borderBottom: "1px solid #F0F1F5",
                                                    minWidth: columns[0]?.minWidth ?? "auto",
                                                    position: "sticky",
                                                    left: 0,
                                                    zIndex: 2,                                     // CHANGED from 1
                                                    background: "#fff",
                                                    borderRight: "1px solid #E0E4EF",
                                                    boxShadow: "2px 0 4px -2px rgba(0,0,0,0.04)",   // NEW
                                                }}
                                            >
                                                {columns[0]?.render ? columns[0].render(row[columns[0].key], row) : <DefaultCell value={row[columns[0]?.key]} />}
                                            </td>
                                            {cellsToRender.map((cell, ci) => {
                                                if (cell.type === "normal") {
                                                    const col = columns[cell.idx];
                                                    return (
                                                        <td
                                                            key={col.key}
                                                            style={{
                                                                textAlign: "center",
                                                                padding: "12px",
                                                                fontSize: 13,
                                                                color: "#4B5168",
                                                                borderBottom: "1px solid #F0F1F5",
                                                                minWidth: col.minWidth ?? "auto",
                                                                ...col.cellStyle,
                                                            }}
                                                        >
                                                            {col.render ? (
                                                                col.render(row[col.key], row)
                                                            ) : (
                                                                <DefaultCell value={row[col.key]} />
                                                            )}
                                                        </td>
                                                    );
                                                }
                                                return (
                                                    <td
                                                        key={`empty-msg-${ci}`}
                                                        colSpan={Math.max(messageSpan, 1)}
                                                        style={{
                                                            padding: "12px",
                                                            fontSize: 12,
                                                            color: "#8B91A8",
                                                            fontStyle: "italic",
                                                            borderBottom: "1px solid #F0F1F5",
                                                            paddingLeft: "70px",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "6px",
                                                                fontSize: "12px",
                                                            }}
                                                        >
                                                            <i
                                                                className="ri-information-line"
                                                                style={{ fontSize: 14 }}
                                                            />
                                                            {noDataRowMessage}
                                                        </Box>
                                                    </td>
                                                );
                                            })}
                                            {hasAction && (
                                                <td
                                                    key={columns[actionIdx].key}
                                                    style={{
                                                        textAlign: "center",
                                                        padding: "12px",
                                                        fontSize: 13,
                                                        color: "#4B5168",
                                                        borderBottom: "1px solid #F0F1F5",
                                                        minWidth: columns[actionIdx].minWidth ?? "auto",
                                                        position: "sticky",
                                                        right: 0,
                                                        zIndex: 2,                                     // CHANGED from 1
                                                        background: "#fff",
                                                        borderLeft: "1px solid #E0E4EF",
                                                        boxShadow: "-2px 0 4px -2px rgba(0,0,0,0.04)",  // NEW
                                                        ...columns[actionIdx].cellStyle,
                                                    }}
                                                >
                                                    {columns[actionIdx].render
                                                        ? columns[actionIdx].render(row[columns[actionIdx].key], row)
                                                        : <DefaultCell value={row[columns[actionIdx].key]} />}
                                                </td>
                                            )}
                                        </tr>
                                    );
                                }

                                return (
                                    <tr
                                        key={rowIdx}
                                        style={{ background: baseBg, transition: "background 0.12s" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F9FF")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = baseBg)}
                                    >
                                        {columns.map((col) => (
                                            <td
                                                key={col.key}
                                                style={{
                                                    textAlign: "center",
                                                    padding: "12px",
                                                    fontSize: 13,
                                                    color: "#4B5168",
                                                    borderBottom: "1px solid #F0F1F5",
                                                    minWidth: col.minWidth ?? "auto",
                                                    ...(col.key === "service" && {
                                                        position: "sticky",
                                                        left: 0,
                                                        zIndex: 2,
                                                        background: baseBg,
                                                        textAlign: "left",
                                                        borderRight: "1px solid #E0E4EF",
                                                        boxShadow: "2px 0 4px -2px rgba(0,0,0,0.04)",
                                                    }),
                                                    ...(col.key === "_action" && {
                                                        position: "sticky",
                                                        right: 0,
                                                        zIndex: 2,
                                                        background: baseBg,
                                                        borderLeft: "1px solid #E0E4EF",
                                                        boxShadow: "-2px 0 4px -2px rgba(0,0,0,0.04)",
                                                    }),
                                                    ...col.cellStyle,
                                                }}
                                            >
                                                {col.render ? col.render(row[col.key], row) : <DefaultCell value={row[col.key]} />}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </Box>

            {/* ── Pagination ── */}
            {totalPages > 1 && !showSkeleton && !showError && !showEmpty && (
                <Pagination
                    current={currentPage}
                    total={totalPages}
                    onChange={handlePageChange}
                />
            )}
        </Box>
    );
};

export { Pagination, FilterDropdown };
export default DorametricsGenericTable;
