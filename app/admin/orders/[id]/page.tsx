'use client';

import { use, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  CreditCard,
  Printer,
  MessageSquare,
  AlertCircle,
  Edit,
} from 'lucide-react';
import Link from 'next/link';
import { useProductStore } from '@/lib/store/productStore';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: any }> = {
  pending: { label: 'Pending', color: 'yellow', icon: Clock },
  processing: { label: 'Processing', color: 'blue', icon: Package },
  shipped: { label: 'Shipped', color: 'purple', icon: Truck },
  delivered: { label: 'Delivered', color: 'green', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'red', icon: AlertCircle },
};

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { orders } = useProductStore();
  const order = orders.find((o) => o.id === id);

  const [orderStatus, setOrderStatus] = useState<OrderStatus>(
    order?.status as OrderStatus || 'pending'
  );
  const [notes, setNotes] = useState('');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Order Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The order #{id} could not be found.
          </p>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus: OrderStatus) => {
    setOrderStatus(newStatus);
    // In real app: API call to update status
    console.log('Status updated to:', newStatus);
  };

  const handleAddNote = () => {
    if (notes.trim()) {
      console.log('Note added:', notes);
      setNotes('');
    }
  };

  const handleRefund = () => {
    console.log('Refund issued:', refundAmount);
    setShowRefundModal(false);
    setRefundAmount('');
  };

  const StatusIcon = statusConfig[orderStatus].icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/orders"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Order #{order.id}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
          >
            <Printer className="w-5 h-5" />
            Print Invoice
          </button>
          <button
            onClick={() => setShowRefundModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Issue Refund
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Order Status
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div
                className={`p-3 rounded-full bg-${statusConfig[orderStatus].color}-100 dark:bg-${statusConfig[orderStatus].color}-900/20`}
              >
                <StatusIcon
                  className={`w-6 h-6 text-${statusConfig[orderStatus].color}-600 dark:text-${statusConfig[orderStatus].color}-400`}
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Status</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {statusConfig[orderStatus].label}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Update Status
              </label>
              <select
                value={orderStatus}
                onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Order Items
            </h2>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                >
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      LKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      LKR {item.price.toLocaleString()} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>LKR {order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>LKR 500</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                <span>Total</span>
                <span className="text-orange-600 dark:text-orange-500">
                  LKR {(order.total + 500).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Internal Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              Internal Notes
            </h2>

            <div className="space-y-4">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes about this order..."
                className="w-full h-32 px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
              />
              <button
                onClick={handleAddNote}
                disabled={!notes.trim()}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Note
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">Admin User</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Customer requested expedited shipping. Updated to express delivery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-6 h-6" />
              Customer
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  Customer #{order.userId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  customer@example.lk
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                <p className="font-medium text-gray-900 dark:text-white">+94 77 123 4567</p>
              </div>
              <button className="w-full mt-4 px-4 py-2 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                View Customer Profile
              </button>
            </div>
          </motion.div>

          {/* Shipping Address */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Shipping Address
            </h2>
            <div className="space-y-1 text-gray-600 dark:text-gray-400">
              <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
              <p>No. 123, Main Street</p>
              <p>Colombo 07</p>
              <p>Western Province</p>
              <p>Sri Lanka</p>
            </div>
          </motion.div>

          {/* Payment Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6" />
              Payment
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Method</p>
                <p className="font-medium text-gray-900 dark:text-white">Credit Card</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Card</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  •••• •••• •••• 4242
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  Paid
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Issue Refund
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enter the refund amount for order #{order.id}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Refund Amount (LKR)
                </label>
                <input
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  placeholder="0"
                  max={order.total + 500}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Maximum: LKR {(order.total + 500).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRefund}
                  disabled={!refundAmount || parseFloat(refundAmount) <= 0}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Issue Refund
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
