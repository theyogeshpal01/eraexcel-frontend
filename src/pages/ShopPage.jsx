import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const enc = (path) => path.split("/").map(encodeURIComponent).join("/");

const CATEGORIES = ["All", "Floor Cleaner", "Dish Wash", "Toilet Cleaner", "Hand Wash", "Concentrate", "Glass Cleaner", "Room Freshener", "Detergent"];

const ShopPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => { if (data.success) setProducts(data.data); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Page Header */}
      <div className="relative bg-gray-900 pt-32 pb-16 mb-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Shop Header"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">Shop Cleaning Essentials</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto mt-2">Explore our complete range of premium UJJMING home care products.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search + Count bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 shrink-0">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                activeCategory === cat
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-brand-400 hover:text-brand-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col animate-pulse">
                <div className="h-52 bg-gray-200" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-3 w-1/3 bg-gray-200 rounded-full" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded-full" />
                  <div className="flex justify-between items-center mt-3">
                    <div className="h-5 w-12 bg-gray-200 rounded-full" />
                    <div className="h-8 w-16 bg-gray-200 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-50 p-4 flex items-center justify-center">
                  {item.isNewProduct && (
                    <span className="absolute top-3 left-3 z-10 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">NEW</span>
                  )}
                  <img
                    src={enc(item.image)}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  
                </div>
                {/* Info */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">{item.category}</span>
                    <h3 className="font-bold text-gray-900 text-sm mt-0.5 mb-1 leading-tight">{item.name}</h3>
                    <p className="text-xs text-gray-400 mb-3">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-lg text-gray-900">₹{item.price}</span>
                    <Link
                      to={`/product/${item._id}`}
                      className="text-xs font-bold text-brand-600 border border-brand-200 px-3 py-1.5 rounded-full hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;

