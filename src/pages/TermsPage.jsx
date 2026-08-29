import React from 'react';

const TermsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Page Header */}
      <div className="relative bg-gray-900 pt-32 pb-16 mb-8 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Terms Header Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">Terms & Conditions</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-8">Last updated: August 27, 2026</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
              <p>
                Welcome to EraExcel. These terms and conditions outline the rules and regulations for the use of our website and services.
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use EraExcel if you do not agree to take all of the terms and conditions stated on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Products and Services</h2>
              <p>
                All cleaning products displayed on the website are subject to availability. We reserve the right to limit the quantities of any products or services that we offer. 
                All descriptions of products or product pricing are subject to change at any time without notice, at the sole discretion of us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Payments & Billing</h2>
              <p>
                We accept various forms of secure online payments. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.
                We reserve the right to refuse any order you place with us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Return & Refund Policy</h2>
              <p>
                Our goal is to ensure you are completely satisfied with your purchase. If you are not satisfied, please contact our support team within 7 days of receiving your order for return instructions.
                Products must be unused and in their original packaging.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
              <p>
                EraExcel shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
