'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Recycle,
  Upload,
  CheckCircle2,
  DollarSign,
  Package,
  Calendar,
  Camera,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

const productCategories = [
  'Desktop PC',
  'Laptop',
  'CPU',
  'Graphics Card',
  'Motherboard',
  'RAM',
  'Storage (SSD/HDD)',
  'Power Supply',
  'Monitor',
  'Other Component',
];

const conditionOptions = [
  { value: 'excellent', label: 'Excellent', multiplier: 1.0, description: 'Like new, minimal signs of use' },
  { value: 'good', label: 'Good', multiplier: 0.8, description: 'Minor scratches, fully functional' },
  { value: 'fair', label: 'Fair', multiplier: 0.6, description: 'Visible wear, works properly' },
  { value: 'poor', label: 'Poor', multiplier: 0.4, description: 'Heavy wear, may have minor issues' },
];

const baseValues: Record<string, number> = {
  'Desktop PC': 25000,
  'Laptop': 30000,
  'CPU': 15000,
  'Graphics Card': 35000,
  'Motherboard': 12000,
  'RAM': 8000,
  'Storage (SSD/HDD)': 6000,
  'Power Supply': 5000,
  'Monitor': 18000,
  'Other Component': 3000,
};

export default function TradeInPage() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [condition, setCondition] = useState('');
  const [accessories, setAccessories] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [estimatedValue, setEstimatedValue] = useState(0);

  const accessoryOptions = ['Original Box', 'Cables', 'Power Adapter', 'Manual', 'Warranty Card'];

  const calculateEstimate = () => {
    if (!category || !condition) return 0;
    const baseValue = baseValues[category] || 0;
    const conditionMult = conditionOptions.find((c) => c.value === condition)?.multiplier || 0;
    const accessoryBonus = accessories.length * 500;
    const ageDeduction =
      purchaseDate && new Date(purchaseDate).getFullYear() < new Date().getFullYear() - 2
        ? 2000
        : 0;
    return Math.max(0, baseValue * conditionMult + accessoryBonus - ageDeduction);
  };

  const handleSubmit = () => {
    const estimate = calculateEstimate();
    setEstimatedValue(estimate);
    setStep(3);
  };

  const toggleAccessory = (accessory: string) => {
    setAccessories((prev) =>
      prev.includes(accessory) ? prev.filter((a) => a !== accessory) : [...prev, accessory]
    );
  };

  const isStep1Valid = category && brand && model;
  const isStep2Valid = condition && serialNumber;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-green-500 rounded-full mb-6">
            <Recycle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trade-In Your Device
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get instant credit towards your next purchase. Eco-friendly and hassle-free.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      step > s ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-20 mt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Device Info</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Condition</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Quote</p>
          </div>
        </div>

        {/* Step 1: Device Information */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Package className="w-7 h-7" />
              Tell Us About Your Device
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                >
                  <option value="">Select category</option>
                  {productCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g., AMD, Intel, ASUS"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g., Ryzen 9 7950X"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Purchase Date (Optional)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Details
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Any additional information about your device..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Continue to Condition Assessment
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Condition Assessment */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-7 h-7" />
              Assess Device Condition
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Condition *
                </label>
                <div className="space-y-3">
                  {conditionOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setCondition(opt.value)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        condition === opt.value
                          ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{opt.label}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {opt.description}
                          </p>
                        </div>
                        <div
                          className={`text-lg font-bold ${
                            condition === opt.value
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {Math.round(opt.multiplier * 100)}%
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Serial Number *
                </label>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="Enter device serial number"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Included Accessories (Optional)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {accessoryOptions.map((accessory) => (
                    <button
                      key={accessory}
                      onClick={() => toggleAccessory(accessory)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        accessories.includes(accessory)
                          ? 'border-green-600 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            accessories.includes(accessory)
                              ? 'border-green-600 bg-green-600'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {accessories.includes(accessory) && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="font-medium">{accessory}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Each accessory adds LKR 500 to your quote
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                  <Camera className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Click to upload device photos
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Photos help us provide a more accurate quote
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isStep2Valid}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Get Instant Quote
                  <DollarSign className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Quote */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Your Trade-In Quote
              </h2>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-8 border-2 border-green-200 dark:border-green-800 mb-8">
              <p className="text-center text-gray-600 dark:text-gray-400 mb-2">
                Estimated Value
              </p>
              <p className="text-center text-5xl font-bold text-green-600 dark:text-green-400 mb-6">
                LKR {estimatedValue.toLocaleString()}
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Device:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {brand} {model}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Condition:</span>
                  <span className="font-bold text-gray-900 dark:text-white capitalize">
                    {condition}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400">Accessories:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {accessories.length} items
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-blue-900 dark:text-blue-300 mb-1">
                    This is an estimated quote
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Final value will be determined after physical inspection at our store. Quote
                    valid for 7 days.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Modify Details
              </button>
              <button className="flex-1 px-6 py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors">
                Submit Trade-In Request
              </button>
            </div>
          </motion.div>
        )}

        {/* How It Works */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              How Trade-In Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { num: 1, title: 'Submit Details', desc: 'Tell us about your device online' },
                {
                  num: 2,
                  title: 'Get Quote',
                  desc: 'Receive instant estimated value in LKR',
                },
                { num: 3, title: 'Ship or Visit', desc: 'Free shipping or visit our store' },
                { num: 4, title: 'Get Paid', desc: 'Store credit or bank transfer' },
              ].map((item) => (
                <div
                  key={item.num}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    {item.num}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
