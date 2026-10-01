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
    title: "Paper title",
    summary: "One sentence on what you researched and what you found.",
  },
  {
    type: "Data",
    title: "Data analysis title",
    summary: "One sentence on the data you worked with and the insight it revealed.",
  },
  {
    type: "Code",
    title: "Project name",
    summary: "One sentence on what you built and who it’s for.",
  },
];
