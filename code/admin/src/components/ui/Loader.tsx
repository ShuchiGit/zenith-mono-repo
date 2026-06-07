export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-10 h-10 border-4 border-[#b0d9dc] border-t-[#006d77] rounded-full animate-spin" />
    </div>
  )
}

export function InlineLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="w-8 h-8 border-4 border-[#b0d9dc] border-t-[#006d77] rounded-full animate-spin" />
    </div>
  )
}
