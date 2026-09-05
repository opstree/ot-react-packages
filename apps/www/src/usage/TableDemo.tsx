import React, { useState, useMemo } from "react";
import Table, { ColumnDef } from "@workspace/ui/components/mui-components/ts/Table";
import { TableControlSidebar } from "../components/common/TableControlSidebar";

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
  _raw?: { has_data?: boolean };
};

const initialData: ServiceMetric[] = [
  { service: "api-gateway", region: "us-east-1", status: "Healthy", cpu: 45, memory: 62, disk: 38, network: 120, requests: 15420, errors: 0, latency: 28, uptime: 99.99, _action: "" },
  { service: "auth-service", region: "us-east-1", status: "Healthy", cpu: 23, memory: 41, disk: 15, network: 45, requests: 8920, errors: 0, latency: 12, uptime: 99.99, _action: "" },
  { service: "dev-sandbox-2", region: "ap-southeast-1", status: "Provisioning", cpu: 0, memory: 0, disk: 0, network: 0, requests: 0, errors: 0, latency: 0, uptime: 0, _action: "", _raw: { has_data: false } },
  { service: "analytics-service", region: "ap-southeast-1", status: "Critical", cpu: 89, memory: 92, disk: 71, network: 340, requests: 45200, errors: 12, latency: 156, uptime: 99.80, _action: "" },
];

