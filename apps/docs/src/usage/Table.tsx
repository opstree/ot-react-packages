import React from "react"
import { FolderKanban, UserRoundPen } from 'lucide-react';
import { useEffect, useState } from 'react'
import Table from '../components/docs/Table';

const DempTable = () => {
    const [accounts, setAccounts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSelector, setFilterSelector] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });


    const rowsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetch("");
                const accountsArray = Array.isArray(data) ? data : [];

                // setAccounts();

                // if (accountIdParam) {
                //     setSelectedAccount(accountIdParam);
                //     const filtered = accountsArray.filter(
                //         (c) => String(c.id) === String(accountIdParam)
                //     );
                //     setFilteredData(filtered);
                // } else {
                //     setFilteredData(accountsArray);
                // }

                setCurrentPage(1);
            } catch (error) {
                console.error("Error fetching clusters:", error);
                setAccounts([]);
                setFilteredData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = [...accounts];

        if (filterSelector) {
            filtered = filtered.filter((item: any) =>
                item?.status?.toLowerCase() === filterSelector.toLowerCase()
            );
        }
        if (searchTerm) {
            filtered = filtered.filter((item: any) =>
                Object.values(item)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }

        // setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchTerm, filterSelector, accounts]);

    const handleAccountSelect = (account: any) => {
        setSelectedAccount(account.account_id);
        const filtered = accounts.filter(
            (c: any) => c.account_id === account.account_id
        );
        // setFilteredData(filtered);
        setCurrentPage(1);
        setAnchorEl(null);
    };

    const handleSort = (key: string) => {
        const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
        const direction = isAsc ? 'desc' : 'asc';

        setSortConfig({ key, direction });

        const sorted = [...accounts].sort((a, b) => {
            const valA = a[key] || "";
            const valB = b[key] || "";
            if (valA < valB) return direction === "asc" ? -1 : 1;
            if (valA > valB) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setAccounts(sorted);
    };

    const handleReset = () => {
        setSearchTerm("");
        setFilterSelector("");
        setFilteredData(accounts);
        setCurrentPage(1);
    };

    const filterOptions = [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
        { value: "Pending", label: "Pending" },
    ];

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const columns = [
        { key: "name", label: "Cluster Name", sortable: true },
        { key: "provider_cluster_id", label: "Cluster ID", sortable: true },
        { key: "current_version", label: "Current Version", sortable: true },
        {
            key: "target_version",
            label: "Target Version",
            render: (val: string, row: any) => {
                const parts = row.current_version?.split('.') || [];
                if (parts.length === 2) {
                    return `${parts[0]}.${parseInt(parts[1]) + 1}`;
                }
                return "—";
            }
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: (val: string) => (
                <span className={`${val?.toLowerCase() === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'} px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border`}>
                    {val}
                </span>
            )
        },
        { key: "region", label: "Region" },
        {
            key: "updated_at",
            label: "Updated At",
            render: (val: string) =>
                val
                    ? new Date(val).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })
                    : "—",
        },
        {
            key: "created_at",
            label: "Created At",
            render: (val: string) =>
                val
                    ? new Date(val).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })
                    : "—",
        },
    ];


    const actions = [
        {
            icon: FolderKanban,
            color: "primary",
            link: (item: any) => {
                const parts = item.current_version?.split('.') || [];
                const nextVersion = parts.length === 2 ? `${parts[0]}.${parseInt(parts[1]) + 1}` : item.current_version;
                return `/Run-Pre-Checker?cluster_id=${item.id}&target_version=${nextVersion}`;
            },
            label: "Run Pre-Checker"
        },
        {
            icon: UserRoundPen,
            color: "text-gray-600",
            disabled: (item: any) => item.status !== "Active",
            label: "Upgrade"
        },
    ];
    return (
        <Table
            columns={columns}
            data={paginatedData || []}
            actions={actions}
            isLoading={false}
            onSort={handleSort}
            sortConfig={sortConfig}
            emptyState="No cluster data found"
        />
    )
}

export default DempTable