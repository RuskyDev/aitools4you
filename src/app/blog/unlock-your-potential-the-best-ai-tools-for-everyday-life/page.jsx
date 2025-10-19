"use client";
import { ArrowLeft, Share2 } from "lucide-react";
import {
  BlogHeader,
  Divider,
  BlogContent,
  BlogImage,
  BlogSection,
  AuthorCard,
  Bullet,
} from "../components";

export default function BlogDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={20} />
          <span>Back to Blogs</span>
        </button>

        <BlogHeader
          title="Unlock Your Potential: The Best AI Tools for Everyday Life"
          author="Muhammad Ali Khan"
          date="October 19, 2025"
          readTime="5 min read"
        />

        {/* <BlogTags tags={["AI Development", "Tutorial", "Beginner"]} /> */}

        <Divider />

        <BlogContent>
          <BlogImage
            src="/blogs/unlock-your-potential-the-best-ai-tools-for-everyday-life/unlock-your-ai-tools.png"
            alt="AI Development"
          />

          <p className="text-xl leading-relaxed">
            Imagine a world where digital helpers handle routine tasks, leaving
            you free to focus on what matters. That’s the promise of AI tools
            for everyday life. By leveraging artificial intelligence, these best
            AI tools can boost productivity with AI power—whether you’re writing
            emails, designing graphics, or managing projects. In this guide,
            we’ll explain what AI tools are, how they enhance daily life, and
            highlight some top AI apps you should try today to unlock your
            potential.
          </p>

          <BlogSection title="What Are AI Tools and Why They Matter">
            <BlogImage
              src="/blogs/unlock-your-potential-the-best-ai-tools-for-everyday-life/ai-tools-why-they-matters.png"
              alt="AI Development"
            />

            <p>
              Artificial intelligence (AI) tools are software applications that
              use machine learning or natural language processing to automate or
              assist with tasks people do frequentlyusemotion.com. In other
              words, AI tools “streamline a task that many people do frequently”
              by using intelligent algorithmsusemotion.com. AI itself is “a
              field of science that is primarily concerned with building smart
              computers and machines that can reason…in such a way that would
              normally require human intelligence”codestringers.com. By putting
              this technology into everyday apps, AI tools can handle tasks like
              drafting text, sorting emails, planning schedules, or generating
              images—things that once took up a large part of our day. This
              means faster results and fewer errors, allowing anyone to be more
              efficient and creative in their work. AI tools matter because they
              supercharge everyday tasks. For example, an AI scheduling
              assistant can automatically organize your calendar, a chatbot can
              brainstorm ideas, and smart filters can sort your inbox. These
              tools “have become a vital part of our day-to-day life. From the
              moment we wake up… AI tools are quietly working behind the scenes
              to make our daily experiences smoother, smarter, and more
              enjoyable”codestringers.com. In short, AI tools are important
              because they save time, reduce mundane work, and open up new
              possibilities—letting you focus on higher-level tasks while the AI
              handles the details.
            </p>
          </BlogSection>

          <BlogSection title="What Are AI Tools and Why They Matter">
            <BlogImage
              src="/blogs/unlock-your-potential-the-best-ai-tools-for-everyday-life/how-aI-tools-enhance-daily-life.png"
              alt="AI Development"
            />

            <p>
              AI is quietly improving many parts of our daily routines. Here are
              some common ways everyday AI apps can help:
              <ul className="space-y-4 my-6">
                <Bullet>
                  <strong>Smart Assistants:</strong> Voice-activated helpers
                  like Siri, Alexa, and Google Assistant have become household
                  names. They understand natural language and learn from
                  interactions, allowing them to answer questions, set
                  reminders, control smart home devices, and more. They perform
                  multiple functions—including internet searches, scheduling,
                  and even telling jokes—to save us time and effort.
                </Bullet>

                <Bullet>
                  <strong>Writing & Communication:</strong> AI writing apps like
                  ChatGPT or Grammarly can draft or refine text for you. For
                  example, they can check grammar and tone or rephrase
                  sentences, making your writing clearer and faster. This is a
                  huge boost for anyone writing emails, reports, or social media
                  posts.
                </Bullet>

                <Bullet>
                  <strong>Design & Creativity:</strong> Creative tools use AI to
                  help non-designers make professional graphics or photos.
                  Canva’s Magic Studio, for instance, lets you generate and
                  customize designs with simple prompts. Instead of starting
                  from scratch, you can quickly create polished visuals with
                  minimal effort.
                </Bullet>
              </ul>
            </p>
          </BlogSection>
        </BlogContent>

        <Divider />

        <div className="mt-12 flex items-center justify-between">
          <AuthorCard name="John Doe" role="AI Developer & Technical Writer" />
          <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors">
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