const TableDemo = () => {
  const [dataList, setDataList] = useState<ServiceMetric[]>(initialData);
  const [tableState, setTableState] = useState<"data" | "loading" | "error" | "empty">("data");
  const [enableStickyColumns, setEnableStickyColumns] = useState<boolean>(true);
  const [enableRowExpansion, setEnableRowExpansion] = useState<boolean>(true);
  const [enableSearchAndFilters, setEnableSearchAndFilters] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleResetData = () => {
    setDataList(initialData);
  };

  const columns: ColumnDef<ServiceMetric>[] = useMemo(() => [
    {
      key: enableStickyColumns ? "service" : "service_nosticky",
      label: "Service Name",
      minWidth: 180,
      sortable: true,
      sortKey: "service",
      render: (_, row) => (
        <span style={{ fontWeight: 600, color: "#0F172A" }}>{row.service}</span>
      ),
    },
    { key: "region", label: "Region", minWidth: 110, sortable: true, sortKey: "region" },
    {
      key: "status",
      label: "Status",
      minWidth: 100,
      sortable: true,
      sortKey: "status",
      render: (val) => {
        const statusStr = String(val);
        let bg = "#F1F5F9";
        let color = "#475569";
        if (statusStr === "Healthy") { bg = "#DCFCE7"; color = "#15803D"; }
        else if (statusStr === "Degraded") { bg = "#FEF9C3"; color = "#A16207"; }
        else if (statusStr === "Critical") { bg = "#FEE2E2"; color = "#B91C1C"; }
        return (
          <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600, background: bg, color }}>
            {statusStr}
          </span>
        );
      },
    },
    {
      key: "cpu",
      label: "CPU %",
      minWidth: 90,
      sortable: true,
      sortKey: "cpu",
      align: "center",
      isMetricColumn: enableRowExpansion,
      render: (value) => `${value}%`,
    },
    {
      key: "memory",
      label: "Memory %",
      minWidth: 90,
      sortable: true,
      sortKey: "memory",
      align: "center",
      isMetricColumn: enableRowExpansion,
      render: (value) => `${value}%`,
    },
    {
      key: "disk",
      label: "Disk %",
      minWidth: 90,
      sortable: true,
      sortKey: "disk",
      align: "center",
      isMetricColumn: enableRowExpansion,
      render: (value) => `${value}%`,
    },
    {
      key: "network",
      label: "Network I/O",
      minWidth: 110,
      sortable: true,
      sortKey: "network",
      align: "center",
      isMetricColumn: enableRowExpansion,
      render: (value) => `${value} MB/s`,
    },
    {
      key: "requests",
      label: "Req/min",
      minWidth: 90,
      sortable: true,
      sortKey: "requests",
      align: "center",
      isMetricColumn: enableRowExpansion,
      render: (value) => Number(value).toLocaleString(),
    },
    {
      key: "errors",
      label: "Errors",
      minWidth: 80,
      sortable: true,
      sortKey: "errors",
      align: "center",
      isMetricColumn: enableRowExpansion,
      render: (value) => (Number(value) > 0 ? <span style={{ color: "#EF4444", fontWeight: 600 }}>{String(value)}</span> : String(value)),
    },
    {
      key: "latency",
      label: "Latency",
      minWidth: 100,
      sortable: true,
      sortKey: "latency",
      align: "center",
      isMetricColumn: enableRowExpansion,
      render: (value) => `${value}ms`,
    },
    {
      key: "uptime",
      label: "Uptime",
      minWidth: 90,
      sortable: true,
      sortKey: "uptime",
      align: "center",
      isMetricColumn: enableRowExpansion,
      render: (value) => `${value}%`,
    },
    {
      key: enableStickyColumns ? "_action" : "_action_nosticky",
      label: "Actions",
      minWidth: 110,
      render: (_, row) => (
        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDataList((prev) => prev.filter((r) => r.service !== row.service));
            }}
            style={{ padding: "4px 8px", fontSize: 11, fontWeight: 500, border: "1px solid #FCA5A5", borderRadius: 4, background: "#FEF2F2", color: "#991B1B", cursor: "pointer" }}
            title="Delete Row"
          >
            Remove
          </button>
        </div>
      ),
    },
  ], [enableStickyColumns, enableRowExpansion]);

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-end mb-3">
        <button
          type="button"
          aria-label="Table properties"
          title="Table properties"
          onClick={() => setSidebarOpen(true)}
          className="bg-[var(--sand-2)] p-1.5 mr-4 rounded-md border-[1px] border-black/10 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-filter-2-edit text-sm size-4 text-neutral-900"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6h16" /><path d="M6 12h11" /><path d="M9 18h2" /><path d="M18.42 15.61c.195 -.195 .426 -.35 .681 -.455c.255 -.106 .528 -.16 .804 -.16c.276 0 .549 .054 .804 .16c.255 .106 .486 .26 .681 .455c.195 .195 .35 .427 .455 .681c.106 .255 .16 .528 .16 .804c0 .276 -.054 .549 -.16 .804c-.105 .255 -.26 .486 -.455 .681l-3.39 3.42h-3v-3l3.42 -3.39" /></svg>
        </button>
      </div>

      <TableControlSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        tableState={tableState}
        setTableState={setTableState}
        enableStickyColumns={enableStickyColumns}
        setEnableStickyColumns={setEnableStickyColumns}
        enableRowExpansion={enableRowExpansion}
        setEnableRowExpansion={setEnableRowExpansion}
        enableSearchAndFilters={enableSearchAndFilters}
        setEnableSearchAndFilters={setEnableSearchAndFilters}
        onResetData={handleResetData}
      />

      {/* ── Table Render ── */}
      <Table
        icon="ri-server-line"
        title="Enterprise Services Dashboard"
        subtitle={`Showing ${tableState === "data" ? dataList.length : 0} services (${enableStickyColumns ? "Sticky Cols ON" : "Sticky Cols OFF"}, ${enableRowExpansion ? "Expandable Rows ON" : "Expandable Rows OFF"})`}
        tooltip="Click Properties & Options button above to configure table properties in real-time."
        data={tableState === "data" ? dataList : []}
        columns={columns}
        pageSize={5}
        loading={tableState === "loading"}
        error={tableState === "error" ? "Failed to connect to Service Metrics Gateway. Please try again." : null}
        emptyMessage="No services found matching your criteria."
        isRowEmpty={enableRowExpansion ? (row) => row._raw?.has_data === false : undefined}
        noDataRowMessage="No telemetry metrics available — service may be provisioning or inactive"
        searchable={enableSearchAndFilters}
        searchKeys={["service", "region", "status"]}
        filters={
          enableSearchAndFilters
            ? [
              {
                key: "region",
                label: "Region",
                options: ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"],
              },
              {
                key: "status",
                label: "Status",
                options: ["Healthy", "Degraded", "Critical", "Inactive", "Provisioning"],
              },
            ]
            : []
        }
      />
    </div>
  );
};

export default TableDemo;
