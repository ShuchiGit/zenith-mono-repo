'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { submitEnquiry } from '@/services/enquiryService'
import { CheckCircle } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid 10-digit phone number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setError(null)
    try {
      await submitEnquiry({ ...data, source: 'contact_page' })
      setSubmitted(true)
      reset()
    } catch (err: unknown) {
      const e = err as { message?: string }
      setError(e?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-[#e6f4f5] flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-[#006d77]" />
        </div>
        <h3 className="font-heading text-2xl text-[#006d77] mb-2">Message Sent!</h3>
        <p className="text-gray-500">
          Thank you for reaching out. Our team will contact you within 30 minutes.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-secondary mt-6">
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
          <input {...register('name')} placeholder="e.g. Rahul Sharma" className="input-field" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
          <input {...register('phone')} placeholder="e.g. 9876543210" type="tel" className="input-field" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input {...register('email')} placeholder="e.g. rahul@email.com" type="email" className="input-field" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
          <textarea
            {...register('message')}
            placeholder="Tell us what you're looking for…"
            rows={4}
            className="input-field resize-none"
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
        {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg p-3">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
          {submitting ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
