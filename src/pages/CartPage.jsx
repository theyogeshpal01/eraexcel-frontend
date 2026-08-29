import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen pb-16">
        {/* Page Header */}
        <div className="relative bg-gray-900 pt-32 pb-16 mb-8 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Cart Header Background" 
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">Your Cart</h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto mt-2">Review your cleaning essentials before checkout.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-md p-16 shadow-sm border border-gray-100 flex flex-col items-center justify-center mt-8">
            <div className="w-24 h-24 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop" className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-8 uppercase text-sm transition-colors rounded-sm">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Page Header */}
      <div className="relative bg-gray-900 pt-32 pb-16 mb-8 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Cart Header Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">Your Cart</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto mt-2">Review your cleaning essentials before checkout.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li key={item.id} className="py-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <img src={item.image || "https://images.unsplash.com/photo-1585836932483-3c940b3ff600?ixlib=rb-4.0.3&w=200&q=80"} alt={item.name} className="w-24 h-24 rounded-lg object-cover bg-gray-50" />
                  <div className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                    <p className="text-brand-600 font-bold mb-4">₹{item.price}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-gray-500 hover:text-brand-600 transition-colors"><Minus className="w-4 h-4" /></button>
                        <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-gray-500 hover:text-brand-600 transition-colors"><Plus className="w-4 h-4" /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-medium transition-colors">
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 font-black text-xl text-gray-900">
                    ₹{item.price * item.quantity}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 text-xl mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between">
                <span className="font-black text-lg text-gray-900">Total</span>
                <span className="font-black text-xl text-brand-600">₹{cartTotal}</span>
              </div>
              <button className="w-full bg-accent hover:bg-accent-hover text-gray-900 font-bold py-4 rounded-full transition-colors flex items-center justify-center gap-2 text-lg shadow-sm">
                Checkout <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
