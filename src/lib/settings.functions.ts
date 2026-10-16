import { createServerFn } from "@tanstack/react-start";

export type Version = "uae" | "egypt";

function safeEqual(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function checkPass(p: string) {
  const expected = process.env.ADMIN_PASSCODE || "2026";
  return safeEqual(String(p ?? ""), expected);
}

export const getActiveVersion = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("site_settings")
      .select("active_version")
      .eq("id", 1)
      .maybeSingle();
    return (data?.active_version === "egypt" ? "egypt" : "uae") as Version;
  } catch {
    return "uae" as Version;
  }
});

export const verifyPasscode = createServerFn({ method: "POST" })
  .inputValidator((d: { passcode: string }) => d)
  .handler(async ({ data }) => ({ ok: checkPass(data.passcode) }));

export const setActiveVersion = createServerFn({ method: "POST" })
  .inputValidator((d: { passcode: string; version: Version }) => {
    if (d.version !== "uae" && d.version !== "egypt") throw new Error("Invalid version");
    return d;
  })
  .handler(async ({ data }) => {
    if (!checkPass(data.passcode)) return { ok: false as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_settings")
      .update({ active_version: data.version, updated_at: new Date().toISOString() })
      .eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
