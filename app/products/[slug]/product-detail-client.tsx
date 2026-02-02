'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Package, Shield, RotateCw } from 'lucide-react';
import { Product } from '@/lib/supabase';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Model3DViewer from '@/components/model-3d-viewer';

type ProductWithCategory = Product & {
  categories?: {
    name: string;
    slug: string;
  };
};

export default function ProductDetailClient({
  product,
}: {
  product: ProductWithCategory;
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('image');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      await addToCart(product.id);
    }

    toast({
      title: 'Added to cart',
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="image" className="flex-1">
                  Photo
                </TabsTrigger>
                <TabsTrigger value="3d" className="flex-1 gap-2">
                  <RotateCw className="h-4 w-4" />
                  3D View
                </TabsTrigger>
              </TabsList>
              <TabsContent value="image" className="mt-4">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                  />
                </div>
              </TabsContent>
              <TabsContent value="3d" className="mt-4">
                <Model3DViewer modelUrl={product.model_url} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div>
              {product.categories && (
                <Badge variant="outline" className="mb-2">
                  {product.categories.name}
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
              <div className="mt-4 flex items-baseline gap-4">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.stock > 0 ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    In Stock ({product.stock} available)
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-900">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full gap-2 bg-cyan-600 hover:bg-cyan-700 h-12 text-base"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Package className="h-5 w-5 text-cyan-600" />
                  <div>
                    <p className="font-medium text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-600">On orders over $100</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <Shield className="h-5 w-5 text-cyan-600" />
                  <div>
                    <p className="font-medium text-sm">Secure Payment</p>
                    <p className="text-xs text-gray-600">100% protected</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
