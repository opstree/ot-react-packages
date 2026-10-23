import React from "react";
import MultiViewCard from "../components/docs/MultiViewCard";
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Users, DollarSign } from "lucide-react";

export default function MultiViewCardUsage() {
  const pieData = [
    { label: "Enterprise", value: "$21,712", percentage: 45, color: "#3b82f6" },
    { label: "Pro Plan", value: "$14,475", percentage: 30, color: "#10b981" },
    { label: "Starter", value: "$7,238", percentage: 15, color: "#f59e0b" },
    { label: "Add-ons", value: "$4,825", percentage: 10, color: "#8b5cf6" },
  ];

  // Circle circumference for r=50 is 2 * PI * 50 ≈ 314.16
  const circumference = 314.16;
  let accumulatedOffset = 0;

  const views = [
    {
      key: "barchart",
      label: "Bar Chart",
      icon: <BarChart3 size={14} />,
      render: () => (
        <div className="h-[240px] flex flex-col justify-between py-1">
          {/* Top 3 KPI mini-cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-800">
              <span className="text-[11px] text-slate-500 dark:text-neutral-400">Total Revenue</span>
              <p className="text-lg font-bold text-slate-900 dark:text-neutral-100 mt-0.5">$48,250</p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 font-medium mt-0.5">
                <TrendingUp size={11} /> +14.2%
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-800">
              <span className="text-[11px] text-slate-500 dark:text-neutral-400">Active Users</span>
              <p className="text-lg font-bold text-slate-900 dark:text-neutral-100 mt-0.5">2,420</p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 font-medium mt-0.5">
                <Users size={11} /> +8.1%
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-800">
              <span className="text-[11px] text-slate-500 dark:text-neutral-400">Avg. Order</span>
              <p className="text-lg font-bold text-slate-900 dark:text-neutral-100 mt-0.5">$128.50</p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 font-medium mt-0.5">
                <DollarSign size={11} /> +3.4%
              </span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-neutral-800/40 border border-slate-100 dark:border-neutral-800">
            <div className="flex items-end justify-between h-24 gap-2 pt-2 px-1">
              {[45, 68, 52, 85, 62, 92, 78, 95].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    style={{ height: `${val}%` }}
                    className="w-full bg-blue-500/80 hover:bg-blue-600 rounded-t transition-all duration-200"
                  />
                  <span className="text-[9px] text-slate-400 font-mono">D{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "piechart",
      label: "Pie Chart",
      icon: <PieChartIcon size={14} />,
      render: () => (
        <div className="h-[240px] flex items-center justify-center gap-8 py-1 px-4">
          {/* SVG Donut Chart */}
          <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              {pieData.map((item, index) => {
                const strokeLength = (item.percentage / 100) * circumference;
                const strokeDasharray = `${strokeLength} ${circumference - strokeLength}`;
                const strokeDashoffset = -accumulatedOffset;
                accumulatedOffset += strokeLength;

                return (
                  <circle
                    key={index}
                    cx="60"
                    cy="60"
                    r="50"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="14"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-300 hover:opacity-85"
                  />
                );
              })}
            </svg>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-medium uppercase tracking-wider">
                Total
              </span>
              <span className="text-base font-bold text-slate-900 dark:text-neutral-100">
                $48.2k
              </span>
            </div>
          </div>

          {/* Legend and breakdown */}
          <div className="flex flex-col gap-2.5 flex-1 max-w-[240px]">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600 dark:text-neutral-300 font-medium">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[11px] font-mono">
                    {item.percentage}%
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-neutral-100 font-mono text-[11px]">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <MultiViewCard
        title="Performance Overview"
        subtitle="Consolidated metrics and revenue breakdown for the current quarter"
        views={views}
        defaultView="barchart"
        activeColor="blue"
        contentClassName="min-h-[240px] flex flex-col justify-center"
      />
    </div>
  );
}
