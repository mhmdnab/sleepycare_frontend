import { RefreshCw, Shield, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-pacifico text-gray-900 mb-4">
            Returns & Refunds
          </h1>
          <p className="text-xl text-gray-600">
            We want you to love your purchase. If not, we've got you covered.
          </p>
        </div>

        {/* Return Policy Highlight */}
        <div className="bg-primary-600 text-white rounded-2xl p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">30-Day Money Back Guarantee</h2>
          <p className="text-lg text-white/90">
            Not satisfied? Return your purchase within 30 days for a full refund, no questions asked.
          </p>
        </div>

        {/* How to Return */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <RefreshCw className="w-6 h-6 mr-3 text-primary-600" />
            How to Return Your Order
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-gray-600">
                  Email us at <a href="mailto:returns@sleepycare.com" className="text-primary-600 hover:text-primary-700 font-semibold">returns@sleepycare.com</a> with
                  your order number and reason for return. We'll send you a prepaid return label within 24 hours.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pack Your Items</h3>
                <p className="text-gray-600">
                  Place the items in their original packaging (if possible) and include your order confirmation.
                  Make sure the products are unused and in resalable condition.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold mr-4">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ship It Back</h3>
                <p className="text-gray-600">
                  Attach the prepaid return label to your package and drop it off at any authorized shipping location.
                  You'll receive a tracking number to monitor your return.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold mr-4">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Your Refund</h3>
                <p className="text-gray-600">
                  Once we receive your return, we'll process your refund within 5-7 business days.
                  The refund will be issued to your original payment method.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Return Conditions */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <CheckCircle2 className="w-6 h-6 mr-3 text-primary-600" />
            Return Conditions
          </h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <p className="text-gray-600">Items must be unused, unopened, and in original packaging</p>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <p className="text-gray-600">Returns must be initiated within 30 days of delivery</p>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <p className="text-gray-600">All original tags, labels, and packaging must be included</p>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <p className="text-gray-600">Proof of purchase (order number or receipt) is required</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">Note:</strong> Due to hygiene reasons, we cannot accept returns on opened packages
              of wipes. However, if you received a damaged or defective product, please contact us immediately for a replacement or refund.
            </p>
          </div>
        </div>

        {/* Exchanges */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <RefreshCw className="w-6 h-6 mr-3 text-primary-600" />
            Exchanges
          </h2>

          <p className="text-gray-600 mb-4">
            We want you to be completely satisfied with your purchase. If you'd like to exchange an item for a different product or size:
          </p>

          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Contact us at <a href="mailto:returns@sleepycare.com" className="text-primary-600 hover:text-primary-700 font-semibold">returns@sleepycare.com</a></span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Specify which item you'd like to exchange and what you'd like instead</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>We'll send you a prepaid return label and ship out your new item once we receive the return</span>
            </li>
          </ul>
        </div>

        {/* Damaged or Defective */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-primary-600" />
            Damaged or Defective Items
          </h2>

          <p className="text-gray-600 mb-4">
            If you receive a damaged or defective product, we'll make it right immediately:
          </p>

          <ul className="space-y-3 text-gray-600 mb-6">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>Contact us within 7 days of delivery with photos of the damage</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>We'll send a replacement at no charge or issue a full refund</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>No need to return the damaged item unless we request it</span>
            </li>
          </ul>

          <div className="p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Quality Guarantee:</strong> We stand behind our products. If you're not satisfied with the quality,
              let us know and we'll make it right.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-primary-600" />
            Refund Timeline
          </h2>

          <div className="space-y-4 text-gray-600">
            <p>
              <strong className="text-gray-900">Return Received:</strong> Once your return is delivered to our warehouse,
              you'll receive an email confirmation.
            </p>
            <p>
              <strong className="text-gray-900">Processing:</strong> We'll inspect your return within 2-3 business days.
            </p>
            <p>
              <strong className="text-gray-900">Refund Issued:</strong> Your refund will be processed within 5-7 business days
              after approval. Depending on your bank or credit card company, it may take an additional 3-5 days for the refund
              to appear in your account.
            </p>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help With a Return?</h2>
          <p className="text-white/90 mb-6">
            Our customer service team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:returns@sleepycare.com">
              <Button className="bg-white text-primary-600 hover:bg-gray-100">
                Email Support
              </Button>
            </a>
            <Link href="/faq">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
