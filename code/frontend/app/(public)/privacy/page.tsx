import type { Metadata } from 'next'
import { PageHeader } from '@/components/common/PageHeader'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" breadcrumb="Legal" />
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-3xl prose prose-gray">
          <p className="text-gray-500 text-sm mb-8">Last updated: January 2025</p>

          <h2 className="font-heading text-2xl text-[#006d77] mb-3">1. Information We Collect</h2>
          <p className="text-gray-600 mb-6">
            We collect information you provide directly, such as your name, phone number, email address, and enquiry details when you fill out forms on our website. We may also collect usage data including pages visited, time spent, and referring URLs.
          </p>

          <h2 className="font-heading text-2xl text-[#006d77] mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600 mb-6">
            Your information is used solely to respond to your enquiries, provide property recommendations, and improve our services. We do not sell, rent, or share your personal data with third parties for marketing purposes.
          </p>

          <h2 className="font-heading text-2xl text-[#006d77] mb-3">3. Data Security</h2>
          <p className="text-gray-600 mb-6">
            We implement industry-standard security measures to protect your personal information. All data is transmitted over encrypted HTTPS connections and stored securely.
          </p>

          <h2 className="font-heading text-2xl text-[#006d77] mb-3">4. Cookies</h2>
          <p className="text-gray-600 mb-6">
            We use essential cookies to ensure the website functions correctly. We may use analytics cookies (with your consent) to understand how visitors use our site. You can disable cookies in your browser settings.
          </p>

          <h2 className="font-heading text-2xl text-[#006d77] mb-3">5. Contact Us</h2>
          <p className="text-gray-600">
            For any privacy-related queries, contact us at{' '}
            <a href="mailto:info@zenithestate.in" className="text-[#006d77] hover:underline">
              info@zenithestate.in
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
