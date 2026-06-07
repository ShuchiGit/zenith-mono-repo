import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { ProjectsClientPage } from '@/components/features/projects/ProjectsClientPage'
import { InlineLoader } from '@/components/common/Loader'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore premium residential projects in Noida, Greater Noida & Ghaziabad. Filter by city, status, and BHK type.',
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Our Projects"
        subtitle="Discover premium residential townships and housing societies across Delhi NCR."
        breadcrumb="Real Estate Projects"
      />
      <Suspense fallback={<InlineLoader />}>
        <ProjectsClientPage />
      </Suspense>
    </>
  )
}
