import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Box, Shield, Truck, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/product-card';

export const dynamic = 'force-dynamic';

async function getFeaturedProducts() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(6);
  return data || [];
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-cyan-50/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
                <Sparkles className="h-4 w-4" />
                Value For Money Shopping
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                Great Quality and
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {' '}
                  Fast Delivery
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Best for edgy, high-fashion, or streetwear brands.
                  Don’t Just Follow Trends. Break Every Rule. Define Your Own Era
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="gap-2 bg-cyan-600 hover:bg-cyan-700">
                    Explore Products
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/products?category=furniture">
                  <Button size="lg" variant="outline">
                    View Furniture
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative lg:h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-20" />
              <div className="relative">
                <Box className="h-64 w-64 text-cyan-600 animate-pulse" strokeWidth={0.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-gray-200 hover:border-cyan-300 transition-colors">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="rounded-full bg-cyan-50 p-3">
                  <Box className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-lg">Great Quality</h3>
                <p className="text-sm text-gray-600">
                  We Ensure Top-notch Quality Products with faster delivery.
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 hover:border-cyan-300 transition-colors">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="rounded-full bg-cyan-50 p-3">
                  <Truck className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-lg">Free Shipping</h3>
                <p className="text-sm text-gray-600">
                  Free delivery on all orders over $100
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-200 hover:border-cyan-300 transition-colors">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="rounded-full bg-cyan-50 p-3">
                  <Shield className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="font-semibold text-lg">Secure Checkout</h3>
                <p className="text-sm text-gray-600">
                  Your payment information is always protected
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Handpicked premium items for your modern lifestyle
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/products">
              <Button size="lg" variant="outline" className="gap-2">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
