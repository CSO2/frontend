'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Sparkles, Zap, DollarSign } from 'lucide-react';
import Link from 'next/link';

type UseCase = 'gaming' | 'work' | 'content' | 'streaming' | 'mixed';
type Budget = 'budget' | 'mid' | 'high' | 'extreme';

export default function BuilderQuiz() {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState(1500);
  const [useCase, setUseCase] = useState<UseCase | null>(null);
  const [preferences, setPreferences] = useState<string[]>([]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const togglePreference = (pref: string) => {
    setPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (budget < 1000) {
      recommendations.push({
        name: 'Budget Builder',
        price: 899,
        description: 'Perfect 1080p gaming starter build',
        components: ['AMD Ryzen 5 7600X', 'AMD RX 7700 XT', '16GB DDR5', '1TB NVMe SSD']
      });
    } else if (budget < 2000) {
      recommendations.push({
        name: '1440p Performance',
        price: 1799,
        description: 'Great balance of price and performance',
        components: ['Intel Core i5-13600K', 'NVIDIA RTX 4070', '32GB DDR5', '2TB NVMe SSD']
      });
    } else if (budget < 3500) {
      recommendations.push({
        name: 'High-End Gaming',
        price: 3299,
        description: '4K gaming at high framerates',
        components: ['AMD Ryzen 9 7950X', 'NVIDIA RTX 4080', '32GB DDR5', '2TB NVMe SSD']
      });
    } else {
      recommendations.push({
        name: 'Ultimate Flagship',
        price: 4999,
        description: 'The best of the best',
        components: ['Intel Core i9-13900KS', 'NVIDIA RTX 4090', '64GB DDR5', '4TB NVMe SSD']
      });
    }

    if (useCase === 'work' || useCase === 'content') {
      recommendations.push({
        name: 'Workstation Pro',
        price: Math.min(budget, 3500),
        description: 'Optimized for productivity and content creation',
        components: ['AMD Ryzen 9 7950X', 'NVIDIA RTX 4070 Ti', '64GB DDR5', '4TB NVMe SSD']
      });
    }

    if (preferences.includes('compact')) {
      recommendations.push({
        name: 'Mini ITX Compact',
        price: Math.min(budget, 2800),
        description: 'High performance in a tiny footprint',
        components: ['AMD Ryzen 7 7800X3D', 'NVIDIA RTX 4070', '32GB DDR5', '2TB NVMe SSD']
      });
    }

    return recommendations.slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 font-semibold mb-4">
            <Sparkles className="w-5 h-5" />
            System Builder Quiz
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Find Your Perfect PC
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Answer a few questions and we'll recommend the best build for you
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition ${
                  s <= step
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-600'
                }`}
              >
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              className="h-full bg-gradient-to-r from-orange-600 to-orange-500"
            />
          </div>
        </div>

        {/* Quiz Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-8 md:p-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-8 h-8 text-orange-600 dark:text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  What's your budget?
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-4">
                    <span className="text-lg text-gray-700 dark:text-gray-300">Budget Range</span>
                    <span className="text-3xl font-bold text-orange-600 dark:text-orange-500">
                      ${budget.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="6000"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-600 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <span>$500</span>
                    <span>$6,000</span>
                  </div>
                </div>

                {/* Quick Budget Presets */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Budget', amount: 800 },
                    { label: 'Mid-Range', amount: 1500 },
                    { label: 'High-End', amount: 3000 },
                    { label: 'Extreme', amount: 5000 }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setBudget(preset.amount)}
                      className={`p-4 rounded-xl border-2 transition ${
                        Math.abs(budget - preset.amount) < 200
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                    >
                      <p className="font-bold text-gray-900 dark:text-white">{preset.label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ${preset.amount.toLocaleString()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-8 md:p-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-orange-600 dark:text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  What will you use it for?
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { id: 'gaming', label: 'Gaming', desc: 'High FPS and great graphics', icon: '🎮' },
                  { id: 'work', label: 'Work/Productivity', desc: 'Office tasks and multitasking', icon: '💼' },
                  { id: 'content', label: 'Content Creation', desc: 'Video editing and 3D work', icon: '🎨' },
                  { id: 'streaming', label: 'Streaming', desc: 'Live streaming and recording', icon: '📹' },
                  { id: 'mixed', label: 'Mixed Use', desc: 'A bit of everything', icon: '🔀' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setUseCase(option.id as UseCase)}
                    className={`p-6 rounded-xl border-2 text-left transition ${
                      useCase === option.id
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-8 md:p-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Any preferences?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Select all that apply (optional)
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { id: 'rgb', label: 'RGB Lighting', desc: 'Colorful and customizable' },
                  { id: 'quiet', label: 'Quiet Operation', desc: 'Minimal noise levels' },
                  { id: 'compact', label: 'Compact Size', desc: 'Small form factor' },
                  { id: 'upgrade', label: 'Upgradability', desc: 'Easy to upgrade later' },
                  { id: 'intel', label: 'Prefer Intel', desc: 'Intel CPUs' },
                  { id: 'amd', label: 'Prefer AMD', desc: 'AMD CPUs' }
                ].map((pref) => (
                  <button
                    key={pref.id}
                    onClick={() => togglePreference(pref.id)}
                    className={`p-6 rounded-xl border-2 text-left transition ${
                      preferences.includes(pref.id)
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {pref.label}
                      </h3>
                      {preferences.includes(pref.id) && (
                        <Check className="w-6 h-6 text-orange-600 dark:text-orange-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{pref.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Your Perfect Builds
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Based on your preferences, we recommend these configurations:
                </p>

                <div className="space-y-6">
                  {getRecommendations().map((build, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-6 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {build.name}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300">{build.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Price</p>
                          <p className="text-3xl font-bold text-orange-600 dark:text-orange-500">
                            ${build.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 mb-6">
                        {build.components.map((comp, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-500" />
                            {comp}
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Link
                          href="/pc-builder"
                          className="flex-1 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition text-center"
                        >
                          Customize This Build
                        </Link>
                        <button className="px-6 py-3 border-2 border-orange-600 text-orange-600 dark:text-orange-500 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition">
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setStep(1);
                    setBudget(1500);
                    setUseCase(null);
                    setPreferences([]);
                  }}
                  className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  Start Over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={(step === 2 && !useCase)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:shadow-lg"
            >
              {step === 3 ? 'See Results' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
