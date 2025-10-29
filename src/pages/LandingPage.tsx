import { Building2, Home, User, CreditCard, FileText, Shield, Bell, MessageSquare, TrendingUp, CheckCircle, Star, Mail, Phone, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Zap, BarChart3, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LandingPageProps {
  onGetStarted: (role: 'landlord' | 'tenant') => void;
  onSignIn: () => void;
}

function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-2">
              <Building2 className={`w-8 h-8 transition-colors duration-300 ${scrollY > 50 ? 'text-blue-600' : 'text-white'}`} />
              <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${scrollY > 50 ? 'text-gray-900' : 'text-white'}`}>RentMate</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`transition-colors duration-300 hover:text-blue-600 ${scrollY > 50 ? 'text-gray-700' : 'text-white'}`}>Features</a>
              <a href="#how-it-works" className={`transition-colors duration-300 hover:text-blue-600 ${scrollY > 50 ? 'text-gray-700' : 'text-white'}`}>How It Works</a>
              <a href="#pricing" className={`transition-colors duration-300 hover:text-blue-600 ${scrollY > 50 ? 'text-gray-700' : 'text-white'}`}>Pricing</a>
              <button onClick={onSignIn} className={`px-4 py-2 transition-colors duration-300 ${scrollY > 50 ? 'text-blue-600 hover:text-blue-700' : 'text-white hover:text-blue-100'}`}>Sign In</button>
              <button onClick={() => onGetStarted('landlord')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-lg">Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Simplify Property Management.
              <br />
              <span className="text-green-400">Grow Your Business.</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              The all-in-one platform for property owners. Manage properties, collect rent, and invite tenants with ease.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button onClick={() => onGetStarted('landlord')} className="group px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-2xl text-lg font-semibold flex items-center justify-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button onClick={onSignIn} className="group px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-200 text-lg font-semibold flex items-center justify-center space-x-2">
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">1,000+</div>
                <div className="text-blue-100">Properties</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">5,000+</div>
                <div className="text-blue-100">Happy Tenants</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">99%</div>
                <div className="text-blue-100">On-Time Payments</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Powerful Features for Everyone</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to manage properties and rentals efficiently</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Landlords */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">For Landlords</h3>
              </div>
              <p className="text-xl text-blue-900 font-semibold mb-8">Effortless Property Management</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Property Portfolio Management</h4>
                    <p className="text-gray-600">Centralize all your properties, units, and leases in one intuitive dashboard</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Automated Rent Collection</h4>
                    <p className="text-gray-600">Set up automatic payments and receive notifications for overdue rent</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Digital Lease Management</h4>
                    <p className="text-gray-600">Create, sign, and store leases electronically with full legal compliance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Financial Analytics</h4>
                    <p className="text-gray-600">Track income, expenses, and generate comprehensive financial reports</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Tenants */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-green-600 rounded-xl">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">For Tenants</h3>
              </div>
              <p className="text-xl text-green-900 font-semibold mb-8">Streamlined Rental Experience</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Easy Online Payments</h4>
                    <p className="text-gray-600">Pay rent securely online with automatic reminders and payment history</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Bell className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Maintenance Requests</h4>
                    <p className="text-gray-600">Submit and track maintenance issues directly through the platform</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Direct Communication</h4>
                    <p className="text-gray-600">Message your landlord and get quick responses to your questions</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Document Access</h4>
                    <p className="text-gray-600">Access your lease, payment receipts, and important documents anytime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get started in minutes with our simple onboarding process</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full text-3xl font-bold mb-6 shadow-xl">1</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h3>
              <p className="text-gray-600 text-lg">Create your account as a landlord or tenant in under 2 minutes</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full text-3xl font-bold mb-6 shadow-xl">2</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Set Up Your Profile</h3>
              <p className="text-gray-600 text-lg">Add properties or connect with your landlord to access your rental</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full text-3xl font-bold mb-6 shadow-xl">3</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Manage with Ease</h3>
              <p className="text-gray-600 text-lg">Handle payments, maintenance, and communication all in one place</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose RentMate?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Built with modern technology for today's rental market</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-gray-600">Your data is encrypted and protected with industry-leading security</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Optimized performance ensures quick loading and smooth operations</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our dedicated support team is always here to help you succeed</p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-xl mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Always Improving</h3>
              <p className="text-gray-600">Regular updates with new features based on user feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join thousands of satisfied landlords and tenants</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-lg">"This platform has transformed how I manage my properties. The automated rent collection alone has saved me countless hours!"</p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">JD</div>
                <div>
                  <div className="font-semibold text-gray-900">John Doe</div>
                  <div className="text-sm text-gray-500">Property Owner</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-lg">"As a tenant, I love being able to pay rent and submit maintenance requests so easily. Communication with my landlord has never been better."</p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">SS</div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Smith</div>
                  <div className="text-sm text-gray-500">Tenant</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-lg">"The financial reporting features give me clear insights into my rental income. It's made tax season so much easier!"</p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">MJ</div>
                <div>
                  <div className="font-semibold text-gray-900">Mike Johnson</div>
                  <div className="text-sm text-gray-500">Portfolio Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200 hover:border-blue-600 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="text-5xl font-bold text-gray-900 mb-6">
                Free
              </div>
              <p className="text-gray-600 mb-8">Perfect for getting started</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">Up to 3 properties</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">Basic rent collection</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">Tenant portal</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">Email support</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-semibold">
                Get Started Free
              </button>
            </div>

            {/* Professional Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
              <div className="text-5xl font-bold text-white mb-2">
                $49
                <span className="text-xl font-normal">/mo</span>
              </div>
              <p className="text-blue-100 mb-8">For growing portfolios</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">Unlimited properties</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">Automated rent collection</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">Advanced analytics</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">Priority support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">Maintenance tracking</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors duration-200 font-semibold">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-200 hover:border-blue-600 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-5xl font-bold text-gray-900 mb-6">
                Custom
              </div>
              <p className="text-gray-600 mb-8">For large property managers</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">Everything in Pro</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">Team collaboration</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">Custom integrations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">Dedicated account manager</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 font-semibold">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of landlords and tenants who are already using RentMate to simplify their rental experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onGetStarted('landlord')} className="group px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-200 shadow-2xl text-lg font-semibold flex items-center justify-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button onClick={onSignIn} className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-200 text-lg font-semibold">
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold">RentMate</span>
              </div>
              <p className="text-gray-400 mb-4">Simplifying property management for landlords and tenants.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Updates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href="mailto:hello@rentmate.com" className="text-gray-400 hover:text-white transition-colors duration-200">hello@rentmate.com</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors duration-200">+1 (234) 567-890</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">© 2025 RentMate. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
