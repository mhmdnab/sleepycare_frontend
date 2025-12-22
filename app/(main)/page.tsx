"use client";

import Link from "next/link";
import Image from "next/image";
import { Leaf, Shield, Heart, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import {
  useBestSellers,
  useCategories,
  usePartners,
} from "@/lib/hooks/useQueries";
import {
  AnimatedHero,
  AnimatedSection,
  AnimatedProductGrid,
  AnimatedCategoryGrid,
  AnimatedTestimonialGrid,
  AnimatedSocialGrid,
} from "@/components/AnimatedComponents";
import { PartnersCarousel } from "@/components/PartnersCarousel";
import image from "@/public/image1.jpg";
import image2 from "@/public/image2.jpg";

// Testimonials are kept as static content since they don't change frequently
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "New Mom",
    content:
      "These baby wipes are absolutely amazing! So gentle on my baby's skin and I love that they're eco-friendly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Restaurant Owner",
    content:
      "We use the antibacterial wipes throughout our restaurant. They work incredibly well and the price is unbeatable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Homemaker",
    content:
      "The kitchen wipes have made cleaning so much easier. They cut through grease like nothing else I've tried.",
    rating: 5,
  },
];

export default function HomePage() {
  // Fetch data with TanStack Query
  const { data: bestSellers = [] } = useBestSellers();
  const { data: categories = [] } = useCategories();
  const { data: partners } = usePartners();

  return (
    <div>
      {/* Hero Section - GoodWipes Style */}
      <section className="relative bg-gradient-to-br from-primary-50 via-cyan-50 to-blue-50 overflow-hidden min-h-[100vh] flex items-center justify-center w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt="Cleaning wipes background"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        {/* Curved Bottom Edge */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gray-50 z-0">
          <svg
            className="absolute top-0 w-full h-24"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"
              className="fill-gray-50"
            />
          </svg>
        </div>
        <AnimatedHero>
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="relative flex items-center justify-center">
              {/* Decorative Badges - positioned around text */}
              <div className="absolute -top-8 -left-20 md:-top-12 md:-left-32 z-20 animate-bounce-slow">
                <div className="bg-purple-200 rounded-full p-3 md:p-4 border-4 border-purple-400 shadow-lg rotate-12">
                  <div className="text-center">
                    <p className="text-purple-800 font-bold text-[10px] md:text-xs">
                      SUSPICIOUSLY
                    </p>
                    <p className="text-purple-600 text-[10px] md:text-xs">
                      SOFT
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -top-8 -right-20 md:-top-12 md:-right-32 z-20 animate-bounce-slow"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="bg-primary-200 rounded-full p-3 md:p-4 border-4 border-primary-400 shadow-lg -rotate-12">
                  <div className="text-center">
                    <p className="text-primary-900 font-bold text-[10px] md:text-xs">
                      CLEANS
                    </p>
                    <p className="text-primary-800 text-[10px] md:text-xs">
                      TP
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-8 -left-16 md:-bottom-12 md:-left-28 z-20 animate-bounce-slow"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="bg-pink-200 rounded-3xl px-4 py-2 md:px-6 md:py-3 border-4 border-pink-400 shadow-lg -rotate-6">
                  <p className="text-pink-800 font-pacifico text-xs md:text-base">
                    Made For
                    <br />
                    Sensitive Skin
                  </p>
                </div>
              </div>

              <div
                className="absolute -bottom-8 -right-16 md:-bottom-12 md:-right-28 z-20 animate-bounce-slow"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="bg-cyan-200 rounded-3xl px-4 py-2 md:px-6 md:py-3 border-4 border-cyan-400 shadow-lg rotate-6">
                  <p className="text-cyan-900 font-pacifico text-xs md:text-base">
                    Shockingly
                    <br />
                    Strong
                  </p>
                </div>
              </div>

              {/* Main Hero Text */}
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-pacifico text-gray-900 leading-tight mb-4">
                  wipe smarter,
                  <br />
                  <span className="text-primary-600">not harder.</span>
                </h1>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link href="/shop">
                <Button size="lg" className="text-lg px-10 py-6">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedHero>
      </section>

      {/* Product Showcase - Carousel Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16 w-full">
            <h2 className="text-4xl lg:text-5xl font-pacifico text-gray-900 mb-4">
              premium wipes for an
              <br />
              <span className="text-primary-600">
                actually clean experience.
              </span>
            </h2>
            <div className="flex gap-4 justify-center mt-8">
              <Link href="/shop">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Find in Stores
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedProductGrid products={bestSellers} />

          <AnimatedSection className="text-center mt-12" delay={0.2}>
            <Link href="/shop">
              <Button size="lg" variant="outline">
                Shop All Products
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Available At - Retailer Logos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-pacifico text-center text-gray-900 mb-12 uppercase tracking-wide">
              Available At
            </h2>
          </AnimatedSection>
          <PartnersCarousel partners={partners || []} />
        </div>
      </section>

      {/* Why They Love Us - Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl lg:text-5xl font-pacifico text-center text-gray-900 mb-16">
              why they love <span className="text-primary-600">us.</span>
            </h2>
          </AnimatedSection>

          <AnimatedTestimonialGrid testimonials={testimonials} />
        </div>
      </section>

      {/* Subscribe & Save */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <Image
            src={image2}
            alt="Background pattern"
            fill
            className="object-cover"
          />
        </div>
        <AnimatedSection className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-pacifico text-white mb-6">
            subscribe & save 20%
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Never run out of your favorite wipes. Pause, swap, or cancel
            anytime. Your home and your wallet will thank you.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-10 py-6"
            >
              Save Now
            </Button>
          </Link>
        </AnimatedSection>
      </section>

      {/* Social Media Feed */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-4xl lg:text-5xl font-pacifico text-center text-gray-900 mb-4">
              come join the fun{" "}
              <span className="text-primary-600">@sleepycare</span>
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Follow us on social media
            </p>
          </AnimatedSection>

          <AnimatedSocialGrid products={bestSellers} />
        </div>
      </section>
    </div>
  );
}
