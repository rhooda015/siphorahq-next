'use client';
import React, { useState, useEffect } from 'react';
import { Bell, Check, AlertCircle, Search, Menu, Plus } from 'lucide-react';
import ProductEditor from '@/components/admin/ProductEditor';

// Import Views
import AdminSidebar from '@/components/admin/views/AdminSidebar';
import DashboardView from '@/components/admin/views/DashboardView';
import ProductsTableView from '@/components/admin/views/ProductsTableView';
import OrdersTableView from '@/components/admin/views/OrdersTableView';
import AnalyticsView from '@/components/admin/views/AnalyticsView';
import SettingsView from '@/components/admin/views/SettingsView';
import CollectionsView from '@/components/admin/views/CollectionsView';
import CustomersView from '@/components/admin/views/CustomersView';
import HomepageBuilderView from '@/components/admin/views/HomepageBuilderView';
import MediaLibraryView from '@/components/admin/views/MediaLibraryView';
import CouponsView from '@/components/admin/views/CouponsView';
import ReviewsView from '@/components/admin/views/ReviewsView';
import SEOView from '@/components/admin/views/SEOView';
import ThemeEditorView from '@/components/admin/views/ThemeEditorView';
import NavigationBuilderView from '@/components/admin/views/NavigationBuilderView';
import CMSPagesView from '@/components/admin/views/CMSPagesView';
import CategoriesView from '@/components/admin/views/CategoriesView';

