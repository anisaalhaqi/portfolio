// Supporting work shown as a compact list on the home page: each row links
// straight to its source (PDF/DOI, notebook or dashboard, GitHub or demo).
export interface OtherWork {
  type: "Paper" | "Data" | "Code";
  title: string;
  summary: string;
  // Leave empty until the link is ready; the row then shows as not clickable
  href?: string;
}

export const otherWork: OtherWork[] = [
  {
    type: "Paper",
    title:
      "Implementation of HMAC-SHA256 and Timestamp Nonce in REST API Headers to Mitigate Man-in-the-Middle and Replay Attacks in Financial Log Extraction",
    summary:
      "A security scheme for APIs that share bank transaction logs with third-party apps. On a FastAPI and PostgreSQL mock server, it blocked all 100 tampered and all 100 replayed requests while adding about 2.6 ms per request.",
    href: "https://informatika.stei.itb.ac.id/~rinaldi.munir/Kriptografi-dan-Koding/2025-2026/Makalah2026/Implementation%20of%20HMAC-SHA256%20and%20Timestamp%20Nonce%20in%20REST%20API%20Headers%20to%20Mitigate%20Man-in-the-Middle%20and%20Replay%20Attacks%20in%20Financial%20Log%20Extraction.pdf",
  },
  {
    type: "Data",
    title: "Losing the Digital Race: Were We Even Ready?",
    summary:
      "A Tableau dashboard on why Indonesia lags in digital competitiveness. Readiness data for 63 countries and 38 provinces points to people, governance, and digital empowerment, not technology. 3rd place out of 400+ teams at COMPFEST 18.",
    href: "https://public.tableau.com/app/profile/riko.giovanni/viz/1stLombaBareng/Dashboard1OLD2",
  },
];
