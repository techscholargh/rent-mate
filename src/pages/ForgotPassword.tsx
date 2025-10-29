import { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle, Home } from 'lucide-react';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
  onBackToLanding?: () => void;
}

export default function ForgotPassword({ onBackToLogin, onBackToLanding }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Success Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-blue-500/10 p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email</h2>
            <p className="text-gray-600 mb-2">
              We've sent password reset instructions to:
            </p>
            <p className="text-blue-600 font-semibold mb-6">{email}</p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">What's next?</strong>
              </p>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                  <span>Check your email inbox (and spam folder)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                  <span>Click the reset link in the email</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                  <span>Create your new password</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onBackToLogin}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl transform hover:-translate-y-0.5 mb-4"
            >
              Back to Login
            </button>

            <button
              onClick={() => setIsSubmitted(false)}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Didn't receive the email? Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/5076531/pexels-photo-5076531.jpeg?auto=compress&cs=tinysrgb&w=1200)'
          }}
        />
        <div className="relative z-10 max-w-md text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Home className="w-7 h-7 text-blue-600" />
            </div>
            <span className="text-3xl font-bold">RentMate</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">Password Recovery</h1>
          <p className="text-xl text-blue-100">
            Don't worry! It happens to the best of us. Enter your email and we'll send you instructions to reset your password.
          </p>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Enter your email</h3>
                <p className="text-sm text-blue-100">Provide the email associated with your account</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Check your inbox</h3>
                <p className="text-sm text-blue-100">We'll send you a secure reset link</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Reset your password</h3>
                <p className="text-sm text-blue-100">Create a new secure password</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">RentMate</span>
          </div>

          {/* Back Buttons */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={onBackToLogin}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Login</span>
            </button>
            {onBackToLanding && (
              <>
                <span className="text-gray-300">|</span>
                <button
                  onClick={onBackToLanding}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
              </>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p className="text-gray-600">No worries, we'll send you reset instructions.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Additional Help */}
          <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Need help?</strong>
              <br />
              If you're having trouble resetting your password, contact our support team at{' '}
              <a href="mailto:support@rentmate.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                support@rentmate.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
