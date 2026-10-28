import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — Dealeo",
  description: "Terms and conditions for using the Dealeo app and website.",
  alternates: { canonical: "https://www.dealeo.es/terms" },
};

const LAST_UPDATED = "27 October 2026";
const CONTACT_EMAIL = "hello@dealeo.es";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/" className="text-teal-500 text-sm font-medium hover:text-teal-400 mb-8 inline-block">
          ← Back to Dealeo
        </Link>

        <h1 className="text-3xl font-black text-white mb-2">Terms &amp; Conditions</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="prose-dealeo space-y-10 text-sm leading-relaxed text-gray-300">

          <section>
            <h2>1. Acceptance of terms</h2>
            <p>
              By accessing or using Dealeo ("{`dealeo.es`}") — including browsing deals, creating an account, or listing a venue — you agree to these Terms &amp; Conditions. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2>2. What Dealeo is</h2>
            <p>
              Dealeo is a free platform that displays food and drink deals, happy hours and promotions submitted by participating venues. We do not sell food, drinks or vouchers. We are an information platform only.
            </p>
          </section>

          <section>
            <h2>3. Accuracy of deal information</h2>
            <div className="bg-orange-950/40 border border-orange-900/50 rounded-xl p-4 space-y-2">
              <p className="font-semibold text-orange-300">Important — please read</p>
              <p>All deal information — including prices, availability, hours and descriptions — is provided by venue owners. <strong>Dealeo does not verify this information and makes no guarantee that it is accurate, current or complete.</strong></p>
              <p className="mt-2">Prices shown are indicative only and may vary at the venue's discretion. Always confirm details with the venue before ordering. Dealeo is not responsible for any difference between the price shown on the app and the price charged at the venue.</p>
            </div>
          </section>

          <section>
            <h2>4. No contractual relationship with venues</h2>
            <p>
              Dealeo is not a party to any transaction or agreement between you and a venue. Displaying a deal on Dealeo does not create a contractual obligation on the venue to honour it. Any dispute about a deal, price or service is between you and the venue directly.
            </p>
            <p className="mt-3">
              Dealeo is not affiliated with, endorsed by, or in a partnership with any venue listed on the platform unless explicitly stated.
            </p>
          </section>

          <section>
            <h2>5. User accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. You must notify us immediately at <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-400">{CONTACT_EMAIL}</a> if you suspect unauthorised access.</p>
            <p className="mt-3">You must be at least 16 years old to create an account. Accounts are personal and non-transferable.</p>
          </section>

          <section>
            <h2>6. Venue owners</h2>
            <p>By listing your venue on Dealeo, you agree that:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>All information you submit is accurate, legal and up to date.</li>
              <li>You have the right to offer and honour the deals you post.</li>
              <li>You will keep your deals current and update or remove expired offers promptly.</li>
              <li>You will not post misleading, false or illegal promotions.</li>
              <li>Dealeo may remove or suspend any listing at its sole discretion without notice.</li>
            </ul>
          </section>

          <section>
            <h2>7. Prohibited uses</h2>
            <p>You may not use the Service to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Scrape, crawl or harvest data from the platform.</li>
              <li>Post false, misleading or defamatory content.</li>
              <li>Circumvent, disable or interfere with security features.</li>
              <li>Use the Service for any unlawful purpose.</li>
              <li>Attempt to access systems or data you are not authorised to access.</li>
            </ul>
          </section>

          <section>
            <h2>8. Intellectual property</h2>
            <p>
              The Dealeo name, logo and all original content on the platform are our intellectual property. Venue owners retain ownership of the content they submit (photos, descriptions) but grant Dealeo a non-exclusive licence to display it on the Service.
            </p>
          </section>

          <section>
            <h2>9. Limitation of liability</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
              <p>To the maximum extent permitted by law, Dealeo is not liable for:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Any loss or damage arising from inaccurate deal information.</li>
                <li>Any deal not being honoured by a venue.</li>
                <li>Any loss of profit, revenue or data arising from use of the Service.</li>
                <li>Any indirect, consequential or special damages of any kind.</li>
                <li>Service interruptions, downtime or technical errors.</li>
              </ul>
              <p>Our total liability for any claim shall not exceed €100.</p>
            </div>
          </section>

          <section>
            <h2>10. Disclaimer of warranties</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted, error-free or free of viruses.
            </p>
          </section>

          <section>
            <h2>11. Third-party links</h2>
            <p>The Service may contain links to third-party websites (venue websites, maps, etc.). We have no control over these sites and are not responsible for their content or privacy practices.</p>
          </section>

          <section>
            <h2>12. Governing law</h2>
            <p>
              These Terms are governed by the laws of Spain. Any disputes shall be subject to the exclusive jurisdiction of the courts of Spain.
            </p>
          </section>

          <section>
            <h2>13. Changes to these terms</h2>
            <p>We may update these Terms at any time. Continued use of the Service after changes are posted constitutes your acceptance of the new Terms. We will notify registered users of material changes by email.</p>
          </section>

          <section>
            <h2>14. Contact</h2>
            <p>Questions about these Terms? Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-400">{CONTACT_EMAIL}</a></p>
          </section>

        </div>

        <div className="mt-14 pt-8 border-t border-gray-800 flex gap-6 text-xs text-gray-600">
          <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
          <Link href="/" className="hover:text-gray-400">Back to Dealeo</Link>
        </div>
      </div>

      <style>{`
        .prose-dealeo h2 {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
        }
        .prose-dealeo p { margin-bottom: 0 }
      `}</style>
    </div>
  );
}
