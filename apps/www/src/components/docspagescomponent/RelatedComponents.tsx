"use client";

import { Badge } from "@workspace/ui/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@workspace/ui/components/ui/tooltip";
import { Link } from "react-router-dom";
import { cn } from "@workspace/ui/lib/utils";

interface RelatedComponent {
  name: string;
  href: string;
  description: string;
}

interface RelatedComponentsProps {
  components: RelatedComponent[];
  className: string
}

export function RelatedComponents({ components, className }: RelatedComponentsProps) {
  return (
    <TooltipProvider>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }} className={cn(className)}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {components.map((comp) => (
            <Tooltip key={comp.name}>
              <TooltipTrigger asChild>
                <Link
                  to={comp.href}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Badge className={cn("cursor-pointer transition-colors shadow-xs bg-[var(--background)] text-[var(--text-primary-color)] border border-[var(--border)] hover:bg-[var(--background)] hover:text-[var(--text-primary-color)]")}>
                    {comp.name}
                  </Badge>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                {comp.description}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}