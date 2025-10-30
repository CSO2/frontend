'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Monitor,
  Cpu,
  Gamepad2,
  Video,
  Code,
  Palette,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Zap,
  Eye,
  Settings,
} from 'lucide-react';

const useCases = [
  { id: 'gaming', label: '🎮 Gaming', icon: Gamepad2 },
  { id: 'work', label: '💼 Office/Work', icon: Code },
  { id: 'content', label: '🎨 Content Creation', icon: Palette },
  { id: 'streaming', label: '📹 Streaming', icon: Video },
  { id: 'budget', label: '💰 Budget Build', icon: TrendingUp },
];

const requirements = {
  gaming: {
    minimum: {
      cpu: 'Intel i5-12400 / Ryzen 5 5600X',
      gpu: 'RTX 3060 / RX 6600 XT',
      ram: '16GB DDR4 3200MHz',
      storage: '512GB NVMe SSD',
      resolution: '1080p @ 60 FPS',
      budget: 'LKR 200,000 - 250,000',
    },
    recommended: {
      cpu: 'Intel i7-13700K / Ryzen 7 7700X',
      gpu: 'RTX 4070 / RX 7800 XT',
      ram: '32GB DDR5 5600MHz',
      storage: '1TB Gen4 NVMe SSD',
      resolution: '1440p @ 144 FPS',
      budget: 'LKR 350,000 - 450,000',
    },
    ideal: {
      cpu: 'Intel i9-13900K / Ryzen 9 7950X',
      gpu: 'RTX 4090 / RX 7900 XTX',
      ram: '64GB DDR5 6000MHz',
      storage: '2TB Gen4 NVMe SSD',
      resolution: '4K @ 120 FPS',
      budget: 'LKR 700,000+',
    },
  },
  work: {
    minimum: {
      cpu: 'Intel i3-12100 / Ryzen 5 5500',
      gpu: 'Integrated Graphics',
      ram: '8GB DDR4 2666MHz',
      storage: '256GB SATA SSD',
      resolution: '1080p',
      budget: 'LKR 75,000 - 100,000',
    },
    recommended: {
      cpu: 'Intel i5-13400 / Ryzen 5 7600',
      gpu: 'Integrated Graphics / Entry GPU',
      ram: '16GB DDR4 3200MHz',
      storage: '512GB NVMe SSD',
      resolution: '1080p - 1440p',
      budget: 'LKR 150,000 - 200,000',
    },
    ideal: {
      cpu: 'Intel i7-13700 / Ryzen 7 7700',
      gpu: 'RTX 4060 / RX 7600',
      ram: '32GB DDR5 4800MHz',
      storage: '1TB NVMe SSD',
      resolution: 'Dual 1440p',
      budget: 'LKR 300,000+',
    },
  },
  content: {
    minimum: {
      cpu: 'Intel i7-12700 / Ryzen 7 5800X',
      gpu: 'RTX 3060 / RX 6600 XT',
      ram: '32GB DDR4 3200MHz',
      storage: '1TB NVMe SSD',
      resolution: '1080p Editing',
      budget: 'LKR 250,000 - 300,000',
    },
    recommended: {
      cpu: 'Intel i9-13900K / Ryzen 9 7900X',
      gpu: 'RTX 4070 Ti / RX 7900 XT',
      ram: '64GB DDR5 5600MHz',
      storage: '2TB Gen4 NVMe SSD',
      resolution: '4K Editing',
      budget: 'LKR 500,000 - 650,000',
    },
    ideal: {
      cpu: 'Intel i9-13900KS / Ryzen 9 7950X',
      gpu: 'RTX 4090',
      ram: '128GB DDR5 6000MHz',
      storage: '4TB Gen4 NVMe RAID',
      resolution: '8K Editing',
      budget: 'LKR 1,000,000+',
    },
  },
  streaming: {
    minimum: {
      cpu: 'Intel i5-13600K / Ryzen 7 5800X',
      gpu: 'RTX 3060 Ti / RX 6700 XT',
      ram: '16GB DDR4 3600MHz',
      storage: '1TB NVMe SSD',
      resolution: '1080p @ 60 FPS Stream',
      budget: 'LKR 275,000 - 325,000',
    },
    recommended: {
      cpu: 'Intel i7-13700K / Ryzen 9 7900X',
      gpu: 'RTX 4070 / RX 7800 XT',
      ram: '32GB DDR5 5600MHz',
      storage: '2TB NVMe SSD',
      resolution: '1440p @ 60 FPS Stream',
      budget: 'LKR 400,000 - 500,000',
    },
    ideal: {
      cpu: 'Intel i9-13900K / Ryzen 9 7950X',
      gpu: 'RTX 4080 / RX 7900 XTX',
      ram: '64GB DDR5 6000MHz',
      storage: '2TB Gen4 NVMe + 4TB HDD',
      resolution: '4K @ 60 FPS Stream',
      budget: 'LKR 750,000+',
    },
  },
  budget: {
    minimum: {
      cpu: 'Intel i3-12100F / Ryzen 5 5500',
      gpu: 'GTX 1650 / RX 6500 XT',
      ram: '8GB DDR4 2666MHz',
      storage: '256GB SATA SSD',
      resolution: '720p Gaming',
      budget: 'LKR 75,000 - 100,000',
    },
    recommended: {
      cpu: 'Intel i5-12400F / Ryzen 5 5600',
      gpu: 'RTX 3050 / RX 6600',
      ram: '16GB DDR4 3200MHz',
      storage: '512GB NVMe SSD',
      resolution: '1080p Gaming',
      budget: 'LKR 150,000 - 200,000',
    },
    ideal: {
      cpu: 'Intel i5-13400F / Ryzen 5 7600',
      gpu: 'RTX 4060 / RX 7600',
      ram: '16GB DDR4 3600MHz',
      storage: '1TB NVMe SSD',
      resolution: '1440p Gaming',
      budget: 'LKR 250,000 - 300,000',
    },
  },
};

