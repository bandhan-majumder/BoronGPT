"use client"

import type React from "react"
import Image from "next/image";
import { useState, useEffect } from "react"
import { Card } from "@repo/ui/index"
import "./globals.css"
import { Star, Play } from "lucide-react"
import ChatInput from "../components/ChatInput"
import { Header } from "../components/Header"

export default function BoronGPTLanding() {
  const [inputValue, setInputValue] = useState("")
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; left: string }>>([])

  useEffect(() => {
    // Generate floating particles
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      delay: Math.random() * 15,
      left: Math.random() * 100 + "%",
    }))
    setParticles(particleArray)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      // Redirect to AI console or chat interface
      window.location.href = `/chat?query=${encodeURIComponent(inputValue)}`
    }
  }

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "AI Researcher at TechCorp",
      content: "BoronGPT has revolutionized our research workflow. The speed and accuracy are unmatched.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder",
      content: "This AI platform helped us build our MVP in record time. Absolutely game-changing technology.",
      rating: 5,
    },
    {
      name: "Dr. Emily Watson",
      role: "Data Scientist",
      content: "The most intuitive AI interface I've ever used. BoronGPT understands context like no other.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-[#181819] text-white relative overflow-hidden">
      {/* Animated Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle animate-particle"
            style={{
              left: particle.left,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="h-screen bg-gradient-to-t from-yellow-100 via-black via-85%  to-black focus:to-yellow-500">
        <Header />

        {/* Hero Section */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Subtitle */}
            <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold text-yellow-50 flex items-center justify-center gap-3">
                Build apps
                <Image
                  src={"/icon.svg"}
                  width={40}
                  height={40}
                  alt="a"
                  className="rounded-xl"
                  style={{ transform: "rotate(45deg)" }}
                />
                BoronGPT
                </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Prompt, Edit, Ship. Faster than you can imagine.
              </p>
            </div>

            {/* Interactive Input */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <ChatInput onClick={() => { }} />
              </form>
              <p className="text-sm text-gray-700 mt-3">Press Enter or click the arrow to start </p>
            </div>
          </div>
        </main>
      </div>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-glow mb-8">See BoronGPT in Action</h2>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Watch how BoronGPT builds a landing page
          </p>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gray-900/30 border border-gray-700 rounded-2xl overflow-hidden glow-effect group cursor-pointer">
              <video
                className="w-full h-full object-cover"
                poster="/futuristic-ai-interface-demo-thumbnail.jpg"
                controls
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <div className="w-20 h-20 bg-amber-500/90 rounded-full flex items-center justify-center animate-glow">
                  <Play className="h-8 w-8 text-black ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-glow mb-4">Our Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of developers, researchers, and innovators who trust BoronGPT for their AI needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className="p-8 bg-gray-900/30 border-gray-700 backdrop-blur-sm glow-effect hover:bg-gray-800/50 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="space-y-6">
                  {/* Star Rating */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-gray-300 leading-relaxed">"{testimonial.content}"</blockquote>

                  {/* Author Info */}
                  <div className="border-t border-gray-700 pt-6">
                    <div className="font-semibold text-white text-glow">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500">© 2024 BoronGPT. Powered by advanced artificial intelligence.</p>
        </div>
      </footer>
    </div>
  )
}
