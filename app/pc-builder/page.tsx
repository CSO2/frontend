'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '@/lib/store/productStore';
import { useCartStore } from '@/lib/store/cartStore';
import { Product } from '@/lib/store/types';
import {
  Cpu,
  CircuitBoard,
  HardDrive,
  Fan,
  Zap,
  Box,
  MemoryStick,
  MonitorSmartphone,
  Check,
  X,
  AlertCircle,
  ShoppingCart,
  Save,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';

type ComponentType = 'CPU' | 'Motherboard' | 'GPU' | 'RAM' | 'Storage' | 'PSU' | 'Cooling' | 'Case';

interface BuildComponent {
  type: ComponentType;
  product: Product | null;
}

const steps: { type: ComponentType; icon: any; required: boolean }[] = [
  { type: 'CPU', icon: Cpu, required: true },
  { type: 'Motherboard', icon: CircuitBoard, required: true },
  { type: 'GPU', icon: MonitorSmartphone, required: false },
  { type: 'RAM', icon: MemoryStick, required: true },
  { type: 'Storage', icon: HardDrive, required: true },
  { type: 'PSU', icon: Zap, required: true },
  { type: 'Cooling', icon: Fan, required: false },
  { type: 'Case', icon: Box, required: true }
];

export default function PCBuilderPage() {
  const { products } = useProductStore();
  const { addItem } = useCartStore();
  
  const [build, setBuild] = useState<BuildComponent[]>(
    steps.map(s => ({ type: s.type, product: null }))
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([]);

  // Get available products for current step
  const getAvailableProducts = (type: ComponentType): Product[] => {
    let available = products.filter(p => p.category === 'Components' && p.subcategory === type);
    
    // Apply compatibility filters
    const cpu = build.find(b => b.type === 'CPU')?.product;
    const motherboard = build.find(b => b.type === 'Motherboard')?.product;
    
    if (type === 'Motherboard' && cpu) {
      const cpuSocket = cpu.specs.socketType as string;
      available = available.filter(p => p.specs.socketType === cpuSocket);
    }
    
    if (type === 'CPU' && motherboard) {
      const mbSocket = motherboard.specs.socketType as string;
      available = available.filter(p => p.specs.socketType === mbSocket);
    }
    
    if (type === 'RAM' && motherboard) {
      const mbRamType = motherboard.specs.memoryType as string;
      available = available.filter(p => p.specs.type === mbRamType);
    }
    
    return available.filter(p => p.stockLevel > 0);
  };

  const selectComponent = (product: Product) => {
    const newBuild = [...build];
    newBuild[currentStep] = { type: steps[currentStep].type, product };
    setBuild(newBuild);
    setShowModal(false);
    checkCompatibility(newBuild);
    
    // Auto-advance to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const checkCompatibility = (currentBuild: BuildComponent[]) => {
    const issues: string[] = [];
    const cpu = currentBuild.find(b => b.type === 'CPU')?.product;
    const motherboard = currentBuild.find(b => b.type === 'Motherboard')?.product;
    const psu = currentBuild.find(b => b.type === 'PSU')?.product;
    const caseItem = currentBuild.find(b => b.type === 'Case')?.product;
    
    // Check CPU-Motherboard compatibility
    if (cpu && motherboard) {
      if (cpu.specs.socketType !== motherboard.specs.socketType) {
        issues.push(`CPU socket (${cpu.specs.socketType}) doesn't match Motherboard socket (${motherboard.specs.socketType})`);
      }
    }
    
    // Check power requirements
    if (psu) {
      const totalWattage = calculateTotalWattage(currentBuild);
      const psuWattage = Number(psu.specs.wattage) || 0;
      if (psuWattage < totalWattage) {
        issues.push(`PSU ${psuWattage}W insufficient. System requires ~${totalWattage}W (recommended: ${Math.ceil(totalWattage * 1.2)}W)`);
      }
    }
    
    // Check case form factor
    if (motherboard && caseItem) {
      const mbFormFactor = motherboard.specs.formFactor as string;
      const caseFormFactors = caseItem.specs.formFactor as string;
      if (caseFormFactors && !caseFormFactors.toLowerCase().includes(mbFormFactor?.toLowerCase() || '')) {
        issues.push(`Motherboard form factor (${mbFormFactor}) may not fit in case`);
      }
    }
    
    setCompatibilityIssues(issues);
  };

  const calculateTotalWattage = (currentBuild: BuildComponent[]): number => {
    let total = 0;
    const cpu = currentBuild.find(b => b.type === 'CPU')?.product;
    const gpu = currentBuild.find(b => b.type === 'GPU')?.product;
    
    if (cpu) total += Number(cpu.specs.tdp) || 65;
    if (gpu) total += Number(gpu.specs.powerRequirement) || 150;
    total += 50; // Base system (motherboard, RAM, storage, fans)
    
    return Math.ceil(total * 1.2); // 20% headroom
  };

  const getTotalPrice = (): number => {
    return build.reduce((sum, comp) => sum + (comp.product?.price || 0), 0);
  };

  const addBuildToCart = () => {
    build.forEach(comp => {
      if (comp.product) {
        addItem(comp.product, 1);
      }
    });
    alert('Build added to cart successfully!');
  };

  const resetBuild = () => {
    setBuild(steps.map(s => ({ type: s.type, product: null })));
    setCurrentStep(0);
    setCompatibilityIssues([]);
  };

  const isStepComplete = (index: number) => build[index].product !== null;
  const allRequiredComplete = steps.every((s, idx) => !s.required || build[idx].product);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Custom PC Builder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Build your dream PC step by step with real-time compatibility checking
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Left: Steps & Components */}
          <div className="lg:col-span-2 space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const component = build[index];
              const isActive = index === currentStep;
              const isComplete = isStepComplete(index);
              
              return (
                <motion.div
                  key={step.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all ${
                    isActive
                      ? 'border-orange-500 ring-4 ring-orange-500/20'
                      : isComplete
                      ? 'border-green-500'
                      : 'border-gray-200 dark:border-gray-700'
                  } ${!isActive && 'opacity-70 hover:opacity-100'}`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${
                          isComplete ? 'bg-green-100 dark:bg-green-900/30' : 'bg-orange-100 dark:bg-orange-900/30'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            isComplete ? 'text-green-600 dark:text-green-500' : 'text-orange-600 dark:text-orange-500'
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            {step.type}
                            {!step.required && <span className="text-xs text-gray-500 font-normal">(Optional)</span>}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Step {index + 1} of {steps.length}
                          </p>
                        </div>
                      </div>
                      
                      {isComplete ? (
                        <Check className="w-8 h-8 text-green-500" />
                      ) : (
                        <button
                          onClick={() => {
                            setCurrentStep(index);
                            setShowModal(true);
                          }}
                          className="px-6 py-2 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
                        >
                          Choose
                        </button>
                      )}
                    </div>
                    
                    {component.product ? (
                      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <Image
                          src={component.product.imageUrl}
                          alt={component.product.name}
                          width={80}
                          height={80}
                          className="object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {component.product.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {component.product.brand}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-orange-600 dark:text-orange-500">
                            ${component.product.price.toLocaleString()}
                          </p>
                          <button
                            onClick={() => {
                              const newBuild = [...build];
                              newBuild[index] = { type: step.type, product: null };
                              setBuild(newBuild);
                              checkCompatibility(newBuild);
                            }}
                            className="text-sm text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                          No {step.type.toLowerCase()} selected
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            {/* Build Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Build Summary</h2>
              
              <div className="space-y-4 mb-6">
                {steps.map((step, idx) => {
                  const comp = build[idx];
                  return (
                    <div key={step.type} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{step.type}</span>
                      {comp.product ? (
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ${comp.product.price.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-orange-600 dark:text-orange-500">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Estimated wattage: {calculateTotalWattage(build)}W
                </p>
              </div>
              
              {/* Compatibility Status */}
              {compatibilityIssues.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 mb-4 border-l-4 border-red-500">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                        Compatibility Issues
                      </h3>
                      <ul className="text-sm text-red-600 dark:text-red-300 space-y-1">
                        {compatibilityIssues.map((issue, idx) => (
                          <li key={idx}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {allRequiredComplete && compatibilityIssues.length === 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-4 border-l-4 border-green-500">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-green-700 dark:text-green-400">
                      Build is compatible!
                    </span>
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={addBuildToCart}
                  disabled={!allRequiredComplete || compatibilityIssues.length > 0}
                  className="w-full py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add Build to Cart
                </button>
                
                <button
                  onClick={() => alert('Build saved!')}
                  disabled={build.every(b => !b.product)}
                  className="w-full py-3 border-2 border-orange-500 text-orange-600 dark:text-orange-500 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Build
                </button>
                
                <button
                  onClick={resetBuild}
                  className="w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset Build
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Component Selection Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Choose {steps[currentStep]?.type}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                <div className="grid md:grid-cols-2 gap-4">
                  {getAvailableProducts(steps[currentStep]?.type).map(product => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => selectComponent(product)}
                      className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-orange-500 cursor-pointer transition"
                    >
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {product.brand}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-orange-600 dark:text-orange-500">
                          ${product.price.toLocaleString()}
                        </span>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition flex items-center gap-1">
                          Select
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {getAvailableProducts(steps[currentStep]?.type).length === 0 && (
                  <div className="text-center py-12">
                    <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No compatible products available for this selection.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
