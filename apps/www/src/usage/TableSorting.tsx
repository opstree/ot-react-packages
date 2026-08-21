import React, { useState, useMemo } from "react";
import Table, { ColumnDef } from "@workspace/ui/components/mui-components/ts/Table";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  status: string;
};

const columns: ColumnDef<Product>[] = [
  { key: "id", label: "ID", minWidth: 60, sortable: true, sortKey: "id" },
  { key: "name", label: "Product Name", minWidth: 200, sortable: true, sortKey: "name" },
  { key: "category", label: "Category", minWidth: 140, sortable: true, sortKey: "category" },
  {
    key: "price",
    label: "Price",
    minWidth: 100,
    sortable: true,
    sortKey: "price",
    align: "right",
    render: (value) => `$${Number(value).toFixed(2)}`,
  },
  {
    key: "stock",
    label: "Stock",
    minWidth: 100,
    sortable: true,
    sortKey: "stock",
    align: "center",
  },
  {
    key: "rating",
    label: "Rating",
    minWidth: 100,
    sortable: true,
    sortKey: "rating",
    align: "center",
    render: (value) => `${Number(value).toFixed(1)} ⭐`,
  },
  { key: "status", label: "Status", minWidth: 120, sortable: true, sortKey: "status" },
];

const data: Product[] = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 149.99, stock: 45, rating: 4.5, status: "Active" },
  { id: 2, name: "Running Shoes", category: "Sports", price: 89.99, stock: 120, rating: 4.2, status: "Active" },
  { id: 3, name: "Coffee Maker", category: "Home", price: 79.99, stock: 30, rating: 4.7, status: "Active" },
  { id: 4, name: "Bluetooth Speaker", category: "Electronics", price: 59.99, stock: 0, rating: 4.0, status: "Out of Stock" },
  { id: 5, name: "Yoga Mat", category: "Sports", price: 24.99, stock: 200, rating: 4.8, status: "Active" },
  { id: 6, name: "Desk Lamp", category: "Home", price: 34.99, stock: 55, rating: 4.3, status: "Active" },
  { id: 7, name: "Mechanical Keyboard", category: "Electronics", price: 129.99, stock: 25, rating: 4.9, status: "Active" },
  { id: 8, name: "Water Bottle", category: "Sports", price: 19.99, stock: 300, rating: 4.4, status: "Active" },
  { id: 9, name: "Plant Pot Set", category: "Home", price: 42.99, stock: 15, rating: 4.1, status: "Low Stock" },
  { id: 10, name: "Monitor Stand", category: "Electronics", price: 49.99, stock: 40, rating: 4.6, status: "Active" },
];

const TableSorting = () => {
  const [sortColumn, setSortColumn] = useState<string | null>("name");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const handleSortChange = (key: string | undefined) => {
    if (!key) return;
    if (sortColumn === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortColumn(key);
      setSortAsc(true);
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    const sorted = [...data];
    sorted.sort((a, b) => {
      const valA = a[sortColumn as keyof Product];
      const valB = b[sortColumn as keyof Product];
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
    <div style={{ width: "100%" }}>
      <Table
        icon="ri-shopping-bag-line"
        title="Product Inventory"
        subtitle="Sortable product catalog with pricing and stock"
        data={sortedData}
        columns={columns}
        pageSize={5}
        sortColumn={sortColumn}
        sortAsc={sortAsc}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default TableSorting;