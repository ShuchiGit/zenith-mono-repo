interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumb?: string
}

export function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #006d77 0%, #005a63 50%, #003338 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #83c5be 0%, transparent 50%), radial-gradient(circle at 80% 50%, #e29578 0%, transparent 50%)',
        }}
      />
      <div className="relative container mx-auto px-4 text-center">
        {breadcrumb && (
          <p className="text-[#83c5be] text-sm font-medium mb-3 uppercase tracking-widest">
            {breadcrumb}
          </p>
        )}
        <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">{title}</h1>
        {subtitle && (
          <p className="text-[#b0d9dc] text-lg max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
