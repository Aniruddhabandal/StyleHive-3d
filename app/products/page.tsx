import { supabase } from '@/lib/supabase';
import ProductsClient from './products-client';

export const dynamic = 'force-dynamic';

async function getProducts() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  return { products: products || [], categories: categories || [] };
}

export default async function ProductsPage() {
  const { products, categories } = await getProducts();

  return <ProductsClient initialProducts={products} categories={categories} />;
}
