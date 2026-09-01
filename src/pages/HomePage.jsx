import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Droplets, CheckCircle, ArrowRight, Eye, Heart, ShoppingCart, ChevronLeft, ChevronRight, Truck, Leaf, Users, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';

const heroSlides = [
  {
    id: 1,
    bgImg: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "100% FRESH & GREASE FREE",
    desc: "modern bright kitchen counter with cleaning sponge dish soap banner",
    img: "/hero-1.webp"
  },
  {
    id: 2,
    bgImg: "https://images.unsplash.com/photo-1585421514738-01798e348b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "TOUGH ON STAINS, GENTLE ON CLOTHES",
    desc: "Advanced enzyme formula for bright whites and vibrant colors.",
    img: "/hero-2.jpg"
  },
  {
    id: 3,
    bgImg: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "SHINE & 24HR FRESHNESS",
    desc: "Kill bacteria and remove tough stains on all types of floors.",
    img: "/hero-3.jpg"
  }
];



const HomePage = () => {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const [products, setProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    setProductsLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products`)
      .then(res => res.json())
      .then(data => { 
        if(data.success) {
          setProducts(data.data);
          // Pick 3 random products for Best Sellers
          const shuffled = [...data.data].sort(() => 0.5 - Math.random());
          setBestSellers(shuffled.slice(0, 3));
        }
      })
      .finally(() => setProductsLoading(false));
      
    fetch(`${import.meta.env.VITE_API_BASE_URL}/testimonials`)
      .then(res => res.json())
      .then(data => { if(data.success) setTestimonials(data.data); });
  }, []);

  // Carousel Logic
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialTimer);
  }, [testimonials]);

  // Countdown Logic (10 Days)
  const [timeLeft, setTimeLeft] = useState({
    days: '10',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    // Target date is 10 days from when the component first mounts
    const targetDate = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;

    const countdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(countdownTimer);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: d.toString().padStart(2, '0'),
          hours: h.toString().padStart(2, '0'),
          minutes: m.toString().padStart(2, '0'),
          seconds: s.toString().padStart(2, '0')
        });
      }
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);
  
  return (
    <div className="w-full">
      {/* HERO SECTION CAROUSEL */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden min-h-[600px] flex items-center transition-colors duration-700">
        
        {/* Carousel Slides */}
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'} bg-gray-900`}
          >
            {/* Background Image with Overlay */}
            <img src={slide.bgImg} alt="Background" className="absolute inset-0 object-cover w-full h-full opacity-30 mix-blend-overlay" />
            
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            
            <div className="relative flex flex-col items-center justify-center w-full h-full px-4 mx-auto max-w-7xl sm:px-12 lg:px-16 md:flex-row">
              
              {/* Left Content */}
              <div className={`w-full md:w-1/2 text-left mb-12 md:mb-0 pr-0 md:pr-8 transform transition-all duration-1000 ${index === currentSlide ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-10 opacity-0'}`}>
                <h1 
                  className="mb-4 text-4xl font-black leading-tight tracking-tight text-white uppercase sm:text-5xl lg:text-6xl drop-shadow-sm"
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />
                <p className="max-w-md mb-8 text-lg font-medium leading-relaxed text-white/90 sm:text-xl drop-shadow-sm">
                  {slide.desc}
                </p>
                <Link to="/shop" className="inline-block bg-white text-gray-900 font-bold px-8 py-3.5 uppercase tracking-wide text-sm hover:bg-gray-100 transition-colors shadow-lg">
                  Shop Now
                </Link>
              </div>
              
              {/* Right Image Content */}
              <div className={`w-full md:w-1/2 relative flex justify-center md:justify-end transform transition-all duration-1000 ${index === currentSlide ? 'translate-x-0 opacity-100 delay-500' : 'translate-x-10 opacity-0'}`}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4/5 h-[120%] border-2 border-white/20 pointer-events-none rounded-sm hidden md:block"></div>
                <div className="relative z-10">
                  <img 
                    src={slide.img} 
                    alt="Cleaning Products" 
                    className="object-contain w-full max-w-lg mix-blend-multiply drop-shadow-2xl filter contrast-125"
                  />
                </div>
              </div>

            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 z-20 hidden p-4 text-gray-800 transition-colors -translate-y-1/2 top-1/2 bg-white/30 hover:bg-white sm:block"
        >
          <ChevronLeft className="w-8 h-8 text-gray-800" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 z-20 hidden p-4 text-gray-800 transition-colors -translate-y-1/2 top-1/2 bg-white/30 hover:bg-white sm:block"
        >
          <ChevronRight className="w-8 h-8 text-gray-800" />
        </button>

        {/* Dots */}
        <div className="absolute z-20 flex gap-2 -translate-x-1/2 bottom-8 left-1/2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      {/* PROMOTIONAL BANNERS GRID */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            
            {/* Banner 1 - Tall (Left) */}
            <div className="relative overflow-hidden md:col-span-1 md:row-span-2 rounded-2xl group">
              <img 
                src="/bathroom-care.avif" 
                alt="Bathroom Cleaners" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[400px]"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-white uppercase rounded-full bg-brand-500">Best Value</span>
                <h3 className="mb-2 text-2xl font-black text-white">Bathroom <br/>Care Sets</h3>
                <Link to="/shop?category=bathroom" className="inline-flex items-center gap-2 font-bold text-white transition-colors hover:text-accent group/link">
                  Shop Now <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Banner 2 - Wide (Top Right) */}
            <div className="relative overflow-hidden md:col-span-2 rounded-2xl group">
              <img 
                src="/floor-cleaner.avif" 
                alt="Floor Cleaners" 
                className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/60 to-transparent"></div>
              <div className="absolute inset-y-0 flex flex-col justify-center left-8">
                <h3 className="mb-2 text-2xl font-black text-white sm:text-3xl">Ultra Shine <br/>Floor Liquid</h3>
                <p className="hidden max-w-xs mb-4 text-gray-200 sm:block">Experience the ultimate freshness and hygiene with our advanced formula.</p>
                <Link to="/shop?category=floor" className="inline-flex items-center gap-2 font-bold transition-colors text-accent hover:text-white">
                  Explore <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Banner 3 - Small (Bottom Center) */}
            <div className="relative overflow-hidden md:col-span-1 rounded-2xl group">
              <img 
                src="/kitchen-cleaner.avif" 
                alt="Kitchen Cleaners" 
                className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 transition-colors pointer-events-none bg-black/30 group-hover:bg-black/40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="mb-3 text-xl font-black text-white">Kitchen Essentials</h3>
                <Link to="/shop?category=kitchen" className="px-6 py-2 text-sm font-bold text-gray-900 transition-colors bg-white rounded-full hover:bg-brand-600 hover:text-white">
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Banner 4 - Small (Bottom Right) */}
            <div className="relative flex items-center justify-center p-8 overflow-hidden text-center border md:col-span-1 rounded-2xl group bg-brand-50 border-brand-100">
              <div>
                <span className="inline-block mb-4 text-brand-600">
                  <ShieldCheck className="w-12 h-12 mx-auto" />
                </span>
                <h3 className="mb-2 text-xl font-black text-gray-900">100% Safe <br/>Ingredients</h3>
                <p className="mb-4 text-sm text-gray-600">Tough on stains, gentle on surfaces and your family.</p>
                <Link to="/about" className="text-sm font-bold underline text-brand-600 hover:text-brand-700 underline-offset-4">
                  Read our story
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEW PRODUCTS */}
      <section className="py-20 border-t border-gray-100 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-black tracking-wide text-gray-900 uppercase">New Products</h2>
            <p className="max-w-2xl mx-auto text-gray-500">Browse the collection of our new products. You'll definitely find what you are looking for.</p>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-md border border-gray-100 overflow-hidden flex flex-col">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 flex flex-col gap-2">
                    <div className="h-3 w-1/3 bg-gray-200 rounded-full" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
                    <div className="h-3 w-1/2 bg-gray-200 rounded-full" />
                    <div className="h-5 w-16 bg-gray-200 rounded-full mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products
              .reduce((acc, item) => {
                if (!acc.find(p => p.category === item.category)) acc.push(item);
                return acc;
              }, [])
              .map((item) => (
              <div key={item._id} className="relative flex flex-col p-4 overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-md group hover:shadow-xl">
                {item.isNewProduct && (
                  <div className="absolute z-10 top-4 left-4">
                    <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">NEW</span>
                  </div>
                )}
                
                <div className="relative flex items-center justify-center h-56 mb-4 overflow-hidden">
                  <img 
                    src={item.image.split('/').map(encodeURIComponent).join('/')} 
                    alt={item.name} 
                    className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 transition-opacity opacity-0 bg-black/5 group-hover:opacity-100">
                    
                    <Link to={`/product/${item._id}`} className="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors translate-y-4 bg-white rounded-full shadow-md hover:bg-brand-600 hover:text-white group-hover:translate-y-0">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-gray-900 truncate transition-colors cursor-pointer hover:text-brand-600">{item.name}</h3>
                    
                    {/* Star Ratings */}
                    <div className="flex items-center gap-0.5 text-brand-600 mb-2">
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2 mt-auto">
                    <span className="text-lg font-black text-gray-900">₹{item.price.toFixed(2)}</span>
                    {item.oldPrice && <span className="text-sm text-gray-400 line-through">₹{item.oldPrice.toFixed(2)}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* DEAL OF THE DAY */}
      <section className="py-24 bg-white border-gray-100 border-y">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            
            {/* Left Content - Deal */}
            <div className="w-full text-center md:w-1/2 md:text-left">
              <span className="block mb-2 font-serif italic font-medium text-gray-500">Pure & Eco-Friendly!</span>
              <h2 className="mb-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Natural Multi-Surface Home Care Cleaner...
              </h2>
              <p className="max-w-lg mx-auto mb-8 text-sm leading-relaxed text-gray-500 md:mx-0">
                Make your home shine effortlessly with our non-toxic, eco-friendly cleaner. Formulated with plant-based ingredients, it toughly removes grease and dirt while leaving behind a refreshing natural aroma. Safe for kids, pets, and all household surfaces.
              </p>
              
              <div className="mb-8 text-2xl italic font-black text-brand-600">
                Special Deal - 20% Off
              </div>

              {/* Countdown Timer */}
              <div className="flex justify-center gap-4 mb-8 md:justify-start">
                {[
                  { value: timeLeft.days, label: 'DAYS' },
                  { value: timeLeft.hours, label: 'HOURS' },
                  { value: timeLeft.minutes, label: 'MINS' },
                  { value: timeLeft.seconds, label: 'SECS' }
                ].map((time, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center w-16 h-16 bg-white border border-gray-200 sm:w-20 sm:h-20">
                    <span className="text-xl font-medium text-gray-800 sm:text-2xl">{time.value}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">{time.label}</span>
                  </div>
                ))}
              </div>

              <Link to="/shop" className="inline-block px-10 py-3 text-sm font-bold text-white uppercase transition-colors bg-brand-600 hover:bg-brand-700">
                SHOP NOW
              </Link>
            </div>

            {/* Right Image */}
            <div className="relative w-full md:w-1/2">
              <img 
                src="/image-1.jpg" 
                alt="Healthy Clean Eating" 
                className="object-cover w-full h-auto rounded-xl"
              />
             
            </div>

          </div>
        </div>
      </section>
      {/* SERVICES STRIP */}
      <section className="bg-white border-b border-gray-100">
        <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Free UK Standard Delivery', desc: 'Designated Day Delivery', icon: <Truck className="w-8 h-8 text-brand-600" /> },
              { title: 'Freshly Prepared Ingredients', desc: 'Made For Your Delivery Date', icon: <Leaf className="w-8 h-8 text-brand-600" /> },
              { title: '85% Of Our Clients', desc: 'Reach Their Personal Goals Set', icon: <Users className="w-8 h-8 text-brand-600" /> },
              { title: 'Winner Of 15 Awards', desc: 'Healthy Food And Drink 2017', icon: <Award className="w-8 h-8 text-brand-600" /> },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{feature.title}</h4>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING ITEMS */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row">
            
            {/* Left Title Column */}
            <div className="flex flex-col justify-center w-full text-center lg:w-1/4 lg:text-left">
              <h2 className="mb-4 text-2xl font-black tracking-wide text-gray-900 uppercase">Trending Items</h2>
              <p className="mb-8 text-sm text-gray-500">Browse the collection of our new products. You'll definitely find what you are looking for.</p>
            </div>

            {/* Product Cards (3 columns) */}
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.slice(0, 3).map((item) => (
                  <div key={item._id} className="relative flex flex-col p-4 overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-md group hover:shadow-xl">
                    {item.isNewProduct && (
                      <div className="absolute z-10 top-4 left-4">
                        <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">NEW</span>
                      </div>
                    )}
                    
                    <div className="relative flex items-center justify-center h-56 mb-4 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Hover Actions */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 transition-opacity opacity-0 bg-black/5 group-hover:opacity-100">
                        
                        <Link to={`/product/${item._id}`} className="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors translate-y-4 bg-white rounded-full shadow-md hover:bg-brand-600 hover:text-white group-hover:translate-y-0">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="mb-1 text-sm font-bold text-gray-900 truncate transition-colors cursor-pointer hover:text-brand-600">{item.name}</h3>
                        
                        {/* Star Ratings */}
                        <div className="flex items-center gap-0.5 text-brand-600 mb-2">
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-gray-900">₹{item.price.toFixed(2)}</span>
                            {item.oldPrice && <span className="text-xs text-gray-400 line-through decoration-gray-400">₹{item.oldPrice.toFixed(2)}</span>}
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECONDARY PROMO BANNERS */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            {/* Left Large Banner */}
            <div className="relative rounded-sm overflow-hidden group aspect-[4/3] md:aspect-auto md:h-[400px] bg-amber-100 flex items-center justify-center">
              <img 
                src="/prj-1.webp" 
                alt="Heart Healthy Oatmeal" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 mix-blend-multiply opacity-70"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-8">
                <span className="self-start px-2 py-1 mb-4 text-xs font-bold text-white uppercase bg-red-500 rounded-sm">NEW</span>
                <div className="bg-[#4a8cdb] w-32 h-32 rounded-full flex items-center justify-center text-white font-black text-xl text-center shadow-lg -rotate-12 mb-4">
                  NATURAL<br/>HOME CLEANING
                </div>
              </div>
            </div>

            {/* Right Stacked Banners */}
            <div className="flex flex-col gap-6">
              {/* Top Small Banner */}
              <div className="relative rounded-sm overflow-hidden group h-[188px] bg-blue-50">
                <img 
                  src="/hand-soap.webp" 
                  alt="Orange Jam" 
                  className="absolute top-0 right-0 object-cover w-1/2 h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-y-0 left-0 flex flex-col justify-center w-2/3 p-8 bg-gradient-to-r from-blue-50 via-blue-50 to-transparent">
                  <h3 className="mb-1 text-xl font-black tracking-wider text-gray-800 uppercase">HAND SOAP SET</h3>
                  <div className="text-4xl italic font-black text-brand-600">50% <span className="text-xl">off</span></div>
                </div>
              </div>

              {/* Bottom Small Banner */}
              <div className="relative rounded-sm overflow-hidden group h-[188px] bg-gray-900">
                <img 
                  src="/sponge.jpg" 
                  alt="Farm Fresh" 
                  className="absolute top-0 right-0 object-cover w-1/2 h-full transition-transform duration-700 opacity-70 group-hover:scale-105 mix-blend-screen"
                />
                <div className="absolute inset-y-0 left-0 flex flex-col justify-center w-2/3 p-8">
                  <div className="text-[#e5a882] text-xl font-serif italic mb-1">100% Eco-Friendly</div>
                  <h3 className="text-3xl italic font-black tracking-wider text-white">PREMIUM <br /> SPONGE <br /> SET</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BEST SELLERS (Layout 2) */}
      <section className="py-20 border-t border-gray-100 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row">
            
            {/* Left Title Column */}
            <div className="flex flex-col justify-center w-full text-center lg:w-1/4 lg:text-left">
              <h2 className="relative inline-block mb-4 text-2xl font-black tracking-widest text-gray-900 uppercase">
                BEST SELLERS
                <div className="absolute w-8 h-1 -translate-x-1/2 -bottom-2 left-1/2 lg:left-0 lg:translate-x-0 bg-brand-600"></div>
              </h2>
              <p className="mt-4 mb-8 text-sm leading-relaxed text-gray-500">Browse the collection of our new products. You'll definitely find what you are looking for.</p>
            </div>

            {/* Product Cards (3 columns) */}
            <div className="w-full lg:w-3/4">
              {productsLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-md border border-gray-100 flex flex-col p-4">
                      <div className="h-56 bg-gray-200 rounded mb-4" />
                      <div className="h-4 w-3/4 bg-gray-200 rounded-full mb-2" />
                      <div className="h-3 w-1/2 bg-gray-200 rounded-full mb-3" />
                      <div className="h-6 w-20 bg-gray-200 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bestSellers.map((item) => (
                  <div key={item._id} className="relative flex flex-col p-4 overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-md group hover:shadow-xl">
                    {item.isNewProduct && (
                      <div className="absolute z-10 top-4 left-4">
                        <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">NEW</span>
                      </div>
                    )}
                    
                    <div className="relative flex items-center justify-center h-56 mb-4 overflow-hidden">
                      <img 
                        src={item.image ? item.image.split('/').map(encodeURIComponent).join('/') : ''} 
                        alt={item.name} 
                        className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 transition-opacity opacity-0 bg-black/5 group-hover:opacity-100">
                        
                        <Link to={`/product/${item._id}`} className="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors translate-y-4 bg-white rounded-full shadow-md hover:bg-brand-600 hover:text-white group-hover:translate-y-0">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="mb-1 text-sm font-bold text-gray-900 truncate transition-colors cursor-pointer hover:text-brand-600">{item.name}</h3>
                        <div className="flex items-center gap-0.5 text-brand-600 mb-2">
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-gray-900">₹{item.price}</span>
                            {item.oldPrice && <span className="text-xs text-gray-400 line-through decoration-gray-400">₹{item.oldPrice}</span>}
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FROM OUR BLOG */}
      {/* OUR GALLERY */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black tracking-widest text-gray-900 uppercase">Our Gallery</h2>
            <p className="max-w-2xl mx-auto text-sm text-gray-500">Discover our complete range of premium cleaning and hygiene products, designed for your home.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              "/product-images/DISHWASH-20260720T160434Z-1-001/DISHWASH/UJJMING_product_composite.jpg",
              "/product-images/FLOOR CLEANER - GREEN-20260720T160438Z-1-001/FLOOR CLEANER - GREEN/FLOOR CLEANER - GREEN-Composit.jpg",
              "/product-images/FLOOR CLEANER - PINK-20260720T160447Z-1-001/FLOOR CLEANER - PINK/UJJMING-FLOOR CLEANER - PINK-Composit-V1.jpg",
              "/product-images/FLOOR CLEANER - YELLOW-20260720T160457Z-1-001/FLOOR CLEANER - YELLOW/FLOOR CLEANER - YELLOW-Composit.jpg",
              "/product-images/GLASS CLEANER-20260720T160501Z-1-001/GLASS CLEANER/UJJMING_GLASS CLEANER-Composit-V1.jpeg",
              "/product-images/HANDWASH 1-20260720T160506Z-1-001/HANDWASH 1/UJJMING_HANDWASH 1-Composit.jpg",
              "/product-images/HANDWASH 2-20260720T160511Z-1-001/HANDWASH 2/UJJMING_HANDWASH 2-Composit.jpg",
              "/product-images/LIQUID DETERGENT-20260720T160515Z-1-001/LIQUID DETERGENT/UJJMING_LIQUID DETERGENT-Composit.jpg"
            ].map((imgUrl, idx) => (
              <div 
                key={idx} 
                className={`group relative overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center
                  ${idx === 0 || idx === 3 ? 'col-span-2 row-span-2 min-h-[300px]' : 'aspect-square'}
                `}
              >
                <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/10 transition-colors duration-500 z-10" />
                <img 
                  src={imgUrl.split('/').map(encodeURIComponent).join('/')} 
                  alt="Gallery Item" 
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-2 text-3xl font-black tracking-tight text-gray-900 uppercase">Frequently Questions</h2>
            <div className="w-16 h-1 mx-auto bg-brand-600"></div>
          </div>
          
          <div className="space-y-6">
            {[
              { q: "Are your cleaning products safe for pets?", a: "Yes, our organic and natural formulas are completely safe for pets and children. We avoid harsh chemicals and toxic residues." },
              { q: "How long does standard delivery take?", a: "Standard delivery typically takes 3-5 business days. We also offer next-day delivery options at checkout for urgent needs." },
              { q: "Can I use the multipurpose cleaner on wood?", a: "Our multipurpose cleaner is safe for sealed wood surfaces. However, we recommend testing it on an inconspicuous area first." },
              { q: "Do you offer a money-back guarantee?", a: "Absolutely! If you're not satisfied with any of our products, you can return them within 30 days for a full refund." }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 rounded-sm bg-gray-50 sm:p-8">
                <h4 className="flex items-start gap-3 mb-3 text-lg font-bold text-gray-900">
                  <span className="text-brand-600 shrink-0 mt-0.5">Q.</span>
                  {faq.q}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 pl-7">
                  <span className="mr-2 font-bold text-gray-400">A.</span>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 border-t border-gray-100 bg-gray-50">
        <div className="relative max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          {testimonials.length > 0 ? (
            <>
              <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 min-h-[300px] transition-opacity duration-500">
               
                <div className="flex-grow">
                  <h4 className="mb-2 text-lg font-black text-gray-900">{testimonials[currentTestimonial]?.name}</h4>
                  <div className="mb-4 font-serif text-4xl leading-none text-gray-200">"</div>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium italic min-h-[80px]">
                    {testimonials[currentTestimonial]?.text}
                  </p>
                </div>
              </div>
              
              {/* Testimonial Dots */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${currentTestimonial === idx ? 'bg-brand-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400">Loading testimonials...</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;


