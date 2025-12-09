'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-teal-500 py-16 md:py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-pattern)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-medium">Premium Quality Wipes</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Experience
              <br />
              <span className="text-yellow-300">True Cleanliness?</span>
            </h2>
            <p className="text-white/90 text-lg max-w-xl">
              Join thousands of happy customers who trust Sleepycare for their everyday cleaning needs.
              Shop now and feel the difference!
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 hover:text-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/20"
        >
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white">10K+</p>
            <p className="text-white/80 text-sm mt-1">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white">50+</p>
            <p className="text-white/80 text-sm mt-1">Products</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white">99%</p>
            <p className="text-white/80 text-sm mt-1">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-white">24/7</p>
            <p className="text-white/80 text-sm mt-1">Customer Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
