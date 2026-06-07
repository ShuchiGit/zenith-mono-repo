'use client'

import { useState } from 'react'
import { Phone, MessageCircle, X, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { submitEnquiry } from '@/services/enquiryService'
import type { SiteSettings } from '@/types'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface StickyEnquiryWidgetProps {
  settings?: SiteSettings | null
}

export function StickyEnquiryWidget({ settings }: StickyEnquiryWidgetProps) {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const phone = settings?.phone?.replace(/\s/g, '') || '919876543210'
  const whatsapp = settings?.whatsapp?.replace(/\s/g, '') || phone

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      await submitEnquiry({ ...data, source: 'sticky_widget' })
      setSubmitted(true)
      reset()
      setTimeout(() => {
        setSubmitted(false)
        setOpen(false)
      }, 2500)
    } catch {
      // silently fail — widget is secondary touch point
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        <a
          href={`https://wa.me/${whatsapp}?text=Hi%2C%20I'm%20interested%20in%20your%20properties.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg transition-all hover:scale-110"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </a>
        <a
          href={`tel:${phone}`}
          className="w-12 h-12 rounded-full bg-[#006d77] hover:bg-[#005a63] flex items-center justify-center shadow-lg transition-all hover:scale-110"
          aria-label="Call us"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
        <button
          onClick={() => setOpen(true)}
          className="w-12 h-12 rounded-full bg-[#e29578] hover:bg-[#d4845f] flex items-center justify-center shadow-lg transition-all hover:scale-110"
          aria-label="Quick enquiry"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40">
          <div className="glass-card rounded-2xl p-6 w-full max-w-sm relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-xl text-[#006d77] mb-1">Quick Enquiry</h3>
            <p className="text-sm text-gray-500 mb-5">We'll call you back within 30 minutes.</p>

            {submitted ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#e6f4f5] flex items-center justify-center mx-auto mb-3">
                  <Send className="w-6 h-6 text-[#006d77]" />
                </div>
                <p className="text-[#006d77] font-medium">Thank you! We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    {...register('name')}
                    placeholder="Your Name"
                    className="input-field"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register('phone')}
                    placeholder="Phone Number"
                    type="tel"
                    className="input-field"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <textarea
                    {...register('message')}
                    placeholder="Message (optional)"
                    rows={2}
                    className="input-field resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Send Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
