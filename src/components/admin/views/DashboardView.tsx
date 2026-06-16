'use client';
import React, { useEffect, useRef } from 'react';
import { TrendingUp, AlertCircle, Package, ArrowUpRight, ArrowDownRight, Clock, Box } from 'lucide-react';

export default function DashboardView({ stats }: { stats: any }) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (stats && chartRef.current) {
      const initChart = () => {
        if (!(window as any).Chart) return;
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        const ctx = chartRef.current?.getContext('2d');
        if (!ctx) return;
        
        // Gradient fill for chart
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(191, 164, 111, 0.25)'); // luxury-gold tint
        gradient.addColorStop(1, 'rgba(191, 164, 111, 0)');
        
        chartInstance.current = new (window as any).Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Day 6', 'Day 5', 'Day 4', 'Day 3', 'Day 2', 'Day 1', 'Today'],
            datasets: [{
              label: 'Revenue',
              data: stats.chartData || [12000, 19000, 15000, 22000, 18000, 28000, 34000],
              borderColor: '#BFA46F',
              backgroundColor: gradient,
              borderWidth: 2.5,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#BFA46F',
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#18181b',
                titleFont: { size: 13, family: 'Inter, sans-serif' },
                bodyFont: { size: 14, weight: 'bold' },
                padding: 12,
                displayColors: false,
                callbacks: {
                  label: function(context: any) {
                    return '₹' + context.raw.toLocaleString();
                  }
                }
              }
            },
            scales: {
              y: { 
                beginAtZero: true,
                grid: { color: '#f4f4f5', drawBorder: false },
                ticks: { font: { size: 12, family: 'Inter, sans-serif' }, color: '#a1a1aa' }
              },
              x: { 
                grid: { display: false },
                ticks: { font: { size: 12, family: 'Inter, sans-serif' }, color: '#a1a1aa' }
              }
            },
            interaction: {
              mode: 'index',
              intersect: false,
            },
          }
        });
      };

      if (!(window as any).Chart) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
        script.onload = initChart;
        document.body.appendChild(script);
      } else {
        initChart();
      }
    }
  }, [stats]);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Welcome Banner */}
      <div className="bg-zinc-900 rounded-2xl p-10 text-white relative overflow-hidden shadow-2xl border border-zinc-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold opacity-15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-serif mb-3 font-semibold tracking-wide">Welcome Back, Admin</h2>
          <p className="text-zinc-400 font-sans flex items-center gap-2.5 text-sm tracking-wide">
            Store Revenue <span className="text-luxury-gold flex items-center bg-luxury-gold/10 px-2 py-0.5 rounded-md font-bold tracking-wider"><ArrowUpRight size={14} className="mr-1"/> 22%</span> this month.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `₹${stats?.revenue?.toLocaleString() || '0'}`, trend: '+14%', up: true },
          { label: 'Total Orders', value: stats?.orders || '0', trend: '+8%', up: true },
          { label: 'Conversion Rate', value: '3.2%', trend: '-1.1%', up: false },
          { label: 'Avg Order Value', value: `₹${stats?.avgOrderValue?.toLocaleString() || '0'}`, trend: '+5%', up: true },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-7 rounded-2xl border border-zinc-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <p className="text-[11px] font-bold text-zinc-400 mb-3 uppercase tracking-widest">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-serif font-semibold text-zinc-900">{kpi.value}</h3>
              <span className={`flex items-center text-[11px] font-bold px-2 py-1 rounded-md ${kpi.up ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
                {kpi.up ? <ArrowUpRight size={14} className="mr-1"/> : <ArrowDownRight size={14} className="mr-1"/>}
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <div className="xl:col-span-2 bg-white p-8 rounded-2xl border border-zinc-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif font-semibold text-zinc-900 text-xl tracking-wide">Revenue Overview</h3>
            <select className="text-sm border border-zinc-200/80 rounded-xl px-4 py-2 bg-zinc-50 outline-none text-zinc-600 font-medium focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] relative w-full"><canvas ref={chartRef}></canvas></div>
        </div>

        {/* Alerts & Tasks */}
        <div className="space-y-6">
          
          <div className="bg-white p-8 rounded-2xl border border-zinc-200/60 shadow-sm">
            <h3 className="font-serif font-semibold text-zinc-900 text-xl mb-6 flex items-center justify-between tracking-wide">
              Action Required
              <span className="bg-red-50 text-red-600 text-xs px-2.5 py-1 rounded-md font-bold">{stats?.pendingDispatch || 3}</span>
            </h3>
            <div className="space-y-5">
              <div className="flex gap-4 items-start group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 group-hover:text-luxury-gold transition-colors">Pending Dispatch</p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{stats?.pendingDispatch || 3} orders are waiting to be fulfilled.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                  <Package size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 group-hover:text-luxury-gold transition-colors">Low Stock Alerts</p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">2 products are below minimum stock threshold.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-zinc-200/60 shadow-sm">
             <h3 className="font-serif font-semibold text-zinc-900 text-xl mb-6 tracking-wide">Top Products</h3>
             <div className="space-y-4">
               {((stats?.topProducts?.length ? stats.topProducts : [
                 {name: 'Emperor Royal Teacup Set', sales: 42, rev: '₹48,500'},
                 {name: 'Midnight Bloom Plate', sales: 28, rev: '₹22,400'},
                 {name: 'Gold Rim Dessert Bowls', sales: 15, rev: '₹14,200'}
               ])).map((p: any, i: number) => (
                 <div key={i} className="flex items-center justify-between pb-4 border-b border-zinc-100 last:border-0 last:pb-0 group cursor-pointer">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-luxury-gold transition-colors">
                       <Box size={18} />
                     </div>
                     <div>
                       <p className="text-sm font-semibold text-zinc-900 group-hover:text-luxury-gold transition-colors truncate max-w-[160px]">{p.name}</p>
                       <p className="text-xs text-zinc-500 mt-0.5">{p.sales || 0} sales</p>
                     </div>
                   </div>
                   <div className="text-sm font-bold text-zinc-900 font-serif tracking-wide">{p.rev}</div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>

    </div>
  );
}
