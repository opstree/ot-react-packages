import React, { useState } from "react";
import {
    Activity,
    Settings,
    Plus,
    LogOut,
    Check,
    Heart,
    MessageSquare,
    Share2,
    X,
    Info,
    Lock,
    Mail,
    MapPin,
    Briefcase,
    ChevronDown,
    Loader2,
    Link as LinkIcon
} from "lucide-react";
import { cn } from "../../lib/utils";

// Avatar helper with gradients and initials
const Avatar = ({ name, gradient, size = "w-9 h-9" }: { name: string; gradient: string; size?: string }) => {
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2);
    return (
        <div
            className={cn(
                "relative flex items-center justify-center rounded-full text-white font-medium shadow-sm overflow-hidden shrink-0 border border-white/20 select-none",
                gradient,
                size
            )}
        >
            <span className="text-xs uppercase tracking-wider font-semibold">{initials}</span>
            <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors duration-200" />
        </div>
    );
};

// Toggle Switch helper
const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
    return (
        <button
            onClick={onChange}
            type="button"
            className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                checked ? "bg-neutral-900 dark:bg-neutral-100" : "bg-neutral-200 dark:bg-neutral-800"
            )}
        >
            <span
                className={cn(
                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white dark:bg-neutral-900 shadow-sm ring-0 transition duration-200 ease-in-out",
                    checked ? "translate-x-4" : "translate-x-0"
                )}
            />
        </button>
    );
};

// Dropdown Helper for Invite Roles
const RoleDropdown = ({ role, onChange }: { role: string; onChange: (r: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="flex items-center gap-1 px-2 py-1 text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-150"
            >
                <span>{role}</span>
                <ChevronDown size={12} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
            </button>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-1 w-28 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg z-20 py-1 text-xs">
                        {["can view", "can edit", "owner"].map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => {
                                    onChange(r);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full text-left px-3 py-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors",
                                    role === r ? "font-semibold text-neutral-900 dark:text-neutral-100" : "text-neutral-500 dark:text-neutral-400"
                                )}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const ComponentGrid = () => {
    // Global Mock Dark Mode for the grid container
    const [isGridDark, setIsGridDark] = useState(false);

    // Column 1 States
    const [likesCount, setLikesCount] = useState(42);
    const [hasLiked, setHasLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<string[]>(["This looks very clean!"]);
    const [newComment, setNewComment] = useState("");
    const [shareText, setShareText] = useState("Share");

    const [contactAdded, setContactAdded] = useState(false);
    const [showSophiaCard, setShowSophiaCard] = useState(true);

    const [filterTags, setFilterTags] = useState(["Safari", "Chrome", "Firefox"]);
    const [showFilterInput, setShowFilterInput] = useState(false);
    const [newFilter, setNewFilter] = useState("");


    const handleLike = () => {
        if (hasLiked) {
            setLikesCount(likesCount - 1);
            setHasLiked(false);
        } else {
            setLikesCount(likesCount + 1);
            setHasLiked(true);
        }
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([...comments, newComment.trim()]);
            setNewComment("");
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText("https://pro.alignui.com");
        setShareText("Copied!");
        setTimeout(() => setShareText("Share"), 2000);
    };

    const removeFilter = (tag: string) => {
        setFilterTags(filterTags.filter((t) => t !== tag));
    };

    const addFilter = (e: React.FormEvent) => {
        e.preventDefault();
        if (newFilter.trim() && !filterTags.includes(newFilter.trim())) {
            setFilterTags([...filterTags, newFilter.trim()]);
            setNewFilter("");
            setShowFilterInput(false);
        }
    };


    return (
        <section className="relative my-4 w-full max-w-full overflow-hidden rounded-2xl md:my-12">
            <div className="w-full rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-950 font-sans transition-colors duration-300">
                <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800 select-none">
                    <div className="no-visible-scrollbar flex items-center gap-2 overflow-x-auto mask-r-from-90% mask-l-from-98% py-0.5 pr-20 pl-2 md:pl-4">
                        <span className="font-medium tracking-wide text-neutral-600 dark:text-neutral-300 select-all">
                            opstree
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-400 dark:text-neutral-500">
                        <svg className="w-4 h-4 cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <Plus size={16} className="cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-300" />
                        <svg className="w-4 h-4 cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                        </svg>
                    </div>
                </div>

                <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 transition-colors duration-300", isGridDark ? "dark bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-800")}>

                </div>
            </div>
        </section>
    );
};

export default ComponentGrid;