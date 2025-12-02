import { Shield, Leaf, Heart, Award, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About Sleepycare
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for premium quality wipes. We're committed to providing
              eco-friendly, safe, and effective cleaning solutions for every need.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Sleepycare was founded with a simple mission: to create the highest quality
                wipes that are safe for your family and gentle on the environment.
              </p>
              <p className="text-gray-700 mb-4">
                We understand that cleaning products play a crucial role in maintaining
                hygiene and health. That's why we've dedicated ourselves to developing
                innovative solutions that meet the highest standards of quality and safety.
              </p>
              <p className="text-gray-700">
                Today, we proudly serve thousands of families and businesses with our
                comprehensive range of surface wipes, floor wipes, and super clean series.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">10+</div>
                <div className="text-sm text-gray-700">Years Experience</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50k+</div>
                <div className="text-sm text-gray-700">Happy Customers</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm text-gray-700">Eco-Friendly</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-sm text-gray-700">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to protecting our planet with biodegradable materials
                and eco-friendly manufacturing processes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety First</h3>
              <p className="text-gray-600">
                Every product is dermatologically tested and free from harmful chemicals
                to ensure safety for your family.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Care</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're dedicated to providing
                exceptional products and outstanding service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Sleepycare?</h2>
            <p className="text-lg text-gray-600">
              We go above and beyond to deliver excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Award className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-gray-600 text-sm">
                  Only the finest materials and strictest quality control standards
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Eco-Friendly</h3>
                <p className="text-gray-600 text-sm">
                  Biodegradable and sustainable products for a greener future
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Dermatologically Tested</h3>
                <p className="text-gray-600 text-sm">
                  Safe for all skin types, including sensitive skin
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Family Trusted</h3>
                <p className="text-gray-600 text-sm">
                  Trusted by thousands of families worldwide
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Globe className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Global Standards</h3>
                <p className="text-gray-600 text-sm">
                  Meeting international quality and safety certifications
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Made with Love</h3>
                <p className="text-gray-600 text-sm">
                  Every product is crafted with care and attention to detail
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Product Range</h2>
            <p className="text-lg text-gray-600">
              Comprehensive cleaning solutions for every surface
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Surface Wipes</h3>
              <p className="text-gray-600 mb-4">
                Perfect for cleaning and disinfecting all types of surfaces. From kitchen
                counters to office desks, our surface wipes provide effective cleaning.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Antibacterial formula</li>
                <li>• Quick-drying</li>
                <li>• Pleasant fresh scent</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Floor Wipes</h3>
              <p className="text-gray-600 mb-4">
                Specially designed for floor cleaning. Large, durable wipes that make
                cleaning your floors quick and easy.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Extra large size</li>
                <li>• Works on all floor types</li>
                <li>• No residue</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Super Clean Series</h3>
              <p className="text-gray-600 mb-4">
                Our premium line for tough cleaning jobs. Maximum cleaning power for
                the most demanding situations.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Heavy-duty cleaning</li>
                <li>• Industrial strength</li>
                <li>• Professional grade</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Experience the Sleepycare Difference
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of satisfied customers who trust Sleepycare for their cleaning needs
          </p>
          <a
            href="/shop"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
}
