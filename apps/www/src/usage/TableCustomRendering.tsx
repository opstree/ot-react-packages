import React from "react";
import Table, { ColumnDef } from "@workspace/ui/components/mui-components/ts/Table";

type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "credit" | "debit";
  status: string;
  account: string;
};

const columns: ColumnDef<Transaction>[] = [
  { key: "id", label: "ID", minWidth: 100 },
  {
    key: "date",
    label: "Date",
    minWidth: 110,
    sortable: true,
    sortKey: "date",
  },
  {
    key: "description",
    label: "Description",
    minWidth: 200,
    render: (value, row) => (
      <div>
        <strong>{value}</strong>
        <div style={{ fontSize: 11, color: "#8B91A8", marginTop: 2 }}>{row.account}</div>
      </div>
    ),
  },
  { key: "category", label: "Category", minWidth: 120 },
  {
    key: "type",
    label: "Type",
    minWidth: 90,
    render: (value) => (
      <span
        style={{
          display: "inline-block",
          padding: "2px 8px",
          borderRadius: 12,
          fontSize: 11,
          fontWeight: 600,
          background: value === "credit" ? "#D1FAE5" : "#FEE2E2",
          color: value === "credit" ? "#065F46" : "#991B1B",
        }}
      >
        {value.toUpperCase()}
      </span>
    ),
  },
  {
    key: "amount",
    label: "Amount",
    minWidth: 110,
    align: "right",
    sortable: true,
    sortKey: "amount",
    render: (value, row) => (
      <span style={{ color: row.type === "credit" ? "#059669" : "#DC2626", fontWeight: 600 }}>
        {row.type === "credit" ? "+" : "-"} ${Number(value).toLocaleString()}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    minWidth: 110,
    render: (value) => {
      const colors: Record<string, { bg: string; text: string }> = {
        Completed: { bg: "#D1FAE5", text: "#065F46" },
        Pending: { bg: "#FEF3C7", text: "#92400E" },
        Failed: { bg: "#FEE2E2", text: "#991B1B" },
        Refunded: { bg: "#E0E7FF", text: "#3730A3" },
      };
      const style = colors[value] || { bg: "#F3F4F6", text: "#374151" };
      return (
        <span
          style={{
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: 12,
            fontSize: 11,
            fontWeight: 600,
            background: style.bg,
            color: style.text,
          }}
        >
          {value}
        </span>
      );
    },
  },
];

const data: Transaction[] = [
  { id: "TXN-001", date: "2025-01-15", description: "Salary Deposit", category: "Income", amount: 5000, type: "credit", status: "Completed", account: "Checking **** 1234" },
  { id: "TXN-002", date: "2025-01-14", description: "Grocery Store", category: "Food", amount: 125.50, type: "debit", status: "Completed", account: "Checking **** 1234" },
  { id: "TXN-003", date: "2025-01-13", description: "Electric Bill", category: "Utilities", amount: 89.30, type: "debit", status: "Completed", account: "Checking **** 1234" },
  { id: "TXN-004", date: "2025-01-12", description: "Freelance Payment", category: "Income", amount: 1200, type: "credit", status: "Pending", account: "Savings **** 5678" },
  { id: "TXN-005", date: "2025-01-11", description: "Online Shopping", category: "Shopping", amount: 234.99, type: "debit", status: "Completed", account: "Credit **** 9012" },
  { id: "TXN-006", date: "2025-01-10", description: "Gas Station", category: "Transport", amount: 45.00, type: "debit", status: "Failed", account: "Checking **** 1234" },
  { id: "TXN-007", date: "2025-01-09", description: "Refund - Return", category: "Shopping", amount: 89.99, type: "credit", status: "Refunded", account: "Credit **** 9012" },
  { id: "TXN-008", date: "2025-01-08", description: "Restaurant", category: "Food", amount: 67.50, type: "debit", status: "Completed", account: "Checking **** 1234" },
  { id: "TXN-009", date: "2025-01-07", description: "Subscription", category: "Entertainment", amount: 15.99, type: "debit", status: "Completed", account: "Credit **** 9012" },
  { id: "TXN-010", date: "2025-01-06", description: "Investment Dividend", category: "Income", amount: 350, type: "credit", status: "Completed", account: "Investment **** 3456" },
];

const TableCustomRendering = () => {
  return (
    <div style={{ width: "100%" }}>
      <Table
        icon="ri-bank-card-line"
        title="Transaction History"
        subtitle="Custom cell rendering with badges, formatted amounts, and multi-line cells"
        data={data}
        columns={columns}
        pageSize={5}
        searchable={true}
        searchKeys={["description", "category", "account"]}
      />
    </div>
  );
};

export default TableCustomRendering;