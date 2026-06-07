import type { Metadata } from 'next'
import { HeroSection } from '@/components/features/home/HeroSection'
import { AboutSection } from '@/components/features/home/AboutSection'
import { PostPropertyCTA } from '@/components/features/home/PostPropertyCTA'
import { VideoInsightsSection } from '@/components/features/home/VideoInsightsSection'
import { SeoFooterLinks } from '@/components/features/home/SeoFooterLinks'
import { ProjectCard } from '@/components/features/projects/ProjectCard'
import { getFeaturedProjects } from '@/services/projectService'
import { getSettings } from '@/services/settingsService'
import { getVideos } from '@/services/videoService'
import Link from 'next/link'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Zenith Estate — Premium Real Estate in Delhi NCR',
  description:
    'Find your dream home in Noida, Greater Noida & Ghaziabad. Explore premium residential projects, ready-to-move flats, and new launches with Zenith Estate.',
}

export default async function HomePage() {
  const [projectsRes, settingsRes, videosRes] = await Promise.allSettled([
    getFeaturedProjects(),
    getSettings(),
    getVideos(),
  ])

  const featuredProjects = projectsRes.status === 'fulfilled' ? projectsRes.value.data : []
  const settings = settingsRes.status === 'fulfilled' ? settingsRes.value.data : null
  const videos = videosRes.status === 'fulfilled' ? videosRes.value.data : []

  return (
    <>
      <HeroSection settings={settings} />
      <AboutSection settings={settings} />

      {featuredProjects.length > 0 && (
        <section className="section-padding bg-[#edf6f9]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <p className="text-[#e29578] text-sm font-semibold uppercase tracking-widest mb-2">
                  Featured
                </p>
                <h2 className="section-title mb-0">Premium Projects</h2>
              </div>
              <Link href="/projects" className="btn-secondary text-sm shrink-0">
                View All Projects
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      <PostPropertyCTA />
      <VideoInsightsSection videos={videos} />
      <SeoFooterLinks />
    </>
  )
}
