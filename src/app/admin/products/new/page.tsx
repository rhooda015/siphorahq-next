"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    handle: '',
    description: '',
    price: '',
    inventoryCount: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          inventoryCount: Number(formData.inventoryCount)
        })
      });
      
      if (res.ok) {
        router.push('/admin/products');
      } else {
        alert('Failed to create product');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            type="text" 
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-gray-900 focus:border-gray-900"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Handle (URL slug)</label>
          <input 
            type="text" 
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-gray-900 focus:border-gray-900"
            value={formData.handle}
            onChange={e => setFormData({...formData, handle: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            required
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-gray-900 focus:border-gray-900"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input 
              type="number" 
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-gray-900 focus:border-gray-900"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Inventory Count</label>
            <input 
              type="number" 
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-gray-900 focus:border-gray-900"
              value={formData.inventoryCount}
              onChange={e => setFormData({...formData, inventoryCount: e.target.value})}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
