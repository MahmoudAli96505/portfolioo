import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Lock, Check, ExternalLink, Copy, LogOut } from "lucide-react";
import { getActiveVersion, setActiveVersion, verifyPasscode, type Version } from "@/lib/settings.functions";
import { PROFILES } from "@/lib/cv-data";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin — Mahmoud Ali Portfolio" },
      { name: "description", content: "Private admin panel." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin — Mahmoud Ali Portfolio" },
      { property: "og:description", content: "Private admin panel." },
    ],
  }),
  component: Login,
});

function Login() {
  const verify = useServerFn(verifyPasscode);
  const save = useServerFn(setActiveVersion);
  const load = useServerFn(getActiveVersion);
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState<Version | null>(null);

  useEffect(() => { if (authed) load().then(setActive); }, [authed, load]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    const { ok } = await verify({ data: { passcode: pass } });
    setBusy(false); setErr(!ok); setAuthed(ok);
  }

  async function choose(v: Version) {
    setBusy(true);
    try {
      const r = await save({ data: { passcode: pass, version: v } });
      if (r.ok) { setActive(v); toast.success(`${PROFILES[v].label} is now the default`); }
      else toast.error("Session expired, please log in again");
    } catch { toast.error("Couldn't save, try again"); }
    setBusy(false);
  }

  const copy = (v: Version) => {
    const url = `${window.location.origin}/?version=${v}`;
    navigator.clipboard.writeText(url).then(() => toast.success("Link copied"), () => toast.error(url));
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div className="mesh pointer-events-none fixed inset-0 -z-10" aria-hidden />
      {!authed ? (
        <form onSubmit={onSubmit} className="glass w-full max-w-sm space-y-5 rounded-3xl p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15"><Lock className="h-6 w-6 text-primary" aria-hidden /></div>
          <h1 className="text-center text-2xl font-bold">Admin access</h1>
          <label className="block text-sm">
            <span className="text-muted-foreground">Passcode</span>
            <input
              autoFocus type="password" inputMode="numeric" autoComplete="current-password"
              value={pass} onChange={(e) => setPass(e.target.value)}
              aria-invalid={err} aria-describedby={err ? "pass-err" : undefined}
              className="mt-2 h-12 w-full rounded-xl border border-input bg-background/60 px-4 font-mono text-lg tracking-widest outline-none focus:border-primary"
            />
          </label>
          {err && <p id="pass-err" role="alert" className="text-sm text-destructive">Incorrect passcode</p>}
          <button disabled={busy || !pass} className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground disabled:opacity-50">{busy ? "Checking…" : "Unlock"}</button>
          <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-foreground">← Back to portfolio</Link>
        </form>
      ) : (
        <section className="glass w-full max-w-2xl space-y-6 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Profile switcher</h1>
            <button onClick={() => { setAuthed(false); setPass(""); }} className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm text-muted-foreground hover:text-foreground"><LogOut className="h-4 w-4" aria-hidden /> Lock</button>
          </div>
          <p className="text-sm text-muted-foreground">Choose which version visitors see on the main link.</p>
          <div role="radiogroup" aria-label="Default version" className="grid gap-4 sm:grid-cols-2">
            {(Object.keys(PROFILES) as Version[]).map((v) => {
              const pr = PROFILES[v]; const on = active === v;
              return (
                <div key={v} className={`rounded-2xl border p-5 transition ${on ? "border-primary bg-primary/10" : "border-border"}`}>
                  <button role="radio" aria-checked={on} disabled={busy} onClick={() => choose(v)} className="w-full text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">{pr.flag} {pr.label}</span>
                      {on && <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground"><Check className="h-3 w-3" aria-hidden /> Live</span>}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{pr.location}<br />{pr.phone}</p>
                  </button>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <button onClick={() => copy(v)} className="inline-flex min-h-9 items-center gap-1 rounded-full glass px-3"><Copy className="h-3 w-3" aria-hidden /> Copy link</button>
                    <a href={`/?version=${v}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-1 rounded-full glass px-3"><ExternalLink className="h-3 w-3" aria-hidden /> Preview</a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
