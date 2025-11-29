'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { useState, useEffect } from 'react';
import client from '@/lib/api/client';

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export default function Stores() {
  const [stores, setStores] = useState<StoreLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await client.get('/api/support/stores');
        setStores(response.data);
      } catch (error) {
        console.error('Failed to fetch store locations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Our Locations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Visit us in person for expert advice and hands-on experience
          </p>
        </motion.div>

        {/* Stores Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:border-orange-500 transition-all group"
            >
              {/* Map Placeholder */}
              <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <MapPin className="w-12 h-12" />
                </div>
                {/* In a real app, integrate Google Maps or Mapbox here */}
                <div className="absolute bottom-4 right-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${store.coordinates.lat},${store.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-500 rounded-lg text-sm font-bold shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 transition">
                  {store.name}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <MapPin className="w-5 h-5 shrink-0 mt-1 text-orange-500" />
                    <div>
                      <p>{store.address}</p>
                      <p>{store.city}, {store.state} {store.zipCode}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <Phone className="w-5 h-5 shrink-0 text-orange-500" />
                    <p>{store.phone}</p>
                  </div>

                  <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <Clock className="w-5 h-5 shrink-0 mt-1 text-orange-500" />
                    <p className="whitespace-pre-line">{store.hours}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && stores.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No store locations found. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
