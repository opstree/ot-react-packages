export interface TableProps {
    columns: any[];
    data: any[];
    isLoading?: boolean;
    actions?: any[];
    sortConfig?: any;
    onSort?: (key: string) => void;
    emptyState?: any;
    onRowClick?: (row: any) => void;
    className?: string;
    expandable?: boolean;
    renderExpandedContent?: (row: any) => React.ReactNode;
    rowKey?: (row: any, index: number) => string | number;
}
