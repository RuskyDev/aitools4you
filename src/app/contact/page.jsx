"use client";
import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Send, Mail, User, MessageSquare, Loader2 } from "lucide-react";

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
          Send Message
          <Send size={18} />
        </>
      )}
    </button>
  );
}

export default function ContactForm() {
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
      type: "contact",
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
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
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="text-lg sm:text-xl mb-12 max-w-2xl text-muted-foreground">
          Have a question or want to work together? Drop us a message and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmitWithCaptcha}>
            <div>
              <label htmlFor="name" className="block text-foreground font-semibold mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  placeholder="Your name"
                  className="w-full pl-12 pr-5 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-foreground font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={254}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-5 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-foreground font-semibold mb-2">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-muted-foreground" size={20} />
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={2000}
                  rows={6}
                  placeholder="Tell us what's on your mind..."
                  className="w-full pl-12 pr-5 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
                />
              </div>
            </div>

            <HCaptcha sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY} onVerify={handleVerify} ref={captchaRef} />
            <input type="hidden" name="h-captcha-response" value={token || ""} />

            <SubmitButton pending={pending} />
          </form>

          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground">We’ll reach out to you within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
