"use client";

import { cn } from "@workspace/ui/lib/utils";

interface PropDef {
  name: string;
  type?: string;
  default?: string;
  description?: string;
  required?: boolean;
  category?: string;
}

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="my-6 w-full overflow-x-auto text-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-t border-b bg-muted/50">
            <th className="border px-4 py-2 text-left text-sm font-bold">Prop</th>
            {props.some(p => p.type) && <th className="border px-4 py-2 text-left text-sm font-bold">Type</th>}
            {props.some(p => p.default) && <th className="border px-4 py-2 text-left text-sm font-bold">Default</th>}
            {props.some(p => p.description) && <th className="border px-4 py-2 text-left text-sm font-bold">Description</th>}
          </tr>
        </thead>
        <tbody>
          {props.map((prop, index) => {
            if (prop.category) {
              return (
                <tr key={`category-${index}`} className="bg-muted/50">
                  <td colSpan={4} className="border px-4 py-2 text-left text-sm font-semibold text-foreground/80">
                    {prop.category}
                  </td>
                </tr>
              );
            }
            return (
              <tr key={prop.name} className={cn("border-t", index % 2 === 0 ? "even:bg-muted" : "")}>
                <td className="border px-4 py-3 text-left font-mono text-sm">
                  <code className="relative rounded px-2 py-1 text-sm bg-neutral-100 dark:bg-neutral-800">
                    {prop.name}
                    {prop.required && <span className="ml-1 text-red-500">*</span>}
                  </code>
                </td>
                {prop.type && <td className="border px-4 py-3 text-left font-mono text-sm">
                  <code className="relative rounded px-2 py-1 text-sm bg-neutral-100 dark:bg-neutral-800">
                    {prop.type}
                  </code>
                </td>}
                {prop.default && <td className="border px-4 py-3 text-left font-mono text-sm">
                  {prop.default ? (
                    <code className="relative rounded px-2 py-1 text-sm bg-neutral-100 dark:bg-neutral-800">
                      {prop.default}
                    </code>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>}
                {prop.description && <td className="border px-4 py-3 text-left text-sm">
                  {prop.description}
                </td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}