export default function AdminSPA() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [toast, setToast] = useState<{message: string, type: 'success'|'error'} | null>(null);
  
  // States for DB data
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [returns, setReturns] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(false);
  
  // Modals / Editors
  const [productEditor, setProductEditor] = useState<any>(null);
  const [trackingModalOrder, setTrackingModalOrder] = useState<any>(null);

  const showToast = (message: string, type: 'success'|'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTabData = async (tab: string) => {
    setLoading(true);
    try {
      if (tab === 'Overview' || tab === 'Analytics') {
        const res = await fetch('/api/admin/stats');
        setStats(await res.json());
      } else if (tab === 'Orders') {
        const res = await fetch('/api/admin/orders');
        setOrders(await res.json());
      } else if (tab === 'Products') {
        const res = await fetch('/api/products');
        setProducts(await res.json());
      } else if (tab === 'Returns') {
        const res = await fetch('/api/admin/returns');
        setReturns(await res.json());
      } else if (tab === 'Coupons') {
        const res = await fetch('/api/admin/coupons');
        setCoupons(await res.json());
      }
    } catch (e) {
      showToast(`Failed to load ${tab}`, 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab]);

  // Handlers
  const handleSaveProduct = async (productData: any) => {
    const isEdit = !!productData._id;
    const url = isEdit ? `/api/products/${productData._id}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        showToast(`Product saved successfully`);
        setProductEditor(null);
        fetchTabData('Products');
      } else {
        showToast('Failed to save product', 'error');
      }
    } catch (error) {
      showToast('Error saving product', 'error');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    showToast('Product deleted');
    fetchTabData('Products');
  };

  const handleUpdateOrder = async (orderId: string, updates: any) => {
    const res = await fetch('/api/admin/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, ...updates })
    });
    if (res.ok) {
      showToast('Order status updated');
      fetchTabData('Orders');
      setTrackingModalOrder(null);
    } else {
      showToast('Failed to update order', 'error');
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} pendingDispatch={stats?.pendingDispatch || 0} />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* TOP NAVBAR */}
        <header className="h-[72px] bg-white border-b border-zinc-200 flex items-center justify-between px-8 flex-shrink-0 z-10">
          
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden text-zinc-500 hover:text-[#18181b]"><Menu size={20}/></button>
            <div className="relative w-96 hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="text" placeholder="Search orders, products, customers..." className="w-full bg-zinc-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none transition-all" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-zinc-500 hover:text-[#18181b] transition-colors">
              <Bell size={20} />
              {stats?.pendingDispatch > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>}
            </button>
            <div className="w-px h-6 bg-zinc-200"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-zinc-50 p-1.5 rounded-lg transition-colors -mr-1.5">
              <div className="w-8 h-8 rounded-full bg-zinc-800 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                A
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold text-[#18181b] leading-tight">Admin User</p>
                <p className="text-[11px] font-medium text-zinc-500">Store Owner</p>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-auto p-8 relative">
          
          {productEditor ? (
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-2">
              <ProductEditor 
                initialData={productEditor} 
                onClose={() => setProductEditor(null)} 
                onSave={handleSaveProduct} 
              />
            </div>
          ) : loading && activeTab !== 'Overview' && activeTab !== 'Analytics' ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin w-8 h-8 border-4 border-[#18181b]/20 border-t-[#18181b] rounded-full"></div>
            </div>
          ) : (
            <>
              {activeTab === 'Overview' && <DashboardView stats={stats} />}
              {activeTab === 'Products' && <ProductsTableView products={products} onEdit={setProductEditor} onDelete={handleDeleteProduct} />}
              {activeTab === 'Orders' && <OrdersTableView orders={orders} onManage={setTrackingModalOrder} />}
              {activeTab === 'Analytics' && <AnalyticsView stats={stats} />}
              {activeTab === 'Settings' && <SettingsView />}
              
              {/* New Premium UIs (Mock Data) */}
              {activeTab === 'Collections' && <CollectionsView />}
              {activeTab === 'Homepage' && <HomepageBuilderView />}
              {activeTab === 'Media' && <MediaLibraryView />}
              {activeTab === 'Coupons' && <CouponsView />}
              {activeTab === 'Customers' && <CustomersView />}
              {activeTab === 'Reviews' && <ReviewsView />}
              {activeTab === 'SEO' && <SEOView />}
              {activeTab === 'Theme' && <ThemeEditorView />}
              {activeTab === 'Navigation' && <NavigationBuilderView />}
              {activeTab === 'Pages' && <CMSPagesView />}
              {activeTab === 'Categories' && <CategoriesView />}
            </>
          )}

        </div>
      </main>

      {/* TRACKING MODAL (PRESERVED FROM ORIGINAL) */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0C1929]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col border border-zinc-200">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <div>
                <h2 className="text-lg font-bold text-[#18181b]">Order {trackingModalOrder.orderId}</h2>
                <p className="text-xs text-zinc-500">Manage fulfillment and tracking</p>
              </div>
              <button onClick={() => setTrackingModalOrder(null)} className="text-zinc-400 hover:text-[#18181b] bg-white border border-zinc-200 p-1.5 rounded-md shadow-sm">
                ✕
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              handleUpdateOrder(trackingModalOrder.orderId, {
                status: fd.get('status'),
                courier: fd.get('courier'),
                awb: fd.get('awb'),
                expectedDelivery: fd.get('expected'),
                internalNotes: fd.get('internalNotes')
              });
            }} className="p-6 space-y-5">
              
              {/* Order Status Timeline Vis */}
              <div className="flex justify-between items-center px-4 mb-6 relative">
                <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-zinc-200 -z-10 -translate-y-1/2"></div>
                {['Pending', 'Processing', 'Shipped', 'Delivered'].map((step, idx) => {
                  const currentIdx = ['pending_payment', 'Processing', 'Shipped', 'Delivered'].indexOf(trackingModalOrder.status);
                  const isPast = currentIdx >= idx;
                  const isCurrent = currentIdx === idx;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 bg-white">
                      <div className={`w-4 h-4 rounded-full border-2 ${isPast ? 'bg-[#18181b] border-[#18181b]' : 'bg-white border-zinc-300'} ${isCurrent ? 'ring-4 ring-zinc-100' : ''}`}></div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isPast ? 'text-[#18181b]' : 'text-zinc-400'}`}>{step}</span>
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Update Status</label>
                <select name="status" defaultValue={trackingModalOrder.status} className="w-full border border-zinc-300 rounded-lg p-2.5 text-sm bg-white font-medium focus:ring-2 focus:ring-[#18181b]/10 focus:border-[#18181b] outline-none">
                  <option value="pending_payment">Pending Payment</option>
                  <option value="pending_confirmation">Pending Confirmation</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Courier Partner</label>
                  <input name="courier" defaultValue={trackingModalOrder.courier} placeholder="e.g. Delhivery" className="w-full border border-zinc-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Tracking AWB</label>
                  <input name="awb" defaultValue={trackingModalOrder.awb} placeholder="Tracking Number" className="w-full border border-zinc-300 rounded-lg p-2.5 text-sm font-mono focus:ring-2 focus:ring-[#18181b]/10 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Internal Notes</label>
                <textarea name="internalNotes" defaultValue={trackingModalOrder.internalNotes} placeholder="Add notes for staff (not visible to customer)..." className="w-full border border-zinc-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#18181b]/10 outline-none h-20 resize-none" />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setTrackingModalOrder(null)} className="flex-1 bg-white border border-zinc-300 text-[#18181b] py-2.5 rounded-lg text-sm font-bold hover:bg-zinc-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-[#18181b] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-colors flex items-center justify-center gap-2">
                  <Check size={16}/> Save Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className={`fixed bottom-8 right-8 z-[70] px-5 py-4 rounded-xl shadow-2xl text-sm font-medium animate-in slide-in-from-bottom-8 duration-300 flex items-center gap-3 ${toast.type === 'success' ? 'bg-[#18181b] text-white border border-zinc-700' : 'bg-red-500 text-white'}`}>
          {toast.type === 'success' ? <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400"><Check size={14} /></div> : <AlertCircle size={16} />}
          {toast.message}
        </div>
      )}

    </div>
  );
}
