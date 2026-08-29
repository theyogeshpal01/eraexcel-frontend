import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-black text-brand-900 mb-4 tracking-tighter">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Page Not Found</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-bold px-8 py-3.5 rounded-sm hover:bg-gray-50 transition-colors uppercase text-sm tracking-wide shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
          <Link to="/" className="flex items-center gap-2 bg-brand-600 text-white font-bold px-8 py-3.5 rounded-sm hover:bg-brand-700 transition-colors uppercase text-sm tracking-wide shadow-md">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
