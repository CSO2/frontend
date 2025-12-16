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
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 sm:mb-6">
            Why Choose CS02?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-16">
            {/* Feature 1 (Large) */}
            <div className="lg:col-span-8 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card to-secondary/10 border border-primary/10 hover:border-primary/50 transition-all duration-500">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 h-full flex flex-col justify-between">
                <div className="flex items-start justify-end">
                  <div className="text-9xl font-bold text-foreground/5 font-heading absolute -right-4 -bottom-8 select-none z-0">
                    01
                  </div>
                </div>
                <div className="mt-8 z-10">
                  <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Expert Guidance</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                    Our AI-powered BuilderBot and team of expert technicians work together to ensure you choose the absolute perfect components for your specific needs and budget. No bottlenecks, just performance.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 & 3 (Stacked Column) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex-1 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card to-secondary/10 border border-primary/10 hover:border-primary/50 transition-all duration-500 p-8">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">Premium Quality</h3>
                </div>
                <p className="text-muted-foreground">
                  We verify every component. Only the most reliable hardware from trusted brands makes it into our inventory.
                </p>
              </div>

              <div className="flex-1 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card to-secondary/10 border border-primary/10 hover:border-primary/50 transition-all duration-500 p-8">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">Full Support</h3>
                </div>
                <p className="text-muted-foreground">
                  24/7 priority customer support and comprehensive lifetime technical assistance for your build.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
