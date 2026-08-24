"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface HeadingProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  tooltip?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  divider?: boolean;
}

const sizeStyles = {
  sm: {
    title: "text-base font-semibold text-[#1a1a2e]",
    subtitle: "text-xs text-[#8b91a8] font-normal mt-1",
    icon: "size-5",
    gap: "gap-2",
  },
  md: {
    title: "text-lg font-bold text-[#1a1a2e]",
    subtitle: "text-sm text-[#8b91a8] font-normal mt-1.5",
    icon: "size-6",
    gap: "gap-3",
  },
  lg: {
    title: "text-xl font-bold text-[#1a1a2e]",
    subtitle: "text-base text-[#8b91a8] font-normal mt-2",
    icon: "size-7",
    gap: "gap-4",
  },
};

export function Heading({
  title,
  subtitle,
  icon,
  tooltip,
  className,
  size = "md",
  divider = false,
}: HeadingProps) {
  const styles = sizeStyles[size];

  return (
    <div className={cn("flex items-start mt-2", styles.gap, className)}>
      {icon && (
        <span className={cn("flex-shrink-0 text-[#6b7280] mt-0.5", styles.icon)}>
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <span className={cn(styles.title, "truncate")}>{title}</span>
          {tooltip && (
            <span className="cursor-help text-[#8b91a8] hover:text-[#1a1a2e] transition-colors" title={tooltip}>
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          )}
        </div>
        {subtitle && (
          <p className={cn(styles.subtitle, "truncate text-sm text-neutral-500 font-medium text-balance")}>{subtitle}</p>
        )}
      </div>
      {divider && <div className="w-full h-px bg-[#e0e4ef] mt-4" />}
    </div>
  );
}

export function SectionHeading({
  title,
  subtitle,
  className,
  action,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4 flex-wrap", className)}>
      <div>
        <h3 className="text-lg font-semibold text-[#1a1a2e] tracking-tight">{title}</h3>
        {subtitle && (
          <p className="text-sm text-[#8b91a8] font-normal mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0 mt-1">{action}</div>}
    </div>
  );
}

export function PageHeading({
  title,
  subtitle,
  className,
  badge,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] tracking-tight">{title}</h1>
        {badge}
      </div>
      {subtitle && (
        <p className="text-lg text-[#8b91a8] font-normal max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}