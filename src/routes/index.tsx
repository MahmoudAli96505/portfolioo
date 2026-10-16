import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  MessageCircle, Mail, Download, MapPin, Phone, Copy, Database, FileSpreadsheet,
  Keyboard, Network, BarChart3, GraduationCap, Languages, Briefcase, IdCard,
} from "lucide-react";
import { getActiveVersion, type Version } from "@/lib/settings.functions";
import { PROFILES, EMAIL, EXPERIENCE, SKILLS } from "@/lib/cv-data";

type Search = { version?: Version };

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const v = String(s["version"] ?? "").toLowerCase();
    return v === "uae" || v === "egypt" ? { version: v } : {};
  },
  loaderDeps: ({ search }) => ({ version: search.version }),
  loader: async ({ deps }) => ({ version: deps.version ?? (await getActiveVersion()) }),
  head: () => ({
    meta: [
      { title: "Mahmoud Ali — Data Entry Specialist & MIS Graduate" },
      { name: "description", content: "Portfolio of Mahmoud Ali: 100+ WPM data entry specialist with a Bachelor's in Management Information Systems." },
      { property: "og:title", content: "Mahmoud Ali — Data Entry Specialist & MIS Graduate" },
      { property: "og:description", content: "Fast, accurate data entry, Microsoft Office and database management. Chat on WhatsApp or download the ATS CV." },
    ],
  }),
  component: Index,
});

function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(to);
    let raf = 0; const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v.toFixed(decimals)}{suffix}</>;
}

const BADGES = [
  { icon: Database, label: "Data", pos: "left-[4%] top-[18%]", delay: "0s" },
  { icon: FileSpreadsheet, label: "Excel", pos: "right-[6%] top-[14%]", delay: "1.2s" },
  { icon: Keyboard, label: "100+ WPM", pos: "left-[8%] bottom-[14%]", delay: "2.1s" },
  { icon: Network, label: "MIS", pos: "right-[10%] bottom-[20%]", delay: "0.6s" },
  { icon: BarChart3, label: "Analytics", pos: "left-1/2 top-[6%]", delay: "1.8s" },
];

