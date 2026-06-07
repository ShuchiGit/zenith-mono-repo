import Link from 'next/link'

const links = [
  { label: '2 BHK in Noida', href: '/properties?bhkType=2+BHK&city=Noida' },
  { label: '3 BHK in Noida', href: '/properties?bhkType=3+BHK&city=Noida' },
  { label: 'Flats in Greater Noida', href: '/properties?type=FLAT&city=Greater+Noida' },
  { label: 'Projects in Sector 150', href: '/projects?search=Sector+150' },
  { label: 'Ready to Move Flats', href: '/properties?status=READY_TO_MOVE' },
  { label: 'New Launch Projects', href: '/projects?status=NEW_LAUNCH' },
  { label: 'Plots in Ghaziabad', href: '/properties?type=PLOT&city=Ghaziabad' },
  { label: '4 BHK in Noida', href: '/properties?bhkType=4+BHK&city=Noida' },
]

export function SeoFooterLinks() {
  return (
    <section className="py-10 bg-[#edf6f9] border-t border-[#83c5be]/20">
      <div className="container mx-auto px-4">
        <h2 className="text-sm font-semibold text-[#006d77] mb-4 uppercase tracking-wide">
          Popular Searches
        </h2>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-gray-600 hover:text-[#006d77] border border-[#83c5be]/40 rounded-full px-3 py-1.5 bg-white hover:bg-[#e6f4f5] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
