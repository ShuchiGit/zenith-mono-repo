export function FullPageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edf6f9]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#b0d9dc] border-t-[#006d77] rounded-full animate-spin" />
        <p className="text-[#006d77] font-medium">Loading…</p>
      </div>
    </div>
  )
}

export function InlineLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="w-8 h-8 border-4 border-[#b0d9dc] border-t-[#006d77] rounded-full animate-spin" />
    </div>
  )
}
