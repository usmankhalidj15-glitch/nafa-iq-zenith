import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Apple,
  Download,
  Play,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Bot,
  Check,
  Star,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { TICKER_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NafaIQ — Pakistan's Most Intelligent Financial Terminal" },
      {
        name: "description",
        content:
          "PSX trading terminal, personal finance manager and AI wealth advisor built for Pakistani investors. Install free as a web app on iOS, Android & desktop.",
      },
      { property: "og:title", content: "NafaIQ — Pakistan's Most Intelligent Financial Terminal" },
      {
        property: "og:description",
        content:
          "PSX terminal + personal finance + AI wealth advisor. Built for Pakistani investors who demand more than charts.",
      },
    ],
  }),
  component: Landing,
});

const STORE_TOAST =
  "Coming soon to app stores! Use the Web App for now — it installs to your home screen just like a native app.";

function StoreButtons({ size = "md" }: { size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", big && "sm:justify-center")}>
      <button
        onClick={() => toast(STORE_TOAST)}
        className="flex items-center gap-3 rounded-[10px] bg-white px-5 py-3 text-left text-black transition hover:brightness-95"
      >
        <Apple className="h-7 w-7 shrink-0" />
        <span className="flex flex-col leading-tight">
          <span className="text-[11px]">Download on the</span>
          <span className="text-base font-bold">App Store</span>
        </span>
      </button>
      <button
        onClick={() => toast(STORE_TOAST)}
        className="flex items-center gap-3 rounded-[10px] bg-white px-5 py-3 text-left text-black transition hover:brightness-95"
      >
        <Play className="h-7 w-7 shrink-0 fill-bull text-bull" />
        <span className="flex flex-col leading-tight">
          <span className="text-[11px]">Get it on</span>
          <span className="text-base font-bold">Google Play</span>
        </span>
      </button>
      <Link
        to="/app"
        className="flex items-center gap-3 rounded-[10px] border border-bull bg-gradient-to-r from-[#00d4aa] to-[#00a88a] px-6 py-3.5 text-left text-bull-foreground shadow-[0_8px_30px_rgba(0,212,170,0.3)] transition hover:brightness-110"
      >
        <Download className="h-7 w-7 shrink-0" />
        <span className="flex flex-col leading-tight">
          <span className="text-[11px]">Install as</span>
          <span className="text-lg font-bold">Web App (Free)</span>
        </span>
      </Link>
    </div>
  );
}

