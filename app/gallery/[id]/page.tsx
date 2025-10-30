'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MessageSquare, 
  ThumbsUp,
  Copy,
  Check,
  Eye,
  Cpu,
  HardDrive,
  Zap,
  Thermometer
} from 'lucide-react';

// Sample builds data - same as gallery page
const allBuilds = [
  {
    id: '1',
    name: '4K Gaming Beast',
    builder: 'ProGamer42',
    category: 'Gaming',
    budget: 3500,
    likes: 1234,
    views: 45632,
    imageUrl: '/builds/gaming.jpg',
    description: 'Ultimate 4K gaming machine with RTX 4090',
    components: {
      cpu: { name: 'Intel Core i9-13900K', price: 589 },
      gpu: { name: 'NVIDIA RTX 4090', price: 1999 },
      motherboard: { name: 'ASUS ROG Strix Z790-E', price: 399 },
      ram: { name: 'Corsair Dominator Platinum 32GB', price: 240 },
      storage: { name: 'Samsung 990 Pro 2TB', price: 251 },
      psu: { name: 'Corsair HX1000i', price: 300 },
      cooler: { name: 'Noctua NH-D15', price: 99 },
      case: { name: 'Corsair 5000D Airflow', price: 165 }
    },
    timestamp: '2024-01-15',
    comments: 45,
    buildGuide: 'A complete guide to building this powerhouse. Start with the motherboard, then install the CPU and RAM. Mount the cooler carefully - it\'s large but excellent. Install the GPU last to ensure proper fit.'
  },
  {
    id: '2',
    name: 'Content Creator Workstation',
    builder: 'CreativeStudio',
    category: 'Workstation',
    budget: 4200,
    likes: 856,
    views: 23421,
    imageUrl: '/builds/workstation.jpg',
    description: 'Optimized for video editing and 3D rendering',
    components: {
      cpu: { name: 'AMD Ryzen 9 7950X', price: 610 },
      gpu: { name: 'NVIDIA RTX 4080', price: 1199 },
      motherboard: { name: 'ASUS ProArt X870-Creator', price: 599 },
      ram: { name: 'G.Skill Trident Z5 64GB', price: 480 },
      storage: { name: 'Samsung 990 Pro 4TB', price: 502 },
      psu: { name: 'Seasonic Prime TX-1000', price: 280 },
      cooler: { name: 'Corsair H150i Elite', price: 250 },
      case: { name: 'Corsair 5000T RGB', price: 299 }
    },
    timestamp: '2024-01-10',
    comments: 32,
    buildGuide: 'Perfect for creators. The 12-core Ryzen 9 7950X excels at multi-threaded workloads. 64GB RAM is ideal for 4K video editing. Use the M.2 Gen4 drive for project files.'
  },
  {
    id: '3',
    name: 'Budget Esports Setup',
    builder: 'EsportsTeam',
    category: 'Budget',
    budget: 1200,
    likes: 567,
    views: 12453,
    imageUrl: '/builds/budget.jpg',
    description: 'Affordable 1440p 240+ FPS gaming',
    components: {
      cpu: { name: 'AMD Ryzen 5 7600X', price: 229 },
      gpu: { name: 'NVIDIA RTX 4060 Ti', price: 499 },
      motherboard: { name: 'MSI B650M Edge', price: 159 },
      ram: { name: 'Kingston Fury DDR5 16GB', price: 120 },
      storage: { name: 'Samsung 970 EVO 1TB', price: 89 },
      psu: { name: 'MSI MAG A650GL', price: 69 },
      cooler: { name: 'Deepcool Assassin III', price: 35 },
      case: { name: 'NZXT H510 Flow', price: 99 }
    },
    timestamp: '2024-01-05',
    comments: 78,
    buildGuide: 'Great value for competitive gaming. The Ryzen 5 7600X is fantastic for esports titles. Upgrade the GPU later if you want higher resolution support.'
  },
  {
    id: '4',
    name: 'Extreme RGB Dream',
    builder: 'RGBEnthusiast',
    category: 'Extreme',
    budget: 5200,
    likes: 689,
    views: 15621,
    imageUrl: '/builds/rgb.jpg',
    description: 'Maximum RGB with flagship components',
    components: {
      cpu: { name: 'Intel Core i9-13900KS', price: 699 },
      gpu: { name: 'NVIDIA RTX 4090', price: 1999 },
      motherboard: { name: 'ASUS ROG Maximus Z790 Extreme', price: 899 },
      ram: { name: 'Corsair Dominator Platinum RGB 64GB', price: 480 },
      storage: { name: 'Samsung 990 Pro 4TB', price: 502 },
      psu: { name: 'Corsair HX1200i', price: 350 },
      cooler: { name: 'Corsair H150i Elite LCD', price: 310 },
      case: { name: 'Lian Li O11 Dynamic EVO', price: 180 }
    },
    timestamp: '2024-01-01',
    comments: 125,
    buildGuide: 'The ultimate RGB showcase. This build features an LCD cooler display, individually addressable RGB fans, and premium RGB RAM. Sync everything with iCUE for stunning effects.'
  },
  {
    id: '5',
    name: 'Mini ITX Powerhouse',
    builder: 'CompactKing',
    category: 'Compact',
    budget: 2800,
    likes: 412,
    views: 9234,
    imageUrl: '/builds/mini.jpg',
    description: 'High-end performance in a tiny footprint',
    components: {
      cpu: { name: 'AMD Ryzen 7 7800X3D', price: 449 },
      gpu: { name: 'NVIDIA RTX 4070 Ti', price: 799 },
      motherboard: { name: 'ASUS ROG Strix X670E-I', price: 549 },
      ram: { name: 'Corsair Vengeance DDR5 32GB', price: 240 },
      storage: { name: 'Samsung 980 Pro 2TB', price: 251 },
      psu: { name: 'Corsair SF750', price: 185 },
      cooler: { name: 'Noctua NH-L12S', price: 55 },
      case: { name: 'NZXT H1', price: 350 }
    },
    timestamp: '2023-12-28',
    comments: 54,
    buildGuide: 'Mini ITX requires careful component selection. The H1 case is excellent but tight. Plan your cable management before assembly. Use the included SSD cooler.'
  },
  {
    id: '6',
    name: 'Streaming Setup Supreme',
    builder: 'StreamerPro',
    category: 'Gaming',
    budget: 3800,
    likes: 267,
    views: 7123,
    imageUrl: '/builds/streaming.jpg',
    description: 'Perfect for dual PC streaming or single PC encode',
    components: {
      cpu: { name: 'AMD Ryzen 9 7950X', price: 610 },
      gpu: { name: 'NVIDIA RTX 4080', price: 1199 },
      motherboard: { name: 'ASUS ROG Crosshair X670E', price: 699 },
      ram: { name: 'G.Skill Trident Z5 32GB', price: 240 },
      storage: { name: 'Samsung 990 Pro 2TB', price: 251 },
      psu: { name: 'Seasonic Prime TX-1000', price: 280 },
      cooler: { name: 'Arctic Liquid Freezer II 360', price: 140 },
      case: { name: 'Corsair 5000D Airflow', price: 165 }
    },
    timestamp: '2023-12-20',
    comments: 38,
    buildGuide: 'The 16-core Ryzen 9 7950X is perfect for encoding. The RTX 4080 provides great gaming performance. This setup handles streaming and gaming simultaneously without compromise.'
  }
];

