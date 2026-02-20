import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

export function DocsTable({ headers, rows, className }: { headers: string[], rows: React.ReactNode[][], className?: string }) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn(
          "w-full text-left text-sm border-collapse",
          className
        )}
      >
        <thead>
          <tr className="border-b border-border/50">
            {headers.map((header, i) => (
              <th key={i} className="py-3 px-4 font-semibold text-foreground/80 first:pl-0">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-muted/30 transition-colors">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-3 px-4 first:pl-0 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DocsPreview({
  children,
  className,
  inset = false,
}: { children: React.ReactNode, className?: string, inset?: boolean }) {
  return (
    <div
      className={cn(
        "w-full flex justify-center rounded-xl mt-6 border border-border/50 bg-muted/20 backdrop-blur-sm",
        inset ? "p-0" : "py-12 px-6",
        className
      )}
    >
      <div className="w-full max-w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export function Overview({
  title,
  description,
  className,
}: { title?: string, description?: string, className?: string }) {
  return (
    <div
      className={cn(
        "w-full rounded-xl p-6 my-6 border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm",
        className
      )}
    >
      {title && (
        <h2 className="text-2xl font-bold mb-3 text-foreground">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
