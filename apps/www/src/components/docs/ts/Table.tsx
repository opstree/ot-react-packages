import React from "react";
import Table, { ColumnDef } from "@workspace/ui/components/mui-components/ts/Table";

type ClusterData = {
    clusterName: string;
    region: string;
    version: string;
    status: string;
    nodeCount: number;
    cpuUtilization: number;
    memoryUtilization: number;
    riskLevel: string;
    createdAt: string;
};


const columns: ColumnDef<ClusterData>[] = [
    { key: "clusterName", label: "Cluster Name", minWidth: 150, sortable: true, sortKey: "clusterName" },
    { key: "region", label: "Region", minWidth: 120, sortable: true, sortKey: "region" },
    { key: "version", label: "Version", minWidth: 100, sortable: true, sortKey: "version" },
    { key: "status", label: "Status", minWidth: 120, sortable: true, sortKey: "status" },
    { key: "nodeCount", label: "Nodes", minWidth: 100, sortable: true, sortKey: "nodeCount" },
    {
        key: "cpuUtilization",
        label: "CPU",
        minWidth: 100,
        sortable: true,
        sortKey: "cpuUtilization",
        render: (value) => `${value}%`
    },
    {
        key: "memoryUtilization",
        label: "Memory",
        minWidth: 100,
        sortable: true,
        sortKey: "memoryUtilization",
        render: (value) => `${value}%`
    },
    { key: "riskLevel", label: "Risk", minWidth: 100, sortable: true, sortKey: "riskLevel" },
    { key: "createdAt", label: "Created At", minWidth: 150, sortable: true, sortKey: "createdAt" }
];

const data: ClusterData[] = [
    {
        clusterName: "prod-us-east-1",
        region: "us-east-1",
        version: "v1.28.2",
        status: "Active",
        nodeCount: 12,
        cpuUtilization: 68,
        memoryUtilization: 74,
        riskLevel: "Low",
        createdAt: "2025-01-15"
    },
    {
        clusterName: "staging-eu-west-1",
        region: "eu-west-1",
        version: "v1.28.2",
        status: "Active",
        nodeCount: 4,
        cpuUtilization: 35,
        memoryUtilization: 42,
        riskLevel: "Low",
        createdAt: "2025-02-10"
    },
    {
        clusterName: "dev-us-west-2",
        region: "us-west-2",
        version: "v1.27.4",
        status: "Active",
        nodeCount: 3,
        cpuUtilization: 15,
        memoryUtilization: 28,
        riskLevel: "Low",
        createdAt: "2025-03-01"
    },
    {
        clusterName: "test-ap-southeast-1",
        region: "ap-southeast-1",
        version: "v1.27.4",
        status: "Inactive",
        nodeCount: 2,
        cpuUtilization: 0,
        memoryUtilization: 5,
        riskLevel: "Low",
        createdAt: "2025-04-12"
    },
    {
        clusterName: "prod-eu-central-1",
        region: "eu-central-1",
        version: "v1.28.2",
        status: "Active",
        nodeCount: 16,
        cpuUtilization: 88,
        memoryUtilization: 92,
        riskLevel: "High",
        createdAt: "2025-01-20"
    }
];

const filters = [
    {
        key: "status",
        label: "Status",
        options: ["Active", "Inactive"]
    },
    {
        key: "riskLevel",
        label: "Risk Level",
        options: ["Low", "High"]
    }
];

const TableComponent = () => {
    const [sortColumn, setSortColumn] = React.useState<string | null>("clusterName");
    const [sortAsc, setSortAsc] = React.useState<boolean>(true);

    const handleSortChange = (key: string | undefined) => {
        if (!key) return;
        if (sortColumn === key) {
            setSortAsc(!sortAsc);
        } else {
            setSortColumn(key);
            setSortAsc(true);
        }
    };

    const sortedData = React.useMemo(() => {
        if (!sortColumn) return data;
        const sorted = [...data];
        sorted.sort((a, b) => {
            const valA = a[sortColumn as keyof ClusterData];
            const valB = b[sortColumn as keyof ClusterData];
            if (valA == null) return 1;
            if (valB == null) return -1;
            if (typeof valA === "number" && typeof valB === "number") {
                return sortAsc ? valA - valB : valB - valA;
            }
            const strA = String(valA).toLowerCase();
            const strB = String(valB).toLowerCase();
            return sortAsc ? strA.localeCompare(strB) : strB.localeCompare(strA);
        });
        return sorted;
    }, [sortColumn, sortAsc]);

    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <Table
                icon="ri-apps-line"
                title="Cluster Performance Metrics"
                subtitle="CPU, memory, and status metrics across KubeLift clusters"
                tooltip="Overview of all managed clusters"
                data={sortedData}
                columns={columns}
                loading={false}
                error={null}
                pageSize={5}
                searchable={true}
                filters={filters}
                isRowEmpty={(row) => row?.nodeCount === 0}
                noDataRowMessage="No active clusters matched the filters."
                emptyMessage="No clusters found."
                sortColumn={sortColumn}
                sortAsc={sortAsc}
                onSortChange={handleSortChange}
            />
        </div>
    );
};

export default TableComponent;