function TickerStrip() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-3">
      <div className="flex w-max animate-[ticker_40s_linear_infinite] gap-8 whitespace-nowrap px-4">
        {items.map((it, i) => (
          <span key={i} className="flex items-center gap-2 text-sm">
            <span className="font-medium text-text-secondary">{it.label}</span>
            <span className="font-mono tabular-nums text-text-primary">{it.value}</span>
            <span className={cn("font-mono tabular-nums", it.pct >= 0 ? "text-bull" : "text-bear")}>
              {it.pct >= 0 ? "▲+" : "▼"}
              {it.pct.toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function MatrixRain() {
  const symbols = ["HBL", "ENGRO", "LUCK", "OGDC", "KSE-100", "+2.41%", "-0.45%", "UBL", "POL", "+1.24%"];
  const cols = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05]">
      {cols.map((_, c) => (
        <div
          key={c}
          className="absolute top-0 font-mono text-xs text-bull"
          style={{
            left: `${(c / 14) * 100}%`,
            animation: `matrix-fall ${18 + (c % 6) * 4}s linear ${c * 1.3}s infinite`,
          }}
        >
          {Array.from({ length: 10 }).map((__, r) => (
            <div key={r} className="py-2">
              {symbols[(c + r) % symbols.length]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[280px]">
      {/* floating top card */}
      <div className="absolute -top-6 -left-6 z-20 animate-[bob_3s_ease-in-out_infinite] rounded-[12px] border border-bull bg-surface px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <div className="text-[11px] font-medium text-text-primary">
          📈 KSE-100 <span className="font-mono text-text-primary">78,542</span>{" "}
          <span className="font-mono text-bull">+1.24%</span>
        </div>
      </div>
      {/* floating bottom card */}
      <div className="absolute -bottom-6 -right-4 z-20 animate-[bob_3s_ease-in-out_1.5s_infinite] rounded-[12px] border border-warning bg-surface px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <div className="text-[11px] font-medium text-warning">🛡️ Real Wealth: $15,395</div>
      </div>

      <div
        className="relative rotate-[5deg] rounded-[40px] border-[3px] border-[#2a2a40] bg-[#1a1a2e] p-2.5 shadow-[0_30px_80px_-20px_rgba(0,212,170,0.45)]"
      >
        <div className="overflow-hidden rounded-[32px] bg-background">
          {/* mini dashboard */}
          <div className="space-y-2.5 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-bull">NafaIQ</span>
              <span className="h-5 w-5 rounded-full bg-bull/20" />
            </div>
            <div className="rounded-[8px] border border-l-2 border-l-ai border-border bg-ai-tint p-2">
              <div className="text-[8px] font-semibold text-text-primary">Today's AI Insight</div>
              <div className="mt-1 h-1 w-full rounded bg-elevated" />
              <div className="mt-1 h-1 w-2/3 rounded bg-elevated" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Net Worth", "4.28M", "text-bull"],
                ["Portfolio", "858K", "text-bull"],
              ].map(([l, v, c]) => (
                <div key={l} className="rounded-[8px] border border-border bg-surface p-2">
                  <div className="text-[7px] text-text-muted">{l}</div>
                  <div className={cn("font-mono text-sm font-bold", c)}>{v}</div>
                </div>
              ))}
            </div>
            <div className="rounded-[8px] border border-border bg-surface p-2">
              <div className="text-[8px] text-text-muted">KSE-100</div>
              <div className="font-mono text-base font-bold text-text-primary">78,542.10</div>
              <div className="mt-1.5 flex h-12 items-end gap-1">
                {[40, 55, 35, 70, 50, 80, 65, 90, 75, 95].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-bull/70"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: BarChart3,
    chip: "bg-bull/20 text-bull",
    title: "PSX Trading Terminal",
    desc: "Candlestick charts, heatmaps, top movers, AI signals — the first Bloomberg-grade PSX terminal on your phone.",
  },
  {
    icon: ShieldCheck,
    chip: "bg-warning/20 text-warning",
    title: "Haqeeqi Daulat™ Engine",
    desc: "See your REAL wealth after PKR devaluation. Pakistan's first devaluation-adjusted portfolio intelligence.",
    badge: "World First",
  },
  {
    icon: Bot,
    chip: "bg-ai/20 text-ai",
    title: "AI Financial Advisor",
    desc: "Personalized insights, AI-generated portfolio reports, and a 24/7 finance tutor — powered by Claude AI.",
  },
  {
    icon: () => <span className="text-lg">🕋</span>,
    chip: "bg-bull/20 text-bull",
    title: "Built for Muslim Investors",
    desc: "Halal stock screening, Zakat calculator, Islamic savings goals — finance aligned with your values.",
  },
  {
    icon: () => <span className="text-lg">💼</span>,
    chip: "bg-info/20 text-info",
    title: "Complete Finance Manager",
    desc: "Track income, expenses, budgets, bills, and goals — all in one place, in Pakistani Rupees.",
  },
  {
    icon: () => <span className="text-lg">📚</span>,
    chip: "bg-warning/20 text-warning",
    title: "Financial Education",
    desc: "Beginner to advanced courses in Urdu and English. Earn XP. Build real investing knowledge.",
  },
] as const;

const TESTIMONIALS = [
  {
    initials: "AK",
    color: "bg-bull/20 text-bull",
    name: "Ahmed Khan, Karachi",
    role: "PSX investor since 2018",
    quote:
      "Finally an app that shows me my REAL returns, not just the nominal PSX number. The Haqeeqi Daulat feature opened my eyes.",
  },
  {
    initials: "SF",
    color: "bg-ai/20 text-ai",
    name: "Sara Farooq, Lahore",
    role: "New to investing",
    quote:
      "The Learn Hub and AI tutor helped me understand PSX from scratch. The Urdu glossary is brilliant.",
  },
  {
    initials: "MR",
    color: "bg-warning/20 text-warning",
    name: "Muhammad Raza, Islamabad",
    role: "Finance professional",
    quote:
      "The sector heatmap and AI signals are at a level I've only seen on Bloomberg Terminal. Remarkable for a Pakistani app.",
  },
] as const;

function useCountUp(target: number, run: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return val;
}

function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const users = useCountUp(12000, run);
  const tracked = useCountUp(2.4, run);
  const rating = useCountUp(4.8, run);
  return (
    <div ref={ref} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {[
        [`${Math.round(users).toLocaleString()}+`, "Active Users"],
        [`PKR ${tracked.toFixed(1)}B+`, "Tracked"],
        [`${rating.toFixed(1)}★`, "Average Rating"],
      ].map(([v, l]) => (
        <div key={l} className="text-center">
          <div className="font-mono text-3xl font-bold tabular-nums text-bull sm:text-4xl">{v}</div>
          <div className="mt-1 text-sm text-text-secondary">{l}</div>
        </div>
      ))}
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen scroll-smooth bg-background text-text-primary">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="NafaIQ" width={26} height={26} className="rounded-[6px]" />
            <span className="text-lg font-bold tracking-tight text-bull">NafaIQ</span>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6">
            <a href="#features" className="hidden text-sm text-text-secondary transition hover:text-text-primary sm:inline">
              Features
            </a>
            <a href="#download" className="hidden text-sm text-text-secondary transition hover:text-text-primary sm:inline">
              Download
            </a>
            <Link
              to="/app"
              className="inline-flex items-center gap-1 rounded-full bg-bull px-4 py-1.5 text-sm font-semibold text-bull-foreground transition hover:brightness-110"
            >
              Enter App <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[40vh]"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(0,212,170,0.18), rgba(0,212,170,0) 70%)",
          }}
        />
        <MatrixRain />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-5 lg:py-24">
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-bull/20 bg-bull/10 px-3 py-1 text-xs font-medium text-bull">
              🇵🇰 Built for Pakistan's Investors
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
              Pakistan's Most{" "}
              <span className="relative inline-block text-bull">
                Intelligent
                <span className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-bull/60" />
              </span>{" "}
              Financial Terminal
            </h1>
            <p className="mt-5 max-w-[480px] text-base text-text-secondary sm:text-lg">
              PSX trading terminal + personal finance manager + AI wealth advisor. Built for
              Pakistani investors who demand more than just charts.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">🛡️ Halal Finance Ready</span>
              <span className="flex items-center gap-1.5">📊 Real PSX Data</span>
              <span className="flex items-center gap-1.5">🤖 AI-Powered</span>
            </div>
            <div className="mt-8">
              <StoreButtons />
            </div>
            <p className="mt-4 text-xs text-text-muted">
              ✓ No account required to explore&nbsp;&nbsp; ✓ Works on iOS, Android &amp; Desktop
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-secondary">
              Made in Pakistan 🇵🇰
            </span>
          </div>
          <div className="lg:col-span-2">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <TickerStrip />

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-widest text-bull">EVERYTHING YOU NEED</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            One App. Complete Financial Intelligence.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon as React.ElementType;
            return (
              <div
                key={f.title}
                className="group rounded-[12px] border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-bull hover:shadow-[0_12px_40px_-12px_rgba(0,212,170,0.35)]"
              >
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", f.chip)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <h3 className="font-semibold text-text-primary">{f.title}</h3>
                  {"badge" in f && f.badge && (
                    <span className="rounded-full bg-bull/15 px-2 py-0.5 text-[10px] font-semibold text-bull">
                      {f.badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HAQEEQI DAULAT SPOTLIGHT */}
      <section className="relative overflow-hidden border-y border-border bg-surface-alt">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2"
          style={{
            background:
              "radial-gradient(60% 80% at 0% 50%, rgba(245,158,11,0.12), rgba(245,158,11,0) 70%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold tracking-widest text-warning">WORLD-FIRST FEATURE</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              The Truth About
              <br />
              <span className="text-warning">Your PKR Gains</span>
            </h2>
            <p className="mt-5 max-w-[520px] text-text-secondary">
              Most Pakistani investors don't realize their PSX gains are partly an illusion. When PKR
              devalues 16% in a year, a 12% PSX gain means you're actually poorer in real terms.
              NafaIQ is the first app in the world to show you the complete picture.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Devaluation-adjusted portfolio returns in USD, AED, SAR",
                "Your Devaluation Shield Score with actionable recommendations",
                '"What if" comparison: PSX vs USD cash vs Gold',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/app"
              className="mt-8 inline-flex items-center gap-1.5 rounded-[6px] border border-warning px-5 py-2.5 text-sm font-semibold text-warning transition hover:bg-warning/10"
            >
              See Haqeeqi Daulat <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-[16px] border border-border bg-surface p-6 shadow-card">
            <div className="text-xs font-semibold tracking-widest text-text-muted">YOUR PORTFOLIO</div>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="text-center">
                <div className="text-[11px] text-text-muted">NOMINAL</div>
                <div className="mt-1 font-mono text-2xl font-bold text-bull sm:text-3xl">+12.73%</div>
                <div className="text-[11px] text-text-secondary">PKR</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold tracking-widest text-warning">THE GAP</span>
                <span className="h-16 w-px bg-gradient-to-b from-transparent via-warning to-transparent shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
              </div>
              <div className="text-center">
                <div className="text-[11px] text-text-muted">REAL</div>
                <div className="mt-1 font-mono text-2xl font-bold text-bear sm:text-3xl">-3.2%</div>
                <div className="text-[11px] text-text-secondary">USD</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Trusted by Pakistani Investors
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.initials} className="rounded-[12px] border border-border bg-surface p-6">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-full font-semibold", t.color)}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">{t.name}</div>
                  <div className="text-xs text-text-muted">{t.role}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">"{t.quote}"</p>
            </div>
          ))}
        </div>
        <div className="mt-16">
          <StatsStrip />
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section id="download" className="border-y border-border bg-[#0D1421]">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start Managing Your Wealth Today
          </h2>
          <p className="mt-3 text-text-secondary">
            Free forever. No credit card. No account required to explore.
          </p>
          <div className="mt-8">
            <StoreButtons size="lg" />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-text-secondary">
            <span>🍎 iOS 14+</span>
            <span>🤖 Android 8+</span>
            <span>💻 All Browsers</span>
            <span>📲 Installable PWA</span>
          </div>
          <p className="mx-auto mt-4 max-w-md text-xs text-text-muted">
            Download the PWA instantly — works like a native app, saves to your home screen, and
            works offline.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-t-bull bg-[#070B14]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img src={logo} alt="NafaIQ" width={26} height={26} className="rounded-[6px]" />
              <span className="text-lg font-bold tracking-tight text-bull">NafaIQ</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-text-secondary">
              Pakistan's Financial Intelligence Terminal
            </p>
            <div className="mt-4 flex gap-3">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition hover:border-bull hover:text-bull"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-text-primary">App</div>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              <li><Link to="/app" className="transition hover:text-bull">Dashboard</Link></li>
              <li><Link to="/psx" className="transition hover:text-bull">PSX Market</Link></li>
              <li><Link to="/portfolio" className="transition hover:text-bull">Portfolio</Link></li>
              <li><Link to="/finance" className="transition hover:text-bull">Finance</Link></li>
              <li><Link to="/learn" className="transition hover:text-bull">Learn Hub</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-text-primary">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="transition hover:text-bull">About</a></li>
              <li><a href="#" className="transition hover:text-bull">Privacy Policy</a></li>
              <li><a href="#" className="transition hover:text-bull">Terms</a></li>
              <li><a href="#" className="transition hover:text-bull">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 NafaIQ. Built in Pakistan 🇵🇰</span>
            <span>Made with ❤️ for Pakistani investors</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
