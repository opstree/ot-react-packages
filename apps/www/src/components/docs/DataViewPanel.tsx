import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PaginationControls from "./Pagination";

interface Node {
    id: number;
    name: string;
    status: "healthy" | "warning" | "error";
    region: string;
    uptime: string;
    requests: string;
    latency: string;
}

// ── Sample Data (extended for pagination demo) ───────────────
const SAMPLE_NODES: Node[] = [
    { id: 1, name: "Auth Service", status: "healthy", region: "us-east-1", uptime: "99.98%", requests: "1.2M", latency: "12ms" },
    { id: 2, name: "API Gateway", status: "healthy", region: "eu-west-2", uptime: "99.95%", requests: "3.4M", latency: "8ms" },
];

const CARDS_PER_PAGE = 6;
const ROWS_PER_PAGE = 5;

// ── Status Config ────────────────────────────────────────────
const STATUS = {
    healthy: { label: "Healthy", dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    warning: { label: "Warning", dot: "bg-amber-400", badge: "bg-amber-50  text-amber-700  ring-amber-200" },
    error: { label: "Error", dot: "bg-red-400", badge: "bg-red-50    text-red-700    ring-red-200" },
};

// ── ViewToggle ───────────────────────────────────────────────
interface ViewToggleProps {
    view: string;
    setView: (view: string) => void;
    nodeCount: number;
}
function ViewToggle({ view, setView, nodeCount }: ViewToggleProps) {
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
                {["cards", "table"].map((v) => (
                    <button
                        key={v}
                        onClick={() => setView(v)}
                        className={`
              flex items-center gap-2 px-2 py-1 rounded-lg outline-none select-none text-sm font-semibold transition-all duration-200
              ${view === v
                                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80"
                                : "text-slate-500 hover:text-slate-700"
                            }
            `}
                    >
                        {v === "cards" ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
                            </svg>
                        )}
                        {v === "cards" ? "Cards" : "Table"}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ── NodeCard ─────────────────────────────────────────────────
interface NodeCardProps {
    node: Node;
    index: number;
}
function NodeCard({ node, index }: NodeCardProps) {
    const s = STATUS[node.status];
    return (
        <div
            className="group relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
            style={{ animationDelay: `${index * 40}ms` }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-sm">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-900 text-sm leading-tight">{node.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{node.region}</p>
                    </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ring-1 ${s.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
                    {s.label}
                </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {[
                    { label: "Uptime", value: node.uptime },
                    { label: "Requests", value: node.requests },
                    { label: "Latency", value: node.latency },
                ].map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-sm font-bold text-slate-800">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── NodeCardView (with pagination) ───────────────────────────
function NodeCardView({ nodes }: { nodes: Node[] }) {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(nodes.length / CARDS_PER_PAGE);

    useEffect(() => { setPage(1); }, [nodes.length]);

    const start = (page - 1) * CARDS_PER_PAGE;
    const paged = nodes.slice(start, start + CARDS_PER_PAGE);

    return (
        <div className="w-full flex flex-col ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paged.map((node, i) => (
                    <NodeCard key={node.id} node={node} index={i} />
                ))}
            </div>
            <div className="w-full flex justify-end">
                <PaginationControls
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}

// ── NodeTableView (with pagination) ──────────────────────────
function NodeTableView({ nodes }: { nodes: Node[] }) {
    const [sortKey, setSortKey] = useState<keyof Node | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState(1);

    const toggleSort = (key: any) => {
        setPage(1);
        if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
        else { setSortKey(key); setSortDir("asc"); }
    };

    useEffect(() => { setPage(1); }, [nodes.length]);

    const sorted = [...nodes].sort((a, b) => {
        if (!sortKey) return 0;

        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (typeof aVal === "string" && typeof bVal === "string") {
            return sortDir === "asc"
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        }

        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sorted.length / ROWS_PER_PAGE);
    const start = (page - 1) * ROWS_PER_PAGE;
    const paged = sorted.slice(start, start + ROWS_PER_PAGE);

    const cols = [
        { key: "name", label: "Node", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "region", label: "Region", sortable: true },
        { key: "uptime", label: "Uptime", sortable: false },
        { key: "requests", label: "Requests", sortable: false },
        { key: "latency", label: "Latency", sortable: false },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80">
                        {cols.map(({ key, label, sortable }) => (
                            <th
                                key={key}
                                onClick={() => sortable && toggleSort(key)}
                                className={`
                  text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider select-none
                  ${sortable ? "cursor-pointer hover:text-slate-800" : ""}
                `}
                            >
                                <span className="flex items-center gap-1.5">
                                    {label}
                                    {sortable && (
                                        <svg
                                            className={`w-3.5 h-3.5 transition-transform
                        ${sortKey === key && sortDir === "desc" ? "rotate-180" : ""}
                        ${sortKey === key ? "text-violet-600" : "text-slate-300"}`}
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                        </svg>
                                    )}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                    {paged.map((node) => {
                        const s = STATUS[node.status];
                        return (
                            <tr key={node.id} className="group hover:bg-violet-50/50 transition-colors duration-100">
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                        <span className="font-semibold text-slate-800">{node.name}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${s.badge}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                                        {s.label}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5 text-slate-500 font-mono text-xs">{node.region}</td>
                                <td className="px-5 py-3.5 font-semibold text-slate-700">{node.uptime}</td>
                                <td className="px-5 py-3.5 text-slate-600">{node.requests}</td>
                                <td className="px-5 py-3.5">
                                    <span className={`font-semibold ${parseFloat(node.latency) > 200 ? "text-red-600"
                                        : parseFloat(node.latency) > 50 ? "text-amber-600"
                                            : "text-emerald-600"
                                        }`}>
                                        {node.latency}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}

                    {/* Stable height: fill ghost rows on last page */}
                    {paged.length < ROWS_PER_PAGE &&
                        Array.from({ length: ROWS_PER_PAGE - paged.length }).map((_, i) => (
                            <tr key={`ghost-${i}`} className="h-[52px]">
                                {cols.map((c) => <td key={c.key} />)}
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* Footer */}
            <div className="px-5 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between pt-3">
                    <p className="text-xs text-slate-400">
                        {start + 1}–{Math.min(start + ROWS_PER_PAGE, sorted.length)} of {sorted.length} nodes
                    </p>
                    <div className="flex items-center gap-3">
                        {Object.entries(STATUS).map(([key, { dot, label }]) => (
                            <span key={key} className="flex items-center gap-1.5 text-xs text-slate-500">
                                <span className={`w-2 h-2 rounded-full ${dot}`} />
                                {nodes.filter(n => n.status === key).length} {label}
                            </span>
                        ))}
                    </div>
                </div>

                <PaginationControls
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}

// ── Main Page ────────────────────────────────────────────────
export default function NodesPage() {
    const [view, setView] = useState("cards");
    const nodes = SAMPLE_NODES;

    useEffect(() => {
        if (nodes.length > 10) setView("table");
    }, [nodes.length]);

    useEffect(() => {
        localStorage.setItem("nodeView", view);
    }, [view]);

    useEffect(() => {
        const saved = localStorage.getItem("nodeView");
        if (saved) setView(saved);
    }, []);

    return (
        <div className="min-h-screen bg-white p-2">
            <div className="max-w-5xl mx-auto">
                <ViewToggle view={view} setView={setView} nodeCount={nodes.length} />
                {view === "cards" ? (
                    <NodeCardView nodes={nodes} />
                ) : (
                    <NodeTableView nodes={nodes} />
                )}
            </div>
        </div>
    );
}