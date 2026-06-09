import React from 'react';
import { Search, Star, MessageSquareReply, MoreHorizontal } from 'lucide-react';

export default function ReviewsView() {
  const reviews = [
    { id: 1, customer: 'Neha R.', product: 'Vintage Gold Rim Tea Cup', rating: 5, comment: 'Absolutely beautiful craftsmanship. The gold rim is stunning and it feels premium in hand.', date: '2 days ago', status: 'Published' },
    { id: 2, customer: 'Vikram S.', product: 'Royal Dinner Set (24 Pcs)', rating: 4, comment: 'Very nice quality. Packing was solid, no breakage. Deducting 1 star because delivery took 5 days.', date: '1 week ago', status: 'Pending Review' },
    { id: 3, customer: 'Ayesha M.', product: 'Minimalist White Platter', rating: 5, comment: 'Sleek and minimal. Exactly what I was looking for to serve appetizers.', date: '2 weeks ago', status: 'Published' },
    { id: 4, customer: 'Anonymous', product: 'Emerald Green Tea Set', rating: 1, comment: 'Received the wrong color entirely.', date: '1 month ago', status: 'Hidden' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
        <div>
          <h1 className="text-2xl font-bold text-[#18181b]">Review Moderation</h1>
          <p className="text-zinc-500 text-sm mt-1">Approve, reject, and reply to customer product reviews.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4">
        <div className="relative flex-1 bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input type="text" placeholder="Search reviews by product or customer..." className="w-full bg-transparent border-none pl-11 pr-4 py-3 text-sm focus:ring-0 outline-none" />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="bg-white p-5 rounded-xl shadow-sm border border-zinc-200 hover:border-zinc-300 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < r.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'fill-zinc-200 text-zinc-200'} />
                  ))}
                </div>
                <span className="font-bold text-[#18181b] text-sm">{r.customer}</span>
                <span className="text-zinc-400 text-xs">•</span>
                <span className="text-zinc-500 text-xs">{r.date}</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ml-2 ${r.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : r.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                  {r.status}
                </span>
              </div>
              <button className="text-zinc-400 hover:text-[#18181b]"><MoreHorizontal size={16}/></button>
            </div>
            
            <p className="text-zinc-700 text-sm mb-4 leading-relaxed">"{r.comment}"</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
              <div className="text-xs text-zinc-500 font-medium">Product: <span className="text-[#18181b] hover:underline cursor-pointer">{r.product}</span></div>
              <div className="flex gap-2">
                {r.status === 'Pending Review' && (
                  <>
                    <button className="text-xs font-bold text-red-600 hover:underline px-2">Reject</button>
                    <button className="text-xs font-bold text-emerald-600 hover:underline px-2">Approve</button>
                  </>
                )}
                <button className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-[#18181b] px-3 py-1.5 bg-zinc-100 rounded-md hover:bg-zinc-200 transition-colors">
                  <MessageSquareReply size={14}/> Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
