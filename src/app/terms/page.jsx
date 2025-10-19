"use client";
import siteConfig from "@/config/site.config";

export const metadata = {
  title: `${siteConfig.name} | Terms`,
};

export default function TermsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="flex flex-col items-center justify-start px-6 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-foreground leading-tight">
          Terms of Service
        </h1>
        <p className="text-lg sm:text-xl mb-12 max-w-3xl text-muted-foreground">
          Welcome to <span className="font-semibold">{siteConfig.name}</span>. By using our website, you agree to comply with these terms and conditions. Please read them carefully.
        </p>
      </div>

      <div className="w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>

      <div className="px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-12 text-foreground">

          <section>
            <h2 className="text-3xl font-bold mb-4">Use of Website</h2>
            <p className="text-muted-foreground">
              You may browse, search, and view AI tools listed on this website for personal or professional purposes. You may not use our website for any illegal, abusive, or unauthorized activities.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">User Submissions</h2>
            <p className="text-muted-foreground">
              When using our contact form, you may provide your name, email address, and message. By submitting this information, you grant us permission to contact you solely for the purpose of responding to your inquiry. We do not use your contact details for marketing or share them with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Advertiser Submissions & Ad Purchases</h2>
            <p className="text-muted-foreground">
              Advertisers may submit tools or purchase ad placements on our site. By submitting a tool or ad, you confirm that all information provided is accurate and that you have the right to submit the content.
            </p>
            <p className="text-muted-foreground mt-4">
              Payments for ads are securely processed via <span className="font-semibold">Stripe</span>. We do not store credit card information. Uploaded ad banners are stored in <span className="font-semibold">Supabase</span> and are used solely to display your advertisement. We reserve the right to reject submissions that do not meet our guidelines or standards.
            </p>
            <p className="text-muted-foreground mt-4">
              You are responsible for ensuring that submitted ads comply with all applicable laws and do not infringe on third-party rights. We are not liable for content submitted by advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Analytics and Cookies</h2>
            <p className="text-muted-foreground">
              Our website uses Google Analytics to understand how visitors interact with our site. By using our website, you acknowledge that Google may collect anonymized data through cookies in accordance with its{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold underline"
              >
                Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, design, and branding on this website are the property of <span className="font-semibold">{siteConfig.name}</span> unless otherwise stated. You may not reproduce, redistribute, or modify our content without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Third-Party Links</h2>
            <p className="text-muted-foreground">
              Our website may contain links to external AI tools or services. We are not responsible for the content, accuracy, or privacy practices of these third-party websites. Accessing them is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">No Warranty</h2>
            <p className="text-muted-foreground">
              The information and tools listed on this website are provided “as is.” We make no guarantees about accuracy, reliability, or suitability for any purpose. Use of the website and its resources is at your own discretion and risk.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              <span className="font-semibold">{siteConfig.name}</span> is not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website, linked resources, or submitted ads.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may update these Terms of Service from time to time. Any updates will be reflected on this page with an updated effective date. Continued use of the website after changes means you accept the revised terms, including any advertiser-related terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about these terms, please reach out via our{" "}
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
