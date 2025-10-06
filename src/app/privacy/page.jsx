"use client";
import siteConfig from "@/config/site.config";

export default function PrivacyPage() {
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
            <p className="text-muted-foreground">
              We do <span className="font-semibold">not</span> collect, store, or process any personal information from visitors. This includes names, email addresses, IP addresses, or any other identifiable data.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Cookies and Tracking</h2>
            <p className="text-muted-foreground">
              Our website does not use cookies, tracking scripts, or third-party analytics tools. We do not track your behavior or gather usage statistics.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Third-Party Links</h2>
            <p className="text-muted-foreground">
              Our site contains links to external AI tools. We are <span className="font-semibold">not responsible</span> for the privacy practices of these websites. We encourage you to review their privacy policies before using their services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Data Security</h2>
            <p className="text-muted-foreground">
              Since we do not store or process any personal data, there is no user information at risk.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Children’s Privacy</h2>
            <p className="text-muted-foreground">
              Our website is not intended for children under 13, and we do not knowingly collect information from minors.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please reach out via our <a href="/contact" className="text-primary font-semibold underline">Contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
