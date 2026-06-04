"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Plus, X, MapPin } from 'lucide-react';
import Script from 'next/script';

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
  
  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  const autocompleteInputRef = useRef<HTMLInputElement>(null);
  const autocompleteInstanceRef = useRef<any>(null);

  const fetchAddresses = async () => {
    try {
      const res = await fetch('/api/user/addresses');
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      setLoading(false);
      setAddresses([]);
      return;
    }
    fetchAddresses();
  }, [status, session]);

  // Google Maps Autocomplete Initialization & Cleanup
  useEffect(() => {
    if (isModalOpen && scriptLoaded && (window as any).google && autocompleteInputRef.current) {
      try {
        autocompleteInstanceRef.current = new (window as any).google.maps.places.Autocomplete(autocompleteInputRef.current, {
          types: ['geocode'],
          componentRestrictions: { country: 'in' },
          fields: ['address_components', 'geometry', 'formatted_address']
        });

        autocompleteInstanceRef.current.addListener('place_changed', () => {
          const place = autocompleteInstanceRef.current.getPlace();
          if (!place.address_components) return;

          let city = '';
          let state = '';
          let pincode = '';

          for (const component of place.address_components) {
            const type = component.types[0];
            if (type === 'locality' || type === 'administrative_area_level_2') city = component.long_name;
            if (type === 'administrative_area_level_1') state = component.long_name;
            if (type === 'postal_code') pincode = component.long_name;
          }

          setFormData(prev => ({
            ...prev,
            area: place.formatted_address || prev.area,
            city: city || prev.city,
            state: state || prev.state,
            pincode: pincode || prev.pincode
          }));
        });
      } catch (error) {
        console.warn("Google Maps Autocomplete initialization bypassed. InvalidKey or network failure caught silently.", error);
      }
    }

    return () => {
      // Client State Integrity: Cleanup
      if (autocompleteInstanceRef.current && (window as any).google) {
        (window as any).google.maps.event.clearInstanceListeners(autocompleteInstanceRef.current);
      }
    };
  }, [isModalOpen, scriptLoaded]);

  // HTML5 Geolocation API
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
          if (!apiKey) {
            alert("Google Maps API Key is missing. Reverse geocoding cannot proceed.");
            return;
          }
          
          const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
          const data = await res.json();
          
          if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            let city = '';
            let state = '';
            let pincode = '';
            
            for (const component of addressComponents) {
              const type = component.types[0];
              if (type === 'locality' || type === 'administrative_area_level_2') city = component.long_name;
              if (type === 'administrative_area_level_1') state = component.long_name;
              if (type === 'postal_code') pincode = component.long_name;
            }

            setFormData(prev => ({
              ...prev,
              area: data.results[0].formatted_address,
              city,
              state,
              pincode
            }));
          } else {
            console.warn("Reverse geocoding returned no valid results.");
          }
        } catch (error) {
          console.error("Geocoding error", error);
          alert("Failed to retrieve location details.");
        }
      },
      (error) => {
        console.warn("Geolocation warning:", error.message);
        alert("Could not detect location. Please ensure location permissions are granted.");
      }
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.mobile.replace(/\D/g, '').length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const fullStreet = `${formData.street}, ${formData.area}`.replace(/^,\s*/, '').replace(/,\s*$/, '');
      
      const payload = {
        fullName: formData.fullName,
        mobile: formData.mobile,
        street: fullStreet,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        isDefault: formData.isDefault
      };

      const res = await fetch('/api/user/addresses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ fullName: '', mobile: '', street: '', area: '', city: '', state: '', pincode: '', isDefault: false });
        await fetchAddresses(); // Silent refresh
        alert("Address added successfully");
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to add address");
      }
    } catch (error) {
      console.error(error);
      alert("Network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <Script 
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`} 
          strategy="lazyOnload" 
          async
          defer
          onLoad={() => setScriptLoaded(true)}
        />
      )}

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
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 border-[0.5px] border-[#1a1612] rounded-[2px] text-[#1a1612] px-6 py-4 font-sans text-[10px] uppercase tracking-widest hover:bg-[#1a1612] hover:text-white transition-colors duration-300 w-full md:w-auto"
            >
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

      {/* Slide-over Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-6 py-6 border-b-[0.5px] border-zinc-200">
              <h2 className="font-serif text-2xl text-[#1a1612]">New Address</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-black transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="address-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Full Name</label>
                  <input 
                    name="fullName" value={formData.fullName} onChange={handleInputChange} required
                    className="w-full border-[0.5px] border-zinc-200 rounded-[2px] p-3 text-sm font-sans focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Phone Number</label>
                  <input 
                    name="mobile" type="tel" value={formData.mobile} onChange={handleInputChange} required
                    className="w-full border-[0.5px] border-zinc-200 rounded-[2px] p-3 text-sm font-sans focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="pt-4 border-t-[0.5px] border-zinc-100">
                  <button 
                    type="button" 
                    onClick={handleGeolocation}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-50 border-[0.5px] border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-black transition-colors rounded-[2px]"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-sans text-[10px] uppercase tracking-widest">Detect My Current Location</span>
                  </button>
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Area / Locality</label>
                  <input 
                    name="area" ref={autocompleteInputRef} value={formData.area} onChange={handleInputChange} required
                    placeholder="Start typing your area..."
                    className="w-full border-[0.5px] border-zinc-200 rounded-[2px] p-3 text-sm font-sans focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Apartment / Suite / Street</label>
                  <input 
                    name="street" value={formData.street} onChange={handleInputChange} required
                    className="w-full border-[0.5px] border-zinc-200 rounded-[2px] p-3 text-sm font-sans focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2">City</label>
                    <input 
                      name="city" value={formData.city} onChange={handleInputChange} required
                      className="w-full border-[0.5px] border-zinc-200 rounded-[2px] p-3 text-sm font-sans focus:outline-none focus:border-black transition-colors bg-zinc-50"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2">State</label>
                    <input 
                      name="state" value={formData.state} onChange={handleInputChange} required
                      className="w-full border-[0.5px] border-zinc-200 rounded-[2px] p-3 text-sm font-sans focus:outline-none focus:border-black transition-colors bg-zinc-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Pincode</label>
                  <input 
                    name="pincode" value={formData.pincode} onChange={handleInputChange} required
                    className="w-full border-[0.5px] border-zinc-200 rounded-[2px] p-3 text-sm font-sans focus:outline-none focus:border-black transition-colors bg-zinc-50"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer mt-4">
                  <input 
                    type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleInputChange}
                    className="w-4 h-4 accent-black"
                  />
                  <span className="font-sans text-xs text-zinc-600">Set as default delivery address</span>
                </label>
              </form>
            </div>

            <div className="p-6 border-t-[0.5px] border-zinc-200 bg-zinc-50">
              <button 
                form="address-form" 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#1a1612] text-white py-4 font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-[#8b6914] transition-colors rounded-[2px] disabled:opacity-50"
              >
                {isSubmitting ? 'Saving Address...' : 'Save Delivery Profile'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
