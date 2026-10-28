import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/ProjectPage/ProjectPage";
import { getProject, projectHref, projects } from "@/data/projects";
import { pageMetadata } from "../../seo";

// Static export: only the slugs listed in data/projects.tsx exist
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => p.kind === "case-study").map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject("case-study", slug);
  if (!project) return { title: "Case Study" };
  return pageMetadata({
    title: `${project.title} | Anisa Aulia`,
    description: typeof project.summary === "string" ? project.summary : undefined,
    path: `/portfolio${projectHref(project)}`,
    image: project.imageSrc,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject("case-study", slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
