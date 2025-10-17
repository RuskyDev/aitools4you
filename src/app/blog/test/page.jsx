"use client";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";

export default function BlogDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft size={20} />
            <span>Back to Blogs</span>
          </button>

          <article>
            <header className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 leading-tight">
                Getting Started with AI Development
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span>John Doe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>October 1, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>5 min read</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  AI Development
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  Tutorial
                </span>
                <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  Beginner
                </span>
              </div>
            </header>

            <div className="w-full px-6 mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-card border border-border rounded-xl p-8 mb-8">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop"
                  alt="AI Development"
                  className="w-full h-64 object-cover rounded-lg mb-0"
                />
              </div>

              <div className="text-foreground space-y-6">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Artificial Intelligence is transforming the way we build software and solve complex problems. 
                  Whether you're a seasoned developer or just starting out, understanding AI fundamentals is 
                  becoming increasingly important in today's tech landscape.
                </p>

                <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">
                  Why Learn AI Development?
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  AI development opens up a world of possibilities. From creating intelligent chatbots to 
                  building recommendation systems, the applications are endless. The demand for AI skills 
                  continues to grow exponentially, making it one of the most valuable skill sets in modern 
                  software development.
                </p>

                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg my-8">
                  <p className="text-foreground italic">
                    "The best time to start learning AI was yesterday. The second best time is now."
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">
                  Getting Started: The Basics
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  Before diving into complex machine learning models, it's important to build a strong 
                  foundation. Here are the key areas you should focus on:
                </p>

                <ul className="space-y-3 text-muted-foreground my-6">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong className="text-foreground">Programming Fundamentals:</strong> Python is the most popular language for AI development. Make sure you're comfortable with its syntax and core concepts.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong className="text-foreground">Mathematics:</strong> Understanding linear algebra, calculus, and statistics will help you grasp how AI algorithms work under the hood.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong className="text-foreground">Data Handling:</strong> Learn how to work with datasets, clean data, and perform exploratory data analysis.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong className="text-foreground">ML Frameworks:</strong> Familiarize yourself with popular frameworks like TensorFlow, PyTorch, or scikit-learn.</span>
                  </li>
                </ul>

                <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">
                  Your First AI Project
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  The best way to learn is by doing. Start with a simple project like building a classification 
                  model or a basic chatbot. Don't worry about making it perfect – the goal is to understand 
                  the workflow and gain hands-on experience.
                </p>

                <div className="bg-card border border-border rounded-xl p-6 my-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Recommended First Projects:</h3>
                  <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                    <li>Image classification using pre-trained models</li>
                    <li>Sentiment analysis on text data</li>
                    <li>Simple recommendation system</li>
                    <li>Time series forecasting</li>
                  </ol>
                </div>

                <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">
                  Next Steps
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  Once you've completed your first project, continue building and experimenting. Join AI 
                  communities, participate in Kaggle competitions, and stay updated with the latest research. 
                  The field of AI is constantly evolving, and continuous learning is key to staying relevant.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Remember, every expert was once a beginner. Take it one step at a time, stay curious, and 
                  don't be afraid to make mistakes. They're an essential part of the learning process.
                </p>
              </div>
            </div>

            <div className="w-full px-6 mt-12 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            </div>

            <div className="mt-12 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-bold text-foreground">John Doe</p>
                  <p className="text-sm text-muted-foreground">AI Developer & Technical Writer</p>
                </div>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors">
                <Share2 size={18} />
                Share
              </button>
            </div>

            <div className="mt-16 bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <h4 className="font-bold text-foreground mb-2">Best Practices for Prompt Engineering</h4>
                  <p className="text-sm text-muted-foreground">Learn how to craft effective prompts for AI models.</p>
                </div>
                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <h4 className="font-bold text-foreground mb-2">Understanding Neural Networks</h4>
                  <p className="text-sm text-muted-foreground">Deep dive into how neural networks actually work.</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}