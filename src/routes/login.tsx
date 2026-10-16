import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PROFILES } from "@/lib/cv-data";
import type { Version } from "@/lib/settings.functions";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Portfolio links — Mahmoud Ali" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div className="mesh pointer-events-none fixed inset-0 -z-10" aria-hidden />
      <section className="glass w-full max-w-xl space-y-6 rounded-3xl p-6 sm:p-8">
        <div>
          <h1 className="text-2xl font-bold">Portfolio links</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The GitHub Pages version uses the UAE profile by default. Choose a country to open or share its portfolio link.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {(Object.keys(PROFILES) as Version[]).map((version) => (
            <Link
              key={version}
              to="/"
              search={{ version }}
              className="glass rounded-2xl p-5 transition hover:border-primary/40"
            >
              <span className="text-lg font-semibold">{PROFILES[version].flag} {PROFILES[version].label}</span>
              <span className="mt-2 block text-sm text-muted-foreground">{PROFILES[version].location}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                Open profile <ExternalLink className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
        <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-foreground">
          Back to portfolio
        </Link>
      </section>
    </main>
  );
}