function Index() {
  const { version } = Route.useLoaderData();
  const p = PROFILES[version];
  const navigate = useNavigate();
  const [open, setOpen] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        navigate({ to: "/login" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); toast.success("Email copied"); }
    catch { toast.error("Couldn't copy — " + EMAIL); }
  };

  const btn = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition hover:-translate-y-0.5";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <div className="mesh pointer-events-none fixed inset-0 -z-10" aria-hidden />

      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-lg">
        <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="font-mono text-sm font-semibold">MA<span className="text-primary">.</span></a>
          <ul className="hidden gap-6 text-sm text-muted-foreground md:flex">
            {["about", "skills", "experience", "education", "contact"].map((s) => (
              <li key={s}><a className="capitalize hover:text-foreground" href={`#${s}`}>{s}</a></li>
            ))}
          </ul>
          <a href={p.wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-whatsapp px-4 text-sm font-semibold text-primary-foreground">
            <MessageCircle className="h-4 w-4" aria-hidden /> <span className="hidden sm:inline">WhatsApp</span><span className="sm:hidden">Chat</span>
          </a>
        </nav>
      </header>

      <main id="main" ref={mainRef}>
        {/* Hero */}
        <section id="top" className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-16 [perspective:900px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
            {BADGES.map(({ icon: I, label, pos, delay }) => (
              <div key={label} className={`glass float-3d absolute ${pos} flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg shadow-primary/10`} style={{ animationDelay: delay }}>
                <I className="h-5 w-5 text-primary" /> {label}
              </div>
            ))}
          </div>

          <div className="relative z-10 max-w-3xl">
            <p className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden />
              Open to work · {p.flag} {p.location}
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
              Mahmoud <span className="text-gradient">Ali</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Data Entry Specialist & Management Information Systems graduate — fast, precise, and organised with every record.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={p.wa} target="_blank" rel="noopener noreferrer" className={`${btn} bg-whatsapp text-primary-foreground shadow-lg shadow-accent/20`}>
                <MessageCircle className="h-5 w-5" aria-hidden /> Chat on WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`} className={`${btn} glass`}><Mail className="h-5 w-5" aria-hidden /> Email</a>
              <a href={p.cv} download className={`${btn} bg-primary text-primary-foreground`}><Download className="h-5 w-5" aria-hidden /> Download ATS CV ({p.label})</a>
            </div>

            {/* Mobile badges (static, no motion clutter) */}
            <ul className="mt-8 flex flex-wrap gap-2 sm:hidden" aria-label="Focus areas">
              {BADGES.map(({ icon: I, label }) => (
                <li key={label} className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"><I className="h-4 w-4 text-primary" aria-hidden /> {label}</li>
              ))}
            </ul>

            <dl className="mt-12 grid grid-cols-3 gap-3 sm:max-w-xl">
              {[
                { n: <Counter to={100} suffix="+" />, l: "WPM typing" },
                { n: <Counter to={99.8} decimals={1} suffix="%" />, l: "Accuracy" },
                { n: <Counter to={4} suffix="+" />, l: "Years multi-role" },
              ].map((s, i) => (
                <div key={i} className="glass rounded-2xl p-4">
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="font-mono text-2xl font-semibold text-primary sm:text-3xl">{s.n}</dd>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Section id="about" title="Professional Summary" icon={IdCard}>
          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <p className="glass rounded-2xl p-6 leading-relaxed text-muted-foreground">
              A highly motivated and detail-oriented graduate in Management Information Systems with extensive experience in sales, cashiering, customer service, data entry, and supervisory roles. Proven ability to work effectively under pressure, manage tasks with accuracy, and deliver high-quality results. Strong technical skills including Microsoft Office, HTML & CSS, fast typing, and data management.
            </p>
            <dl className="glass space-y-3 rounded-2xl p-6 text-sm">
              <Info k="Location" v={p.location} />
              <Info k="Nationality" v="Egyptian" />
              {p.extras.map((e) => <Info key={e.k} k={e.k} v={e.v} />)}
            </dl>
          </div>
        </Section>

        <Section id="skills" title="Key Competencies" icon={Keyboard}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {SKILLS.map((s) => (
              <li key={s.name} className="glass rounded-2xl p-5">
                <div className="flex justify-between text-sm font-semibold"><span>{s.name}</span><span className="font-mono text-primary">{s.level}%</span></div>
                <div className="mt-3 h-2 rounded-full bg-muted" role="progressbar" aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100} aria-label={s.name}>
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${s.level}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="experience" title="Work Experience" icon={Briefcase}>
          <ol className="relative space-y-4 border-l border-border pl-6">
            {EXPERIENCE.map((e, i) => {
              const isOpen = open === i;
              return (
                <li key={e.company} className="relative">
                  <span aria-hidden className={`absolute -left-[31px] top-5 h-3 w-3 rounded-full ring-4 ring-background ${isOpen ? "bg-primary" : "bg-muted-foreground"}`} />
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`exp-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="glass w-full rounded-2xl p-5 text-left transition hover:border-primary/40"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-semibold">{e.role} · <span className="text-primary">{e.company}</span></span>
                      <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
                    </div>
                    {isOpen && (
                      <ul id={`exp-${i}`} className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        {e.points.map((pt) => <li key={pt}>{pt}</li>)}
                      </ul>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </Section>

        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <section id="education" className="glass scroll-mt-20 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold"><GraduationCap className="h-5 w-5 text-primary" aria-hidden /> Education</h2>
            <p className="mt-4 font-semibold">Bachelor's in Management Information Systems</p>
            <p className="text-muted-foreground">Alexandria University</p>
            <p className="mt-1 font-mono text-sm text-primary">2019 – 2023</p>
          </section>
          <section id="languages" className="glass scroll-mt-20 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold"><Languages className="h-5 w-5 text-primary" aria-hidden /> Languages</h2>
            <ul className="mt-4 space-y-2">
              <li className="flex justify-between"><span>Arabic</span><span className="text-muted-foreground">Native</span></li>
              <li className="flex justify-between"><span>English</span><span className="text-muted-foreground">Intermediate (B1/B2)</span></li>
            </ul>
          </section>
        </div>

        <Section id="contact" title="Let's work together" icon={Mail}>
          <div className="glass grid gap-6 rounded-3xl p-6 sm:p-10 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-muted-foreground">The fastest way to reach me is WhatsApp — I usually reply within minutes.</p>
              <a href={p.wa} target="_blank" rel="noopener noreferrer" className={`${btn} w-full bg-whatsapp text-primary-foreground sm:w-auto`}>
                <MessageCircle className="h-5 w-5" aria-hidden /> Chat on WhatsApp
              </a>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden /><a className="hover:text-primary" href={p.wa} target="_blank" rel="noopener noreferrer">{p.phone}</a></li>
              <li className="flex min-w-0 items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a className="truncate hover:text-primary" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <button type="button" onClick={copyEmail} aria-label="Copy email address" className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass"><Copy className="h-4 w-4" /></button>
              </li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />{p.location}</li>
              <li><a href={p.cv} download className="inline-flex items-center gap-2 text-primary hover:underline"><Download className="h-4 w-4" aria-hidden /> Download ATS CV ({p.label})</a></li>
            </ul>
          </div>
        </Section>
      </main>

      <footer className="py-10 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Mahmoud Ali</footer>
    </div>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return <div><dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd></div>;
}

function Section({ id, title, icon: I, children }: { id: string; title: string; icon: typeof Mail; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <h2 className="mb-8 flex items-center gap-3 font-display text-3xl font-bold sm:text-4xl"><I className="h-7 w-7 text-primary" aria-hidden /> {title}</h2>
      {children}
    </section>
  );
}
