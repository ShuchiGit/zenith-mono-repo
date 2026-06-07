import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPropertyBySlug } from '@/services/propertyService'
import { PropertyDetailClient } from '@/components/features/properties/PropertyDetailClient'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const res = await getPropertyBySlug(slug)
    const property = res.data
    return {
      title: property.metaTitle || property.name,
      description: property.metaDesc || property.description || `${property.name} — Property in ${property.city}`,
    }
  } catch {
    return { title: 'Property Details' }
  }
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params
  let property = null
  try {
    const res = await getPropertyBySlug(slug)
    property = res.data
  } catch {
    notFound()
  }

  if (!property) notFound()

  return <PropertyDetailClient property={property} />
}
