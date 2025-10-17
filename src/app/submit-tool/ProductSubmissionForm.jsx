"use client";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  Loader2,
  Link,
  DollarSign,
  Tag,
} from "lucide-react";
import siteConfig from "@/config/site.config";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          Sending...
        </>
      ) : (
        <>
          Submit Tool
          <Send size={18} />
        </>
      )}
    </button>
  );
}

export default function ProductSubmissionForm({ handleSubmit }) {
  const captchaRef = useRef(null);
  const [token, setToken] = useState("");

  async function handleVerify(tokenValue) {
    setToken(tokenValue);
  }

  async function handleSubmitWithCaptcha(e) {
    if (!token) {
      e.preventDefault();
      await captchaRef.current.execute();
      return;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="flex flex-col items-center justify-start px-6 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-foreground leading-tight">
          Submit Your AI Tool
        </h1>
        <p className="text-lg sm:text-xl mb-6 max-w-3xl text-muted-foreground">
          Have an AI tool that’s not on our site yet? Or love an AI product you
          want to recommend? Submit it using the form below with all the
          required details. Every submission is carefully reviewed to ensure it
          meets our standards.
        </p>

        {/* <section className="max-w-3xl text-left mb-12">
          <h2 className="text-2xl font-bold mb-4">Fast Track Option</h2>
          <p className="text-muted-foreground mb-2">
            We receive dozens of new AI tools every day. Each is manually reviewed, tested, and given a unique description. This ensures fair exposure for all tools. If you want faster processing, the Fast Track option allows your tool to be reviewed and potentially published the same day.
          </p>
          <p className="text-muted-foreground mb-2">
            Only AI-related tools are accepted. Non-AI submissions will not be approved. Skip the queue and get your tool listed on AI Tools Directory in 3 days or less.
          </p>
        </section> */}

        <section className="max-w-3xl text-left">
          <h2 className="text-2xl font-bold mb-4">Guidelines</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>
              Describe your tool clearly and concisely so anyone can understand
              its purpose within a few seconds.
            </li>
            <li>
              Provide original content. Plagiarized or purely AI-generated
              descriptions will not be accepted.
            </li>
            <li>
              Be upfront about pricing. Tools with hidden costs, undisclosed
              fees, or long waiting lists won’t be listed.
            </li>
            <li>
              Ensure your tool is practical and easy to use, avoiding
              unnecessary jargon or overly technical language.
            </li>
            <li>
              We only accept AI tools. Crypto products, adult content, and AI
              companion/girlfriend apps aren’t allowed, and anything that isn’t
              AI won’t be approved.
            </li>
          </ul>
        </section>
      </div>

      <div className="w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <form
            action={handleSubmit}
            className="space-y-6"
            onSubmit={handleSubmitWithCaptcha}
          >
            <div>
              <label
                htmlFor="productName"
                className="block text-foreground font-semibold mb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                required
                maxLength={150}
                placeholder="What's your product called?"
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            <div>
              <label
                htmlFor="productURL"
                className="block text-foreground font-semibold mb-2"
              >
                Product Website
              </label>
              <div className="relative">
                <Link
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type="url"
                  id="productURL"
                  name="productURL"
                  required
                  placeholder="https://yourproduct.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pricing"
                className="block text-foreground font-semibold mb-2"
              >
                Pricing
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type="text"
                  id="pricing"
                  name="pricing"
                  placeholder="Free / $9.99 / Subscription"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="shortDescription"
                className="block text-foreground font-semibold mb-2"
              >
                Short Description (20–30 words)
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                required
                maxLength={300}
                rows={3}
                placeholder="Give us a quick, friendly summary of your tool. Keep it clear and honest."
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="longDescription"
                className="block text-foreground font-semibold mb-2"
              >
                Detailed Description (50–500 words)
              </label>
              <textarea
                id="longDescription"
                name="longDescription"
                required
                maxLength={5000}
                rows={8}
                placeholder="Tell us more about your tool: what it does, why it's helpful, and who it’s for. Keep it original and friendly—avoid salesy or AI-generated text."
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-foreground font-semibold mb-2"
              >
                Tags / Keywords
              </label>
              <div className="relative">
                <Tag
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="#productivity #AItool"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="submitterName"
                className="block text-foreground font-semibold mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="submitterName"
                name="submitterName"
                required
                maxLength={100}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            <div>
              <label
                htmlFor="submitterEmail"
                className="block text-foreground font-semibold mb-2"
              >
                Your Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type="email"
                  id="submitterEmail"
                  name="submitterEmail"
                  required
                  maxLength={254}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>

            {/* <div>
              <label
                htmlFor="twitterHandle"
                className="block text-foreground font-semibold mb-2"
              >
                X/Twitter Handle
              </label>
              <input
                type="text"
                id="twitterHandle"
                name="twitterHandle"
                placeholder="@yourhandle"
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div> */}

            {/* <div>
              <label
                htmlFor="affiliate"
                className="block text-foreground font-semibold mb-2"
              >
                Affiliate Program (Optional)
              </label>
              <input
                type="text"
                id="affiliate"
                name="affiliate"
                placeholder="URL or contact info"
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div> */}

            <div>
              <label
                htmlFor="uniqueness"
                className="block text-foreground font-semibold mb-2"
              >
                What Makes This Tool Unique?
              </label>
              <textarea
                id="uniqueness"
                name="uniqueness"
                maxLength={1000}
                rows={4}
                placeholder="Tell us what makes your tool stand out in a friendly, clear way."
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
              />
            </div>

            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
              onVerify={handleVerify}
              ref={captchaRef}
            />

            <input
              type="hidden"
              name="h-captcha-response"
              value={token || ""}
            />

            <SubmitButton />
          </form>

          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground">
              Submissions are reviewed for originality and clarity. Tools with
              waiting lists or restricted access will not be accepted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
