'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/store/cart';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedHero({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedProductGrid({ products }: { products: Product[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          variants={fadeInUp}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function AnimatedCategoryGrid({ categories }: { categories: any[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center"
    >
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 }
          }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        >
          <Link href={`/shop?category=${category.id}`} className="group text-center block">
            <div className="text-5xl mb-2">
              {category.icon}
            </div>
            <p className="text-sm font-medium text-gray-600">{category.name}</p>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function AnimatedTestimonialGrid({ testimonials }: { testimonials: any[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid md:grid-cols-3 gap-8"
    >
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial.id}
          variants={fadeInUp}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            {testimonial.content}
          </p>
          <div>
            <p className="font-bold text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function AnimatedSocialGrid({ products }: { products: Product[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {products.slice(0, 4).map((product, index) => (
        <motion.div
          key={product.id}
          variants={{
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 }
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <Heart className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
