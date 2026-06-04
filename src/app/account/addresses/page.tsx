"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Plus } from 'lucide-react';

interface Address {
  _id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
  isDefault?: boolean;
}

export default function AddressesPage() {
  const { data: session, status } = useSession();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If not authenticated or status is still loading, do not fetch
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      setLoading(false);
      setAddresses([]); // Prevent session desync
      return;
    }

    const fetchAddresses = async () => {
      try {
        const res = await fetch('/api/user/addresses');
        if (res.ok) {
          const data = await res.json();
          setAddresses(data.addresses);
        }
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [status, session]); // Dependency on session/status prevents stale cache issues

  return (
    <div className="min-h-screen bg-[#fdfbf9] py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/account" className="inline-flex items-center gap-2 text-[#1a1612]/60 hover:text-[#8b6914] transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-sans text-[10px] uppercase tracking-widest">← BACK TO ACCOUNT</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-[0.5px] border-zinc-200 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-[#1a1612] mb-2">Saved Addresses</h1>
            <p className="text-[#1a1612]/60 font-sans text-xs uppercase tracking-widest">MANAGE YOUR DELIVERY PROFILES</p>
          </div>
          
          <button className="inline-flex items-center justify-center gap-2 border-[0.5px] border-[#1a1612] text-[#1a1612] px-6 py-4 font-sans text-[10px] uppercase tracking-widest hover:bg-[#1a1612] hover:text-white transition-colors duration-300 w-full md:w-auto">
            <Plus className="w-4 h-4" />
            Add a New Address
          </button>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="border-[0.5px] border-zinc-200 bg-white p-8 animate-pulse">
                <div className="h-4 bg-zinc-100 w-1/4 mb-4"></div>
                <div className="h-3 bg-zinc-50 w-2/3 mb-2"></div>
                <div className="h-3 bg-zinc-50 w-1/2 mb-2"></div>
                <div className="h-3 bg-zinc-50 w-1/3 mt-6"></div>
              </div>
            ))}
          </div>
        ) : addresses.length === 0 ? (
          <div className="bg-white border-[0.5px] border-zinc-200 p-12 text-center">
            <p className="font-sans text-sm tracking-widest uppercase text-[#1a1612]/70 py-12">
              YOU HAVE NO SAVED ADDRESSES
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div key={address._id} className="bg-white border-[0.5px] border-zinc-200 p-8 relative group hover:border-[#1a1612] transition-colors duration-300">
                {address.isDefault && (
                  <span className="absolute top-4 right-4 bg-[#fdfbf9] border-[0.5px] border-zinc-200 text-[#1a1612]/60 px-3 py-1 text-[9px] uppercase tracking-widest font-sans">
                    Default
                  </span>
                )}
                
                <h3 className="font-serif text-xl text-[#1a1612] mb-4 pr-16">{address.fullName}</h3>
                
                <div className="space-y-1 font-sans text-sm text-[#1a1612]/70 leading-relaxed mb-6">
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.pincode}</p>
                </div>
                
                <div className="font-sans text-sm text-[#1a1612]">
                  <span className="text-[#1a1612]/50 text-xs mr-2 uppercase tracking-widest">Mobile:</span>
                  {address.mobile}
                </div>

                <div className="mt-8 flex gap-4 pt-6 border-t-[0.5px] border-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-[10px] uppercase font-sans tracking-widest text-[#1a1612]/60 hover:text-[#8b6914] transition-colors">Edit</button>
                  <button className="text-[10px] uppercase font-sans tracking-widest text-[#1a1612]/60 hover:text-red-700 transition-colors">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
