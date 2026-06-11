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
        gradient.addColorStop(0, 'rgba(212, 175, 55, 0.2)'); // Gold tint
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        
        chartInstance.current = new (window as any).Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Day 6', 'Day 5', 'Day 4', 'Day 3', 'Day 2', 'Day 1', 'Today'],
            datasets: [{
              label: 'Revenue',
              data: stats.chartData || [12000, 19000, 15000, 22000, 18000, 28000, 34000],
              borderColor: '#D4AF37',
              backgroundColor: gradient,
              borderWidth: 3,
              pointBackgroundColor: '#fff',
              pointBorderColor: '#D4AF37',
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
                backgroundColor: '#0C1929',
                titleFont: { size: 13, family: 'sans-serif' },
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
                grid: { color: '#f3f4f6', drawBorder: false },
                ticks: { font: { size: 12 }, color: '#9ca3af' }
              },
              x: { 
                grid: { display: false },
                ticks: { font: { size: 12 }, color: '#9ca3af' }
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
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300 pb-12">
      
      {/* Welcome Banner */}
      <div className="bg-[#0C1929] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-serif mb-2">Welcome Back, Admin 👋</h2>
          <p className="text-zinc-400 font-sans flex items-center gap-2">
            Store Revenue <span className="text-[#D4AF37] flex items-center bg-[#D4AF37]/10 px-2 py-0.5 rounded text-xs font-bold tracking-wide"><ArrowUpRight size={14} className="mr-1"/> 22%</span> this month.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `₹${stats?.revenue?.toLocaleString() || '0'}`, trend: '+14%', up: true },
          { label: 'Total Orders', value: stats?.orders || '0', trend: '+8%', up: true },
          { label: 'Conversion Rate', value: '3.2%', trend: '-1.1%', up: false },
          { label: 'Avg Order Value', value: `₹${stats?.avgOrderValue?.toLocaleString() || '0'}`, trend: '+5%', up: true },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-zinc-500 mb-2">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-[#18181b]">{kpi.value}</h3>
              <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-md ${kpi.up ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                {kpi.up ? <ArrowUpRight size={14} className="mr-1"/> : <ArrowDownRight size={14} className="mr-1"/>}
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#18181b] text-lg">Revenue Overview</h3>
            <select className="text-sm border border-zinc-200 rounded-lg px-3 py-1.5 bg-zinc-50 outline-none text-zinc-600 font-medium">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 relative w-full"><canvas ref={chartRef}></canvas></div>
        </div>

        {/* Alerts & Tasks */}
        <div className="space-y-8">
          
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="font-bold text-[#18181b] text-lg mb-4 flex items-center justify-between">
              Action Required
              <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">{stats?.pendingDispatch || 3}</span>
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#18181b]">Pending Dispatch</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{stats?.pendingDispatch || 3} orders are waiting to be fulfilled.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Package size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#18181b]">Low Stock Alerts</p>
                  <p className="text-xs text-zinc-500 mt-0.5">2 products are below minimum stock threshold.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
             <h3 className="font-bold text-[#18181b] text-lg mb-4">Top Products</h3>
             <div className="space-y-4">
               {(stats?.topProducts?.length ? stats.topProducts : []).map((p: any, i: number) => (
                 <div key={i} className="flex items-center justify-between pb-4 border-b border-zinc-100 last:border-0 last:pb-0">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-zinc-100 rounded flex items-center justify-center text-zinc-400">
                       <Box size={16} />
                     </div>
                     <div>
                       <p className="text-sm font-semibold text-[#18181b] truncate max-w-[150px]">{p.name}</p>
                       <p className="text-xs text-zinc-500">{p.sales || 0} sales</p>
                     </div>
                   </div>
                   <div className="text-sm font-bold text-[#18181b]">{p.rev}</div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>

    </div>
  );
}
