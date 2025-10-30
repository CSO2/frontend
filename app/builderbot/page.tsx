'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User as UserIcon, Loader } from 'lucide-react';
import { useProductStore } from '@/lib/store/productStore';
import { useCartStore } from '@/lib/store/cartStore';
import Link from 'next/link';

interface Message {
  id: number;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  buildSuggestion?: {
    components: any[];
    totalPrice: number;
  };
}

export default function BuilderBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm BuilderBot, your AI PC building assistant. Tell me what you're looking for and I'll help you build the perfect PC! For example: 'I need a PC for 4K gaming with a $2500 budget' or 'Build me a workstation for video editing'",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const products = useProductStore((state) => state.products);
  const addToCart = useCartStore((state) => state.addItem);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBuildSuggestion = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let budget = 2000;
    let buildType = 'gaming';

    // Extract budget
    const budgetMatch = query.match(/\$?(\d{3,5})/);
    if (budgetMatch) {
      budget = parseInt(budgetMatch[1]);
    }

    // Determine build type
    if (lowerQuery.includes('workstation') || lowerQuery.includes('video editing') || lowerQuery.includes('content creation')) {
      buildType = 'workstation';
    } else if (lowerQuery.includes('budget') || lowerQuery.includes('cheap') || lowerQuery.includes('affordable')) {
      buildType = 'budget';
    } else if (lowerQuery.includes('4k') || lowerQuery.includes('high-end') || lowerQuery.includes('premium')) {
      buildType = 'high-end';
    }

    // Select components based on budget and type
    const cpus = products.filter((p) => p.subcategory === 'CPU' && p.stockLevel > 0);
    const gpus = products.filter((p) => p.subcategory === 'GPU' && p.stockLevel > 0);
    const motherboards = products.filter((p) => p.subcategory === 'Motherboard' && p.stockLevel > 0);
    const rams = products.filter((p) => p.subcategory === 'RAM' && p.stockLevel > 0);
    const storage = products.filter((p) => p.subcategory === 'Storage' && p.stockLevel > 0);
    const psus = products.filter((p) => p.subcategory === 'PSU' && p.stockLevel > 0);
    const coolers = products.filter((p) => p.subcategory === 'Cooler' && p.stockLevel > 0);
    const cases = products.filter((p) => p.subcategory === 'Case' && p.stockLevel > 0);

    let selectedComponents: any[] = [];

    if (buildType === 'high-end' || budget > 2000) {
      // High-end build
      selectedComponents = [
        cpus.find((p) => p.price > 500) || cpus[0],
        gpus.find((p) => p.price > 900) || gpus[0],
        motherboards.find((p) => p.price > 300) || motherboards[0],
        rams.find((p) => p.name.includes('32GB') && p.name.includes('DDR5')) || rams[0],
        storage[0],
        psus.find((p) => Number(p.specs.wattage) >= 850) || psus[0],
        coolers[1] || coolers[0],
        cases[0],
      ];
    } else if (buildType === 'workstation') {
      // Workstation build
      selectedComponents = [
        cpus.find((p) => p.brand === 'AMD' && p.price > 400) || cpus[0],
        gpus.find((p) => p.price > 700 && p.price < 1200) || gpus[1] || gpus[0],
        motherboards.find((p) => p.price > 250) || motherboards[0],
        rams.find((p) => p.name.includes('32GB')) || rams[0],
        storage[2] || storage[0],
        psus.find((p) => Number(p.specs.wattage) >= 750) || psus[1] || psus[0],
        coolers[1] || coolers[0],
        cases[1] || cases[0],
      ];
    } else {
      // Budget/mid-range build
      selectedComponents = [
        cpus.find((p) => p.price > 250 && p.price < 400) || cpus[cpus.length - 1],
        gpus.find((p) => p.price > 400 && p.price < 700) || gpus[gpus.length - 1],
        motherboards.find((p) => p.price < 250) || motherboards[motherboards.length - 1],
        rams.find((p) => p.name.includes('16GB') || p.name.includes('32GB')) || rams[0],
        storage[1] || storage[0],
        psus.find((p) => Number(p.specs.wattage) >= 650) || psus[psus.length - 1],
        coolers[2] || coolers[0],
        cases[cases.length - 1] || cases[0],
      ];
    }

    const totalPrice = selectedComponents.reduce((sum, comp) => sum + (comp?.price || 0), 0);

    return {
      components: selectedComponents.filter((c) => c !== undefined),
      totalPrice,
    };
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking and response
    setTimeout(() => {
      const buildSuggestion = generateBuildSuggestion(inputMessage);
      
      const botMessage: Message = {
        id: messages.length + 2,
        type: 'bot',
        text: `Understood! Based on your requirements, I've configured this build for you. The total cost is $${buildSuggestion.totalPrice.toFixed(2)}.`,
        timestamp: new Date(),
        buildSuggestion,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleAddAllToCart = (components: any[]) => {
    components.forEach((component) => {
      if (component) {
        addToCart(component, 1);
      }
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot className="h-12 w-12 text-wso2-orange" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              BuilderBot
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            AI-Powered PC Building Assistant
          </p>
        </motion.div>

        {/* Chat Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Messages */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-wso2-orange' : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    {message.type === 'user' ? (
                      <UserIcon className="h-5 w-5 text-white" />
                    ) : (
                      <Bot className="h-5 w-5 text-wso2-orange" />
                    )}
                  </div>

                  <div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-wso2-orange text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>

                    {/* Build Suggestion */}
                    {message.buildSuggestion && (
                      <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                          Recommended Build Configuration
                        </h4>
                        {message.buildSuggestion.components.map((component) => (
                          <Link
                            key={component.id}
                            href={`/product/${component.id}`}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <img
                              src={component.imageUrl}
                              alt={component.name}
                              className="w-12 h-12 object-cover rounded"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-product.png';
                              }}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {component.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {component.subcategory}
                              </p>
                            </div>
                            <span className="font-bold text-wso2-orange">
                              ${component.price.toFixed(2)}
                            </span>
                          </Link>
                        ))}

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-gray-900 dark:text-white">
                              Total:
                            </span>
                            <span className="text-2xl font-bold text-wso2-orange">
                              ${message.buildSuggestion.totalPrice.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAddAllToCart(message.buildSuggestion!.components)}
                              className="flex-1 bg-wso2-orange text-white py-2 rounded-lg font-semibold hover:bg-wso2-orange-dark transition-colors"
                            >
                              Add All to Cart
                            </button>
                            <Link
                              href="/pc-builder"
                              className="flex-1 border-2 border-wso2-orange text-wso2-orange py-2 rounded-lg font-semibold text-center hover:bg-wso2-orange hover:text-white transition-colors"
                            >
                              Customize
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    <span className={`text-xs mt-1 block ${
                      message.type === 'user' ? 'text-right text-gray-400' : 'text-left text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 text-wso2-orange" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                  <Loader className="h-5 w-5 text-gray-600 dark:text-gray-400 animate-spin" />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Describe your ideal PC build..."
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-wso2-orange"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="px-6 py-3 bg-wso2-orange text-white rounded-lg font-semibold hover:bg-wso2-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="h-5 w-5" />
                Send
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
