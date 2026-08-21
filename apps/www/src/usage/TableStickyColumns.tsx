import React from "react";
import Table, { ColumnDef } from "@workspace/ui/components/mui-components/ts/Table";

type ServiceMetric = {
  service: string;
  region: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  requests: number;
  errors: number;
  latency: number;
  uptime: number;
  status: string;
  _action: string;
};

const columns: ColumnDef<ServiceMetric>[] = [
  { key: "service", label: "Service", minWidth: 180, sortable: true, sortKey: "service" },
  { key: "region", label: "Region", minWidth: 120, sortable: true, sortKey: "region" },
  {
    key: "cpu",
    label: "CPU %",
    minWidth: 90,
    sortable: true,
    sortKey: "cpu",
    align: "center",
    render: (value) => `${value}%`,
  },
  {
    key: "memory",
    label: "Memory %",
    minWidth: 90,
    sortable: true,
    sortKey: "memory",
    align: "center",
    render: (value) => `${value}%`,
  },
  {
    key: "disk",
    label: "Disk %",
    minWidth: 90,
    sortable: true,
    sortKey: "disk",
    align: "center",
    render: (value) => `${value}%`,
  },
  {
    key: "network",
    label: "Network I/O",
    minWidth: 110,
    sortable: true,
    sortKey: "network",
    align: "center",
    render: (value) => `${value} MB/s`,
  },
  {
    key: "requests",
    label: "Req/min",
    minWidth: 90,
    sortable: true,
    sortKey: "requests",
    align: "center",
    render: (value) => Number(value).toLocaleString(),
  },
  {
    key: "errors",
    label: "Errors",
    minWidth: 80,
    sortable: true,
    sortKey: "errors",
    align: "center",
    render: (value) => value > 0 ? <span style={{ color: "#EF4444", fontWeight: 600 }}>{value}</span> : value,
  },
  {
    key: "latency",
    label: "Latency (ms)",
    minWidth: 100,
    sortable: true,
    sortKey: "latency",
    align: "center",
    render: (value) => `${value}ms`,
  },
  {
    key: "uptime",
    label: "Uptime",
    minWidth: 90,
    sortable: true,
    sortKey: "uptime",
    align: "center",
    render: (value) => `${value}%`,
  },
  { key: "status", label: "Status", minWidth: 100, sortable: true, sortKey: "status" },
  {
    key: "_action",
    label: "Actions",
    minWidth: 100,
    render: () => (
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button style={{ padding: "4px 8px", fontSize: 11, border: "1px solid #E0E4EF", borderRadius: 4, background: "#fff", cursor: "pointer" }}>
          View
        </button>
        <button style={{ padding: "4px 8px", fontSize: 11, border: "1px solid #E0E4EF", borderRadius: 4, background: "#fff", cursor: "pointer" }}>
          Logs
        </button>
      </div>
    ),
  },
];

const data: ServiceMetric[] = [
  { service: "api-gateway", region: "us-east-1", cpu: 45, memory: 62, disk: 38, network: 120, requests: 15420, errors: 0, latency: 28, uptime: 99.99, status: "Healthy", _action: "" },
  { service: "auth-service", region: "us-east-1", cpu: 23, memory: 41, disk: 15, network: 45, requests: 8920, errors: 0, latency: 12, uptime: 99.99, status: "Healthy", _action: "" },
  { service: "user-service", region: "us-west-2", cpu: 67, memory: 78, disk: 52, network: 210, requests: 23450, errors: 3, latency: 45, uptime: 99.95, status: "Degraded", _action: "" },
  { service: "payment-service", region: "eu-west-1", cpu: 34, memory: 55, disk: 28, network: 89, requests: 12100, errors: 0, latency: 19, uptime: 100, status: "Healthy", _action: "" },
  { service: "notification-service", region: "us-east-1", cpu: 12, memory: 28, disk: 8, network: 34, requests: 5600, errors: 0, latency: 8, uptime: 99.99, status: "Healthy", _action: "" },
  { service: "analytics-service", region: "ap-southeast-1", cpu: 89, memory: 92, disk: 71, network: 340, requests: 45200, errors: 12, latency: 156, uptime: 99.80, status: "Critical", _action: "" },
  { service: "search-service", region: "eu-central-1", cpu: 56, memory: 68, disk: 44, network: 178, requests: 18900, errors: 1, latency: 34, uptime: 99.97, status: "Healthy", _action: "" },
  { service: "file-storage", region: "us-west-2", cpu: 18, memory: 35, disk: 82, network: 560, requests: 3200, errors: 0, latency: 22, uptime: 99.99, status: "Healthy", _action: "" },
];

const TableStickyColumns = () => {
  return (
    <div style={{ width: "100%" }}>
      <Table
        icon="ri-server-line"
        title="Service Metrics Dashboard"
        subtitle="Sticky service name (left) and actions (right) during horizontal scroll"
        tooltip="Horizontal scroll to see sticky columns in action"
        data={data}
        columns={columns}
        pageSize={5}
        searchable={true}
        searchKeys={["service", "region", "status"]}
      />
    </div>
  );
};

export default TableStickyColumns;