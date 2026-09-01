import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Package, MessageSquare, LogOut, Trash2, RefreshCw,
  Plus, Pencil, X, Check, Tag, KeyRound, Mail, Users, ChevronLeft, ChevronRight, Menu, Eye
} from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL;
const enc = (path) => path ? path.split("/").map(encodeURIComponent).join("/") : "";

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h3 className="text-lg font-black text-gray-900">{title}</h3>
        <button onClick={onClose} className="text-gray-400 transition-colors hover:text-gray-600"><X className="w-5 h-5" /></button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);

const Field = ({ label, type = "text", value, onChange, placeholder, required, textarea }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
    {textarea
      ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none" />
      : <input type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
    }
  </div>
);

const Btn = ({ onClick, children, variant = "primary", sm, type = "button", disabled }) => {
  const base = "inline-flex items-center gap-1.5 font-semibold rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const size = sm ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm";
  const color = variant === "primary" ? "bg-brand-600 hover:bg-brand-700 text-white"
    : variant === "danger" ? "bg-red-500 hover:bg-red-600 text-white"
    : variant === "ghost" ? "border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
    : "bg-gray-100 hover:bg-gray-200 text-gray-700";
  return <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${size} ${color}`}>{children}</button>;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const adminName = localStorage.getItem("adminName") || "Admin";

  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const emptyProd = { name: "", sku: "", description: "", price: "", oldPrice: "", image: "", category: "", isNewProduct: false };
  const emptyCat  = { name: "", description: "" };
  const emptyTest = { name: "", text: "" };
  const emptyPw   = { currentPassword: "", newPassword: "", confirmPassword: "" };
  const [prodForm, setProdForm] = useState(emptyProd);
  const [catForm,  setCatForm]  = useState(emptyCat);
  const [testForm, setTestForm] = useState(emptyTest);
  const [pwForm,   setPwForm]   = useState(emptyPw);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (!token) { navigate("/admin"); return; } fetchAll(); }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [p, c, t, cn, nl] = await Promise.all([
        fetch(`${API}/products`).then(r => r.json()),
        fetch(`${API}/categories`).then(r => r.json()),
        fetch(`${API}/testimonials`).then(r => r.json()),
        fetch(`${API}/contacts`).then(r => r.json()),
        fetch(`${API}/newsletters`).then(r => r.json()),
      ]);
      if (p.success) setProducts(p.data);
      if (c.success) setCategories(c.data);
      if (t.success) setTestimonials(t.data);
      if (cn.success) setContacts(cn.data);
      if (nl.success) setNewsletters(nl.data);
    } catch {}
    setLoading(false);
  }, []);

  const closeModal = () => { setModal(null); setErr(""); };
  const authHeader = () => ({ "Content-Type": "application/json", Authorization: `Bearer ${token}` });

  const openAddProduct  = () => { setProdForm(emptyProd); setModal({ type: "addProduct" }); };
  const openEditProduct = (p) => { setProdForm({ ...p, price: p.price ?? "", oldPrice: p.oldPrice ?? "", image: p.image ?? "" }); setModal({ type: "editProduct", id: p._id }); };
  const saveProduct = async () => {
    setSaving(true); setErr("");
    try {
      const isEdit = modal.type === "editProduct";
      const url = isEdit ? `${API}/products/${modal.id}` : `${API}/products`;
      const res = await fetch(url, { method: isEdit ? "PUT" : "POST", headers: authHeader(), body: JSON.stringify({ ...prodForm, price: Number(prodForm.price), oldPrice: prodForm.oldPrice ? Number(prodForm.oldPrice) : undefined }) });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      await fetchAll(); closeModal();
    } catch (e) { setErr(e.message); }
    setSaving(false);
  };
  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`${API}/products/${id}`, { method: "DELETE", headers: authHeader() });
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  const openAddCat  = () => { setCatForm(emptyCat); setModal({ type: "addCat" }); };
  const openEditCat = (c) => { setCatForm({ name: c.name, description: c.description || "" }); setModal({ type: "editCat", id: c._id }); };
  const saveCat = async () => {
    setSaving(true); setErr("");
    try {
      const isEdit = modal.type === "editCat";
      const url = isEdit ? `${API}/categories/${modal.id}` : `${API}/categories`;
      const res = await fetch(url, { method: isEdit ? "PUT" : "POST", headers: authHeader(), body: JSON.stringify(catForm) });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      await fetchAll(); closeModal();
    } catch (e) { setErr(e.message); }
    setSaving(false);
  };
  const deleteCat = async (id) => {
    if (!confirm("Delete this category?")) return;
    await fetch(`${API}/categories/${id}`, { method: "DELETE", headers: authHeader() });
    setCategories(prev => prev.filter(c => c._id !== id));
  };

  const openAddTest  = () => { setTestForm(emptyTest); setModal({ type: "addTest" }); };
  const openEditTest = (t) => { setTestForm({ name: t.name, text: t.text }); setModal({ type: "editTest", id: t._id }); };
  const saveTest = async () => {
    setSaving(true); setErr("");
    try {
      const isEdit = modal.type === "editTest";
      const url = isEdit ? `${API}/testimonials/${modal.id}` : `${API}/testimonials`;
      const res = await fetch(url, { method: isEdit ? "PUT" : "POST", headers: authHeader(), body: JSON.stringify(testForm) });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      await fetchAll(); closeModal();
    } catch (e) { setErr(e.message); }
    setSaving(false);
  };
  const deleteTest = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`${API}/testimonials/${id}`, { method: "DELETE", headers: authHeader() });
    setTestimonials(prev => prev.filter(t => t._id !== id));
  };

  const deleteContact = async (id) => {
    if (!confirm("Delete this contact message?")) return;
    await fetch(`${API}/contacts/${id}`, { method: "DELETE", headers: authHeader() });
    setContacts(prev => prev.filter(c => c._id !== id));
  };

  const deleteNewsletter = async (id) => {
    if (!confirm("Delete this subscriber?")) return;
    await fetch(`${API}/newsletters/${id}`, { method: "DELETE", headers: authHeader() });
    setNewsletters(prev => prev.filter(n => n._id !== id));
  };

  const changePassword = async () => {
    if (pwForm.newPassword !== pwForm.confirmPassword) { setErr("New passwords don't match"); return; }
    setSaving(true); setErr("");
    try {
      const res = await fetch(`${API}/admin/change-password`, { method: "POST", headers: authHeader(), body: JSON.stringify({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }) });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      closeModal(); alert("Password changed successfully!");
    } catch (e) { setErr(e.message); }
    setSaving(false);
  };

  const logout = () => { localStorage.removeItem("adminToken"); localStorage.removeItem("adminName"); navigate("/admin"); };

  const tabs = [
    { key: "products",     icon: <Package className="w-4 h-4" />,      label: "Products",     count: products.length },
    { key: "categories",   icon: <Tag className="w-4 h-4" />,          label: "Categories",   count: categories.length },
    { key: "testimonials", icon: <MessageSquare className="w-4 h-4" />, label: "Testimonials", count: testimonials.length },
    { key: "contacts",     icon: <Users className="w-4 h-4" />,        label: "Contacts",     count: contacts.length },
    { key: "newsletters",  icon: <Mail className="w-4 h-4" />,         label: "Newsletters",  count: newsletters.length },
  ];

  // Pagination Logic for Products
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset pagination when switching tabs
  useEffect(() => { setCurrentPage(1); setIsMobileMenuOpen(false); }, [tab]);

  return (
    <div className="flex h-screen font-sans bg-gray-100 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 text-white transition-transform transform bg-brand-950 lg:translate-x-0 lg:static lg:w-60 lg:shrink-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-brand-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center text-base font-black w-9 h-9 bg-brand-600 rounded-xl">E</div>
            <div><p className="text-sm font-black leading-tight">EraExcel</p><p className="text-xs truncate text-brand-400">{adminName}</p></div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === t.key ? "bg-brand-600 text-white" : "text-brand-300 hover:bg-brand-800"}`}>
              <span className="flex items-center gap-2.5">{t.icon}{t.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? "bg-white/20" : "bg-brand-800"}`}>{t.count}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-brand-800 space-y-0.5">
          <button onClick={() => { setPwForm(emptyPw); setErr(""); setModal({ type: "password" }); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-300 hover:bg-brand-800 transition-colors">
            <KeyRound className="w-4 h-4" /> Change Password
          </button>
          <Link to="/" target="_blank" className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-300 hover:bg-brand-800 transition-colors">
            ðŸŒ View Website
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/30 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 lg:hidden shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center text-sm font-black text-white w-7 h-7 bg-brand-600 rounded-lg">E</div>
            <p className="text-sm font-black text-gray-900">EraExcel Admin</p>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-1.5 text-gray-600 rounded-md hover:bg-gray-100">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-black text-gray-900">{tabs.find(t => t.key === tab)?.label}</h2>
            <p className="text-gray-400 text-xs mt-0.5">{tabs.find(t => t.key === tab)?.count} records</p>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="ghost" sm onClick={fetchAll}><RefreshCw className="w-3.5 h-3.5" /> Refresh</Btn>
            {tab === "products"     && <Btn sm onClick={openAddProduct}><Plus className="w-3.5 h-3.5" /> Add Product</Btn>}
            {tab === "categories"   && <Btn sm onClick={openAddCat}><Plus className="w-3.5 h-3.5" /> Add Category</Btn>}
            {tab === "testimonials" && <Btn sm onClick={openAddTest}><Plus className="w-3.5 h-3.5" /> Add Testimonial</Btn>}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64"><div className="w-10 h-10 border-4 rounded-full border-brand-600 border-t-transparent animate-spin" /></div>
        ) : tab === "products" ? (
          <div className="flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead className="border-b border-gray-100 bg-gray-50">
                  <tr>{["Image","Name","Category","MRP","SKU","Actions"].map(h => <th key={h} className="px-4 py-3 text-xs font-semibold tracking-wide text-left text-gray-600 uppercase">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentProducts.map(p => (
                    <tr key={p._id} className="transition-colors hover:bg-gray-50">
                      <td className="px-4 py-3"><img src={enc(p.image)} alt={p.name} className="object-contain w-10 h-10 p-1 bg-gray-100 rounded-lg" /></td>
                      <td className="px-4 py-3"><p className="font-semibold text-gray-900 max-w-[200px] truncate">{p.name}</p><p className="text-xs text-gray-400">{p.description}</p></td>
                      <td className="px-4 py-3"><span className="bg-brand-50 text-brand-700 text-xs font-bold px-2 py-0.5 rounded-full">{p.category}</span></td>
                      <td className="px-4 py-3 font-black text-gray-900">â‚¹{p.price}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-400">{p.sku || "â€”"}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Btn sm variant="secondary" onClick={() => openEditProduct(p)}><Pencil className="w-3 h-3" /></Btn>
                          <Btn sm variant="danger" onClick={() => deleteProduct(p._id)}><Trash2 className="w-3 h-3" /></Btn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-500">Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, products.length)} of {products.length}</p>
                <div className="flex items-center gap-1">
                  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i + 1} onClick={() => paginate(i + 1)} className={`w-8 h-8 rounded-md text-sm font-medium ${currentPage === i + 1 ? "bg-brand-600 text-white" : "hover:bg-gray-200 text-gray-700"}`}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="p-1.5 rounded-md hover:bg-gray-200 disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ) : tab === "categories" ? (
          <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>{["Name","Description","Actions"].map(h => <th key={h} className="px-4 py-3 text-xs font-semibold tracking-wide text-left text-gray-600 uppercase">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {categories.map(c => (
                  <tr key={c._id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{c.description || "â€”"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Btn sm variant="secondary" onClick={() => openEditCat(c)}><Pencil className="w-3 h-3" /></Btn>
                        <Btn sm variant="danger" onClick={() => deleteCat(c._id)}><Trash2 className="w-3 h-3" /></Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        ) : tab === "contacts" ? (
          <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>{["Date","Name","Email","Subject","Message","Actions"].map(h => <th key={h} className="px-4 py-3 text-xs font-semibold tracking-wide text-left text-gray-600 uppercase">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {contacts.map(c => (
                  <tr key={c._id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-gray-600">{c.email}</td>
                    <td className="px-4 py-3 text-gray-800">{c.subject || "â€”"}</td>
                    <td className="max-w-xs px-4 py-3 text-xs text-gray-500 truncate" title={c.message}>{c.message}</td>
                    <td className="px-4 py-3"><div className="flex gap-2"><Btn sm variant="ghost" onClick={() => setModal({ type: 'viewContact', data: c })}><Eye className="w-4 h-4" /></Btn><Btn sm variant="danger" onClick={() => deleteContact(c._id)}><Trash2 className="w-3 h-3" /></Btn></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        ) : tab === "newsletters" ? (
          <div className="max-w-2xl overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
              <thead className="border-b border-gray-100 bg-gray-50">
                <tr>{["Date","Email","Actions"].map(h => <th key={h} className="px-4 py-3 text-xs font-semibold tracking-wide text-left text-gray-600 uppercase">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {newsletters.map(n => (
                  <tr key={n._id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3 text-xs text-gray-500">{new Date(n.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{n.email}</td>
                    <td className="px-4 py-3">
                      <Btn sm variant="danger" onClick={() => deleteNewsletter(n._id)}><Trash2 className="w-3 h-3" /></Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map(t => (
              <div key={t._id} className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <div className="flex gap-1">
                    <Btn sm variant="secondary" onClick={() => openEditTest(t)}><Pencil className="w-3 h-3" /></Btn>
                    <Btn sm variant="danger" onClick={() => deleteTest(t._id)}><Trash2 className="w-3 h-3" /></Btn>
                  </div>
                </div>
                <p className="text-sm italic leading-relaxed text-gray-500">"{t.text}"</p>
              </div>
            ))}
          </div>
        )}
      </main>
      </div>

      {/* Add/Edit Product Modal */}
      {(modal?.type === "addProduct" || modal?.type === "editProduct") && (
        <Modal title={modal.type === "addProduct" ? "Add Product" : "Edit Product"} onClose={closeModal}>
          {err && <p className="px-3 py-2 mb-3 text-sm text-red-600 rounded-lg bg-red-50">{err}</p>}
          <Field label="Name" value={prodForm.name} onChange={e => setProdForm(f => ({ ...f, name: e.target.value }))} placeholder="Product name" required />
          <Field label="SKU" value={prodForm.sku} onChange={e => setProdForm(f => ({ ...f, sku: e.target.value }))} placeholder="e.g. FC-1L" />
          <Field label="Description" value={prodForm.description} onChange={e => setProdForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description" textarea />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Price (MRP) â‚¹" type="number" value={prodForm.price} onChange={e => setProdForm(f => ({ ...f, price: e.target.value }))} placeholder="90" required />
            <Field label="Old Price â‚¹" type="number" value={prodForm.oldPrice} onChange={e => setProdForm(f => ({ ...f, oldPrice: e.target.value }))} placeholder="110" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
            <select value={prodForm.category} onChange={e => setProdForm(f => ({ ...f, category: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400">
              <option value="">â€” Select category â€”</option>
              {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Image (Upload or URL)</label>
            <div className="flex gap-2 mb-2">
              <input type="file" accept="image/*" onChange={async (e) => {
                const file = e.target.files[0];
                if(!file) return;
                setSaving(true);
                const formData = new FormData();
                formData.append("file", file);
                try {
                  const res = await fetch(`${API}/upload`, { method: "POST", headers: { "Authorization": `Bearer ${localStorage.getItem('adminToken')}` }, body: formData });
                  const data = await res.json();
                  if(data.success) {
                    setProdForm(f => ({ ...f, image: data.url }));
                  } else {
                    alert("Upload failed: " + data.message);
                  }
                } catch(err) {
                  alert("Upload error");
                }
                setSaving(false);
              }} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 border border-gray-200 rounded-xl" />
            </div>
            <input type="text" value={prodForm.image} onChange={e => setProdForm(f => ({ ...f, image: e.target.value }))} placeholder="Or enter image URL here" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <input type="checkbox" id="isNew" checked={prodForm.isNewProduct} onChange={e => setProdForm(f => ({ ...f, isNewProduct: e.target.checked }))} className="w-4 h-4 rounded text-brand-600" />
            <label htmlFor="isNew" className="text-sm font-medium text-gray-700">Mark as NEW product</label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Btn variant="ghost" onClick={closeModal}>Cancel</Btn>
            <Btn onClick={saveProduct} disabled={saving}>{saving ? "Saving..." : <><Check className="w-4 h-4" /> Save</>}</Btn>
          </div>
        </Modal>
      )}

      {/* Add/Edit Category Modal */}
      {(modal?.type === "addCat" || modal?.type === "editCat") && (
        <Modal title={modal.type === "addCat" ? "Add Category" : "Edit Category"} onClose={closeModal}>
          {err && <p className="px-3 py-2 mb-3 text-sm text-red-600 rounded-lg bg-red-50">{err}</p>}
          <Field label="Category Name" value={catForm.name} onChange={e => setCatForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Floor Cleaner" required />
          <Field label="Description" value={catForm.description} onChange={e => setCatForm(f => ({ ...f, description: e.target.value }))} placeholder="Optional description" textarea />
          <div className="flex justify-end gap-2 pt-2">
            <Btn variant="ghost" onClick={closeModal}>Cancel</Btn>
            <Btn onClick={saveCat} disabled={saving}>{saving ? "Saving..." : <><Check className="w-4 h-4" /> Save</>}</Btn>
          </div>
        </Modal>
      )}

      {/* Add/Edit Testimonial Modal */}
      {(modal?.type === "addTest" || modal?.type === "editTest") && (
        <Modal title={modal.type === "addTest" ? "Add Testimonial" : "Edit Testimonial"} onClose={closeModal}>
          {err && <p className="px-3 py-2 mb-3 text-sm text-red-600 rounded-lg bg-red-50">{err}</p>}
          <Field label="Customer Name" value={testForm.name} onChange={e => setTestForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Priya Sharma" required />
          <Field label="Review Text" value={testForm.text} onChange={e => setTestForm(f => ({ ...f, text: e.target.value }))} placeholder="What did they say..." textarea required />
          <div className="flex justify-end gap-2 pt-2">
            <Btn variant="ghost" onClick={closeModal}>Cancel</Btn>
            <Btn onClick={saveTest} disabled={saving}>{saving ? "Saving..." : <><Check className="w-4 h-4" /> Save</>}</Btn>
          </div>
        </Modal>
      )}

      {/* Change Password Modal */}
      {modal?.type === "password" && (
        <Modal title="Change Password" onClose={closeModal}>
          {err && <p className="px-3 py-2 mb-3 text-sm text-red-600 rounded-lg bg-red-50">{err}</p>}
          <Field label="Current Password" type="password" value={pwForm.currentPassword} onChange={e => setPwForm(f => ({ ...f, currentPassword: e.target.value }))} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" required />
          <Field label="New Password" type="password" value={pwForm.newPassword} onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" required />
          <Field label="Confirm New Password" type="password" value={pwForm.confirmPassword} onChange={e => setPwForm(f => ({ ...f, confirmPassword: e.target.value }))} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" required />
          <div className="flex justify-end gap-2 pt-2">
            <Btn variant="ghost" onClick={closeModal}>Cancel</Btn>
            <Btn onClick={changePassword} disabled={saving}>{saving ? "Saving..." : <><Check className="w-4 h-4" /> Update Password</>}</Btn>
          </div>
        </Modal>
      )}

      {/* View Contact Modal */}
      {modal?.type === "viewContact" && (
        <Modal title="Contact Message Details" onClose={closeModal}>
          <div className="space-y-4 text-sm text-gray-800">
            <div><span className="font-bold text-gray-900">Name:</span> {modal.data.name}</div>
            <div><span className="font-bold text-gray-900">Email:</span> {modal.data.email}</div>
            <div><span className="font-bold text-gray-900">Subject:</span> {modal.data.subject || "—"}</div>
            <div><span className="font-bold text-gray-900">Date:</span> {new Date(modal.data.createdAt).toLocaleString()}</div>
            <div className="pt-2 border-t border-gray-100">
              <div className="font-bold text-gray-900 mb-1">Message:</div>
              <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded-lg border border-gray-100">{modal.data.message}</p>
            </div>
            <div className="pt-4 flex justify-end">
              <Btn variant="ghost" onClick={closeModal}>Close</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;





