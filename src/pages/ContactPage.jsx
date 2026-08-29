import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      const res = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          subject: 'Contact Form Submission',
          message: form.message
        })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Something went wrong');
      setStatus({ loading: false, success: true, error: '' });
      setForm({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      {/* Page Header */}
      <div className="relative bg-gray-900 pt-32 pb-16 mb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Contact Header Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">Get in Touch</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto mt-2">Have a question? Our support team is here to help you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Contact Info */}
          <div className="bg-brand-900 text-white p-10 sm:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-brand-400 shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-brand-100 text-sm mt-1">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-brand-400 shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-brand-100 text-sm mt-1">support@eraexcel.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brand-400 shrink-0" />
                  <div>
                    <p className="font-medium">Office Address</p>
                    <p className="text-brand-100 text-sm mt-1 leading-relaxed">
                      EraExcel Tower, Business District<br />
                      New Delhi, India 110001
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16">
              <p className="text-sm text-brand-300">Business Hours: Monday - Friday (9AM - 6PM)</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 sm:p-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>
            {status.success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5" /> Message sent successfully!
              </div>
            )}
            {status.error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl">
                {status.error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows="4" required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" disabled={status.loading} className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                {status.loading ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
