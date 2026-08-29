import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, ChevronLeft, ChevronRight, Tag, Package } from "lucide-react";
import { useCart } from "../context/CartContext";

const enc = (path) => path.split("/").map(encodeURIComponent).join("/");

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.data);
          setActiveImg(0);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const allImages = product
    ? product.images && product.images.length > 0
      ? product.images
      : [product.image]
    : [];

  const prevImg = () => setActiveImg((p) => (p - 1 + allImages.length) % allImages.length);
  const nextImg = () => setActiveImg((p) => (p + 1) % allImages.length);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Page Header */}
      <div className="relative bg-gray-900 pt-32 pb-16 mb-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Product Header Background"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            {product ? product.name : "Product Details"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-brand-600 font-medium mb-8 hover:text-brand-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !product ? (
          <div className="text-center py-20 text-gray-400 text-xl">Product not found.</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* ── IMAGE GALLERY ── */}
              <div className="flex flex-col gap-4">
                {/* Main Image */}
                <div className="relative bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center h-[400px] group">
                  <img
                    key={activeImg}
                    src={enc(allImages[activeImg])}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-all duration-300"
                  />
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImg}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-600 hover:text-white"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImg}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-600 hover:text-white"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  {/* Image counter badge */}
                  {allImages.length > 1 && (
                    <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {activeImg + 1} / {allImages.length}
                    </span>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {allImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImg(idx)}
                        className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-gray-50 flex items-center justify-center ${
                          activeImg === idx
                            ? "border-brand-600 shadow-md"
                            : "border-gray-200 hover:border-brand-300"
                        }`}
                      >
                        <img
                          src={enc(img)}
                          alt={`View ${idx + 1}`}
                          className="max-w-full max-h-full object-contain p-1"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── PRODUCT INFO ── */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Category & New badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    {product.isNewProduct && (
                      <span className="text-xs font-bold uppercase tracking-widest text-white bg-brand-600 px-3 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-gray-500 text-sm mb-4">{product.description}</p>

                  {/* Star rating */}
                  <div className="flex items-center gap-1 mb-5">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-current text-brand-600" />
                    ))}
                    <span className="text-sm text-gray-400 ml-2">(24 reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-black text-gray-900">₹{product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <>
                        <span className="text-lg text-gray-400 line-through">₹{product.oldPrice.toFixed(2)}</span>
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* Divider */}
                  <hr className="border-gray-100 mb-6" />

                  {/* SKU */}
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Tag className="w-4 h-4" />
                    <span>SKU: <span className="font-medium text-gray-600">{product.sku || "N/A"}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                    <Package className="w-4 h-4" />
                    <span>Category: <span className="font-medium text-gray-600">{product.category}</span></span>
                  </div>
                </div>

                {/* Quantity + Add to Cart */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold text-gray-900">{qty}</span>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-400">Total: <span className="font-black text-gray-800">₹{(product.price * qty).toFixed(2)}</span></span>
                  </div>

                  <button
                    onClick={() => addToCart({ id: product._id, name: product.name, price: product.price, image: product.image }, qty)}
                    className="flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-8 rounded-xl transition-colors text-base shadow-md hover:shadow-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
