import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Dealeo",
  description: "How Dealeo collects, uses and protects your personal data.",
  alternates: { canonical: "https://www.dealeo.es/privacy" },
};

const LAST_UPDATED = "27 October 2026";
const CONTACT_EMAIL = "hello@dealeo.es";
const COMPANY = "Dealeo";
const WEBSITE = "https://www.dealeo.es";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/" className="text-teal-500 text-sm font-medium hover:text-teal-400 mb-8 inline-block">
          ← Back to Dealeo
        </Link>

        <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="prose-dealeo space-y-10 text-sm leading-relaxed text-gray-300">

          <section>
            <h2>1. Who we are</h2>
            <p>
              {COMPANY} ("<strong>Dealeo</strong>", "we", "us", "our") operates the website {WEBSITE} and the Dealeo progressive web app (the "<strong>Service</strong>"). We are the data controller for personal data collected through the Service.
            </p>
            <p className="mt-3">
              Contact us at any time: <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-400">{CONTACT_EMAIL}</a>
            </p>
          </section>

          <section>
            <h2>2. Data we collect and why</h2>
            <div className="space-y-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <p className="font-semibold text-white mb-1">Account data (customers)</p>
                <p>When you create an account we collect your email address. We use this to authenticate you, save your favourites and send you deal notifications you have opted into. <strong>Legal basis:</strong> contract performance; legitimate interests.</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <p className="font-semibold text-white mb-1">Account data (venue owners)</p>
                <p>When you register a venue we collect your name, email address, venue name, address, phone number and any content you submit (deal descriptions, images). We use this to operate your venue listing and communicate with you about your account. <strong>Legal basis:</strong> contract performance.</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <p className="font-semibold text-white mb-1">Push notification tokens</p>
                <p>If you enable push notifications, we store a device push token. We use it only to send you deal alerts you requested. You can revoke this at any time from your browser or device settings. <strong>Legal basis:</strong> consent.</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <p className="font-semibold text-white mb-1">Usage and analytics data</p>
                <p>We may collect anonymised usage data (pages visited, deal views, redemptions) to improve the Service. This data is not linked to your identity. <strong>Legal basis:</strong> legitimate interests.</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <p className="font-semibold text-white mb-1">Deal reports ("Wrong price?")</p>
                <p>When you submit a price report we log the deal ID and deal title. We do not store your identity alongside a report. <strong>Legal basis:</strong> legitimate interests.</p>
              </div>
            </div>
          </section>

          <section>
            <h2>3. Cookies and local storage</h2>
            <p>
              We use browser <strong>local storage</strong> (not traditional cookies) to remember your language preference, notification opt-in status and whether you have dismissed the install prompt. These are stored only on your device and are never transmitted to our servers.
            </p>
            <p className="mt-3">
              If we add third-party analytics or advertising cookies in the future, we will update this policy and obtain your consent where required by law.
            </p>
          </section>

          <section>
            <h2>4. How we share your data</h2>
            <p>We do not sell your personal data. We may share it with:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li><strong>Supabase</strong> — our database and authentication provider (servers in the EU).</li>
              <li><strong>Vercel</strong> — our hosting provider.</li>
              <li><strong>Resend</strong> — our transactional email provider, used to send you account and notification emails.</li>
              <li><strong>Law enforcement or regulators</strong> — if required by applicable law.</li>
            </ul>
            <p className="mt-3">All processors are contractually bound to handle your data only for the purposes we specify.</p>
          </section>

          <section>
            <h2>5. Data retention</h2>
            <p>We retain your account data for as long as your account is active. If you delete your account, we delete your personal data within 30 days, except where we are required by law to retain it longer.</p>
            <p className="mt-3">Push notification tokens are deleted automatically when they expire or when you revoke permission.</p>
          </section>

          <section>
            <h2>6. Your rights (GDPR)</h2>
            <p>If you are in the European Economic Area you have the following rights:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
              <li><strong>Rectification</strong> — ask us to correct inaccurate data.</li>
              <li><strong>Erasure</strong> — ask us to delete your data ("right to be forgotten").</li>
              <li><strong>Restriction</strong> — ask us to limit how we use your data.</li>
              <li><strong>Portability</strong> — receive your data in a machine-readable format.</li>
              <li><strong>Object</strong> — object to processing based on legitimate interests.</li>
              <li><strong>Withdraw consent</strong> — where processing is based on consent, withdraw it at any time.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-400">{CONTACT_EMAIL}</a>. We will respond within 30 days. You also have the right to lodge a complaint with the Spanish data protection authority (AEPD) at <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-teal-400">aepd.es</a>.
            </p>
          </section>

          <section>
            <h2>7. Data security</h2>
            <p>We use industry-standard security measures including encrypted connections (HTTPS), row-level security on our database, and hashed passwords. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2>8. Children</h2>
            <p>The Service is not directed at children under 16. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us and we will delete it.</p>
          </section>

          <section>
            <h2>9. Changes to this policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify registered users by email of material changes. The "last updated" date at the top of this page reflects the most recent revision.</p>
          </section>

          <section>
            <h2>10. Contact</h2>
            <p>Questions about this policy? Email us: <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-400">{CONTACT_EMAIL}</a></p>
          </section>
        </div>

        <div className="mt-14 pt-8 border-t border-gray-800 flex gap-6 text-xs text-gray-600">
          <Link href="/terms" className="hover:text-gray-400">Terms &amp; Conditions</Link>
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
