'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Share2, Filter, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Build {
  id: string;
  name: string;
  builder: string;
  category: 'Gaming' | 'Workstation' | 'Budget' | 'Extreme' | 'Compact';
  budget: number;
  likes: number;
  views: number;
  imageUrl: string;
  description: string;
  components: {
    cpu: { name: string; price: number };
    gpu: { name: string; price: number };
    motherboard: { name: string; price: number };
    ram: { name: string; price: number };
    storage: { name: string; price: number };
    psu: { name: string; price: number };
    cooler: { name: string; price: number };
    case: { name: string; price: number };
  };
}

const featuredBuilds: Build[] = [
  {
    id: '1',
    name: 'Ultimate 4K Gaming Beast',
    builder: 'TechMaster',
    category: 'Gaming',
    budget: 4500,
    likes: 342,
    views: 8921,
    imageUrl: '/builds/gaming-beast.jpg',
    description: 'Top-tier gaming setup for 4K ultra settings at 144Hz+',
    components: {
      cpu: { name: 'Intel Core i9-13900K', price: 549 },
      gpu: { name: 'NVIDIA RTX 4090', price: 1999 },
      motherboard: { name: 'ASUS ROG Maximus Z790', price: 699 },
      ram: { name: 'Corsair Dominator DDR5 32GB', price: 240 },
      storage: { name: 'Samsung 990 Pro 2TB', price: 251 },
      psu: { name: 'Corsair RM1000x', price: 200 },
      cooler: { name: 'NZXT Kraken Z73', price: 270 },
      case: { name: 'Lian Li O11 Dynamic', price: 160 }
    }
  },
  {
    id: '2',
    name: 'Silent Workstation Pro',
    builder: 'ProductivityGuru',
    category: 'Workstation',
    budget: 3200,
    likes: 198,
    views: 5432,
    imageUrl: '/builds/workstation.jpg',
    description: 'Quiet and powerful for 3D rendering and video editing',
    components: {
      cpu: { name: 'AMD Ryzen 9 7950X', price: 610 },
      gpu: { name: 'NVIDIA RTX 4080', price: 1199 },
      motherboard: { name: 'ASUS ProArt X670E', price: 499 },
      ram: { name: 'G.Skill Trident Z5 64GB', price: 320 },
      storage: { name: 'Samsung 980 Pro 4TB', price: 500 },
      psu: { name: 'Seasonic Prime TX-850', price: 240 },
      cooler: { name: 'Noctua NH-D15', price: 110 },
      case: { name: 'Fractal Define 7', price: 180 }
    }
  },
  {
    id: '3',
    name: 'Budget 1080p Warrior',
    builder: 'ValueBuilder',
    category: 'Budget',
    budget: 1200,
    likes: 521,
    views: 12834,
    imageUrl: '/builds/budget.jpg',
    description: 'Best bang-for-buck 1080p gaming under $1200',
    components: {
      cpu: { name: 'AMD Ryzen 5 7600X', price: 249 },
      gpu: { name: 'AMD RX 7700 XT', price: 449 },
      motherboard: { name: 'MSI B650 Gaming Plus', price: 180 },
      ram: { name: 'Corsair Vengeance DDR5 16GB', price: 120 },
      storage: { name: 'WD Black SN770 1TB', price: 100 },
      psu: { name: 'EVGA 650 G5', price: 90 },
      cooler: { name: 'DeepCool AK400', price: 35 },
      case: { name: 'NZXT H510', price: 90 }
    }
  },
  {
    id: '4',
    name: 'RGB Dream Machine',
    builder: 'RGBLover',
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
    }
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
    }
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
    }
  }
];

export default function BuildGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [budgetFilter, setBudgetFilter] = useState<string>('all');

  const filteredBuilds = featuredBuilds.filter(build => {
    const matchesSearch = build.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         build.builder.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || build.category === categoryFilter;
    const matchesBudget = budgetFilter === 'all' ||
      (budgetFilter === 'under2k' && build.budget < 2000) ||
      (budgetFilter === '2k-4k' && build.budget >= 2000 && build.budget < 4000) ||
      (budgetFilter === 'over4k' && build.budget >= 4000);
    
    return matchesSearch && matchesCategory && matchesBudget;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Build Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Get inspired by amazing PC builds from our community
          </p>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search builds..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 text-lg"
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Categories</option>
                <option value="Gaming">Gaming</option>
                <option value="Workstation">Workstation</option>
                <option value="Budget">Budget</option>
                <option value="Extreme">Extreme</option>
                <option value="Compact">Compact</option>
              </select>

              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="px-6 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Budgets</option>
                <option value="under2k">Under $2,000</option>
                <option value="2k-4k">$2,000 - $4,000</option>
                <option value="over4k">Over $4,000</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Builds Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBuilds.map((build, index) => (
            <motion.div
              key={build.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/gallery/${build.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:border-orange-500 transition-all hover:shadow-2xl group">
                  
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                      <Eye className="w-24 h-24" />
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-orange-600 text-white text-sm font-semibold">
                      {build.category}
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white">
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm font-semibold">{build.likes}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-semibold">{build.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition">
                      {build.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      by {build.builder}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                      {build.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Build</p>
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                          ${build.budget.toLocaleString()}
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">
                        View Build
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredBuilds.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Builds Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setBudgetFilter('all');
              }}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Submit Build CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-3xl border-2 border-orange-200 dark:border-orange-800 p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Share Your Build
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Inspire others with your amazing PC build! Upload photos and share your component list with the community.
          </p>
          <Link
            href="/pc-builder"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition"
          >
            <Share2 className="w-6 h-6" />
            Submit Your Build
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