export default function SystemRequirementsPage() {
  const [selectedUseCase, setSelectedUseCase] = useState<keyof typeof requirements>('gaming');
  const [showComparison, setShowComparison] = useState(false);

  const specs = requirements[selectedUseCase];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-600 to-purple-500 rounded-full mb-6">
            <Settings className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            System Requirements Checker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find the perfect PC specifications for your needs and budget
          </p>
        </motion.div>

        {/* Use Case Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
            What will you use your PC for?
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <button
                  key={useCase.id}
                  onClick={() => setSelectedUseCase(useCase.id as keyof typeof requirements)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    selectedUseCase === useCase.id
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                      : 'border-gray-300 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <Icon
                    className={`w-12 h-12 mx-auto mb-3 ${
                      selectedUseCase === useCase.id
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                  <p
                    className={`font-bold ${
                      selectedUseCase === useCase.id
                        ? 'text-purple-900 dark:text-purple-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {useCase.label}
                  </p>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Requirements Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Minimum */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Minimum</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Entry Level</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Processor
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{specs.minimum.cpu}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Graphics
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{specs.minimum.gpu}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Memory
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{specs.minimum.ram}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Storage
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{specs.minimum.storage}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Performance
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">
                  {specs.minimum.resolution}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Budget Range</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
                  {specs.minimum.budget}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Recommended */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-4 border-purple-600 p-8 relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 text-white text-sm font-bold rounded-full">
              POPULAR
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Best Value</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Processor
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{specs.recommended.cpu}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Graphics
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{specs.recommended.gpu}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Memory
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{specs.recommended.ram}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Storage
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">
                  {specs.recommended.storage}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Performance
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">
                  {specs.recommended.resolution}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Budget Range</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-500">
                  {specs.recommended.budget}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Ideal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ideal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Premium</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Processor
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{specs.ideal.cpu}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Graphics
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{specs.ideal.gpu}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Memory
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{specs.ideal.ram}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Storage
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{specs.ideal.storage}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Performance
                  </span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">
                  {specs.ideal.resolution}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Budget Range</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-500">
                  {specs.ideal.budget}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex gap-4">
            <Link
              href="/pc-builder"
              className="px-8 py-4 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
            >
              Build My PC
            </Link>
            <Link
              href="/builder-quiz"
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-lg font-bold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              Take the Quiz
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
