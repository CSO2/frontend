'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gift,
  CreditCard,
  Mail,
  Calendar,
  Check,
  ArrowRight,
  Search,
  Eye,
} from 'lucide-react';

const giftCardDesigns = [
  { id: '1', name: 'Orange Gradient', preview: 'bg-linear-to-br from-orange-600 to-orange-400' },
  { id: '2', name: 'Tech Blue', preview: 'bg-linear-to-br from-blue-600 to-purple-600' },
  { id: '3', name: 'Gaming Red', preview: 'bg-linear-to-br from-red-600 to-pink-600' },
  { id: '4', name: 'Classic Black', preview: 'bg-linear-to-br from-gray-800 to-gray-900' },
];

const presetAmounts = [2500, 5000, 10000, 25000, 50000];

export default function GiftCardsPage() {
  const [activeTab, setActiveTab] = useState<'purchase' | 'balance'>('purchase');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [selectedDesign, setSelectedDesign] = useState('1');

  // Balance check
  const [cardNumber, setCardNumber] = useState('');
  const [pin, setPin] = useState('');
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(15000);

  const handleCheckBalance = () => {
    // Simulate balance check
    setShowBalance(true);
  };

  const finalAmount = selectedAmount || parseInt(customAmount) || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-orange-600 to-orange-500 rounded-full mb-6">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Gift Cards
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Give the gift of choice with CS02 gift cards
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveTab('purchase')}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'purchase'
                ? 'bg-orange-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-700'
            }`}
          >
            Purchase Gift Card
          </button>
          <button
            onClick={() => setActiveTab('balance')}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'balance'
                ? 'bg-orange-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-700'
            }`}
          >
            Check Balance
          </button>
        </div>

        {/* Purchase Tab */}
        {activeTab === 'purchase' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Purchase Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8 space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Customize Your Gift Card
              </h2>

              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Select Amount (LKR)
                </label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`p-4 rounded-lg font-bold transition-colors ${
                        selectedAmount === amount
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                      }`}
                    >
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Custom amount (min LKR 1,000)"
                  min="1000"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              {/* Design Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Choose Design
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {giftCardDesigns.map((design) => (
                    <button
                      key={design.id}
                      onClick={() => setSelectedDesign(design.id)}
                      className={`relative aspect-[1.6/1] rounded-lg overflow-hidden border-4 transition-all ${
                        selectedDesign === design.id
                          ? 'border-orange-600 shadow-lg'
                          : 'border-gray-300 dark:border-gray-700 hover:border-orange-300'
                      }`}
                    >
                      <div className={`w-full h-full ${design.preview}`}>
                        <div className="absolute inset-0 flex flex-col justify-between p-4">
                          <div className="text-white text-left">
                            <p className="text-xs font-bold">CS02 COMPUTER STORE</p>
                          </div>
                          <div className="text-white text-right">
                            <p className="text-lg font-bold">GIFT CARD</p>
                          </div>
                        </div>
                      </div>
                      {selectedDesign === design.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-orange-600" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Enter recipient's name"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recipient Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="recipient@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Personal Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Personal Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a personal message..."
                  maxLength={200}
                  rows={4}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {message.length}/200 characters
                </p>
              </div>

              {/* Delivery Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Delivery Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Leave empty for immediate delivery
                </p>
              </div>
            </motion.div>

            {/* Preview & Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Gift Card Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Preview</h3>
                <div className="aspect-[1.6/1] rounded-xl overflow-hidden shadow-2xl mb-6">
                  <div
                    className={`w-full h-full ${
                      giftCardDesigns.find((d) => d.id === selectedDesign)?.preview
                    }`}
                  >
                    <div className="h-full flex flex-col justify-between p-6">
                      <div className="text-white">
                        <p className="text-sm font-bold mb-2">CS02 COMPUTER STORE</p>
                        <p className="text-xs opacity-80">Sri Lanka&apos;s #1 PC Store</p>
                      </div>
                      <div className="text-white">
                        <p className="text-4xl font-bold mb-2">
                          {finalAmount > 0 ? `LKR ${finalAmount.toLocaleString()}` : 'LKR 0'}
                        </p>
                        <p className="text-lg font-bold">GIFT CARD</p>
                      </div>
                    </div>
                  </div>
                </div>

                {recipientName && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">To:</p>
                    <p className="font-bold text-gray-900 dark:text-white">{recipientName}</p>
                  </div>
                )}

                {message && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Message:</p>
                    <p className="text-gray-900 dark:text-white italic">&quot;{message}&quot;</p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Gift Card Value</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      LKR {finalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Processing Fee</span>
                    <span className="font-bold text-gray-900 dark:text-white">Free</span>
                  </div>
                  <div className="pt-3 border-t-2 border-gray-200 dark:border-gray-700 flex justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-orange-600 dark:text-orange-500">
                      LKR {finalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  disabled={finalAmount < 1000 || !recipientEmail}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>

                {finalAmount < 1000 && finalAmount > 0 && (
                  <p className="text-sm text-red-600 dark:text-red-400 text-center mt-3">
                    Minimum amount is LKR 1,000
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Balance Check Tab */}
        {activeTab === 'balance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Check Gift Card Balance
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gift Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    maxLength={19}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    PIN
                  </label>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="****"
                    maxLength={4}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white font-mono"
                  />
                </div>

                <button
                  onClick={handleCheckBalance}
                  disabled={cardNumber.length < 16 || pin.length < 4}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  Check Balance
                </button>

                {showBalance && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border-2 border-orange-200 dark:border-orange-800"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Available Balance
                    </p>
                    <p className="text-4xl font-bold text-orange-600 dark:text-orange-500 mb-4">
                      LKR {balance.toLocaleString()}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Card Number:</span>
                        <span className="font-mono text-gray-900 dark:text-white">
                          ****-****-****-{cardNumber.slice(-4)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                        <span className="font-bold text-green-600 dark:text-green-400">
                          Active
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
