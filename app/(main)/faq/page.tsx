'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Product Information',
    question: 'What types of wipes does Sleepycare offer?',
    answer: 'Sleepycare offers a wide range of wipes including baby wipes, antibacterial wipes, kitchen wipes, furniture wipes, glass wipes, and floor wipes. Each product is specially formulated for its intended use.',
  },
  {
    category: 'Product Information',
    question: 'Are your wipes biodegradable?',
    answer: 'Yes! We are committed to sustainability. Our wipes are made from biodegradable materials that break down naturally, reducing environmental impact.',
  },
  {
    category: 'Product Information',
    question: 'Are Sleepycare wipes safe for sensitive skin?',
    answer: 'Absolutely! Our wipes are dermatologically tested and hypoallergenic. They are free from harsh chemicals, parabens, and alcohol, making them safe for even the most sensitive skin.',
  },
  {
    category: 'Ordering & Shipping',
    question: 'How long does shipping take?',
    answer: 'Standard shipping typically takes 3-5 business days. Express shipping options are available for 1-2 day delivery. You will receive a tracking number once your order ships.',
  },
  {
    category: 'Ordering & Shipping',
    question: 'Do you offer international shipping?',
    answer: 'Currently, we ship within the United States. We are working on expanding our international shipping options. Please check back for updates.',
  },
  {
    category: 'Ordering & Shipping',
    question: 'What is your minimum order quantity?',
    answer: 'There is no minimum order quantity. You can order as few or as many products as you need. We offer bulk discounts for larger orders.',
  },
  {
    category: 'Returns & Refunds',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, you can return unopened products within 30 days for a full refund.',
  },
  {
    category: 'Returns & Refunds',
    question: 'How do I initiate a return?',
    answer: 'To initiate a return, please contact our customer service team at support@sleepycarelb.com with your order number. We will provide you with return instructions and a prepaid shipping label.',
  },
  {
    category: 'Returns & Refunds',
    question: 'When will I receive my refund?',
    answer: 'Refunds are processed within 5-7 business days after we receive your returned items. The refund will be credited to your original payment method.',
  },
  {
    category: 'Usage & Care',
    question: 'How should I store my wipes?',
    answer: 'Store wipes in a cool, dry place away from direct sunlight. Make sure to reseal the package after each use to prevent the wipes from drying out.',
  },
  {
    category: 'Usage & Care',
    question: 'Can I use baby wipes on my face?',
    answer: 'While our baby wipes are gentle and safe, we recommend using products specifically designed for facial care. Check out our facial wipes collection for the best results.',
  },
  {
    category: 'Usage & Care',
    question: 'Are your antibacterial wipes effective against viruses?',
    answer: 'Yes, our antibacterial wipes are formulated to kill 99.9% of germs, bacteria, and viruses when used as directed. They meet EPA standards for disinfectant wipes.',
  },
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-cyan-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-pacifico text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about Sleepycare products
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1">
                    {faq.question}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-pacifico text-gray-900 mb-3">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our customer support team is here to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@sleepycarelb.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Email Us
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
