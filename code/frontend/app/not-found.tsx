import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edf6f9] px-4">
      <div className="text-center">
        <div
          className="font-heading text-9xl font-bold mb-4"
          style={{
            background: 'linear-gradient(135deg, #006d77, #83c5be)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </div>
        <h1 className="font-heading text-2xl text-[#006d77] mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/projects" className="btn-secondary">Browse Projects</Link>
        </div>
      </div>
    </div>
  )
}
