'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, Phone, Sparkles, Building2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';

interface SignupForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
  preferredStore: 'colombo' | 'kandy' | 'galle';
}

// Calculate password strength
const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;

  if (strength === 0) return { strength: 0, label: '', color: '' };
  if (strength === 1) return { strength: 1, label: 'Weak', color: 'text-red-600 dark:text-red-400' };
  if (strength === 2) return { strength: 2, label: 'Fair', color: 'text-yellow-600 dark:text-yellow-400' };
  if (strength === 3) return { strength: 3, label: 'Good', color: 'text-blue-600 dark:text-blue-400' };
  return { strength: 4, label: 'Strong', color: 'text-green-600 dark:text-green-400' };
};

export default function SignupPage() {
  const router = useRouter();
  const { register } = useUserStore();
  const [formData, setFormData] = useState<SignupForm>({
    fullName: '',
    email: '',
    phone: '+94 ',
    password: '',
    confirmPassword: '',
    newsletter: true,
    preferredStore: 'colombo',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
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

    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please complete all required fields.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please check again.');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        preferences: {
          newsletter: formData.newsletter,
          preferredStore: formData.preferredStore
        }
      });

      setSuccess(true);
      setTimeout(() => router.push('/account'), 1200);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
              <UserPlus className="h-4 w-4" />
              Join the CS02 community
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground">
              Create your <span className="text-primary">CS02</span> account
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Sign up to unlock personalised build recommendations, manage orders, and earn LKR rewards every time you upgrade your gear.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className="bg-card border border-border rounded-2xl p-4 shadow-md text-card-foreground"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {step}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {step === 1 && 'Choose your preferred CS02 showroom'}
                      {step === 2 && 'Save builds with compatibility guidance'}
                      {step === 3 && 'Earn LKR rewards on every purchase'}
                      {step === 4 && 'Get priority support in Sri Lanka'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg text-card-foreground">
              <h2 className="text-lg font-semibold text-foreground mb-3">CS02 member perks</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-1 text-primary" />
                  Exclusive launch offers for Sri Lankan customers
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-1 text-primary" />
                  Free tune-ups on custom rigs purchased in Colombo, Kandy, or Galle
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-1 text-primary" />
                  Faster warranty claims and service appointments
                </li>
              </ul>
            </div>

            <div className="text-sm text-muted-foreground">
              Already have an account?
              <Link href="/login" className="ml-2 font-semibold text-primary hover:text-primary/80">
                Sign in here
              </Link>
            </div>
          </motion.div>

          {/* Signup form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 text-card-foreground">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full name
                    </label>
                    <div className="relative">
                      <Sparkles className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Dinuka Perera"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone number
                    </label>
                    <div className="relative">
                      <Phone className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+94 77 123 4567"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum 8 characters with a number and symbol recommended.
                    </p>
                    {formData.password && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-muted-foreground">
                            Password Strength:
                          </span>
                          <span className={`text-xs font-bold ${getPasswordStrength(formData.password).color}`}>
                            {getPasswordStrength(formData.password).label}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(getPasswordStrength(formData.password).strength / 4) * 100}%` }}
                            className={`h-full transition-all ${getPasswordStrength(formData.password).strength === 1 ? 'bg-destructive' :
                              getPasswordStrength(formData.password).strength === 2 ? 'bg-yellow-500' :
                                getPasswordStrength(formData.password).strength === 3 ? 'bg-blue-500' :
                                  'bg-green-500'
                              }`}
                          />
                        </div>
                        <ul className="text-xs space-y-1 mt-2">
                          <li className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-green-600' : 'text-muted-foreground'}`}>
                            {formData.password.length >= 8 ? '✓' : '○'} At least 8 characters
                          </li>
                          <li className={`flex items-center gap-1 ${formData.password.match(/[a-z]/) && formData.password.match(/[A-Z]/) ? 'text-green-600' : 'text-muted-foreground'}`}>
                            {formData.password.match(/[a-z]/) && formData.password.match(/[A-Z]/) ? '✓' : '○'} Upper and lowercase letters
                          </li>
                          <li className={`flex items-center gap-1 ${formData.password.match(/[0-9]/) ? 'text-green-600' : 'text-muted-foreground'}`}>
                            {formData.password.match(/[0-9]/) ? '✓' : '○'} At least one number
                          </li>
                          <li className={`flex items-center gap-1 ${formData.password.match(/[^a-zA-Z0-9]/) ? 'text-green-600' : 'text-muted-foreground'}`}>
                            {formData.password.match(/[^a-zA-Z0-9]/) ? '✓' : '○'} Special character (!@#$%^&*)
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Confirm password
                    </label>
                    <div className="relative">
                      <Lock className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repeat password"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Preferred showroom
                  </label>
                  <div className="relative">
                    <Building2 className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      name="preferredStore"
                      value={formData.preferredStore}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                    >
                      <option value="colombo">Colombo - Flagship Store</option>
                      <option value="kandy">Kandy - Central Hub</option>
                      <option value="galle">Galle - Southern Experience Centre</option>
                    </select>
                  </div>
                </div>

                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="mt-1 accent-primary"
                  />
                  <span>
                    Keep me updated about CS02 launches, trade-in events, and LKR exclusive deals. (We send a maximum of two emails per month.)
                  </span>
                </label>

                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm rounded-xl p-3">
                    {error}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold shadow-lg hover:bg-primary/90 transition disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating your account...
                    </>
                  ) : (
                    <>
                      Create account
                      <Sparkles className="h-5 w-5" />
                    </>
                  )}
                </motion.button>

                {success && (
                  <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-sm rounded-xl p-3 text-center">
                    Welcome to CS02! Redirecting you to your dashboard.
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
