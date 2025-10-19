"use client";
import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Send, Mail, Loader2, Link } from "lucide-react";

function SubmitButton({ pending }) {
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

export default function ProductSubmissionForm() {
  const captchaRef = useRef(null);
  const [token, setToken] = useState("");
  const [pending, setPending] = useState(false);

  async function handleVerify(tokenValue) {
    setToken(tokenValue);
  }

  async function handleSubmitWithCaptcha(e) {
    e.preventDefault();

    if (!token) {
      captchaRef.current.execute();
      return;
    }

    const form = e.target;
    const data = {
      type: "ai-tool-submission",
      submitterName: form.submitterName.value,
      submitterEmail: form.submitterEmail.value,
      productName: form.productName.value,
      productURL: form.productURL.value,
      shortDescription: form.shortDescription.value,
      hcaptchaToken: token,
    };

    try {
      setPending(true);
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.reset();
        setToken("");
        window.location.href = "/contact/thank-you";
      } else {
        const err = await res.json();
        alert(err.message || "Submission failed, try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed, try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="flex flex-col items-center justify-start px-6 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-foreground leading-tight">
          Submit Your AI Tool
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl text-muted-foreground">
          Have an AI tool that’s not on our site yet? Or love an AI product you
          want to recommend? Submit it using the form below with all the
          required details. Every submission is carefully reviewed to ensure it
          meets our standards.
        </p>
      </div>

      <div className="w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmitWithCaptcha}>
            <div>
              <label htmlFor="submitterName" className="block text-foreground font-semibold mb-2">
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
              <label htmlFor="submitterEmail" className="block text-foreground font-semibold mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
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

            <div>
              <label htmlFor="productName" className="block text-foreground font-semibold mb-2">
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
              <label htmlFor="productURL" className="block text-foreground font-semibold mb-2">
                Product URL
              </label>
              <div className="relative">
                <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
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
              <label htmlFor="shortDescription" className="block text-foreground font-semibold mb-2">
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

            <HCaptcha sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY} onVerify={handleVerify} ref={captchaRef} />
            <input type="hidden" name="h-captcha-response" value={token || ""} />

            <SubmitButton pending={pending} />
          </form>

          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground">
              Submissions are reviewed for originality and clarity. Tools with waiting lists or restricted access will not be accepted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
