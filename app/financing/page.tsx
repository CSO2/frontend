'use client';

import { motion } from 'framer-motion';
import { CreditCard, Calendar, DollarSign, CheckCircle, Calculator } from 'lucide-react';
import { useState } from 'react';

export default function Financing() {
  const [amount, setAmount] = useState(2000);
  const [months, setMonths] = useState(12);

  const calculateMonthly = () => {
    const interestRate = 0.099; // 9.9% APR
    const monthlyRate = interestRate / 12;
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1);
    return payment.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Flexible Financing Options
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Build your dream PC now, pay over time with 0% APR financing
          </p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-orange-600 dark:text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Payment Calculator</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Purchase Amount
              </label>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span>$500</span>
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                  ${amount.toLocaleString()}
                </span>
                <span>$10,000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Payment Period
              </label>
              <select
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              >
                <option value={6}>6 months</option>
                <option value={12}>12 months (0% APR)</option>
                <option value={18}>18 months (0% APR)</option>
                <option value={24}>24 months</option>
                <option value={36}>36 months</option>
              </select>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-linear-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-2 border-orange-200 dark:border-orange-800">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Your Estimated Monthly Payment</p>
            <p className="text-5xl font-bold text-orange-600 dark:text-orange-500">
              ${months <= 18 ? (amount / months).toFixed(2) : calculateMonthly()}/mo
            </p>
            {months <= 18 && (
              <p className="text-sm text-green-600 dark:text-green-500 mt-2 font-semibold">
                ✓ 0% APR - No Interest!
              </p>
            )}
          </div>
        </motion.div>

        {/* Financing Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              name: 'Klarna',
              desc: 'Split your purchase into 4 interest-free payments',
              features: ['No interest', 'Pay every 2 weeks', 'Instant approval', 'No hidden fees']
            },
            {
              name: 'Affirm',
              desc: '0% APR financing for 12-18 months on purchases $500+',
              features: ['0% APR available', 'Monthly payments', 'No late fees', 'Prequalify in seconds']
            },
            {
              name: 'PayPal Credit',
              desc: '6 months special financing on purchases $99+',
              features: ['No interest if paid in full', 'Flexible payments', 'Instant decision', 'Secure checkout']
            }
          ].map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-orange-500 transition"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{option.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{option.desc}</p>
              <ul className="space-y-3">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Shop', desc: 'Add items to your cart' },
              { step: '2', title: 'Choose', desc: 'Select financing at checkout' },
              { step: '3', title: 'Apply', desc: 'Get instant approval decision' },
              { step: '4', title: 'Enjoy', desc: 'Receive your order and pay over time' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-orange-600 to-orange-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center space-y-4"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/pc-builder"
              className="inline-block px-8 py-4 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition"
            >
              Start Building Your PC
            </a>
            <a
              href="/cart"
              className="inline-block px-8 py-4 border-2 border-orange-500 text-orange-600 dark:text-orange-500 rounded-xl font-bold text-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
            >
              View Your Cart
            </a>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have items in your cart? Apply for financing at checkout
          </p>
        </motion.div>
      </div>
    </div>
  );
}
