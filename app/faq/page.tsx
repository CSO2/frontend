'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import client from '@/lib/api/client';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await client.get('/api/content/faq');
        setFaqs(response.data);
      } catch (err) {
        console.error('Failed to fetch FAQs:', err);
        setError('Failed to load FAQs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12 flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-wso2-orange" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
            Find answers to common questions about CS02
          </p>

          {error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-wso2-orange transition-transform ${
                        openIndex === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 py-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

