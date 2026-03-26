import { ArrowUp, DollarSign, Globe, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface cardDetails {
  title: string;
  value: string;
  trend: string;
  positive: boolean;
  icon: React.ReactNode;
  background?: string;
}

const carddata: cardDetails[] = [
  { title: "Last 30 Days", value: "€12,220.64", trend: "+22.2%", positive: true, icon: <DollarSign size={16} className="text-green-500" />, background: "bg-neutral-50/50" },
]


const Card = () => {
  return (
    <div className="w-1/2 gap-2">
      {carddata.map((kpi) => (
        <div key={kpi.title} className="group relative shadow-md rounded ring-black/20 ring-[1px] p-2 overflow-hidden bg-[var(--card-bg)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest leading-none text-[var(--text-secondary)]">{kpi.title}</span>
            <span className={cn(
              "p-1 rounded-sm border flex items-center justify-center",
              kpi.background ? kpi.background : "bg-neutral-200/20 ring-black/20 ring-[1px]"
            )}>
              {kpi.icon}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">{kpi.value}</span>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 flex items-center gap-0.5 rounded",
                kpi.positive ? "bg-green-500 text-white" : "bg-red-500 text-white"
              )}>
                {kpi.positive ? <ArrowUp size={8} strokeWidth={3} /> : <ArrowUp size={8} strokeWidth={3} className="rotate-180" />}
                {kpi.trend}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card

