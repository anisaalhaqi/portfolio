import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/ProjectPage/ProjectPage";
import { getProject, projects } from "@/data/projects";

// Static export: only the slugs listed in data/projects.tsx exist
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => p.kind === "ui").map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject("ui", slug);
  return { title: project ? `${project.title} | Anisa Aulia` : "UI Design" };
}

export default async function UIDesignPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject("ui", slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
