'use client';

import { motion } from 'framer-motion';
import { Upload, Download, AlertCircle, CheckCircle } from 'lucide-react';

export default function BulkPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Bulk Import/Export</h1>
        <p className="text-gray-600 dark:text-gray-400">Import or export large amounts of data</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Import Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Upload className="w-8 h-8 text-orange-600 dark:text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Import Data</h2>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Upload CSV or Excel files to bulk import products, customers, or orders.
          </p>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-orange-500 transition cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Drop files here or click to upload</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Supported formats: CSV, XLSX</p>
            </div>

            <button className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">
              Browse Files
            </button>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <strong>Tip:</strong> Download the template below to ensure your file has the correct format.
              </p>
            </div>

            <button className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Template
            </button>
          </div>
        </motion.div>

        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-8 h-8 text-green-600 dark:text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Export Data</h2>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Export your data in CSV or Excel format for backup or analysis.
          </p>

          <div className="space-y-3">
            {[
              { name: 'Products', count: '2,456' },
              { name: 'Customers', count: '1,847' },
              { name: 'Orders', count: '5,293' },
              { name: 'Invoices', count: '5,293' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.count} records</p>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Imports/Exports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>

        <div className="space-y-3">
          {[
            { type: 'import', name: 'products_2024.csv', status: 'Completed', time: '2 hours ago', records: 156 },
            { type: 'export', name: 'customers_export.xlsx', status: 'Completed', time: '4 hours ago', records: 1847 },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                {item.type === 'import' ? <Upload className="w-5 h-5 text-blue-600" /> : <Download className="w-5 h-5 text-green-600" />}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.records} records • {item.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
