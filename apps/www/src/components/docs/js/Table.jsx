import React from "react";
import Table from "@workspace/ui/components/mui-components/Table.jsx";

const DEMO_COLUMNS = [
    { key: "service", label: "Service", minWidth: 180 },
    { key: "environment", label: "Environment", minWidth: 120 },
    {
        key: "status",
        label: "Status",
        minWidth: 130,
        render: (value) => {
            const v = String(value);
            const colorMap = {
                Healthy: "#16A34A",
                Degraded: "#D97706",
                Down: "#DC2626",
            };
            return (
                <span style={{ color: colorMap[v] ?? "#4B5168", fontWeight: 600 }}>
                    {v}
                </span>
            );
        },
    },
    {
        key: "requests",
        label: "Requests",
        minWidth: 110,
        sortable: true,
        sortKey: "requests",
        isMetricColumn: true,
        render: (value) => <span>{Number(value).toLocaleString()}</span>,
    },
    {
        key: "errorRate",
        label: "Error Rate",
        minWidth: 100,
        isMetricColumn: true,
    },
    {
        key: "latency",
        label: "P95 Latency",
        minWidth: 110,
        isMetricColumn: true,
    },
    { key: "owner", label: "Owner", minWidth: 240 },
    {
        key: "_action",
        label: "Action",
        minWidth: 90,
        render: (_value, row) => (
            <button
                onClick={() => console.log("View details for", row.service)}
                style={{
                    border: "1px solid #0086FF",
                    background: "#fff",
                    color: "#0086FF",
                    borderRadius: 6,
                    padding: "4px 10px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                }}
            >
                View
            </button>
        ),
    },
];

const DEMO_DATA = [
    { service: "auth-service", environment: "production", status: "Healthy", requests: 128430, errorRate: "0.02%", latency: "142ms", owner: "Platform Team" },
    { service: "payments-api", environment: "production", status: "Degraded", requests: 84210, errorRate: "1.84%", latency: "310ms", owner: "Payments Team" },
    { service: "notifications", environment: "staging", status: "Healthy", requests: 5321, errorRate: "0.00%", latency: "88ms", owner: "Growth Team" },
    { service: "search-index", environment: "production", status: "Down", requests: 0, errorRate: "100%", latency: "—", owner: "Search Team", _raw: { has_data: false } },
    { service: "recommendation-engine", environment: "production", status: "Healthy", requests: 42110, errorRate: "0.11%", latency: "205ms", owner: "ML Team" },
    { service: "billing-worker", environment: "production", status: "Healthy", requests: 19876, errorRate: "0.05%", latency: "97ms", owner: "Payments Team" },
    { service: "user-profile", environment: "staging", status: "Healthy", requests: 3012, errorRate: "0.00%", latency: "60ms", owner: "Platform Team" },
    { service: "email-dispatcher", environment: "production", status: "Degraded", requests: 15789, errorRate: "2.10%", latency: "412ms", owner: "Growth Team" },
    { service: "inventory-sync", environment: "production", status: "Healthy", requests: 27650, errorRate: "0.03%", latency: "133ms", owner: "Commerce Team" },
    { service: "fraud-detection", environment: "production", status: "Healthy", requests: 61234, errorRate: "0.01%", latency: "178ms", owner: "Risk Team" },
    { service: "webhooks-relay", environment: "staging", status: "Healthy", requests: 987, errorRate: "0.00%", latency: "54ms", owner: "Platform Team" },
    { service: "reporting-service", environment: "production", status: "Healthy", requests: 8410, errorRate: "0.07%", latency: "221ms", owner: "Data Team" },
];

const DEMO_FILTERS = [
    { key: "environment", label: "Environment", options: ["production", "staging"] },
    { key: "status", label: "Status", options: ["Healthy", "Degraded", "Down"] },
];

const TableComponent = () => {
    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <Table
                data={DEMO_DATA}
                columns={DEMO_COLUMNS}
                title="Service Health Overview"
                subtitle="Hardcoded demo data — 12 services"
                tooltip="Static example data for local development / Storybook"
                icon="ri-server-line"
                pageSize={5}
                searchable
                searchKeys={["service", "owner"]}
                filters={DEMO_FILTERS}
                noDataRowMessage="This service reported no data in the selected window."
            />
        </div>
    );
};
export default TableComponent;
