'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, BedDouble, Building2, Shield, ChevronLeft, ChevronRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { submitEnquiry } from '@/services/enquiryService'
import { getStatusLabel, getStatusBadgeClass, formatPriceRange } from '@/lib/utils'
import type { Project } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  phone: z.string().min(10, 'Valid phone required'),
  email: z.string().email('Valid email').optional().or(z.literal('')),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"%3E%3Crect fill="%23edf6f9" width="800" height="500"/%3E%3Ctext fill="%2383c5be" font-size="60" text-anchor="middle" x="400" y="265"%3E🏢%3C/text%3E%3C/svg%3E'

interface ProjectDetailClientProps {
  project: Project
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [imgIdx, setImgIdx] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const images = project.images?.length ? project.images : [PLACEHOLDER]

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      await submitEnquiry({
        ...data,
        source: 'project_detail',
        projectId: project.id,
      })
      setSubmitted(true)
      reset()
    } catch {
      // error handled silently; toast via parent can be wired if needed
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#006d77] transition-colors mb-6">
        <ChevronLeft className="w-4 h-4" /> Back to Projects
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative rounded-2xl overflow-hidden bg-[#edf6f9] aspect-[16/9]">
            <img
              src={images[imgIdx]}
              alt={`${project.name} image ${imgIdx + 1}`}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white scale-125' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
            <div className="absolute top-4 left-4">
              <span className={getStatusBadgeClass(project.status)}>
                {getStatusLabel(project.status)}
              </span>
            </div>
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === imgIdx ? 'border-[#006d77]' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="glass-card rounded-2xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="font-heading text-3xl text-[#006d77] mb-2">{project.name}</h1>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 text-[#83c5be]" />
                  {project.location}, {project.city}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-0.5">Price Range</p>
                <p className="font-heading text-2xl text-[#006d77] font-semibold">
                  {formatPriceRange(project.priceMin, project.priceMax)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 py-4 border-y border-[#83c5be]/20">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BedDouble className="w-4 h-4 text-[#83c5be]" />
                <span>{project.bhkTypes}</span>
              </div>
              {project.totalUnits && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4 text-[#83c5be]" />
                  <span>{project.totalUnits} Units</span>
                </div>
              )}
              {project.reraNumber && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-[#83c5be]" />
                  <span>RERA: {project.reraNumber}</span>
                </div>
              )}
            </div>

            {project.description && (
              <div className="mt-4">
                <h2 className="font-heading text-lg text-[#006d77] mb-2">About This Project</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
              </div>
            )}
          </div>

          {project.highlights?.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-heading text-lg text-[#006d77] mb-4">Highlights</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-[#e6f4f5] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#006d77]" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.amenities?.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-heading text-lg text-[#006d77] mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {project.amenities.map((a) => (
                  <span
                    key={a}
                    className="bg-[#e6f4f5] text-[#006d77] text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-6 sticky top-24">
            <h3 className="font-heading text-xl text-[#006d77] mb-1">Interested?</h3>
            <p className="text-sm text-gray-500 mb-5">
              Get a free callback from our property expert.
            </p>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-[#e6f4f5] flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-[#006d77]" />
                </div>
                <p className="text-[#006d77] font-medium">Thank you! We'll contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input {...register('name')} placeholder="Your Name" className="input-field" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register('phone')} placeholder="Phone Number" type="tel" className="input-field" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <input {...register('email')} placeholder="Email (optional)" type="email" className="input-field" />
                </div>
                <div>
                  <textarea {...register('message')} placeholder="Message (optional)" rows={3} className="input-field resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                  {submitting ? 'Sending…' : 'Request Callback'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
