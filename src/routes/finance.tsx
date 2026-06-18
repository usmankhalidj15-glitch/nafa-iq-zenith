import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Check, Sparkles } from "lucide-react";
import { Card, StatCard } from "@/components/Card";
import { IncomeExpenseChart } from "@/components/charts";
import { fmtPKR } from "@/lib/data";
import { TRANSACTIONS, BUDGETS, BILLS, GOALS, INCOME_EXPENSE } from "@/lib/finance-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Finance — NafaIQ" },
      { name: "description", content: "Track income, expenses, budgets, bills and savings goals with AI guidance." },
    ],
  }),
  component: Finance,
});

const TABS = ["Overview", "Transactions", "Budgets", "Bills", "Goals"] as const;
type Tab = (typeof TABS)[number];

const CAT_COLOR: Record<string, string> = {
  Utilities: "#3b82f6", Income: "#00d4aa", "Food & Dining": "#f59e0b", Transport: "#8b5cf6",
  Groceries: "#00d4aa", Subscriptions: "#ff4d4d", Shopping: "#8b5cf6", Savings: "#6b7280",
};

function Finance() {
  const [tab, setTab] = useState<Tab>("Overview");
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">Personal Finance</h1>
      <div className="scrollbar-none flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("shrink-0 border-b-2 px-3 py-2 text-sm font-medium transition", tab === t ? "border-bull text-bull" : "border-transparent text-text-secondary hover:text-text-primary")}>{t}</button>
        ))}
      </div>

      {tab === "Overview" && <Overview />}
      {tab === "Transactions" && <Transactions />}
      {tab === "Budgets" && <Budgets />}
      {tab === "Bills" && <Bills />}
      {tab === "Goals" && <Goals />}

      {tab === "Transactions" && (
        <button className="safe-bottom fixed right-4 bottom-20 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-bull text-bull-foreground shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:brightness-110 lg:bottom-8"><Plus className="h-6 w-6" /></button>
      )}
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="mb-3 text-sm font-semibold text-text-primary">Income vs Expense (6 months)</h3>
        <IncomeExpenseChart data={INCOME_EXPENSE} />
      </Card>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Income" value={fmtPKR(285000)} />
        <StatCard label="Total Expenses" value={fmtPKR(112050)} />
        <StatCard label="Net Savings" value={fmtPKR(172950)} subColor="text-bull" />
        <Card>
          <div className="text-xs text-text-secondary">Savings Rate</div>
          <div className="mt-2 font-mono text-2xl font-bold tabular-nums text-text-primary">60.7%</div>
          <span className="mt-1 inline-block rounded-[4px] bg-bull/15 px-2 py-0.5 text-[10px] font-semibold text-bull">Excellent</span>
        </Card>
      </div>
    </div>
  );
}

function Transactions() {
  const grouped = TRANSACTIONS.reduce<Record<string, typeof TRANSACTIONS>>((acc, t) => {
    (acc[t.date] ??= []).push(t);
    return acc;
  }, {});
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-[6px] border border-border bg-surface px-3 py-2">
          <Search className="h-4 w-4 text-text-muted" />
          <input placeholder="Search transactions" className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted" />
        </div>
      </div>
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date}>
          <div className="mb-1.5 text-xs font-semibold text-text-muted">{date}</div>
          <Card className="divide-y divide-border/50 p-0" hover={false}>
            {items.map((t, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm" style={{ background: (CAT_COLOR[t.category] ?? "#6b7280") + "26" }}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: CAT_COLOR[t.category] ?? "#6b7280" }} />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-text-primary">{t.merchant}</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                    <span className="rounded-[4px] bg-elevated px-1.5 py-0.5">{t.category}</span>
                    {t.account}
                  </div>
                </div>
                <span className={cn("font-mono text-sm font-medium tabular-nums", t.amount >= 0 ? "text-bull" : "text-bear")}>{t.amount >= 0 ? "+" : "-"}{fmtPKR(Math.abs(t.amount))}</span>
              </div>
            ))}
          </Card>
        </div>
      ))}
    </div>
  );
}

function Budgets() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4 text-sm text-text-secondary">
        <button className="hover:text-text-primary">‹ May</button>
        <span className="font-semibold text-text-primary">June 2025</span>
        <button className="hover:text-text-primary">Jul ›</button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {BUDGETS.map((b) => {
          const pct = Math.round((b.spent / b.limit) * 100);
          const over = b.spent > b.limit;
          const color = over ? "bg-bear" : pct >= 90 ? "bg-warning" : pct >= 80 ? "bg-warning" : "bg-bull";
          return (
            <Card key={b.category}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">{b.category}</span>
                <span className={cn("font-mono text-xs tabular-nums", over ? "text-bear" : "text-text-secondary")}>{fmtPKR(b.spent)} / {fmtPKR(b.limit)}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-elevated">
                <div className={cn("h-full rounded-full", color)} style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              {b.tip && (
                <div className="mt-2 rounded-[6px] border-l-2 border-ai bg-ai-tint px-2.5 py-1.5 text-[11px] text-text-secondary">💡 {b.tip}</div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Bills() {
  return (
    <div className="space-y-3">
      {BILLS.map((b) => (
        <Card key={b.name} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-elevated text-sm font-bold text-text-secondary">{b.name[0]}</div>
          <div className="flex-1">
            <div className="text-sm font-medium text-text-primary">{b.name}</div>
            <div className="text-[11px] text-text-muted">Due {b.due}</div>
          </div>
          <span className="font-mono text-sm font-medium tabular-nums text-text-primary">{fmtPKR(b.amount)}</span>
          <span className={cn("rounded-[4px] px-2 py-0.5 text-[10px] font-semibold", b.status === "DUE SOON" ? "bg-warning/20 text-warning" : "bg-elevated text-text-secondary")}>{b.status}</span>
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-bull text-bull hover:bg-bull/10"><Check className="h-4 w-4" /></button>
        </Card>
      ))}
      <button className="flex w-full items-center justify-center gap-1.5 rounded-[6px] border border-dashed border-border py-3 text-sm font-medium text-text-secondary hover:border-bull hover:text-bull"><Plus className="h-4 w-4" />Add Bill</button>
    </div>
  );
}

function Goals() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {GOALS.map((g) => {
        const pct = Math.round((g.saved / g.target) * 100);
        return (
          <Card key={g.name}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{g.emoji}</span>
              <span className="font-semibold text-text-primary">{g.name}</span>
              <span className="ml-auto font-mono text-sm font-bold tabular-nums text-bull">{pct}%</span>
            </div>
            <div className="mt-2 font-mono text-xs tabular-nums text-text-secondary">Target {fmtPKR(g.target)} · Saved {fmtPKR(g.saved)}</div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-elevated">
              <div className={cn("h-full rounded-full", g.color === "bull" ? "bg-bull" : "bg-warning")} style={{ width: `${pct}%` }} />
            </div>
            {g.date && <div className="mt-2 text-[11px] text-text-muted">Target date: {g.date}</div>}
            <div className="mt-2 rounded-[6px] border-l-2 border-ai bg-ai-tint px-2.5 py-1.5 text-[11px] text-text-secondary"><Sparkles className="mr-1 inline h-3 w-3 text-ai" />{g.ai}</div>
          </Card>
        );
      })}
      <button className="flex min-h-[120px] items-center justify-center gap-1.5 rounded-[8px] border border-dashed border-border text-sm font-medium text-text-secondary hover:border-bull hover:text-bull"><Plus className="h-4 w-4" />Add Goal</button>
    </div>
  );
}
