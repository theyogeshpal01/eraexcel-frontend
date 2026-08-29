import React from 'react';
import { ShieldCheck, Leaf, HeartHandshake, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="relative bg-gray-900 pt-32 pb-16 mb-8 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="About Header Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">Redefining Home Cleanliness</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto mt-2">EraExcel is on a mission to bring professional-grade, safe, and effective cleaning solutions to every modern household.</p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded with the belief that a clean home is the foundation of a healthy life, EraExcel started as a small initiative to formulate cleaning products that actually work without harsh chemicals.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we are proud to offer a comprehensive range of home care products that are trusted by thousands of households. From stubborn kitchen grease to everyday floor cleaning, our advanced formulas are designed to make your life easier and your home brighter.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="EraExcel Products" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-brand-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900">Why Trust EraExcel?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <ShieldCheck className="w-8 h-8" />, title: 'Quality Tested', desc: 'Rigorous testing for safety and efficiency.' },
              { icon: <Leaf className="w-8 h-8" />, title: 'Eco-Conscious', desc: 'Formulas that respect your home and environment.' },
              { icon: <HeartHandshake className="w-8 h-8" />, title: 'Trusted Brand', desc: 'Loved by thousands of happy households.' },
              { icon: <Award className="w-8 h-8" />, title: 'Premium Results', desc: 'Professional-grade cleaning power at home.' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
