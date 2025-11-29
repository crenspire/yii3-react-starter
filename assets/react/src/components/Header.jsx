import React from 'react';
import { Link } from '@inertiajs/react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Yii3 Starter Kit</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Home
            </Link>
            <a href="#features" className="text-gray-700 hover:text-gray-900 font-medium">
              Features
            </a>
            <a href="#how-to-use" className="text-gray-700 hover:text-gray-900 font-medium">
              How to Use
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

