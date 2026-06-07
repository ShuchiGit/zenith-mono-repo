import type { Metadata } from 'next'
import { PageHeader } from '@/components/common/PageHeader'
import { BudgetCalculator } from './BudgetCalculator'

export const metadata: Metadata = {
  title: 'Budget Calculator',
  description:
    'Calculate your home loan EMI, stamp duty, registration charges, and total cost of buying a property in Delhi NCR.',
}

export default function BudgetPage() {
  return (
    <>
      <PageHeader
        title="Budget Calculator"
        subtitle="Plan your property purchase with our comprehensive cost calculator."
        breadcrumb="Financial Tools"
      />
      <section className="section-padding bg-[#edf6f9]">
        <div className="container mx-auto px-4">
          <BudgetCalculator />
        </div>
      </section>
    </>
  )
}
