import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { PropertiesClientPage } from '@/components/features/properties/PropertiesClientPage'
import { InlineLoader } from '@/components/common/Loader'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Properties',
  description:
    'Browse flats, plots, shops, and studio apartments in Noida, Greater Noida & Ghaziabad. Find your ideal property with Zenith Estate.',
}

export default function PropertiesPage() {
  return (
    <>
      <PageHeader
        title="Properties"
        subtitle="Find the perfect flat, plot, or commercial space across Delhi NCR."
        breadcrumb="Property Listings"
      />
      <Suspense fallback={<InlineLoader />}>
        <PropertiesClientPage />
      </Suspense>
    </>
  )
}
