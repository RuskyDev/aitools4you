"use client";
import siteConfig from "@/config/site.config";

export default function TermsPage() {
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
              You may browse, search, and view AI tools listed on this website for personal or professional purposes. You may not use our website for any illegal or unauthorized purpose.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, design, and branding on this website are the property of <span className="font-semibold">{siteConfig.name}</span> unless otherwise stated. You may not reproduce or distribute our content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Third-Party Links</h2>
            <p className="text-muted-foreground">
              Our website contains links to external AI tools. We do not control these third-party websites and are not responsible for their content, services, or practices. Use these links at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">No Warranty</h2>
            <p className="text-muted-foreground">
              The tools and information provided on this website are for informational purposes only. We make no guarantees regarding accuracy, reliability, or suitability for any purpose. Your use of the website is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              <span className="font-semibold">{siteConfig.name}</span> shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or any linked services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may update these Terms of Service at any time. Updates will be posted on this page with an effective date. Continued use of the website constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about these terms, please reach out via our <a href="/contact" className="text-primary font-semibold underline">Contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
