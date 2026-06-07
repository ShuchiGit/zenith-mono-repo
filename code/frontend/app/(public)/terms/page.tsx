import type { Metadata } from 'next'
import { PageHeader } from '@/components/common/PageHeader'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
}

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms & Conditions" breadcrumb="Legal" />
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-gray-500 text-sm mb-8">Last updated: January 2025</p>

          <div className="space-y-6 text-gray-600">
            <div>
              <h2 className="font-heading text-2xl text-[#006d77] mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Zenith Estate website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-[#006d77] mb-3">2. Use of Website</h2>
              <p>
                You may use this website for lawful purposes only. You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-[#006d77] mb-3">3. Enquiries and Communications</h2>
              <p>
                When you submit an enquiry through our website, you consent to being contacted by our team via phone, email, or WhatsApp for property-related queries. You may opt out of communications at any time by contacting us.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-[#006d77] mb-3">4. Intellectual Property</h2>
              <p>
                All content on this website, including text, images, logos, and graphics, is the property of Zenith Estate and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without prior written permission.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-[#006d77] mb-3">5. Limitation of Liability</h2>
              <p>
                Zenith Estate shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or reliance on information provided herein. Our liability in any event is limited to the maximum extent permitted by law.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-[#006d77] mb-3">6. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Noida, Uttar Pradesh.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl text-[#006d77] mb-3">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website constitutes acceptance of the revised terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
