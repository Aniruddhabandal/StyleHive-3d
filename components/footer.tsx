import Link from 'next/link';
import { Box, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Box className="h-6 w-6 text-cyan-400" />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                StyleHive
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Premium ecommerce experience for modern shoppers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-cyan-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=furniture" className="hover:text-cyan-400 transition-colors">
                  Furniture
                </Link>
              </li>
              <li>
                <Link href="/products?category=electronics" className="hover:text-cyan-400 transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=decor" className="hover:text-cyan-400 transition-colors">
                  Decor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/orders" className="hover:text-cyan-400 transition-colors">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-cyan-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="hover:text-cyan-400 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="hover:text-cyan-400 transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://github.com/Aniruddhabandal" className="hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://x.com/AniruddhaBanda2" className="hover:text-cyan-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:aniruddhabandal97@gmail.com" className="hover:text-cyan-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} StyleHive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
