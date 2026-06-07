import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { FOOTER_LINKS } from '@/constants/site'
import type { SiteSettings } from '@/types'

interface FooterProps {
  settings?: SiteSettings | null
}

export function Footer({ settings }: FooterProps) {
  const phone = settings?.phone || '+91 98765 43210'
  const email = settings?.email || 'info@zenithestate.in'
  const addressNoida = settings?.address_noida || 'Sector 150, Noida, UP 201310'
  const facebook = settings?.social_facebook
  const instagram = settings?.social_instagram
  const linkedin = settings?.social_linkedin
  const youtube = settings?.social_youtube

  return (
    <footer className="bg-[#001f22] text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-heading text-2xl text-white mb-3">Zenith Estate</h3>
            <p className="text-[#83c5be]/80 text-sm leading-relaxed mb-6">
              Premium real estate consultancy serving Delhi NCR since years. We help you find your
              dream home in Noida, Greater Noida & Ghaziabad.
            </p>
            <div className="flex items-center gap-3">
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#006d77] flex items-center justify-center transition-colors text-white text-xs font-bold">
                  f
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#006d77] flex items-center justify-center transition-colors text-white text-xs font-bold">
                  ig
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#006d77] flex items-center justify-center transition-colors text-white text-xs font-bold">
                  in
                </a>
              )}
              {youtube && (
                <a href={youtube} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#006d77] flex items-center justify-center transition-colors text-white text-xs font-bold">
                  yt
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base text-[#83c5be] mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-[#83c5be] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base text-[#83c5be] mb-4 uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-[#83c5be] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base text-[#83c5be] mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Phone className="w-4 h-4 text-[#83c5be] mt-0.5 flex-shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-[#83c5be] transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Mail className="w-4 h-4 text-[#83c5be] mt-0.5 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-[#83c5be] transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-[#83c5be] mt-0.5 flex-shrink-0" />
                <span>{addressNoida}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Zenith Estate. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Premium Real Estate Consultancy — Delhi NCR
          </p>
        </div>
      </div>
    </footer>
  )
}
