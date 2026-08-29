import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronUp, CheckCircle } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus({ loading: true, success: false, error: '' });
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/newsletters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Subscription failed');
      setStatus({ loading: false, success: true, error: '' });
      setEmail('');
      setTimeout(() => setStatus({ loading: false, success: false, error: '' }), 5000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
      setTimeout(() => setStatus({ loading: false, success: false, error: '' }), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-100 relative">
      {/* Brands Area */}
      <div className="border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center opacity-40 grayscale gap-8 lg:gap-0">
            <span className="font-black text-xl tracking-widest uppercase">Designers</span>
            <span className="font-black text-xl tracking-widest uppercase">Oceandor</span>
            <span className="font-black text-xl tracking-widest uppercase border-y-2 border-current px-2">Photograph</span>
            <span className="font-black text-xl tracking-widest uppercase">Shopname</span>
            <span className="font-black text-xl tracking-widest uppercase">Steak House</span>
            <span className="font-black text-xl tracking-widest uppercase border border-current px-4">Retroge</span>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Contact Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-8">
              <span className="text-3xl font-black text-gray-800 tracking-tight">EraExcel</span>
              <div className="w-2.5 h-2.5 rounded-full bg-brand-500 mt-1"></div>
            </Link>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <span><strong className="text-gray-800">Address:</strong> The Barn, Ullenhall, Henley in Arden<br/>B578 5CC, England</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <span><strong className="text-gray-800">Call Us:</strong> +123.456.789 - +123.456.678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <span><strong className="text-gray-800">Email:</strong> support@eraexcel.com</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Information */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 tracking-wide">INFORMATION</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-brand-500 transition-colors">About Us</Link></li>
              <li><Link to="/terms" className="hover:text-brand-500 transition-colors">Delivery information</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-500 transition-colors">Travel</Link></li>
              <li><Link to="/terms" className="hover:text-brand-500 transition-colors">Conditions</Link></li>
              <li><a href="/#faq" className="hover:text-brand-500 transition-colors">Frequently Questions</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter & Social */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 tracking-wide">NEWSLETTER</h4>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Join 69.000+ subscribers & get a new discount coupon every Monday.
            </p>
            {status.success && <p className="text-green-600 text-xs mb-2 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Subscribed!</p>}
            {status.error && <p className="text-red-600 text-xs mb-2">{status.error}</p>}
            <form onSubmit={handleSubscribe} className="flex mb-8">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" 
                className="bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2.5 w-full focus:outline-none focus:border-brand-500"
              />
              <button type="submit" disabled={status.loading} className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white px-4 py-2.5 transition-colors flex items-center justify-center shrink-0">
                {status.loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Mail className="w-5 h-5" />}
              </button>
            </form>
            <div className="flex gap-2">
              {['f', 'tw', 'g+', 'in'].map((label, idx) => (
                <a key={idx} href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-500 font-bold font-serif hover:text-white hover:bg-brand-500 hover:border-brand-500 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Instagram */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 tracking-wide">INSTAGRAM</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                '1581578731548-c64695cc6952',
                '1584820927508-cade26cb2e76',
                '1527515637462-cff94eecc1ac',
                '1584622650111-993a426fbf0a',
                '1563453392212-326f5e854473',
                '1585836932483-3c940b3ff600'
              ].map((img, i) => (
                <a href="#" key={i} className="block relative group aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={`https://images.unsplash.com/photo-${img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} 
                    alt="Instagram" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
          <p>Copyright &copy; {new Date().getFullYear()} <span className="text-brand-600">EraExcel</span> All Right Reserved.</p>
          
          <div className="flex gap-2 items-center">
            {/* Payment Icons Mockup */}
            <div className="flex gap-1 h-6 items-center">
              <div className="px-2 py-0.5 bg-purple-600 text-white text-[10px] font-bold rounded-sm">Skrill</div>
              <div className="px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-sm">Bitcoin</div>
              <div className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-sm italic">PayPal</div>
              <div className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-sm">MasterCard</div>
              <div className="px-2 py-0.5 bg-blue-800 text-white text-[10px] font-bold rounded-sm">VISA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-brand-600 hover:bg-brand-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-50"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;
