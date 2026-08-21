import React, { useState } from "react";
import Table, { ColumnDef, FilterConfig } from "@workspace/ui/components/mui-components/ts/Table";

type Order = {
  id: string;
  customer: string;
  email: string;
  status: string;
  priority: string;
  region: string;
  amount: number;
  date: string;
};

const columns: ColumnDef<Order>[] = [
  { key: "id", label: "Order ID", minWidth: 120, sortable: true, sortKey: "id" },
  { key: "customer", label: "Customer", minWidth: 150, sortable: true, sortKey: "customer" },
  { key: "email", label: "Email", minWidth: 200 },
  { key: "status", label: "Status", minWidth: 130, sortable: true, sortKey: "status" },
  { key: "priority", label: "Priority", minWidth: 110, sortable: true, sortKey: "priority" },
  { key: "region", label: "Region", minWidth: 120, sortable: true, sortKey: "region" },
  {
    key: "amount",
    label: "Amount",
    minWidth: 110,
    sortable: true,
    sortKey: "amount",
    align: "right",
    render: (value) => `$${Number(value).toLocaleString()}`,
  },
  { key: "date", label: "Date", minWidth: 120, sortable: true, sortKey: "date" },
];

const filters: FilterConfig[] = [
  {
    key: "status",
    label: "Status",
    options: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
  },
  {
    key: "priority",
    label: "Priority",
    options: ["Low", "Medium", "High", "Critical"],
  },
  {
    key: "region",
    label: "Region",
    options: ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"],
  },
];

const data: Order[] = [
  { id: "ORD-001", customer: "John Smith", email: "john@email.com", status: "Delivered", priority: "High", region: "North America", amount: 1250, date: "2025-01-15" },
  { id: "ORD-002", customer: "Maria Garcia", email: "maria@email.com", status: "Processing", priority: "Medium", region: "Europe", amount: 890, date: "2025-01-14" },
  { id: "ORD-003", customer: "Ahmed Hassan", email: "ahmed@email.com", status: "Pending", priority: "Low", region: "Middle East", amount: 450, date: "2025-01-13" },
  { id: "ORD-004", customer: "Sarah Chen", email: "sarah@email.com", status: "Shipped", priority: "High", region: "Asia Pacific", amount: 2100, date: "2025-01-12" },
  { id: "ORD-005", customer: "James Wilson", email: "james@email.com", status: "Delivered", priority: "Critical", region: "North America", amount: 3500, date: "2025-01-11" },
  { id: "ORD-006", customer: "Lisa Anderson", email: "lisa@email.com", status: "Cancelled", priority: "Medium", region: "Europe", amount: 750, date: "2025-01-10" },
  { id: "ORD-007", customer: "Robert Kim", email: "robert@email.com", status: "Processing", priority: "High", region: "Asia Pacific", amount: 1800, date: "2025-01-09" },
  { id: "ORD-008", customer: "Emily Davis", email: "emily@email.com", status: "Pending", priority: "Low", region: "Latin America", amount: 320, date: "2025-01-08" },
  { id: "ORD-009", customer: "Michael Brown", email: "michael@email.com", status: "Delivered", priority: "Medium", region: "North America", amount: 950, date: "2025-01-07" },
  { id: "ORD-010", customer: "Jennifer Lee", email: "jennifer@email.com", status: "Shipped", priority: "High", region: "Europe", amount: 1650, date: "2025-01-06" },
];

const TableFilters = () => {
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (key: string, values: string[]) => {
    setFilterValues((prev) => ({ ...prev, [key]: values }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In real app: debounced API call
    console.log("Search:", query);
  };

  return (
    <div style={{ width: "100%" }}>
      <Table
        icon="ri-file-list-3-line"
        title="Order Management"
        subtitle="Filter and search orders across regions"
        data={data}
        columns={columns}
        filters={filters}
        initialFilterValues={filterValues}
        onFilterChange={(v) => handleFilterChange("status", v ? v.split(",") : [])}
        onSecondaryFilterChange={(v) => handleFilterChange("priority", v ? v.split(",") : [])}
        onTertiaryFilterChange={(v) => handleFilterChange("region", v ? v.split(",") : [])}
        searchable={true}
        searchKeys={["id", "customer", "email"]}
        onSearch={handleSearch}
        pageSize={5}
      />
    </div>
  );
};

export default TableFilters;