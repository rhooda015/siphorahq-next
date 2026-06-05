'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Package, Users, Archive, BarChart2, Settings as SettingsIcon, 
  Search, Bell, Plus, Download, X, Copy, Check, TrendingUp, AlertCircle, Edit, Trash2,
  Image as ImageIcon, RefreshCcw, Tag, Save
} from 'lucide-react';
import ProductEditor from '@/components/admin/ProductEditor';

declare global {
  interface Window {
    Chart: any;
  }
}

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
  const [productEditor, setProductEditor] = useState<any>(null);
  const [trackingModalOrder, setTrackingModalOrder] = useState<any>(null);
  const [couponModal, setCouponModal] = useState<boolean>(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', desc: '', discountValue: 0, discountType: 'percentage', uses: 0, saved: 0 });

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  const showToast = (message: string, type: 'success'|'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTabData = async (tab: string) => {
    setLoading(true);
    try {
      if (tab === 'Overview') {
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

  // Load Chart.js for Overview
  useEffect(() => {
    if (activeTab === 'Overview' && stats && chartRef.current) {
      const initChart = () => {
        if (!window.Chart) return;
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        const ctx = chartRef.current?.getContext('2d');
        if (!ctx) return;
        
        chartInstance.current = new window.Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Day 6', 'Day 5', 'Day 4', 'Day 3', 'Day 2', 'Day 1', 'Today'],
            datasets: [{
              data: stats.chartData || [0,0,0,0,0,0,0],
              backgroundColor: ['#e5e7eb', '#e5e7eb', '#e5e7eb', '#e5e7eb', '#D4A853', '#e5e7eb', '#e5e7eb'],
              borderRadius: 4,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function(context: any) {
                    return '₹' + context.raw.toLocaleString();
                  }
                }
              }
            },
            scales: {
              y: { beginAtZero: true },
              x: { grid: { display: false } }
            }
          }
        });
      };

      if (!window.Chart) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
        script.onload = initChart;
        document.body.appendChild(script);
      } else {
        initChart();
      }
    }
  }, [activeTab, stats]);

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
        showToast(`Product saved`);
        setProductEditor(null);
        fetchTabData('Products');
      } else {
        showToast('Failed to save product', 'error');
      }
    } catch (error) {
      showToast('Error saving', 'error');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchTabData('Products');
  };

  const handleCreateCoupon = async () => {
    const res = await fetch('/api/admin/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCoupon)
    });
    if (res.ok) {
      showToast('Coupon created!');
      setCouponModal(false);
      fetchTabData('Coupons');
    } else {
      showToast('Failed to create coupon', 'error');
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm('Delete this coupon?')) return;
    await fetch(`/api/admin/coupons?id=${id}`, { method: 'DELETE' });
    fetchTabData('Coupons');
  };

  const handleUpdateOrder = async (orderId: string, updates: any) => {
    const res = await fetch('/api/admin/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, ...updates })
    });
    if (res.ok) {
      showToast('Order updated');
      fetchTabData('Orders');
      setTrackingModalOrder(null);
    } else {
      showToast('Failed to update', 'error');
    }
  };

  const handleUpdateReturn = async (id: string, status: string) => {
    await fetch('/api/admin/returns', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id, status })
    });
    showToast(`Return marked as ${status}`);
    fetchTabData('Returns');
  };

  const NavItem = ({ icon: Icon, label, tab, badge }: any) => {
    const isActive = activeTab === tab;
    return (
      <button 
        onClick={() => { setActiveTab(tab); setProductEditor(null); }}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 border-l-4 ${
          isActive 
            ? 'border-[#D4A853] text-[#D4A853] bg-white/10' 
            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <Icon size={18} />
        {label}
        {badge && (
          <span className="ml-auto bg-[#D4A853] text-[#0C1929] text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>
        )}
      </button>
    );
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': case 'pending_payment': return 'bg-gray-100 text-gray-800';
      case 'Processing': case 'pending_confirmation': return 'bg-amber-100 text-amber-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-800';
      case 'Delivered': case 'paid': return 'bg-green-100 text-green-800';
      case 'Cancelled': case 'failed': return 'bg-red-100 text-red-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-[220px] flex-shrink-0 bg-[#0C1929] text-white flex flex-col transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#D4A853] text-[#0C1929] flex items-center justify-center font-bold text-sm rounded-sm">S</div>
            <span className="font-semibold tracking-wide text-sm">SiphoraHQ</span>
          </div>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto">
          <NavItem icon={LayoutDashboard} label="Overview" tab="Overview" />
          <NavItem icon={ShoppingBag} label="Orders" tab="Orders" badge={stats?.pendingDispatch > 0 ? stats.pendingDispatch : null} />
          <NavItem icon={Package} label="Products" tab="Products" />
          <NavItem icon={Users} label="Customers" tab="Customers" />
          <NavItem icon={Archive} label="Inventory" tab="Inventory" />
          <NavItem icon={RefreshCcw} label="Returns" tab="Returns" />
          <NavItem icon={Tag} label="Coupons" tab="Coupons" />
          <NavItem icon={BarChart2} label="Analytics" tab="Analytics" />
          <NavItem icon={SettingsIcon} label="Settings" tab="Settings" />
        </nav>

        <div className="p-4 border-t border-white/10 flex items-center gap-2 text-xs text-gray-400">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Razorpay Live Mode
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {productEditor ? (
          <div className="flex-1 overflow-auto p-8 bg-gray-50">
            <ProductEditor 
              initialData={productEditor} 
              onClose={() => setProductEditor(null)} 
              onSave={handleSaveProduct} 
            />
          </div>
        ) : (
          <>
            {/* TOPBAR */}
            <header className="h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
              <h1 className="text-xl font-semibold text-[#0C1929]">{activeTab}</h1>
              <div className="flex items-center gap-6">
                <button className="relative text-gray-500 hover:text-[#0C1929]">
                  <Bell size={20} />
                  {stats?.pendingDispatch > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
                </button>
                {activeTab === 'Products' && (
                  <button onClick={() => setProductEditor({ images: [] })} className="flex items-center gap-2 bg-[#0C1929] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                    <Plus size={16} /> Add Product
                  </button>
                )}
                {activeTab === 'Coupons' && (
                  <button onClick={() => setCouponModal(true)} className="flex items-center gap-2 bg-[#0C1929] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                    <Plus size={16} /> Add Coupon
                  </button>
                )}
              </div>
            </header>

            {/* PAGE CONTENT */}
            <div className="flex-1 overflow-auto p-8 bg-gray-50">
              
              {loading && activeTab !== 'Overview' ? (
                <div className="flex justify-center mt-20"><div className="animate-spin w-8 h-8 border-4 border-[#D4A853] border-t-transparent rounded-full"></div></div>
              ) : (
                <>
                  {/* OVERVIEW TAB */}
                  {activeTab === 'Overview' && stats && (
                    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                          <div className="text-sm text-gray-500 mb-1 flex justify-between">Total Revenue </div>
                          <div className="text-2xl font-bold text-[#0C1929] mb-3">₹{stats.revenue?.toLocaleString()}</div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                          <div className="text-sm text-gray-500 mb-1 flex justify-between">Total Orders</div>
                          <div className="text-2xl font-bold text-[#0C1929] mb-3">{stats.orders}</div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                          <div className="text-sm text-gray-500 mb-1 flex justify-between">Avg Order Value </div>
                          <div className="text-2xl font-bold text-[#0C1929] mb-3">₹{stats.avgOrderValue?.toLocaleString()}</div>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                          <div className="text-sm text-gray-500 mb-1 flex justify-between">Pending Dispatch <span className="text-red-500 flex items-center text-xs"><AlertCircle size={12} className="mr-1"/></span></div>
                          <div className="text-2xl font-bold text-red-600 mb-3">{stats.pendingDispatch}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-semibold text-gray-800 mb-6">Revenue (Last 7 Days)</h3>
                          <div className="h-64 relative"><canvas ref={chartRef}></canvas></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                          <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
                          <div className="space-y-4">
                            <button onClick={() => {setActiveTab('Products'); setProductEditor({images:[]});}} className="w-full text-left p-3 rounded bg-gray-50 hover:bg-gray-100 font-medium text-sm flex justify-between">
                              Add New Product <Plus size={16}/>
                            </button>
                            <button onClick={() => {setActiveTab('Coupons'); setCouponModal(true);}} className="w-full text-left p-3 rounded bg-gray-50 hover:bg-gray-100 font-medium text-sm flex justify-between">
                              Create Coupon <Tag size={16}/>
                            </button>
                            <button onClick={() => setActiveTab('Orders')} className="w-full text-left p-3 rounded bg-gray-50 hover:bg-gray-100 font-medium text-sm flex justify-between">
                              View Pending Orders <ShoppingBag size={16}/>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ORDERS TAB */}
                  {activeTab === 'Orders' && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Tracking</th>
                            <th className="px-6 py-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {orders.map((order, i) => (
                            <tr key={i} className="hover:bg-gray-50/50">
                              <td className="px-6 py-4 font-medium">{order.orderId}</td>
                              <td className="px-6 py-4">
                                <div>{order.customerDetails?.firstName || order.customerEmail}</div>
                              </td>
                              <td className="px-6 py-4 font-medium">₹{order.amount}</td>
                              <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>{order.status}</span></td>
                              <td className="px-6 py-4 text-xs text-gray-500">
                                <div>{order.courier || 'Pending'}</div>
                                <div>{order.awb || ''}</div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button onClick={() => setTrackingModalOrder(order)} className="text-[#D4A853] hover:underline">Manage</button>
                              </td>
                            </tr>
                          ))}
                          {orders.length === 0 && <tr><td colSpan={6} className="text-center py-8 text-gray-500">No orders found.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* PRODUCTS TAB */}
                  {activeTab === 'Products' && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {products.map((product, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group relative">
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <button onClick={() => setProductEditor(product)} className="p-1.5 bg-white rounded-md shadow-sm border border-gray-200 text-blue-600"><Edit size={14}/></button>
                            <button onClick={() => handleDeleteProduct(product._id)} className="p-1.5 bg-white rounded-md shadow-sm border border-gray-200 text-red-600"><Trash2 size={14}/></button>
                          </div>
                          <div className="h-40 bg-gray-100 flex items-center justify-center">
                            {product.images?.[0] ? <img src={product.images[0].url} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-300" />}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-sm truncate">{product.title}</h3>
                            <div className="mt-2 flex justify-between items-end">
                              <span className="font-bold">₹{product.price}</span>
                              <span className="text-xs text-gray-500">{product.inventoryCount} left</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* RETURNS TAB */}
                  {activeTab === 'Returns' && (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Reason</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {returns.map((rtn, i) => (
                            <tr key={i}>
                              <td className="px-6 py-4">{rtn.orderId}</td>
                              <td className="px-6 py-4">{rtn.productName}</td>
                              <td className="px-6 py-4">{rtn.reason}</td>
                              <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rtn.status)}`}>{rtn.status}</span></td>
                              <td className="px-6 py-4 text-right space-x-2">
                                {rtn.status === 'Pending' && (
                                  <>
                                    <button onClick={() => handleUpdateReturn(rtn._id, 'Approved')} className="text-green-600 hover:underline">Approve</button>
                                    <button onClick={() => handleUpdateReturn(rtn._id, 'Rejected')} className="text-red-600 hover:underline">Reject</button>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                          {returns.length === 0 && <tr><td colSpan={5} className="text-center py-8 text-gray-500">No return requests.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* COUPONS TAB */}
                  {activeTab === 'Coupons' && (
                    <div className="max-w-4xl grid gap-4">
                      {coupons.map((c, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center justify-between">
                          <div>
                            <div className="font-mono font-bold text-lg">{c.code}</div>
                            <div className="text-sm text-gray-500">{c.desc} • {c.discountValue}{c.discountType==='percentage'?'%':'₹'} OFF</div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-xs text-gray-400 uppercase">Uses</div>
                              <div className="font-bold">{c.uses}</div>
                            </div>
                            <button onClick={() => handleDeleteCoupon(c._id)} className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2 size={18}/></button>
                          </div>
                        </div>
                      ))}
                      {coupons.length === 0 && <div className="text-center py-10 text-gray-500">No coupons active.</div>}
                    </div>
                  )}

                </>
              )}
            </div>
          </>
        )}
      </main>

      {/* TRACKING MODAL */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0C1929]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h2 className="text-lg font-bold text-[#0C1929]">Manage Order {trackingModalOrder.orderId}</h2>
              <button onClick={() => setTrackingModalOrder(null)} className="text-gray-400 hover:text-gray-700 bg-white p-1 rounded-full"><X size={20} /></button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              handleUpdateOrder(trackingModalOrder.orderId, {
                status: fd.get('status'),
                courier: fd.get('courier'),
                awb: fd.get('awb'),
                expectedDelivery: fd.get('expected')
              });
            }} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500">Status</label>
                <select name="status" defaultValue={trackingModalOrder.status} className="w-full mt-1 border border-gray-300 rounded p-2 text-sm">
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
                  <label className="text-xs font-medium text-gray-500">Courier Partner</label>
                  <input name="courier" defaultValue={trackingModalOrder.courier} placeholder="e.g. Delhivery" className="w-full mt-1 border border-gray-300 rounded p-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500">Tracking AWB</label>
                  <input name="awb" defaultValue={trackingModalOrder.awb} placeholder="Tracking Number" className="w-full mt-1 border border-gray-300 rounded p-2 text-sm font-mono" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Expected Delivery Date</label>
                <input name="expected" defaultValue={trackingModalOrder.expectedDelivery} placeholder="e.g. 15 Jun 2026" className="w-full mt-1 border border-gray-300 rounded p-2 text-sm" />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="submit" className="w-full bg-[#0C1929] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center justify-center gap-2">
                  <Save size={16}/> Save Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE COUPON MODAL */}
      {couponModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0C1929]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col p-6 space-y-4">
            <h2 className="font-bold text-lg">Create New Coupon</h2>
            <input type="text" placeholder="Coupon Code (e.g. DIWALI20)" value={newCoupon.code} onChange={e=>setNewCoupon({...newCoupon, code:e.target.value.toUpperCase()})} className="border p-2 rounded text-sm w-full font-mono uppercase" />
            <input type="text" placeholder="Description" value={newCoupon.desc} onChange={e=>setNewCoupon({...newCoupon, desc:e.target.value})} className="border p-2 rounded text-sm w-full" />
            <div className="flex gap-2">
              <input type="number" placeholder="Value" value={newCoupon.discountValue || ''} onChange={e=>setNewCoupon({...newCoupon, discountValue:Number(e.target.value)})} className="border p-2 rounded text-sm w-2/3" />
              <select value={newCoupon.discountType} onChange={e=>setNewCoupon({...newCoupon, discountType:e.target.value})} className="border p-2 rounded text-sm w-1/3">
                <option value="percentage">%</option>
                <option value="fixed">₹</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <button onClick={()=>setCouponModal(false)} className="flex-1 border py-2 rounded text-sm">Cancel</button>
              <button onClick={handleCreateCoupon} className="flex-1 bg-[#D4A853] text-[#0C1929] font-bold py-2 rounded text-sm">Create</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`fixed top-6 right-6 z-[70] px-4 py-3 rounded-lg shadow-xl text-sm font-medium animate-in slide-in-from-right-8 duration-300 flex items-center gap-2 ${toast.type === 'success' ? 'bg-[#0C1929] text-white border-l-4 border-[#D4A853]' : 'bg-red-500 text-white'}`}>
          {toast.type === 'success' ? <Check size={16} className="text-[#D4A853]" /> : <AlertCircle size={16} />}
          {toast.message}
        </div>
      )}

    </div>
  );
}
