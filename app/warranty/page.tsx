'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle2,
  Package,
  Calendar,
  Mail,
  Phone,
  Upload,
  AlertCircle,
  FileText,
} from 'lucide-react';

const productCategories = [
  'Complete PC System',
  'CPU',
  'Graphics Card',
  'Motherboard',
  'RAM',
  'Storage (SSD/HDD)',
  'Power Supply',
  'Monitor',
  'Cooling System',
  'Other Component',
];

// Warranty configuration - can be modified per product
const EXTENDED_WARRANTY_PRICE = 5000;  // LKR
const EXTENDED_WARRANTY_YEARS = 2;

export default function WarrantyRegistrationPage() {
  const [formData, setFormData] = useState({
    orderNumber: '',
    productCategory: '',
    productName: '',
    serialNumber: '',
    purchaseDate: '',
    purchaseLocation: 'online',
    customerName: '',
    email: '',
    phone: '',
    address: '',
    receiptUploaded: false,
    extendedWarranty: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Warranty registration:', formData);
    setSubmitted(true);
  };

  const isFormValid =
    formData.orderNumber &&
    formData.productCategory &&
    formData.serialNumber &&
    formData.purchaseDate &&
    formData.customerName &&
    formData.email &&
    formData.phone;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Warranty Registered Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Your product warranty has been registered. You will receive a confirmation email at{' '}
              <span className="font-bold text-orange-600 dark:text-orange-500">
                {formData.email}
              </span>{' '}
              within 24 hours.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Registration Details:
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Order Number:</span>
                  <span className="font-mono text-gray-900 dark:text-white">
                    {formData.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Product:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {formData.productName || formData.productCategory}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Serial Number:</span>
                  <span className="font-mono text-gray-900 dark:text-white">
                    {formData.serialNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Warranty Status:</span>
                  <span className="text-green-600 dark:text-green-400 font-bold">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Valid Until:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {new Date(
                      new Date(formData.purchaseDate).setFullYear(
                        new Date(formData.purchaseDate).getFullYear() + 2
                      )
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => window.print()}
                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Print Confirmation
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors"
              >
                Register Another Product
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-600 to-blue-500 rounded-full mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Warranty Registration
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Register your product to activate warranty coverage and get exclusive benefits
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8 space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Product Information
              </h2>

              {/* Order Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order Number *
                </label>
                <input
                  type="text"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  placeholder="e.g., ORD-2025-00001"
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white font-mono"
                />
              </div>

              {/* Product Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Category *
                </label>
                <select
                  value={formData.productCategory}
                  onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                >
                  <option value="">Select category</option>
                  {productCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Name / Model
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  placeholder="e.g., AMD Ryzen 9 7950X"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              {/* Serial Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Serial Number *
                </label>
                <input
                  type="text"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                  placeholder="Found on product label or packaging"
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white font-mono"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Usually starts with S/N or SN followed by alphanumeric characters
                </p>
              </div>

              {/* Purchase Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Purchase Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                      max={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Purchase Location *
                  </label>
                  <select
                    value={formData.purchaseLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, purchaseLocation: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="online">CS02 Online Store</option>
                    <option value="colombo">Colombo Showroom</option>
                    <option value="kandy">Kandy Showroom</option>
                    <option value="galle">Galle Showroom</option>
                    <option value="authorized">Authorized Retailer</option>
                  </select>
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-700" />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>

              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="Your full name"
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+94 77 123 4567"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address, city, postal code"
                  rows={3}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
                />
              </div>

              {/* Receipt Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Receipt (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF, JPG or PNG (max 5MB)
                  </p>
                </div>
              </div>

              {/* Extended Warranty Upsell */}
              <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    id="extendedWarranty"
                    checked={formData.extendedWarranty}
                    onChange={(e) =>
                      setFormData({ ...formData, extendedWarranty: e.target.checked })
                    }
                    className="mt-1 w-5 h-5 text-orange-600 focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="extendedWarranty"
                      className="font-bold text-gray-900 dark:text-white cursor-pointer"
                    >
                      Add Extended Warranty (+{EXTENDED_WARRANTY_YEARS} Years)
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Extend your warranty to {2 + EXTENDED_WARRANTY_YEARS} years total for only LKR {EXTENDED_WARRANTY_PRICE.toLocaleString()}. Covers accidental
                      damage and priority support.
                    </p>
                  </div>
                  <span className="text-xl font-bold text-orange-600 dark:text-orange-500">
                    LKR {EXTENDED_WARRANTY_PRICE.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <CheckCircle2 className="w-5 h-5" />
                Register Warranty
              </button>
            </motion.form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Package className="w-6 h-6" />
                Registration Benefits
              </h3>
              <ul className="space-y-3">
                {[
                  'Activate warranty coverage',
                  'Priority customer support',
                  'Faster RMA processing',
                  'Exclusive product updates',
                  'Extended warranty options',
                  'Service history tracking',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Help */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
                    Need Help?
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                    Can&apos;t find your serial number or have questions about warranty registration?
                  </p>
                  <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
                    Contact Support →
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Warranty Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Standard Warranty
              </h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <span className="font-bold text-gray-900 dark:text-white">
                    2 Years Coverage:
                  </span>{' '}
                  All products include manufacturer&apos;s warranty
                </p>
                <p>
                  <span className="font-bold text-gray-900 dark:text-white">
                    What&apos;s Covered:
                  </span>{' '}
                  Manufacturing defects, component failures
                </p>
                <p>
                  <span className="font-bold text-gray-900 dark:text-white">Not Covered:</span>{' '}
                  Physical damage, liquid damage, user modifications
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
