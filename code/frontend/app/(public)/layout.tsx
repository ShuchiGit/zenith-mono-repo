import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { StickyEnquiryWidget } from '@/components/common/StickyEnquiryWidget'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { getSettings } from '@/services/settingsService'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let settings = null
  try {
    const res = await getSettings()
    settings = res.data
  } catch {
    // use defaults
  }

  return (
    <ErrorBoundary>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer settings={settings} />
      <StickyEnquiryWidget settings={settings} />
    </ErrorBoundary>
  )
}
