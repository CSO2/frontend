'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck, Smartphone } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import toast from 'react-hot-toast';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const tips = [
  'Earn 2% back in LKR rewards on every purchase when you log in.',
  'Track orders, download invoices, and manage warranty claims in one place.',
  'Sri Lankan customers get express store pick-up in Colombo, Kandy, and Galle.'
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    remember: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tipIndex, setTipIndex] = useState(0);

  const redirect = searchParams.get('redirect') || '/account';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (event.target.type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: event.target.checked,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password to continue.');
      return;
    }

    setLoading(true);

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });

      toast.success('Successfully logged in!');
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Intro Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 bg-wso2-orange/10 text-wso2-orange px-3 py-1 rounded-full text-sm font-semibold mb-6">
              <ShieldCheck className="h-4 w-4" />
              Secure sign-in
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome back to <span className="text-wso2-orange">CS02</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              Sign in to manage your custom PC builds, review past orders, and earn LKR rewards on every purchase. Your dashboard keeps everything organized for an effortless experience in Sri Lanka.
            </p>

            <motion.div
              key={tipIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Why log in?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                {tips[tipIndex]}
              </p>
              <button
                onClick={handleNextTip}
                className="text-sm font-semibold text-wso2-orange hover:text-wso2-orange-dark transition-colors"
              >
                Show another benefit →
              </button>
            </motion.div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-wso2-orange/10 flex items-center justify-center text-wso2-orange">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Need help signing in?</p>
                  <Link
                    href="/contact"
                    className="text-sm font-semibold text-wso2-orange hover:text-wso2-orange-dark"
                  >
                    Contact Colombo support →
                  </Link>
                </div>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                New to CS02?
                <Link
                  href="/signup"
                  className="ml-2 font-semibold text-wso2-orange hover:text-wso2-orange-dark"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-wso2-orange transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-wso2-orange transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <label className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                      className="mr-2 accent-wso2-orange"
                    />
                    Remember me on this device
                  </label>
                  <Link href="/support" className="text-sm font-semibold text-wso2-orange hover:text-wso2-orange-dark">
                    Forgot password?
                  </Link>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm rounded-xl p-3">
                    {error}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-wso2-orange text-white py-3.5 rounded-xl font-semibold shadow-lg hover:bg-wso2-orange-dark transition disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Signing you in...
                    </>
                  ) : (
                    <>
                      Continue to dashboard
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </motion.button>

                {/* Demo Logins */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center font-medium">Or try demo accounts:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        setFormData({ email: 'customer@demo.lk', password: 'demo', remember: true });
                        setLoading(true);
                        try {
                          await login({
                            email: 'customer@demo.lk',
                            password: 'demo',
                          });
                          toast.success('Demo customer login successful!');
                          router.push(redirect);
                        } catch (err: any) {
                          setError(err.message || 'Demo login failed');
                          toast.error('Demo login failed');
                        } finally {
                          setLoading(false);
                        }
                      }}
                      className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition border border-blue-200 dark:border-blue-800"
                    >
                      👤 Customer
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        setFormData({ email: 'admin@demo.lk', password: 'demo', remember: true });
                        setLoading(true);
                        try {
                          await login({
                            email: 'admin@demo.lk',
                            password: 'demo',
                          });
                          toast.success('Demo admin login successful!');
                          router.push('/admin');
                        } catch (err: any) {
                          setError(err.message || 'Demo login failed');
                          toast.error('Demo login failed');
                        } finally {
                          setLoading(false);
                        }
                      }}
                      className="px-3 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg text-sm font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/40 transition border border-purple-200 dark:border-purple-800"
                    >
                      ⚙️ Admin
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-8 grid gap-4">
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                  Or sign in with
                  <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['Google', 'Microsoft'].map((provider) => (
                    <button
                      key={provider}
                      className="border border-gray-300 dark:border-gray-700 rounded-xl py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-wso2-orange hover:text-wso2-orange transition"
                      type="button"
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
