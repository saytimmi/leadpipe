const SESSION_KEY = "lp_sid";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

function getUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
  };
}

async function send(endpoint: string, payload: Record<string, unknown>) {
  try {
    await fetch(`/api/analytics/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: getSessionId(), ...payload }),
    });
  } catch {
    // analytics should never break the site
  }
}

/** Track page view — call once on mount */
export function trackPageView() {
  send("pageview", {
    referrer: document.referrer || undefined,
    user_agent: navigator.userAgent,
    ...getUtmParams(),
  });
}

/** Track section becoming visible */
export function trackSectionView(section: string) {
  send("section", { section });
}

/** Track section time spent (on unmount / section leave) */
export function trackSectionTime(section: string, time_spent_ms: number) {
  if (time_spent_ms < 500) return; // ignore glances
  send("section-time", { section, time_spent_ms });
}

/** Track form events */
export function trackFormEvent(event: string, step_name?: string, value?: string) {
  send("form", { event, step_name, value });
}
