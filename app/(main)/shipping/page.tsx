import { Package, MapPin } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-pacifico text-gray-900 mb-4">
            Shipping & Delivery
          </h1>
          <p className="text-xl text-gray-600">Fast delivery across Lebanon</p>
        </div>

        {/* Shipping Options */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <MapPin className="w-6 h-6 mr-3 text-primary-600" />
            Delivery Coverage
          </h2>

          <div className="space-y-6">
            {/* Beirut & Mount Lebanon */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Greater Beirut Area
              </h3>
              <p className="text-gray-600">
                Beirut, Mount Lebanon (Baabda, Metn, Kesrwan, Chouf, Aley,
                Jbeil)
              </p>
            </div>

            {/* North Lebanon */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                North Lebanon
              </h3>
              <p className="text-gray-600">
                Tripoli, Zgharta, Batroun, Bsharri, Koura, Minieh-Danniyeh
              </p>
            </div>

            {/* South Lebanon */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                South Lebanon
              </h3>
              <p className="text-gray-600">
                Sidon, Tyre, Nabatieh, Jezzine, Marjeyoun, Bint Jbeil
              </p>
            </div>

            {/* Bekaa Valley */}
            <div className="pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bekaa Valley
              </h3>
              <p className="text-gray-600">
                Zahle, Baalbek, West Bekaa, Rachaya
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
              <strong className="text-gray-900">Processing Time:</strong> Orders
              are processed within 1 business day. You will receive an Email
              confirmation once your order has been placed.
            </p>

            <p>
              <strong className="text-gray-900">Weekends & Holidays:</strong> We
              deliver 6 days a week (Monday - Saturday). Orders placed on
              Sundays or public holidays will be processed on the next business
              day.
            </p>

            <p>
              <strong className="text-gray-900">Payment Methods:</strong> We
              accept cash on delivery (COD) or online payment via credit card.
              Full payment must be made upon delivery for COD orders.
            </p>

            <p>
              <strong className="text-gray-900">Contact:</strong> Our delivery
              team will contact you via Email or phone before delivery to
              confirm your availability and location.
            </p>
          </div>
        </div>

        {/* Packaging */}
        <div className="bg-primary-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quality Packaging
          </h2>
          <p className="text-gray-600 mb-4">
            We ensure your cleaning products arrive safely and in perfect
            condition!
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Secure packaging to prevent leaks and damage</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Recyclable materials whenever possible</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Products sealed and protected</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">✓</span>
              <span>Easy-to-carry packaging</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Questions about delivery?{" "}
            <a
              href="/faq"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Check our FAQ
            </a>{" "}
            or contact us via our{" "}
            <a
              href="/contact"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              contact page.
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
