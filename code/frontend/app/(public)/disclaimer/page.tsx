import type { Metadata } from 'next'
import { PageHeader } from '@/components/common/PageHeader'

export const metadata: Metadata = {
  title: 'Disclaimer',
}

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader title="Disclaimer" breadcrumb="Legal" />
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-gray-500 text-sm mb-8">Last updated: January 2025</p>

          <div className="space-y-6 text-gray-600">
            <div>
              <h2 className="font-heading text-2xl text-[#006d77] mb-3">General Disclaimer</h2>
              <p>
                The information provided on this website is for general informational purposes only. While we strive to keep information accurate and current, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-[#006d77] mb-3">Property Information</h2>
              <p>
                All property details, prices, specifications, floor plans, and images displayed on this website are indicative only and subject to change without notice. Actual properties may differ from representations shown. Prices are subject to change based on market conditions, developer policies, and other factors.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-[#006d77] mb-3">RERA Compliance</h2>
              <p>
                All projects listed on this website are subject to RERA (Real Estate Regulatory Authority) regulations. Please verify RERA registration details on the official RERA website of the respective state before making any investment decision.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-[#006d77] mb-3">No Guarantee of Returns</h2>
              <p>
                Real estate investment is subject to market risks. Past performance is not indicative of future results. We strongly recommend consulting with qualified legal, financial, and real estate professionals before making any property investment decision.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-[#006d77] mb-3">Third-Party Links</h2>
              <p>
                This website may contain links to third-party websites. These links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
