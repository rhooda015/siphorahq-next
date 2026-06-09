'use client';
import React, { useState, useEffect } from 'react';
import { Search, Star, MessageSquareReply, MoreHorizontal, Loader2, Trash2 } from 'lucide-react';

export default function ReviewsView() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/admin/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error('Failed to delete review', error);
    }
  };

  const filteredReviews = reviews.filter(r => 
    r.userName?.toLowerCase().includes(search.toLowerCase()) || 
    r.comment?.toLowerCase().includes(search.toLowerCase()) ||
    r.productId?.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-12 text-center text-zinc-500"><Loader2 className="animate-spin mx-auto mb-4"/> Loading Reviews...</div>;
  }

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
          <input 
            type="text" 
            placeholder="Search reviews by product or customer..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none pl-11 pr-4 py-3 text-sm focus:ring-0 outline-none" 
          />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-zinc-200 text-zinc-500">
            No reviews found.
          </div>
        ) : filteredReviews.map(r => (
          <div key={r._id} className="bg-white p-5 rounded-xl shadow-sm border border-zinc-200 hover:border-zinc-300 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < r.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'fill-zinc-200 text-zinc-200'} />
                  ))}
                </div>
                <span className="font-bold text-[#18181b] text-sm">{r.userName}</span>
                <span className="text-zinc-400 text-xs">•</span>
                <span className="text-zinc-500 text-xs">{new Date(r.createdAt).toLocaleDateString('en-IN')}</span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ml-2 ${r.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : r.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                  {r.status}
                </span>
              </div>
              <button onClick={() => deleteReview(r._id)} className="text-zinc-400 hover:text-red-500 transition-colors">
                <Trash2 size={16}/>
              </button>
            </div>
            
            <p className="text-zinc-700 text-sm mb-4 leading-relaxed">"{r.comment}"</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
              <div className="text-xs text-zinc-500 font-medium">Product: <span className="text-[#18181b] hover:underline cursor-pointer">{r.productId?.title || 'Unknown Product'}</span></div>
              <div className="flex gap-2">
                {r.status !== 'Published' && (
                  <button onClick={() => updateStatus(r._id, 'Published')} className="text-xs font-bold text-emerald-600 hover:underline px-2">Approve</button>
                )}
                {r.status !== 'Rejected' && (
                  <button onClick={() => updateStatus(r._id, 'Rejected')} className="text-xs font-bold text-red-600 hover:underline px-2">Reject</button>
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
