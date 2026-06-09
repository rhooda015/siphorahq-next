'use client';
import React, { useEffect, useRef } from 'react';
import { Download, Filter, TrendingUp, Users, ShoppingCart, BarChart3 } from 'lucide-react';

export default function AnalyticsView({ stats }: { stats: any }) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const doughnutRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  const doughnutInstance = useRef<any>(null);

  useEffect(() => {
    if (!(window as any).Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
      script.onload = initCharts;
      document.body.appendChild(script);
    } else {
      initCharts();
    }

    function initCharts() {
      if (chartRef.current && stats) {
        if (chartInstance.current) chartInstance.current.destroy();
        const ctx = chartRef.current.getContext('2d');
        if (ctx) {
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(24, 24, 27, 0.8)'); // #18181b
          gradient.addColorStop(1, 'rgba(24, 24, 27, 0.1)');
          
          chartInstance.current = new (window as any).Chart(ctx, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                label: 'Revenue',
                data: [42000, 58000, 61000, 48000, 75000, stats.revenue || 90000],
                borderColor: '#18181b',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4
              }]
            },
            options: {
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true, grid: { color: '#f3f4f6' } }, x: { grid: { display: false } } }
            }
          });
        }
      }

      if (doughnutRef.current) {
        if (doughnutInstance.current) doughnutInstance.current.destroy();
        const ctx2 = doughnutRef.current.getContext('2d');
        if (ctx2) {
          doughnutInstance.current = new (window as any).Chart(ctx2, {
            type: 'doughnut',
            data: {
              labels: ['Dinnerware', 'Tea Sets', 'Serveware', 'Gifting'],
              datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: ['#18181b', '#D4AF37', '#e4e4e7', '#a1a1aa'],
                borderWidth: 0,
                hoverOffset: 4
              }]
            },
            options: {
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom' } },
              cutout: '75%'
            }
          });
        }
      }
    }
  }, [stats]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#18181b]">Analytics & Reports</h2>
          <p className="text-sm text-zinc-500 mt-1">Deep dive into your store's performance metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-zinc-200 text-[#18181b] px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors shadow-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 bg-[#18181b] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Gross Sales', val: `₹${stats?.revenue?.toLocaleString() || '1,45,000'}`, icon: TrendingUp },
          { label: 'Store Sessions', val: '12,482', icon: Users },
          { label: 'Orders Placed', val: stats?.orders || '124', icon: ShoppingCart },
          { label: 'Conversion Rate', val: '3.2%', icon: BarChart3 },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-zinc-500">{s.label}</p>
              <s.icon size={18} className="text-zinc-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#18181b]">{s.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="font-bold text-[#18181b] text-lg mb-6">Revenue Trends (YTD)</h3>
          <div className="h-80 relative"><canvas ref={chartRef}></canvas></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <h3 className="font-bold text-[#18181b] text-lg mb-6">Sales by Category</h3>
          <div className="h-64 relative"><canvas ref={doughnutRef}></canvas></div>
          <div className="mt-6 text-center text-sm text-zinc-500">
            Dinnerware drives 45% of total revenue.
          </div>
        </div>
      </div>

    </div>
  );
}
