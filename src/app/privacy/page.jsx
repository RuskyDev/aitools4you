"use client";
import siteConfig from "@/config/site.config";

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="flex flex-col items-center justify-start px-6 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-foreground leading-tight">
          Privacy Policy
        </h1>
        <p className="text-lg sm:text-xl mb-12 max-w-3xl text-muted-foreground">
          At <span className="font-semibold">{siteConfig.name}</span>, we respect your privacy and are committed to being transparent about the information we handle. This page explains how we manage data and protect your privacy.
        </p>
      </div>

      <div className="w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>

      <div className="px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-12 text-foreground">

          <section>
            <h2 className="text-3xl font-bold mb-4">Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect limited personal information only when you choose to contact us through our contact form or submit a tool/ad. This may include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Product or service name and URL</li>
              <li>Description of your product or advertisement</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              This information is used solely to review submissions, respond to inquiries, and display purchased ads. We do <span className="font-semibold">not</span> sell, rent, or share this information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Cookies and Tracking</h2>
            <p className="text-muted-foreground">
              We use <span className="font-semibold">Google Analytics</span> to help us understand how visitors use our site. Google Analytics may collect anonymized information such as your IP address, device type, browser, and page activity through cookies or similar technologies.
            </p>
            <p className="text-muted-foreground mt-4">
              You can learn more about how Google uses your data by reviewing{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold underline"
              >
                Google’s Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold underline"
              >
                How Google uses information from sites or apps that use its services
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground">
              Information submitted through our contact forms or advertiser forms is used exclusively to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Respond to your inquiries or messages</li>
              <li>Review and process tool submissions</li>
              <li>Display purchased advertisements</li>
              <li>Provide requested support or information</li>
              <li>Improve our communication and site experience</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We retain submissions only as long as necessary to review and display them, after which they are securely deleted if no longer needed.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Advertiser Submissions & Ad Purchases</h2>
            <p className="text-muted-foreground">
              When you submit a tool or purchase an advertisement, the information you provide—including your name, email, product details, and ad assets—is used to review your submission and display your ad.
            </p>
            <p className="text-muted-foreground mt-4">
              Payments are securely processed by <span className="font-semibold">Stripe</span>. We do not store credit card information directly. Any uploaded ad banners are stored in <span className="font-semibold">Supabase</span> and are only used to display your ad. Your data is never shared with third parties.
            </p>
            <p className="text-muted-foreground mt-4">
              Submissions are reviewed for originality and clarity. Ads or tools that are restricted, incomplete, or not aligned with our guidelines may not be accepted.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Third-Party Links</h2>
            <p className="text-muted-foreground">
              Our site may contain links to external tools or services. We are <span className="font-semibold">not responsible</span> for the privacy practices of those sites and recommend reviewing their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Data Security</h2>
            <p className="text-muted-foreground">
              We take appropriate measures to ensure the security of any information submitted through our contact form or advertiser form. However, no online platform can guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Children’s Privacy</h2>
            <p className="text-muted-foreground">
              Our website is not intended for children under 13, and we do not knowingly collect or store personal information from minors.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or how your information is handled, please contact us via our{" "}
              <a href="/contact" className="text-primary font-semibold underline">
                Contact page
              </a>.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Effective Date: October 19, {currentYear} – {currentYear + 1}
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
