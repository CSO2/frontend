'use client';

import { motion } from 'framer-motion';
import { Gift, Award, Star, TrendingUp, ShoppingCart, Zap, Tag, Truck } from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';

export default function AccountRewards() {
  const { user } = useUserStore();

  if (!user) {
    return (
      <div className="text-center py-12">
        <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Please Log In
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You need to be logged in to view your rewards
        </p>
      </div>
    );
  }

  const points = user.loyaltyPoints || 0;
  const tier = user.tier || 'bronze';
  
  const tiers = [
    { name: 'bronze', min: 0, color: 'orange', benefits: ['1 point per $1', '5% birthday discount', 'Early sale access'] },
    { name: 'silver', min: 1000, color: 'gray', benefits: ['1.5 points per $1', '10% birthday discount', 'Free shipping', 'Priority support'] },
    { name: 'gold', min: 5000, color: 'yellow', benefits: ['2 points per $1', '15% birthday discount', 'Free express shipping', 'Dedicated support', 'Exclusive products'] },
    { name: 'platinum', min: 10000, color: 'purple', benefits: ['3 points per $1', '20% birthday discount', 'Free overnight shipping', 'VIP support', 'Pre-orders access', 'Personal shopping'] }
  ];

  const currentTier = tiers.find(t => t.name === tier) || tiers[0];
  const nextTier = tiers[tiers.findIndex(t => t.name === tier) + 1];

  const rewards = [
    { points: 100, title: '$5 Off Coupon', icon: Tag },
    { points: 250, title: '$15 Off Coupon', icon: Tag },
    { points: 500, title: 'Free Shipping', icon: Truck },
    { points: 1000, title: '$50 Off Coupon', icon: Tag },
    { points: 2000, title: 'Upgrade to Gold Tier', icon: Award },
    { points: 5000, title: '$300 Off Custom Build', icon: ShoppingCart }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Rewards Program</h1>
        <p className="text-gray-600 dark:text-gray-400">Earn points and redeem exclusive rewards</p>
      </div>

      {/* Points Balance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-orange-100 mb-2">Your Balance</p>
            <p className="text-6xl font-bold">{points.toLocaleString()}</p>
            <p className="text-orange-100 text-lg mt-1">Reward Points</p>
          </div>
          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur">
            <Gift className="w-16 h-16" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Award className="w-6 h-6" />
          <div>
            <p className="text-orange-100 text-sm">Current Tier</p>
            <p className="text-xl font-bold capitalize">{tier}</p>
          </div>
        </div>
      </motion.div>

      {/* Tier Progress */}
      {nextTier && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Progress to {nextTier.name.charAt(0).toUpperCase() + nextTier.name.slice(1)}
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {points} / {nextTier.min} points
            </span>
          </div>

          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(points / nextTier.min) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
            />
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {nextTier.min - points} more points to unlock {nextTier.name} benefits
          </p>
        </motion.div>
      )}

      {/* Current Tier Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <Star className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          Your Benefits
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {currentTier.benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
            >
              <Zap className="w-5 h-5 text-green-600 dark:text-green-500" />
              <span className="text-gray-900 dark:text-white font-semibold">{benefit}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Redeem Rewards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Redeem Points</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-orange-500 transition"
            >
              <div className="p-4 rounded-xl bg-orange-100 dark:bg-orange-900/30 inline-flex mb-4">
                <Gift className="w-8 h-8 text-orange-600 dark:text-orange-500" />
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{reward.title}</h3>
              
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cost</p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                    {reward.points}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">points</p>
                </div>

                <button
                  disabled={points < reward.points}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    points >= reward.points
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  }`}
                >
                  Redeem
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How to Earn */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl border border-orange-200 dark:border-orange-800 p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          How to Earn Points
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { action: 'Make a Purchase', points: '1 point per $1 spent' },
            { action: 'Write a Review', points: '50 points per review' },
            { action: 'Refer a Friend', points: '500 points per referral' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <p className="font-bold text-gray-900 dark:text-white mb-2">{item.action}</p>
              <p className="text-orange-600 dark:text-orange-500 font-semibold">{item.points}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
