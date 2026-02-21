import React, { useEffect, useState } from 'react'
import Header from './Header';
import { Link, useSearchParams } from 'react-router-dom';
import Upgradefilter from './MultipleFilter';
import PaginationControls from './Pagination';
import Skeleton from './Skeleton';
import { RotateCcw, X } from 'lucide-react';
import { FilterChip } from './Filterchip';

interface FiltersState {
    details: string[];
    version: string[];
    cloud: string[];
    [key: string]: string[];
}

interface Cluster {
    id: string | number;
    name: string;
    status: string;
    current_version: string;
    provider: string;
    lifecycle?: {
        status?: string;
        end_of_standard_support?: string;
    };
    prevbuilds?: Array<{
        id?: string;
        date?: string;
        status?: string;
    }>;
}


export const Upgradecluster = () => {
    const [accounts, setAccounts] = useState<Cluster[]>([]);
    const [filteredData, setFilteredData] = useState<Cluster[]>([]);
    const [selectedAccount, setSelectedAccount] = useState("");
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<FiltersState>({
        details: [],
        version: [],
        cloud: [],
    });
    const [expandedId, setExpandedId] = useState(null);
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);

    const accountIdParam = searchParams.get("account_id");
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // try {
            //     const data = await apiRequest(API_ENDPOINTS.getEKSClusters, "GET");
            //     const accountsArray = Array.isArray(data) ? data : [];

            //     setAccounts(accountsArray);

            //     if (accountIdParam) {
            //         setSelectedAccount(accountIdParam);
            //         const filtered = accountsArray.filter(
            //             (c) => String(c.id) === String(accountIdParam)
            //         );
            //         setFilteredData(filtered);
            //     } else {
            //         setFilteredData(accountsArray);
            //     }
            // } catch (error) {
            //     console.error("Error fetching clusters:", error);
            //     setAccounts([]);
            //     setFilteredData([]);
            //     setCurrentPage(1);
            // } finally {
            //     setLoading(false);
            // }
        };

        fetchData();
    }, [accountIdParam]);

    useEffect(() => {
        let filtered = [...accounts];

        if (filters.details.length > 0) {
            filtered = filtered.filter((item) =>
                item.lifecycle?.status && filters.details?.includes(item.lifecycle?.status?.toLowerCase())
            );
        }
        if (filters.version.length > 0) {
            filtered = filtered.filter((item) =>
                item.current_version && filters.version?.includes(item.current_version?.toLowerCase())
            );
        }
        if (filters.cloud.length > 0) {
            filtered = filtered.filter((item) =>
                item.provider && filters.cloud?.includes(item.provider?.toLowerCase())
            );
        }
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [filters, accounts]);

    const handleReset = () => {
        setFilters({
            details: [],
            version: [],
            cloud: [],
        });
        setSelectedAccount("");
        setFilteredData(accounts);
        setCurrentPage(1);
    };


    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );



    const filterOptions = React.useMemo(() => {
        const uniqueDetails = [...new Set(accounts.map(item => item?.lifecycle?.status?.toLowerCase()).filter(Boolean))];
        const uniqueVersions = [...new Set(accounts.map(item => item?.current_version?.toLowerCase()).filter(Boolean))];
        const uniqueClouds = [...new Set(accounts.map(item => item?.provider?.toLowerCase()).filter(Boolean))];

        return [
            {
                group: "Details",
                key: "details",
                //  method for fetching data from api

                // options: uniqueDetails.map((status: any) => ({
                //     label: status.charAt(0).toUpperCase() + status.slice(1) || "N/A",
                //     value: status
                // }))

                // dummy data
                options: [
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                    { label: "Pending", value: "pending" },
                    { label: "Unknown", value: "unknown" },
                ]

            },
            {
                group: "Version",
                key: "version",
                // method for fetching data from api
                
                // options: uniqueVersions.map(version => ({
                //     label: `v${version}`,
                //     value: version
                // }))

                // dummy data
                options: [
                    { label: "v1.35", value: "v1.35" },
                    { label: "v1.34", value: "v1.34" },
                    { label: "v1.33", value: "v1.33" },
                    { label: "v1.32", value: "v1.32" },
                ]
            },
            {
                group: "Cloud",
                key: "cloud",
                
                // method for fetching data from api
                
                // options: uniqueClouds.map(cloud => ({
                //     label: cloud.toUpperCase(),
                //     value: cloud
                // }))

                options: [
                    { label: "AWS", value: "aws" },
                    { label: "GCP", value: "gcp" },
                    { label: "Azure", value: "azure" },
                ]
            }
        ];
    }, [accounts]);



    const removeValue = (groupKey: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [groupKey]: prev[groupKey].filter((v: any) => v !== value)
        }));
    };

    return (
        <section className="h-full w-full">
            <div className="p-5 pt-0">
                <div className="space-y-4 mt-3">
                    <div className="flex justify-between items-center gap-3">
                        <div className=" ring-1 ring-slate-200 rounded-md w-1/2 p-2 h-10">
                            <FilterChip
                                filterOptions={filterOptions}
                                filters={filters}
                                removeValue={removeValue}
                            />
                        </div>
                        <div className="flex gap-3 items-center justify-start md:justify-end ">
                            <Upgradefilter
                                filterOptions={filterOptions}
                                defaultLabel="Select Filters"
                                filters={filters}
                                onFilterChange={setFilters}
                            />
                            <button
                                className="group flex items-center gap-2 px-4 py-1.5 bg-white/50 hover:bg-white/80 backdrop-blur-sm text-slate-600 rounded-lg text-sm font-medium transition-all shadow-sm border border-white/40 cursor-pointer"
                                onClick={handleReset}
                            >
                                <RotateCcw size={14} />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className='w-full h-[calc(100vh-200px)] bg-white rounded-xl border border-slate-200 overflow-hidden'>
                        {loading ? (
                            [...Array(5)].map((_, index) => (
                                <div key={`skeleton-${index}`} className="w-full p-4 border-b border-slate-100 animate-pulse">
                                    <div className="bg-neutral-50 p-3 rounded-md space-y-3">
                                        <div className="flex justify-between items-start">
                                            <Skeleton variant="rectangular" width="40%" height={20} className="rounded" />
                                            <Skeleton variant="rectangular" width="60px" height={20} className="rounded-full" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <Skeleton variant="text" width="30%" height={16} />
                                            <Skeleton variant="text" width="40%" height={16} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((items: any, id: number) => (
                                <React.Fragment key={items.id || id}>
                                    <div className='w-full p-4 bg-white transition-colors border-b border-slate-100 last:border-0'>
                                        <div
                                            onClick={() => setExpandedId(String(expandedId) === String(items.id) ? null : items.id)}
                                            className='flex flex-col gap-2 bg-neutral-50 p-3 shadow-sm rounded-md cursor-pointer hover:bg-neutral-100 transition-colors group'
                                        >
                                            <div className='flex justify-between items-start'>
                                                <Link to={`/${items.id}/Upgradehistory`}>
                                                    <h3 className='text-md font-bold text-slate-800 transition-colors'>
                                                        {items.name}
                                                    </h3>
                                                </Link>
                                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase border shadow-sm ${items.status?.toLowerCase() === 'active'
                                                    ? 'bg-green-50 text-green-700 border-green-200'
                                                    : 'bg-slate-50 text-slate-700 border-slate-200'
                                                    }`}>
                                                    {items.status}
                                                </span>
                                            </div>
                                            <div className='flex justify-between items-center text-sm text-slate-500'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='font-medium text-slate-400'>Version:</span>
                                                    <span className='px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-mono text-xs'>
                                                        {items.current_version || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <span className='font-medium text-slate-400'>Standard Support End:</span>
                                                    <span className='text-slate-700'>
                                                        {items.lifecycle?.end_of_standard_support
                                                            ? new Date(items.lifecycle.end_of_standard_support).toLocaleDateString()
                                                            : "—"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {String(expandedId) === String(items.id) && (
                                            <div className='mt-2 p-4 bg-slate-50 rounded-lg border border-slate-200 animate-in fade-in slide-in-from-top-2'>
                                                <h4 className='text-sm font-semibold text-slate-700 mb-2'>Previous Builds</h4>
                                                {items.prevbuilds && items.prevbuilds.length > 0 ? (
                                                    <div className='space-y-2'>
                                                        {items.prevbuilds.map((build: any, idx:number) => (
                                                            <div key={idx} className='flex justify-between items-center text-xs p-2 bg-white rounded border border-slate-100'>
                                                                <span className='font-mono'>{build.id || `Build #${idx + 1}`}</span>
                                                                <span className='text-slate-500'>{build.date || 'No Date'}</span>
                                                                <span className={`font-bold ${build.status === 'Success' ? 'text-green-600' : 'text-red-500'}`}>
                                                                    {build.status || 'Unknown'}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className='text-xs text-slate-400 italic'>No previous builds found for this cluster.</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </React.Fragment>
                            ))
                        ) : (
                            <div className='p-10 text-center text-slate-400'>
                                No clusters found matching your criteria.
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end mt-6">
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
