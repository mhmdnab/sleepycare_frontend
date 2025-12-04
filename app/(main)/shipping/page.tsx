import { Package, Truck, Clock, MapPin } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-pacifico text-gray-900 mb-4">
            Shipping Information
          </h1>
          <p className="text-xl text-gray-600">
            Fast, reliable delivery to your doorstep
          </p>
        </div>

        {/* Shipping Options */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Truck className="w-6 h-6 mr-3 text-primary-600" />
            Shipping Options
          </h2>

          <div className="space-y-6">
            {/* Standard Shipping */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Standard Shipping</h3>
                <span className="text-primary-600 font-semibold">FREE</span>
              </div>
              <p className="text-gray-600 mb-2">On orders over $35</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>Delivery in 5-7 business days</span>
              </div>
            </div>

            {/* Express Shipping */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Express Shipping</h3>
                <span className="text-gray-900 font-semibold">$9.99</span>
              </div>
              <p className="text-gray-600 mb-2">Faster delivery for urgent orders</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>Delivery in 2-3 business days</span>
              </div>
            </div>

            {/* Next Day Shipping */}
            <div className="pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Next Day Delivery</h3>
                <span className="text-gray-900 font-semibold">$19.99</span>
              </div>
              <p className="text-gray-600 mb-2">Order by 2 PM for next day delivery</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>Delivery in 1 business day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <MapPin className="w-6 h-6 mr-3 text-primary-600" />
            Where We Ship
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">United States</h3>
              <p className="text-gray-600">
                We ship to all 50 states including Alaska and Hawaii. P.O. boxes and APO/FPO addresses are accepted.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">International Shipping</h3>
              <p className="text-gray-600">
                Currently, we ship to Canada and select countries. International shipping rates and delivery times vary by location.
                Customs fees and import duties are the responsibility of the customer.
              </p>
            </div>
          </div>
        </div>

        {/* Order Processing */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Package className="w-6 h-6 mr-3 text-primary-600" />
            Order Processing
          </h2>

          <div className="space-y-4 text-gray-600">
            <p>
              <strong className="text-gray-900">Processing Time:</strong> Orders are typically processed within 1-2 business days.
              You will receive a confirmation email once your order has been placed, and a shipping confirmation with tracking information
              once your order has shipped.
            </p>

            <p>
              <strong className="text-gray-900">Weekends & Holidays:</strong> Orders placed on weekends or holidays will be processed
              on the next business day.
            </p>

            <p>
              <strong className="text-gray-900">Order Tracking:</strong> Once your order ships, you'll receive a tracking number via
              email. You can track your package through our website or directly on the carrier's website.
            </p>
          </div>
        </div>

        {/* Packaging */}
        <div className="bg-primary-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Eco-Friendly Packaging
          </h2>
          <p className="text-gray-600 mb-4">
            We're committed to sustainability! All our products are shipped in recyclable packaging materials.
            We use minimal packaging to reduce waste while ensuring your order arrives safely.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>100% recyclable cardboard boxes</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Biodegradable packing materials</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Minimal plastic use</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Have questions about shipping? <a href="/faq" className="text-primary-600 hover:text-primary-700 font-semibold">Check our FAQ</a> or{' '}
            <a href="mailto:support@sleepycare.com" className="text-primary-600 hover:text-primary-700 font-semibold">contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
}
