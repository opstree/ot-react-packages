import React, { useState, useMemo } from "react";
import Table, { ColumnDef } from "@workspace/ui/components/mui-components/ts/Table";

type Employee = {
  id: number;
  name: string;
  department: string;
  role: string;
  salary: number;
  startDate: string;
  status: string;
};

const columns: ColumnDef<Employee>[] = [
  { key: "id", label: "ID", minWidth: 60, sortable: true, sortKey: "id" },
  { key: "name", label: "Name", minWidth: 150, sortable: true, sortKey: "name" },
  { key: "department", label: "Department", minWidth: 140, sortable: true, sortKey: "department" },
  { key: "role", label: "Role", minWidth: 130, sortable: true, sortKey: "role" },
  {
    key: "salary",
    label: "Salary",
    minWidth: 110,
    sortable: true,
    sortKey: "salary",
    align: "right",
    render: (value) => `$${Number(value).toLocaleString()}`,
  },
  { key: "startDate", label: "Start Date", minWidth: 120, sortable: true, sortKey: "startDate" },
  { key: "status", label: "Status", minWidth: 100, sortable: true, sortKey: "status" },
];

const allData: Employee[] = [
  { id: 1, name: "Alice Johnson", department: "Engineering", role: "Senior Engineer", salary: 145000, startDate: "2022-03-15", status: "Active" },
  { id: 2, name: "Bob Smith", department: "Marketing", role: "Marketing Lead", salary: 110000, startDate: "2021-07-22", status: "Active" },
  { id: 3, name: "Carol White", department: "Sales", role: "Account Executive", salary: 95000, startDate: "2023-01-10", status: "Active" },
  { id: 4, name: "David Brown", department: "Engineering", role: "Tech Lead", salary: 165000, startDate: "2020-11-05", status: "Active" },
  { id: 5, name: "Eva Green", department: "HR", role: "HR Manager", salary: 105000, startDate: "2022-05-18", status: "Active" },
  { id: 6, name: "Frank Black", department: "Finance", role: "Financial Analyst", salary: 85000, startDate: "2023-09-12", status: "Active" },
  { id: 7, name: "Grace Lee", department: "Engineering", role: "Junior Engineer", salary: 90000, startDate: "2024-02-20", status: "Active" },
  { id: 8, name: "Henry Wilson", department: "Marketing", role: "Content Specialist", salary: 75000, startDate: "2023-11-30", status: "On Leave" },
  { id: 9, name: "Iris Martinez", department: "Sales", role: "Sales Manager", salary: 120000, startDate: "2021-04-25", status: "Active" },
  { id: 10, name: "Jack Taylor", department: "Engineering", role: "Principal Engineer", salary: 185000, startDate: "2019-08-14", status: "Active" },
  { id: 11, name: "Karen Anderson", department: "HR", role: "Recruiter", salary: 70000, startDate: "2024-01-15", status: "Active" },
  { id: 12, name: "Leo Thomas", department: "Finance", role: "Controller", salary: 130000, startDate: "2020-06-08", status: "Active" },
  { id: 13, name: "Mia Clark", department: "Engineering", role: "DevOps Engineer", salary: 135000, startDate: "2022-10-11", status: "Active" },
  { id: 14, name: "Noah Harris", department: "Marketing", role: "SEO Specialist", salary: 80000, startDate: "2023-03-22", status: "Active" },
  { id: 15, name: "Olivia Martin", department: "Sales", role: "BDR", salary: 65000, startDate: "2024-04-05", status: "Active" },
  { id: 16, name: "Paul Thompson", department: "Engineering", role: "QA Engineer", salary: 95000, startDate: "2021-12-19", status: "Active" },
  { id: 17, name: "Quinn Garcia", department: "HR", role: "Benefits Coordinator", salary: 68000, startDate: "2023-07-14", status: "Active" },
  { id: 18, name: "Rachel Martinez", department: "Finance", role: "Accountant", salary: 78000, startDate: "2022-09-03", status: "Active" },
  { id: 19, name: "Steven Lee", department: "Engineering", role: "Mobile Engineer", salary: 140000, startDate: "2021-02-28", status: "Active" },
  { id: 20, name: "Tina White", department: "Marketing", role: "Brand Manager", salary: 115000, startDate: "2020-12-12", status: "Active" },
];

const TablePagination = () => {
  const [externalMode, setExternalMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const totalPages = externalMode
    ? Math.ceil(allData.length / pageSize)
    : Math.ceil(allData.length / pageSize);

  // External pagination: only send current page data
  const displayData = externalMode
    ? allData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : allData;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={externalMode}
            onChange={(e) => setExternalMode(e.target.checked)}
          />
          <span style={{ fontSize: 13, fontWeight: 500 }}>External Pagination (Server-side)</span>
        </label>
        {externalMode && (
          <span style={{ fontSize: 12, color: "#8B91A8" }}>
            Page {currentPage} of {totalPages} • {allData.length} total records
          </span>
        )}
      </div>

      <Table
        icon="ri-team-line"
        title="Employee Directory"
        subtitle={externalMode ? "Server-side pagination demo" : "Client-side pagination (default)"}
        data={displayData}
        columns={columns}
        pageSize={pageSize}
        externalPagination={externalMode}
        currentPage={externalMode ? currentPage : undefined}
        totalPages={externalMode ? totalPages : undefined}
        onPageChange={externalMode ? handlePageChange : undefined}
      />
    </div>
  );
};

export default TablePagination;