export default function BuildDetail() {
  const params = useParams();
  const buildId = params.id as string;
  
  const build = allBuilds.find(b => b.id === buildId);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  if (!build) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Build Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            The build you're looking for doesn't exist.
          </p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = Object.values(build.components).reduce((sum, comp) => sum + comp.price, 0);

  const handleCopyPartList = () => {
    const partList = Object.entries(build.components)
      .map(([key, comp]) => `${key.replace(/([A-Z])/g, ' $1').trim()}: ${comp.name} - $${comp.price}`)
      .join('\n');
    
    navigator.clipboard.writeText(partList);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-b-2 border-orange-200 dark:border-orange-800"
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 mb-4 font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Gallery
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {build.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            by <span className="font-semibold text-orange-600 dark:text-orange-400">{build.builder}</span>
          </p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Build Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-96 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden mb-8 border-2 border-gray-200 dark:border-gray-700"
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                <Eye className="w-32 h-32" />
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold">
                {build.category}
              </div>

              {/* Interaction Buttons */}
              <div className="absolute bottom-4 right-4 flex gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition backdrop-blur ${
                    liked
                      ? 'bg-red-600 text-white'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  <span>{build.likes + (liked ? 1 : 0)}</span>
                </button>

                <button
                  onClick={() => setShareOpen(!shareOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-white dark:hover:bg-gray-700 transition backdrop-blur"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Build Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <Eye className="w-5 h-5" />
                  <span className="text-sm font-medium">Views</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {build.views.toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm font-medium">Comments</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {build.comments}
                </p>
              </div>
            </motion.div>

            {/* Build Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Overview
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                {build.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {build.buildGuide}
              </p>
            </motion.div>

            {/* Components List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Components
              </h2>
              <div className="space-y-3">
                {Object.entries(build.components).map(([key, component]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                        {key === 'cpu' && <Cpu className="w-5 h-5" />}
                        {key === 'storage' && <HardDrive className="w-5 h-5" />}
                        {key === 'psu' && <Zap className="w-5 h-5" />}
                        {key === 'cooler' && <Thermometer className="w-5 h-5" />}
                        {!['cpu', 'storage', 'psu', 'cooler'].includes(key) && <Cpu className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-gray-900 dark:text-white font-semibold">
                          {component.name}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                      ${component.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            {/* Price Summary */}
            <div className="bg-linear-to-b from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl border-2 border-orange-200 dark:border-orange-800 p-6 mb-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Build Summary
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b-2 border-orange-200 dark:border-orange-800">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Components:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {Object.keys(build.components).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Budget Target:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${build.budget.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Difference:</span>
                  <span className={`font-semibold ${totalPrice <= build.budget ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    ${(totalPrice - build.budget).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyPartList}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Parts List
                  </>
                )}
              </button>
            </div>

            {/* Builder Info */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Builder Info
              </h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
                  {build.builder.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {build.builder}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Builder
                  </p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">
                Follow Builder
              </button>
            </div>

            {/* Share Options */}
            {shareOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Share This Build
                </h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                    Share on Facebook
                  </button>
                  <button className="w-full px-4 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition">
                    Share on Twitter
                  </button>
                  <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                    Share on Reddit
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
