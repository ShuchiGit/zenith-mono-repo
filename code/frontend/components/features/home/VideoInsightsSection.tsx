import type { Video } from '@/types'
import { Play, Eye, Clock } from 'lucide-react'

interface VideoInsightsSectionProps {
  videos: Video[]
}

export function VideoInsightsSection({ videos }: VideoInsightsSectionProps) {
  if (!videos || videos.length === 0) return null

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#e29578] text-sm font-semibold uppercase tracking-widest mb-3">
            Video Insights
          </p>
          <h2 className="section-title text-4xl">Market Insights & Property Tours</h2>
          <p className="text-gray-500 max-w-xl mx-auto mt-3">
            Explore our video library for expert market analysis, property walkthroughs, and buying
            guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(0, 6).map((video) => (
            <a
              key={video.id}
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card rounded-2xl overflow-hidden hover:shadow-[0_12px_40px_rgba(0,109,119,0.15)] transition-all duration-300"
            >
              <div className="relative aspect-video bg-[#003338]">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#006d77]/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-heading text-base text-[#003338] mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  {video.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {video.views}
                    </span>
                  )}
                  {video.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {video.duration}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
