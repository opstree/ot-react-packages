import React, { useState } from "react";
import Table, { ColumnDef } from "@workspace/ui/components/mui-components/ts/Table";

type Report = {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: string;
  size: string;
};

const columns: ColumnDef<Report>[] = [
  { key: "id", label: "Report ID", minWidth: 120 },
  { key: "name", label: "Name", minWidth: 200 },
  { key: "type", label: "Type", minWidth: 120 },
  { key: "status", label: "Status", minWidth: 120 },
  { key: "createdAt", label: "Created", minWidth: 120 },
  { key: "size", label: "Size", minWidth: 80, align: "right" },
];

const data: Report[] = [
  { id: "RPT-001", name: "Monthly Revenue", type: "Financial", status: "Ready", createdAt: "2025-01-15", size: "2.4 MB" },
  { id: "RPT-002", name: "User Analytics", type: "Analytics", status: "Ready", createdAt: "2025-01-14", size: "1.8 MB" },
  { id: "RPT-003", name: "System Health", type: "Operations", status: "Processing", createdAt: "2025-01-13", size: "—" },
  { id: "RPT-004", name: "Security Audit", type: "Compliance", status: "Ready", createdAt: "2025-01-12", size: "5.2 MB" },
  { id: "RPT-005", name: "Performance Metrics", type: "Operations", status: "Failed", createdAt: "2025-01-11", size: "—" },
];

const TableStates = () => {
  const [state, setState] = useState<"data" | "loading" | "error" | "empty">("data");

  const stateLabels = {
    data: "Normal Data",
    loading: "Loading State (Skeletons)",
    error: "Error State",
    empty: "Empty State",
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#4B5168" }}>Demo State:</span>
        {(["data", "loading", "error", "empty"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            style={{
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 500,
              border: `1px solid ${state === s ? "#0086FF" : "#E0E4EF"}`,
              borderRadius: 6,
              background: state === s ? "#0086FF" : "#fff",
              color: state === s ? "#fff" : "#4B5168",
              cursor: "pointer",
            }}
          >
            {stateLabels[s]}
          </button>
        ))}
      </div>

      <Table
        icon="ri-file-chart-line"
        title="Report Library"
        subtitle={stateLabels[state]}
        data={state === "data" ? data : []}
        columns={columns}
        loading={state === "loading"}
        error={state === "error" ? "Failed to load reports. Please try again." : null}
        emptyMessage="No reports found. Create your first report to get started."
        pageSize={5}
        skeletonRows={5}
      />
    </div>
  );
};

export default TableStates;