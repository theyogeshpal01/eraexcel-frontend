import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const headerClass = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/40 backdrop-blur-md shadow-lg py-0' : 'bg-transparent border-none py-2'}`;

  const textColorClass = "text-white";
  const hoverColorClass = "hover:text-white/80";
  const logoColorClass = "text-white";

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className={`text-2xl font-black tracking-tight ${logoColorClass}`}>EraExcel</span>
            <div className={`w-2 h-2 rounded-full ${isHomePage ? 'bg-white' : 'bg-brand-500'} mt-1`}></div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`${textColorClass} ${hoverColorClass} font-bold transition-colors uppercase text-sm tracking-wider`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons / Right Actions */}
          <div className={`flex items-center h-20 h-full ${textColorClass}`}>
            
            {/* Desktop Separated Actions */}
            <div className="hidden sm:flex items-stretch h-full border-l border-white/20">
              <button className={`px-6 flex items-center justify-center border-r border-white/20 ${hoverColorClass} transition-colors`}>
                <Search className="w-5 h-5" />
              </button>
              
              <Link to="/cart" className={`px-6 flex items-center justify-center border-r border-white/20 ${hoverColorClass} transition-colors relative group`}>
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className={`absolute -top-2 -right-2 bg-white text-gray-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-transparent shadow-sm`}>
                    {cartCount}
                  </span>
                </div>
              </Link>
              
              <button className={`px-6 flex items-center justify-center border-r border-white/20 ${hoverColorClass} transition-colors`}>
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button (replaces the desktop one on small screens) */}
            <button 
              className="sm:hidden text-white hover:text-white/80 transition-colors ml-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-gray-800 hover:bg-brand-50 hover:text-brand-700 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-4 pt-4 flex gap-4 px-3">
               <button className="text-gray-600 flex items-center gap-2 text-sm font-medium">
                 <Search className="w-4 h-4" /> Search
               </button>
               <Link to="/login" className="text-gray-600 flex items-center gap-2 text-sm font-medium" onClick={() => setIsOpen(false)}>
                 <User className="w-4 h-4" /> Account
               </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
