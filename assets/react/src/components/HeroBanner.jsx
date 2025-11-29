import React from 'react';

export default function HeroBanner({ title, subtitle, cta }) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            {subtitle}
          </p>
          <div className="flex justify-center">
            <a
              href="#features"
              className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg"
            >
              {cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

