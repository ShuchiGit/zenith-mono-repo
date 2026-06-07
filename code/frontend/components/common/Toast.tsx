'use client'

import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import type { ToastVariant } from '@/hooks/useToast'

interface ToastProps {
  id: string
  message: string
  variant: ToastVariant
  onRemove: (id: string) => void
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-600" />,
  error: <XCircle className="w-5 h-5 text-red-600" />,
  info: <Info className="w-5 h-5 text-[#006d77]" />,
}

const bg = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  info: 'bg-[#e6f4f5] border-[#b0d9dc]',
}

export function ToastItem({ id, message, variant, onRemove }: ToastProps) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border shadow-card animate-in slide-in-from-right-5 ${bg[variant]}`}
    >
      {icons[variant]}
      <p className="text-sm text-gray-800 flex-1">{message}</p>
      <button onClick={() => onRemove(id)} className="text-gray-400 hover:text-gray-600 mt-0.5">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: { id: string; message: string; variant: ToastVariant }[]
  removeToast: (id: string) => void
}) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem {...t} onRemove={removeToast} />
        </div>
      ))}
    </div>
  )
}
