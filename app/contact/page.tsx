'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12"
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl mb-4 sm:mb-6"
          >
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-500" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Have questions? We're here to help. Reach out to our team and we'll get back to you shortly.
          </p>
        </div>
      </motion.section>

      {/* Contact Information Cards */}
      <section className="container mx-auto px-4 pb-8 sm:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto">
          {[
            { icon: Phone, title: 'Phone', info: '+1 (555) 123-4567', subtext: 'Mon-Fri 9am-6pm' },
            { icon: Mail, title: 'Email', info: 'support@cs02.com', subtext: 'Response within 24h' },
            { icon: MapPin, title: 'Location', info: '123 Tech Street', subtext: 'Silicon Valley, CA' },
            { icon: Clock, title: 'Hours', info: 'Mon-Sat: 9am-9pm', subtext: 'Sunday: 10am-6pm' }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center"
            >
              <div className="inline-block p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl mb-3 sm:mb-4">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-500" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1">{item.title}</h3>
              <p className="text-xs sm:text-sm font-medium text-orange-600 dark:text-orange-500">{item.info}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.subtext}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
            
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="inline-block p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                  <Send className="w-12 h-12 text-green-600 dark:text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-400">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
                  >
                    <option value="">Select a subject</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="order">Order Status</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-orange-600 to-orange-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Map & Store Locations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Mock Map */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 h-80">
              <div className="w-full h-full bg-linear-to-br from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-gray-800 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-orange-600 dark:text-orange-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">123 Tech Street, Silicon Valley</p>
                </div>
              </div>
            </div>

            {/* Store Locations */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Visit Our Stores</h3>
              <div className="space-y-4">
                {[
                  { name: 'Downtown Silicon Valley', address: '123 Tech Street, CA 94025', hours: 'Mon-Sat: 9am-9pm' },
                  { name: 'Bay Area Tech Hub', address: '456 Innovation Blvd, CA 94102', hours: 'Mon-Sat: 10am-8pm' },
                  { name: 'South Bay Center', address: '789 Builder Ave, CA 95110', hours: 'Mon-Sun: 9am-7pm' }
                ].map((store, index) => (
                  <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{store.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{store.address}</p>
                    <p className="text-xs text-orange-600 dark:text-orange-500 font-medium mt-1">{store.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
