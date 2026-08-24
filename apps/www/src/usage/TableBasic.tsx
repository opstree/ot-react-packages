import React from "react";
import Table, { ColumnDef } from "@workspace/ui/components/mui-components/ts/Table";
import { Heading } from "@workspace/ui/components/ui/Heading";
import { UserIcon } from "lucide-react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
};

const columns: ColumnDef<User>[] = [
  { key: "id", label: "ID", minWidth: 60, sortable: true, sortKey: "id" },
  { key: "name", label: "Name", minWidth: 150, sortable: true, sortKey: "name" },
  { key: "email", label: "Email", minWidth: 220 },
  { key: "role", label: "Role", minWidth: 120, sortable: true, sortKey: "role" },
  { key: "status", label: "Status", minWidth: 100, sortable: true, sortKey: "status" },
  { key: "lastLogin", label: "Last Login", minWidth: 140, sortable: true, sortKey: "lastLogin" },
];

const data: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", lastLogin: "2025-01-15" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User", status: "Active", lastLogin: "2025-01-14" },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "User", status: "Inactive", lastLogin: "2025-01-10" },
  { id: 4, name: "David Brown", email: "david@example.com", role: "Editor", status: "Active", lastLogin: "2025-01-13" },
  { id: 5, name: "Eva Green", email: "eva@example.com", role: "Viewer", status: "Pending", lastLogin: "2025-01-12" },
  { id: 6, name: "Frank Black", email: "frank@example.com", role: "User", status: "Active", lastLogin: "2025-01-11" },
  { id: 7, name: "Grace Lee", email: "grace@example.com", role: "Admin", status: "Active", lastLogin: "2025-01-15" },
  { id: 8, name: "Henry Wilson", email: "henry@example.com", role: "Editor", status: "Inactive", lastLogin: "2025-01-09" },
  { id: 9, name: "Iris Martinez", email: "iris@example.com", role: "User", status: "Active", lastLogin: "2025-01-14" },
  { id: 10, name: "Jack Taylor", email: "jack@example.com", role: "Viewer", status: "Pending", lastLogin: "2025-01-08" },
  { id: 11, name: "Karen Anderson", email: "karen@example.com", role: "User", status: "Active", lastLogin: "2025-01-13" },
  { id: 12, name: "Leo Thomas", email: "leo@example.com", role: "Editor", status: "Active", lastLogin: "2025-01-12" },
];

const TableBasic = () => {
  return (
    <div style={{ width: "100%" }}>
      <Table
        data={data}
        columns={columns}
        pageSize={5}
        searchable={false}
      />
    </div>
  );
};

export default TableBasic;