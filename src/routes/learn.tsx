import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Search, Lock, Check, Send, X } from "lucide-react";
import { Card } from "@/components/Card";
import { LESSONS, GLOSSARY } from "@/lib/finance-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn Hub — NafaIQ" },
      { name: "description", content: "Learn PSX investing from candlesticks to halal investing — in plain Urdu and English." },
    ],
  }),
  component: Learn,
});

const PRESETS = ["What's a good first stock?", "Explain RSI simply", "Is my portfolio safe?", "What is halal investing?", "How does PSX work?"];

function Learn() {
  const [chat, setChat] = useState(false);
  const [q, setQuery] = useState("");
  const [msgs, setMsgs] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Asalam-o-Alaikum! I'm NafaIQ AI. Ask me anything about PSX, investing, or your money. Try a prompt below 👇" },
  ]);
  const [search, setSearch] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    setMsgs((m) => [
      ...m,
      { role: "user", text },
      { role: "ai", text: "Great question! In short: diversify across sectors, start with blue-chip stocks like HBL or OGDC, never invest money you'll need soon, and always check the signal before buying. Want me to explain any of these in more detail?" },
    ]);
    setQuery("");
  }

  const terms = GLOSSARY.filter((t) => t.en.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Hero */}
      <Card hover={false} className="bg-gradient-to-br from-ai-tint to-surface">
        <h1 className="font-urdu text-2xl text-text-primary">سمجھو، سیکھو، بڑھو</h1>
        <p className="text-sm font-semibold text-text-primary">Samjho, Seekho, Barho</p>
        <p className="mt-1 text-sm text-text-secondary">From KSE basics to technical analysis — in plain Urdu and English.</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="rounded-[4px] bg-elevated px-2 py-1 text-xs text-text-secondary">Beginner Investor · 4 of 8 complete</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-40 overflow-hidden rounded-full bg-elevated"><div className="h-full rounded-full bg-bull" style={{ width: "48%" }} /></div>
            <span className="font-mono text-xs tabular-nums text-text-muted">240 / 500 XP</span>
          </div>
        </div>
      </Card>

      {/* Lessons */}
      <section>
        <h3 className="mb-3 text-sm font-semibold text-text-primary">Lessons</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LESSONS.map((l) => (
            <Card key={l.title} className={cn(l.status === "Locked" && "opacity-60")}>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elevated text-xl">{l.emoji}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">{l.title}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                    <span className="rounded-[4px] bg-elevated px-1.5 py-0.5 text-text-muted">{l.duration}</span>
                    <span className="rounded-[4px] bg-elevated px-1.5 py-0.5 text-text-muted">{l.level}</span>
                  </div>
                </div>
                {l.status === "Complete" && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bull text-bull-foreground"><Check className="h-3.5 w-3.5" /></span>}
                {l.status === "Locked" && <Lock className="h-4 w-4 text-text-muted" />}
              </div>
              {l.status === "In Progress" && (
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-elevated"><div className="h-full rounded-full bg-warning" style={{ width: `${l.progress}%` }} /></div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Glossary */}
      <section>
        <h3 className="mb-3 text-sm font-semibold text-text-primary">Glossary</h3>
        <div className="mb-3 flex items-center gap-2 rounded-[6px] border border-border bg-surface px-3 py-2">
          <Search className="h-4 w-4 text-text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search terms" className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted" />
        </div>
        <div className="space-y-2">
          {terms.map((t) => (
            <details key={t.en} className="group rounded-[8px] border border-border bg-surface p-3">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-text-primary">
                <span>{t.en}</span>
                <span className="font-urdu text-base text-text-secondary">{t.ur}</span>
              </summary>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">{t.def}</p>
            </details>
          ))}
        </div>
      </section>

      {/* AI Tutor button */}
      <button onClick={() => setChat(true)} className="safe-bottom fixed right-4 bottom-20 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-ai text-white shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:brightness-110 lg:bottom-8"><Sparkles className="h-6 w-6" /></button>

      {chat && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setChat(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-surface" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="flex items-center gap-2 text-sm font-semibold text-text-primary"><Sparkles className="h-4 w-4 text-ai" />Ask NafaIQ AI</span>
              <button onClick={() => setChat(false)}><X className="h-5 w-5 text-text-secondary" /></button>
            </div>
            <div className="scrollbar-none flex flex-wrap gap-1.5 border-b border-border p-3">
              {PRESETS.map((p) => (<button key={p} onClick={() => send(p)} className="rounded-full border border-border px-2.5 py-1 text-[11px] text-text-secondary hover:bg-hover">{p}</button>))}
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div key={i} className={cn("max-w-[85%] rounded-[8px] p-2.5 text-sm", m.role === "user" ? "ml-auto bg-bull text-bull-foreground" : "border-l-2 border-ai bg-ai-tint text-text-secondary")}>
                  {m.role === "ai" && <Sparkles className="mb-1 inline h-3 w-3 text-ai" />} {m.text}
                </div>
              ))}
            </div>
            <div className="safe-bottom flex items-center gap-2 border-t border-border p-3">
              <input value={q} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(q)} placeholder="Ask anything…" className="flex-1 rounded-[6px] border border-border bg-elevated px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-muted" />
              <button onClick={() => send(q)} className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-ai text-white"><Send className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
