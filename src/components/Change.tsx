import { cn } from "@/lib/utils";

export function Change({
  value,
  pct,
  className,
  pill,
}: {
  value?: number | string;
  pct: number;
  className?: string;
  pill?: boolean;
}) {
  const up = pct >= 0;
  const text = `${up ? "▲" : "▼"}${up ? "+" : ""}${pct.toFixed(2)}%`;
  return (
    <span
      className={cn(
        "font-mono tabular-nums text-xs font-medium",
        up ? "text-bull" : "text-bear",
        pill && "rounded-[4px] px-1.5 py-0.5",
        pill && (up ? "bg-bull/15" : "bg-bear/15"),
        className,
      )}
    >
      {value !== undefined && <span className="mr-1">{value}</span>}
      {text}
    </span>
  );
}
