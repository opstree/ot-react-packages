import React from "react";
import Table, { ColumnDef } from "@workspace/ui/components/mui-components/ts/Table";

type ClusterMetric = {
  clusterName: string;
  region: string;
  version: string;
  status: string;
  nodeCount: number;
  cpuUtilization: number;
  memoryUtilization: number;
  diskUtilization: number;
  networkUtilization: number;
  podCount: number;
  riskLevel: string;
  createdAt: string;
  _raw?: { has_data?: boolean };
};

const columns: ColumnDef<ClusterMetric>[] = [
  { key: "clusterName", label: "Cluster Name", minWidth: 160, sortable: true, sortKey: "clusterName" },
  { key: "region", label: "Region", minWidth: 110, sortable: true, sortKey: "region" },
  { key: "version", label: "Version", minWidth: 100, sortable: true, sortKey: "version" },
  { key: "status", label: "Status", minWidth: 100, sortable: true, sortKey: "status" },
  { key: "nodeCount", label: "Nodes", minWidth: 70, sortable: true, sortKey: "nodeCount", align: "center" },
  {
    key: "cpuUtilization",
    label: "CPU %",
    minWidth: 80,
    sortable: true,
    sortKey: "cpuUtilization",
    align: "center",
    isMetricColumn: true,
    render: (value) => `${value}%`,
  },
  {
    key: "memoryUtilization",
    label: "Memory %",
    minWidth: 90,
    sortable: true,
    sortKey: "memoryUtilization",
    align: "center",
    isMetricColumn: true,
    render: (value) => `${value}%`,
  },
  {
    key: "diskUtilization",
    label: "Disk %",
    minWidth: 80,
    sortable: true,
    sortKey: "diskUtilization",
    align: "center",
    isMetricColumn: true,
    render: (value) => `${value}%`,
  },
  {
    key: "networkUtilization",
    label: "Network %",
    minWidth: 90,
    sortable: true,
    sortKey: "networkUtilization",
    align: "center",
    isMetricColumn: true,
    render: (value) => `${value}%`,
  },
  {
    key: "podCount",
    label: "Pods",
    minWidth: 70,
    sortable: true,
    sortKey: "podCount",
    align: "center",
    isMetricColumn: true,
  },
  { key: "riskLevel", label: "Risk", minWidth: 80, sortable: true, sortKey: "riskLevel" },
  { key: "createdAt", label: "Created", minWidth: 110, sortable: true, sortKey: "createdAt" },
];

const data: ClusterMetric[] = [
  {
    clusterName: "prod-us-east-1",
    region: "us-east-1",
    version: "v1.28.2",
    status: "Active",
    nodeCount: 12,
    cpuUtilization: 68,
    memoryUtilization: 74,
    diskUtilization: 45,
    networkUtilization: 32,
    podCount: 234,
    riskLevel: "Low",
    createdAt: "2025-01-15",
  },
  {
    clusterName: "staging-eu-west-1",
    region: "eu-west-1",
    version: "v1.28.2",
    status: "Active",
    nodeCount: 4,
    cpuUtilization: 35,
    memoryUtilization: 42,
    diskUtilization: 18,
    networkUtilization: 15,
    podCount: 56,
    riskLevel: "Low",
    createdAt: "2025-02-10",
  },
  {
    clusterName: "dev-us-west-2",
    region: "us-west-2",
    version: "v1.27.4",
    status: "Active",
    nodeCount: 3,
    cpuUtilization: 0,
    memoryUtilization: 0,
    diskUtilization: 0,
    networkUtilization: 0,
    podCount: 0,
    riskLevel: "Low",
    createdAt: "2025-03-01",
    _raw: { has_data: false },
  },
  {
    clusterName: "test-ap-southeast-1",
    region: "ap-southeast-1",
    version: "v1.27.4",
    status: "Inactive",
    nodeCount: 0,
    cpuUtilization: 0,
    memoryUtilization: 0,
    diskUtilization: 0,
    networkUtilization: 0,
    podCount: 0,
    riskLevel: "Low",
    createdAt: "2025-04-12",
    _raw: { has_data: false },
  },
  {
    clusterName: "prod-eu-central-1",
    region: "eu-central-1",
    version: "v1.28.2",
    status: "Active",
    nodeCount: 16,
    cpuUtilization: 88,
    memoryUtilization: 92,
    diskUtilization: 78,
    networkUtilization: 65,
    podCount: 412,
    riskLevel: "High",
    createdAt: "2025-01-20",
  },
  {
    clusterName: "prod-us-west-1",
    region: "us-west-1",
    version: "v1.28.1",
    status: "Active",
    nodeCount: 8,
    cpuUtilization: 0,
    memoryUtilization: 0,
    diskUtilization: 0,
    networkUtilization: 0,
    podCount: 0,
    riskLevel: "Low",
    createdAt: "2025-03-15",
    _raw: { has_data: false },
  },
];

const TableExpandableRows = () => {
  return (
    <div style={{ width: "100%" }}>
      <Table
        icon="ri-database-2-line"
        title="Kubernetes Cluster Metrics"
        subtitle="Metric columns (CPU, Memory, Disk, Network, Pods) collapse when cluster has no data"
        tooltip="Click the info message row to expand collapsed metrics"
        data={data}
        columns={columns}
        pageSize={5}
        isRowEmpty={(row) => row._raw?.has_data === false}
        noDataRowMessage="No metrics available — cluster may be provisioning or inactive"
        searchable={true}
        searchKeys={["clusterName", "region", "status"]}
      />
    </div>
  );
};

export default TableExpandableRows;