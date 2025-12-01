'use client';

import { use, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Trash2,
  Upload,
  Plus,
  X,
  AlertCircle,
  Package,
  DollarSign,
  Tag,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/lib/store/productStore';

interface ProductFormData {
  name: string;
  category: string;
  subcategory: string;
  price: string;
  stockLevel: number;
  description: string;
  imageUrl: string;
  tags: string[];
  specs: { key: string; value: string }[];
}

export default function AdminProductEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const product = products.find((p) => p.id === id);

  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || '',
    category: product?.category || 'cpu',
    subcategory: product?.subcategory || '',
    price: product?.price.toString() || '',
    stockLevel: product?.stockLevel || 0,
    description: product?.description || '',
    imageUrl: product?.imageUrl || '',
    tags: product?.tags || [],
    specs: product?.specs
      ? Object.entries(product.specs).map(([key, value]) => ({ key, value: value.toString() }))
      : [],
  });

  const [newTag, setNewTag] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!product && id !== 'new') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The product could not be found.
          </p>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        specs: formData.specs.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}),
      };

      if (id === 'new') {
        await addProduct(productData as any);
      } else {
        await updateProduct(id, productData as any);
      }
      router.push('/admin/products');
    } catch (error) {
      console.error('Failed to save product:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      router.push('/admin/products');
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tagToRemove) });
  };

  const addSpec = () => {
    setFormData({
      ...formData,
      specs: [...formData.specs, { key: '', value: '' }],
    });
  };

  const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...formData.specs];
    newSpecs[index][field] = value;
    setFormData({ ...formData, specs: newSpecs });
  };

  const removeSpec = (index: number) => {
    setFormData({
      ...formData,
      specs: formData.specs.filter((_, i) => i !== index),
    });
  };

  const isNew = id === 'new';
  const isLowStock = formData.stockLevel < 5;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isNew ? 'Add New Product' : 'Edit Product'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isNew ? 'Create a new product listing' : `Product ID: ${id}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving || !formData.name || !formData.price}
            className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Package className="w-6 h-6" />
              Basic Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., AMD Ryzen 9 7950X"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="cpu">CPUs</option>
                    <option value="gpu">Graphics Cards</option>
                    <option value="motherboard">Motherboards</option>
                    <option value="ram">Memory (RAM)</option>
                    <option value="storage">Storage</option>
                    <option value="psu">Power Supplies</option>
                    <option value="case">Cases</option>
                    <option value="cooling">Cooling</option>
                    <option value="peripherals">Peripherals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    placeholder="e.g., Desktop CPU"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price (LKR) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0"
                      min="0"
                      step="100"
                      className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stock Level
                  </label>
                  <input
                    type="number"
                    value={formData.stockLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, stockLevel: parseInt(e.target.value) || 0 })
                    }
                    placeholder="0"
                    min="0"
                    className={`w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white ${
                      isLowStock
                        ? 'border-yellow-500 dark:border-yellow-600'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {isLowStock && (
                    <p className="text-sm text-yellow-600 dark:text-yellow-500 mt-1">
                      ⚠ Low stock warning
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Specifications
              </h2>
              <button
                onClick={addSpec}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Spec
              </button>
            </div>

            <div className="space-y-3">
              {formData.specs.map((spec, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => updateSpec(index, 'key', e.target.value)}
                    placeholder="Key (e.g., Cores)"
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => updateSpec(index, 'value', e.target.value)}
                    placeholder="Value (e.g., 16)"
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => removeSpec(index)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {formData.specs.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No specifications added yet. Click &quot;Add Spec&quot; to get started.
                </p>
              )}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Tag className="w-6 h-6" />
              Tags
            </h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="Add tag (e.g., gaming, flagship)"
                  className="flex-1 px-4 py-2 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-orange-900">
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Preview</h2>
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                {formData.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.imageUrl}
                  alt={formData.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <ImageIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
              )}
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{formData.name || 'Product Name'}</h3>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-500 mb-2">
              {formData.price ? `LKR ${parseInt(formData.price).toLocaleString()}` : 'LKR 0'}
            </p>
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 text-sm rounded-lg ${
                formData.stockLevel === 0
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  : formData.stockLevel < 5
                  ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                  : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
              }`}
            >
              {formData.stockLevel === 0
                ? 'Out of Stock'
                : formData.stockLevel < 5
                ? `Low Stock (${formData.stockLevel})`
                : `In Stock (${formData.stockLevel})`}
            </span>
          </motion.div>

          {/* Image Upload */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ImageIcon className="w-6 h-6" />
              Product Image
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="Image URL"
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 dark:text-white"
              />
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-500 transition-colors">
                <Upload className="w-5 h-5" />
                Upload Image
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Delete Product</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete {formData.name || 'this product'}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Product
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
