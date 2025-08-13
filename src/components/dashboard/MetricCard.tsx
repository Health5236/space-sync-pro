
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon: LucideIcon;
  className?: string;
}

const MetricCard = ({ title, value, change, icon: Icon, className }: MetricCardProps) => {
  return (
    <div className={cn("metric-card animate-fade-in", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {change && (
            <p className={cn("text-sm mt-1", {
              "metric-trend-up": change.trend === "up",
              "metric-trend-down": change.trend === "down",
              "text-muted-foreground": change.trend === "neutral",
            })}>
              {change.value}
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
