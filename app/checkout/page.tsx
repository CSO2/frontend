'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';
import { useUserStore } from '@/lib/store/userStore';
import { useOrderStore } from '@/lib/store/orderStore';
import { User, Truck, CreditCard, CheckCircle, ArrowLeft, ArrowRight, MapPin, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type CheckoutStep = 1 | 2 | 3 | 4;
type OrderType = 'delivery' | 'pickup';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user, addresses, paymentMethods } = useUserStore();
  const { createOrder, isLoading: isOrderLoading } = useOrderStore();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [isGuest, setIsGuest] = useState(!user);
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || '');
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]?.id || '');
  const [guestInfo, setGuestInfo] = useState({ name: '', email: '', phone: '' });

  const subtotal = getTotalPrice();
  // Sri Lanka VAT and local shipping approximation
  const tax = subtotal * 0.15;
  const shipping = orderType === 'delivery' ? 500 : 0;
  const total = subtotal + tax + shipping;

  const stepsConfig = [
    { number: 1, title: 'Account', icon: User },
    { number: 2, title: 'Order Type', icon: orderType === 'delivery' ? Truck : Building2 },
    { number: 3, title: 'Payment', icon: CreditCard },
    { number: 4, title: 'Review', icon: CheckCircle }
  ];

  const canProceedStep1 = isGuest ? (guestInfo.name && guestInfo.email && guestInfo.phone) : true;
  const canProceedStep2 = orderType === 'delivery' ? selectedAddress : true;
  const canProceedStep3 = selectedPayment;

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        shippingAddress: orderType === 'delivery' ? addresses.find(a => a.id === selectedAddress) : null,
        paymentMethodId: selectedPayment,
        orderType,
        subtotal,
        tax,
        shipping,
        total
      };

      const newOrder = await createOrder(orderData);
      clearCart();
      router.push(`/order-confirmation?id=${newOrder.id}`);
    } catch (error) {
      console.error('Failed to place order:', error);
      // Handle error (show toast or alert)
      alert('Failed to place order. Please try again.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex items-center justify-center py-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Add some products to proceed with checkout</p>
          <button
            onClick={() => router.push('/components')}
            className="px-8 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Complete your order in a few simple steps</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {stepsConfig.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isComplete = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isComplete
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-orange-500 text-white ring-4 ring-orange-500/20'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}>
                      {isComplete ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <span className={`mt-2 text-sm font-medium ${
                      isActive ? 'text-orange-600 dark:text-orange-500' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < stepsConfig.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 transition-all ${
                      isComplete ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Account */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Information</h2>
                  
                  <div className="space-y-4 mb-6">
                    <button
                      onClick={() => setIsGuest(false)}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        !isGuest
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          !isGuest ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                        }`}>
                          {!isGuest && <div className="w-3 h-3 bg-white rounded-full" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">Login / Register</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Access your account for faster checkout</p>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setIsGuest(true)}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        isGuest
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isGuest ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                        }`}>
                          {isGuest && <div className="w-3 h-3 bg-white rounded-full" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">Checkout as Guest</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">No account required</p>
                        </div>
                      </div>
                    </button>
                  </div>
                  
                  {isGuest && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={guestInfo.name}
                          onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={guestInfo.email}
                          onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={guestInfo.phone}
                          onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                          placeholder="+94 77 000 0000"
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Order Type */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Type</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => setOrderType('delivery')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        orderType === 'delivery'
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <Truck className={`w-12 h-12 mb-4 ${
                        orderType === 'delivery' ? 'text-orange-500' : 'text-gray-400'
                      }`} />
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Delivery</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Get it delivered to your address</p>
                    </button>
                    
                    <button
                      onClick={() => setOrderType('pickup')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        orderType === 'pickup'
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <Building2 className={`w-12 h-12 mb-4 ${
                        orderType === 'pickup' ? 'text-orange-500' : 'text-gray-400'
                      }`} />
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">In-Store Pickup</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Pick up from our store location</p>
                    </button>
                  </div>
                  
                  {orderType === 'delivery' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Delivery Address</h3>
                      {addresses.length > 0 ? (
                        <div className="space-y-3">
                          {addresses.map((address) => (
                            <button
                              key={address.id}
                              onClick={() => setSelectedAddress(address.id)}
                              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                                selectedAddress === address.id
                                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                  : 'border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                                <div className="flex-1">
                                  <p className="font-semibold text-gray-900 dark:text-white">{address.name}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {address.street}, {address.city}, {address.state} {address.zipCode}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-500">{address.phone}</p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400">No saved addresses. Add one to continue.</p>
                      )}
                    </motion.div>
                  )}
                  
                  {orderType === 'pickup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-l-4 border-green-500"
                    >
                      <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">Pickup Location</h3>
                      <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                        <strong>CS02 Colombo City Center</strong>
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        No. 123 Galle Road, Colombo 03, Sri Lanka
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                        Mon-Sat: 9am-9pm • Sun: 10am-6pm
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Method</h2>
                  
                  {paymentMethods.length > 0 ? (
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                            selectedPayment === method.id
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <CreditCard className="w-8 h-8 text-orange-500" />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {method.brand} •••• {method.last4}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Expires {method.expiryMonth}/{method.expiryYear}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">No saved payment methods</p>
                      <button className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition">
                        Add Payment Method
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Review</h2>
                    
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                          <Image
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{item.product.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {`LKR ${(item.product.price * item.quantity).toLocaleString('en-LK')}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-500">
                    <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Place Order</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Please review your order details and click "Place Order" to complete your purchase.
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1) as CheckoutStep)}
                disabled={currentStep === 1}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>
              
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1) as CheckoutStep)}
                  disabled={
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2) ||
                    (currentStep === 3 && !canProceedStep3)
                  }
                  className="px-6 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  className="px-8 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Place Order
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({items.length} items)</span>
                  <span>{`LKR ${subtotal.toLocaleString('en-LK')}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>VAT (15%)</span>
                  <span>{`LKR ${tax.toLocaleString('en-LK')}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{`LKR ${shipping.toLocaleString('en-LK')}`}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-orange-600 dark:text-orange-500">{`LKR ${total.toLocaleString('en-LK')}`}</span>
                </div>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border-l-4 border-orange-500">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Estimated Delivery:</strong><br />
                  {orderType === 'delivery' ? '3-5 business days' : 'Ready for pickup in 2-4 hours'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
