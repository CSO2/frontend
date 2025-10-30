import HeroSection from './components/home/HeroSection';
import CategoriesSection from './components/home/CategoriesSection';
import FeaturedProductsSection from './components/home/FeaturedProductsSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      
      {/* Additional sections can be added here */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose CS02?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Expert Guidance
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our BuilderBot and experts help you choose the perfect components for your needs
              </p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Only the best components from trusted brands with full warranties
              </p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-4">💯</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Full Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                24/7 customer support and lifetime technical assistance on all builds
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
