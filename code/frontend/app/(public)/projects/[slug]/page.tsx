import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/services/projectService'
import { ProjectDetailClient } from '@/components/features/projects/ProjectDetailClient'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const res = await getProjectBySlug(slug)
    const project = res.data
    return {
      title: project.metaTitle || project.name,
      description: project.metaDesc || project.description || `${project.name} — Premium project in ${project.city}`,
    }
  } catch {
    return { title: 'Project Details' }
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  let project = null
  try {
    const res = await getProjectBySlug(slug)
    project = res.data
  } catch {
    notFound()
  }

  if (!project) notFound()

  return <ProjectDetailClient project={project} />
}
