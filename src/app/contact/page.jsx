"use client";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import siteConfig from "@/config/site.config";

export default function Page() {
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
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>

      <div className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <form
            action="https://formsubmit.co/iamayaanalee@gmail.com"
            method="POST"
            className="space-y-6"
          >
            <input type="hidden" name="_subject" value="New Contact Form Submission" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://aitools4you.xyz/thank-you" />

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

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Send Message
              <Send size={18} />
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Or reach us directly at</p>
            <a
              href={`mailto:hello@${siteConfig.domain}`}
              className="text-primary hover:text-primary/80 font-semibold text-lg transition-colors"
            >
              {`hello@${siteConfig.domain}`}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
