'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useDropzone } from 'react-dropzone';
import { 
  ChevronLeft, UploadCloud, Trash2, GripVertical, Image as ImageIcon,
  Bold, Italic, List, ListOrdered, Heading3, Search, Link as LinkIcon, Share2
} from 'lucide-react';

interface ProductEditorProps {
  initialData: any;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

const CATEGORIES = [
  'Dinnerware',
  'Tea Sets',
  'Mugs & Cups',
  'Serveware',
  'Gifting',
  'Accessories'
];

type TabType = 'General' | 'Pricing' | 'Media' | 'Variants' | 'SEO';

export default function ProductEditor({ initialData, onClose, onSave }: ProductEditorProps) {
  const isEdit = !!initialData?._id;
  
  const [activeTab, setActiveTab] = useState<TabType>('General');

  // General
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [status, setStatus] = useState('Draft'); // Mock status

  // Pricing
  const [price, setPrice] = useState(initialData?.price || 0);
  const [inventoryCount, setInventoryCount] = useState(initialData?.inventoryCount || 0);

  // Media
  const [images, setImages] = useState<{url: string, altText?: string}[]>(initialData?.images || []);

  // Variants
  const [sizes, setSizes] = useState(initialData?.sizes?.join(', ') || '');
  const [colors, setColors] = useState(initialData?.colors?.join(', ') || '');
  const [variants, setVariants] = useState<any[]>(initialData?.variants || []);

  // SEO
  const [handle, setHandle] = useState(initialData?.handle || '');
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '');

  const [isSaving, setIsSaving] = useState(false);

  // TipTap Editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[250px] p-6 text-[#52525b] text-[15px]',
      },
    },
  });

  // Auto-slugification
  useEffect(() => {
    if (!isEdit && title && !handle) {
      setHandle(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
    if (!isEdit && title && !metaTitle) {
      setMetaTitle(title);
    }
  }, [title, isEdit]);

  // Generate Cartesian Matrix for Variants
  useEffect(() => {
    const sizeArr = sizes.split(',').map((s: string) => s.trim()).filter(Boolean);
    const colorArr = colors.split(',').map((c: string) => c.trim()).filter(Boolean);
    
    if (sizeArr.length === 0 && colorArr.length === 0) {
      if (variants.length > 0) setVariants([]);
      return;
    }

    const combinations: string[] = [];
    if (sizeArr.length > 0 && colorArr.length > 0) {
      colorArr.forEach((c: string) => {
        sizeArr.forEach((s: string) => {
          combinations.push(`${c} / ${s}`);
        });
      });
    } else if (sizeArr.length > 0) {
      combinations.push(...sizeArr);
    } else if (colorArr.length > 0) {
      combinations.push(...colorArr);
    }

    const newVariants = combinations.map((combo: string) => {
      const existing = variants.find((v: any) => v.title === combo);
      return existing || { title: combo, sku: `${handle || 'SKU'}-${combo.replace(/[^a-zA-Z0-9]/g, '')}`.toUpperCase(), price: price, inventoryCount: 0 };
    });
    
    // Only update if length or titles changed to prevent infinite loops and state wiping
    const currentTitles = variants.map(v => v.title).join('|');
    const newTitles = newVariants.map(v => v.title).join('|');
    if (currentTitles !== newTitles) {
      setVariants(newVariants);
    }
  }, [sizes, colors, price, handle]);

  // Dropzone for Images
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      url: URL.createObjectURL(file), // Mocking upload for now
      altText: file.name
    }));
    setImages(prev => [...prev, ...newImages]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': []} });

  const handleSave = async () => {
    setIsSaving(true);
    await onSave({
      _id: initialData?._id,
      title,
      handle,
      description,
      price: Number(price),
      inventoryCount: Number(inventoryCount),
      category,
      images,
      sizes: sizes.split(',').map((s: string) => s.trim()).filter(Boolean),
      colors: colors.split(',').map((c: string) => c.trim()).filter(Boolean),
      variants,
      metaTitle,
      metaDescription
    });
    setIsSaving(false);
  };

  const tabs: {id: TabType, label: string}[] = [
    { id: 'General', label: 'General Information' },
    { id: 'Pricing', label: 'Pricing & Inventory' },
    { id: 'Media', label: 'Media Asset Manager' },
    { id: 'Variants', label: 'Variation Matrix Grid' },
    { id: 'SEO', label: 'SEO & Search Visibility' }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b-[0.5px] border-zinc-200">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="text-zinc-500 hover:text-[#18181b] transition-colors p-2 -ml-2 rounded-md hover:bg-zinc-100">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-[28px] font-bold text-[#18181b] tracking-wide uppercase font-arimo">
              {isEdit ? title : 'New Product Creation'}
            </h1>
            <p className="text-sm tracking-widest text-[#D4AF37] uppercase font-medium mt-1">Catalog Management Engine</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={onClose} className="px-6 py-2.5 text-[13px] tracking-widest uppercase font-bold text-zinc-600 bg-white border-[0.5px] border-zinc-300 rounded-[2px] hover:bg-zinc-50 hover:text-zinc-900 transition-all">
            Discard
          </button>
          <button onClick={handleSave} disabled={isSaving} className="px-6 py-2.5 text-[13px] tracking-widest uppercase font-bold text-white bg-[#18181b] rounded-[2px] hover:bg-black transition-all shadow-md disabled:opacity-50 flex items-center gap-2">
            {isSaving ? 'Synchronizing...' : 'Save Catalog'}
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex gap-10">
        
        {/* Sidebar Nav */}
        <div className="w-64 flex-shrink-0">
          <nav className="flex flex-col gap-2 sticky top-8">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-4 py-3 rounded-[2px] text-[13px] uppercase tracking-widest font-semibold transition-all border-l-4 ${
                    isActive 
                      ? 'bg-white border-[#D4AF37] text-[#18181b] shadow-sm' 
                      : 'border-transparent text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  <span className="text-zinc-400 mr-3 font-normal">0{idx + 1}</span>
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          <div className="bg-white border-[0.5px] border-zinc-200 rounded-[2px] p-10 shadow-sm min-h-[500px]">
            
            {/* 1. GENERAL TAB */}
            {activeTab === 'General' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b-[0.5px] border-zinc-200 pb-4 mb-8">
                  <h2 className="text-xl font-bold text-[#18181b] uppercase tracking-widest font-arimo">The Core Identity</h2>
                  <p className="text-sm text-zinc-500 mt-2">The foundation of the product narrative and taxonomy.</p>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2 space-y-8">
                    <div>
                      <label className="block tracking-widest text-[11px] font-bold text-[#D4AF37] uppercase mb-3">Product Title</label>
                      <input 
                        type="text" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        placeholder="e.g. 46-Piece Gold Dinner Set"
                        className="w-full border-[0.5px] border-zinc-300 rounded-[2px] text-base py-3 px-4 focus:outline-none focus:border-[#18181b] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block tracking-widest text-[11px] font-bold text-[#D4AF37] uppercase mb-3">Editorial Description</label>
                      <div className="border-[0.5px] border-zinc-300 rounded-[2px] overflow-hidden focus-within:border-[#18181b] transition-colors">
                        {/* TipTap Toolbar */}
                        <div className="flex items-center gap-2 bg-zinc-50 border-b-[0.5px] border-zinc-200 p-2">
                          <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-2 rounded-[2px] ${editor?.isActive('bold') ? 'bg-zinc-200 text-[#18181b]' : 'text-zinc-500 hover:bg-zinc-200 hover:text-[#18181b]'}`}><Bold size={15}/></button>
                          <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-2 rounded-[2px] ${editor?.isActive('italic') ? 'bg-zinc-200 text-[#18181b]' : 'text-zinc-500 hover:bg-zinc-200 hover:text-[#18181b]'}`}><Italic size={15}/></button>
                          <div className="w-px h-5 bg-zinc-300 mx-1"></div>
                          <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded-[2px] ${editor?.isActive('heading', { level: 3 }) ? 'bg-zinc-200 text-[#18181b]' : 'text-zinc-500 hover:bg-zinc-200 hover:text-[#18181b]'}`}><Heading3 size={15}/></button>
                          <div className="w-px h-5 bg-zinc-300 mx-1"></div>
                          <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`p-2 rounded-[2px] ${editor?.isActive('bulletList') ? 'bg-zinc-200 text-[#18181b]' : 'text-zinc-500 hover:bg-zinc-200 hover:text-[#18181b]'}`}><List size={15}/></button>
                          <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={`p-2 rounded-[2px] ${editor?.isActive('orderedList') ? 'bg-zinc-200 text-[#18181b]' : 'text-zinc-500 hover:bg-zinc-200 hover:text-[#18181b]'}`}><ListOrdered size={15}/></button>
                        </div>
                        <EditorContent editor={editor} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 pl-8 border-l-[0.5px] border-zinc-200">
                    <div>
                      <label className="block tracking-widest text-[11px] font-bold text-[#D4AF37] uppercase mb-3">Status Toggle</label>
                      <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border-[0.5px] border-zinc-300 rounded-[2px] text-[14px] font-medium py-3 px-4 focus:outline-none focus:border-[#18181b] bg-white">
                        <option value="Draft">Draft (Hidden)</option>
                        <option value="Live">Live (Published)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block tracking-widest text-[11px] font-bold text-[#D4AF37] uppercase mb-3">Categorization</label>
                      <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border-[0.5px] border-zinc-300 rounded-[2px] text-[14px] py-3 px-4 focus:outline-none focus:border-[#18181b] bg-white">
                        <option value="">Select Category...</option>
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PRICING & INVENTORY TAB */}
            {activeTab === 'Pricing' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b-[0.5px] border-zinc-200 pb-4 mb-8 flex items-end justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#18181b] uppercase tracking-widest font-arimo">Valuation Control</h2>
                    <p className="text-sm text-zinc-500 mt-2">Integrated financial data and stock levels.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] tracking-widest uppercase font-bold text-[#D4AF37]">Global Status</p>
                    <p className="text-[28px] font-bold text-[#18181b] leading-none mt-1 font-arimo">100%</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10">
                  <div className="bg-zinc-50 p-8 border-[0.5px] border-zinc-200 rounded-[2px]">
                    <h3 className="tracking-widest text-[13px] font-bold text-[#18181b] uppercase mb-6">Base Pricing</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block tracking-widest text-[11px] font-bold text-zinc-500 uppercase mb-3">Retail Price (INR)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">₹</span>
                          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full border-[0.5px] border-zinc-300 rounded-[2px] text-lg font-medium py-3 pl-8 pr-4 focus:outline-none focus:border-[#18181b]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-50 p-8 border-[0.5px] border-zinc-200 rounded-[2px]">
                    <h3 className="tracking-widest text-[13px] font-bold text-[#18181b] uppercase mb-6">Stock Level</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block tracking-widest text-[11px] font-bold text-zinc-500 uppercase mb-3">Base Inventory Count</label>
                        <input type="number" value={inventoryCount} onChange={e => setInventoryCount(Number(e.target.value))} className="w-full border-[0.5px] border-zinc-300 rounded-[2px] text-lg font-medium py-3 px-4 focus:outline-none focus:border-[#18181b]" />
                      </div>
                    </div>
                  </div>
                </div>
                {variants.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-[2px]">
                    <p className="text-sm text-amber-800"><strong>Note:</strong> You have created variants for this product. Base pricing and inventory will act as a fallback, but variant-specific overrides in the "Variation Matrix" tab will take priority.</p>
                  </div>
                )}
              </div>
            )}

            {/* 3. MEDIA ASSET MANAGER */}
            {activeTab === 'Media' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b-[0.5px] border-zinc-200 pb-4 mb-8">
                  <h2 className="text-xl font-bold text-[#18181b] uppercase tracking-widest font-arimo">Asset Performance</h2>
                  <p className="text-sm text-zinc-500 mt-2">A dedicated environment for high-resolution imagery and gallery sync.</p>
                </div>

                <div {...getRootProps()} className={`border border-dashed rounded-[2px] p-12 text-center cursor-pointer transition-colors ${isDragActive ? 'border-[#18181b] bg-zinc-50' : 'border-zinc-300 hover:bg-zinc-50'}`}>
                  <input {...getInputProps()} />
                  <UploadCloud size={32} className="mx-auto mb-4 text-[#D4AF37]" />
                  <p className="text-base font-bold text-[#18181b] uppercase tracking-widest">Drag & Drop High-Res Imagery</p>
                  <p className="text-[13px] text-zinc-500 mt-2">JPG, PNG, WEBP (1080x1080 minimum recommended)</p>
                </div>

                {images.length > 0 && (
                  <div className="mt-10 border-t-[0.5px] border-zinc-200 pt-8">
                    <h3 className="tracking-widest text-[11px] font-bold text-[#D4AF37] uppercase mb-6">Gallery Ordering</h3>
                    <div className="grid grid-cols-4 gap-6">
                      {images.map((img, idx) => (
                        <div key={idx} className="group relative aspect-[4/5] border-[0.5px] border-zinc-200 rounded-[2px] overflow-hidden bg-zinc-50 shadow-sm hover:border-[#18181b] transition-all">
                          <img src={img.url} alt="Product" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-[#18181b]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button className="p-2 bg-white text-[#18181b] rounded-[2px] cursor-grab hover:bg-zinc-100"><GripVertical size={16}/></button>
                            <button onClick={() => setImages(images.filter((_, i) => i !== idx))} className="p-2 bg-white text-red-600 rounded-[2px] hover:bg-red-50"><Trash2 size={16}/></button>
                          </div>
                          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-[2px] tracking-widest">{idx + 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. VARIATION MATRIX */}
            {activeTab === 'Variants' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b-[0.5px] border-zinc-200 pb-4 mb-8">
                  <h2 className="text-xl font-bold text-[#18181b] uppercase tracking-widest font-arimo">Variation Matrix Grid</h2>
                  <p className="text-sm text-zinc-500 mt-2">Managing complex SKU matrices and overrides.</p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div className="bg-zinc-50 p-6 border-[0.5px] border-zinc-200 rounded-[2px]">
                    <label className="block tracking-widest text-[11px] font-bold text-zinc-500 uppercase mb-3">Sizes (Comma Separated)</label>
                    <input type="text" value={sizes} onChange={e => setSizes(e.target.value)} placeholder="Standard, Luxury, Mini" className="w-full border-[0.5px] border-zinc-300 rounded-[2px] text-sm py-2.5 px-3 focus:outline-none focus:border-[#18181b]" />
                  </div>
                  <div className="bg-zinc-50 p-6 border-[0.5px] border-zinc-200 rounded-[2px]">
                    <label className="block tracking-widest text-[11px] font-bold text-zinc-500 uppercase mb-3">Colors (Comma Separated)</label>
                    <input type="text" value={colors} onChange={e => setColors(e.target.value)} placeholder="Gold, Silver, Platinum" className="w-full border-[0.5px] border-zinc-300 rounded-[2px] text-sm py-2.5 px-3 focus:outline-none focus:border-[#18181b]" />
                  </div>
                </div>

                {variants.length > 0 ? (
                  <div>
                    <table className="w-full text-sm text-left border-[0.5px] border-zinc-200">
                      <thead className="bg-[#18181b] text-white tracking-widest text-[11px] uppercase">
                        <tr>
                          <th className="py-4 px-6 font-semibold">Variant Combo</th>
                          <th className="py-4 px-6 font-semibold">SKU Identifier</th>
                          <th className="py-4 px-6 font-semibold">Price Override</th>
                          <th className="py-4 px-6 font-semibold">Stock Level</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200">
                        {variants.map((variant, idx) => (
                          <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                            <td className="py-4 px-6 font-semibold text-[#18181b]">{variant.title}</td>
                            <td className="py-4 px-6">
                              <input type="text" value={variant.sku} onChange={e => {
                                const newV = [...variants]; newV[idx].sku = e.target.value; setVariants(newV);
                              }} className="w-32 border-[0.5px] border-zinc-300 rounded-[2px] text-xs font-mono py-2 px-3 focus:border-[#18181b] focus:outline-none uppercase bg-transparent" />
                            </td>
                            <td className="py-4 px-6">
                              <div className="relative w-28">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">₹</span>
                                <input type="number" value={variant.price} onChange={e => {
                                  const newV = [...variants]; newV[idx].price = e.target.value; setVariants(newV);
                                }} className="w-full border-[0.5px] border-zinc-300 rounded-[2px] text-sm py-2 pl-7 pr-2 focus:border-[#18181b] focus:outline-none bg-transparent" />
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <input type="number" value={variant.inventoryCount} onChange={e => {
                                const newV = [...variants]; newV[idx].inventoryCount = e.target.value; setVariants(newV);
                              }} className="w-24 border-[0.5px] border-zinc-300 rounded-[2px] text-sm py-2 px-3 focus:border-[#18181b] focus:outline-none bg-transparent" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-12 text-center border-[0.5px] border-zinc-200 rounded-[2px] bg-zinc-50">
                    <p className="text-zinc-500 font-medium">Enter sizes or colors to generate the variant matrix.</p>
                  </div>
                )}
              </div>
            )}

            {/* 5. SEO TAB */}
            {activeTab === 'SEO' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="border-b-[0.5px] border-zinc-200 pb-4 mb-8">
                  <h2 className="text-xl font-bold text-[#18181b] uppercase tracking-widest font-arimo">SEO & Search Visibility</h2>
                  <p className="text-sm text-zinc-500 mt-2">Optimized indexing and canonical mapping.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Form */}
                  <div className="col-span-2 space-y-8">
                    <div>
                      <label className="tracking-widest text-[11px] font-bold text-[#D4AF37] uppercase mb-3 flex items-center gap-2"><Search size={14}/> Meta Title</label>
                      <input 
                        type="text" 
                        value={metaTitle} 
                        onChange={e => setMetaTitle(e.target.value)} 
                        className="w-full border-[0.5px] border-zinc-300 rounded-[2px] text-sm py-3 px-4 focus:outline-none focus:border-[#18181b]"
                      />
                    </div>
                    <div>
                      <label className="tracking-widest text-[11px] font-bold text-[#D4AF37] uppercase mb-3 flex items-center gap-2"><LinkIcon size={14}/> Canonical URL Handle (Slug)</label>
                      <input 
                        type="text" 
                        value={handle} 
                        onChange={e => setHandle(e.target.value)} 
                        className="w-full border-[0.5px] border-zinc-300 rounded-[2px] text-sm py-3 px-4 focus:outline-none focus:border-[#18181b] bg-zinc-50 font-mono"
                      />
                    </div>
                    <div>
                      <label className="tracking-widest text-[11px] font-bold text-[#D4AF37] uppercase mb-3 flex items-center gap-2"><Share2 size={14}/> Meta Description / Open Graph</label>
                      <textarea 
                        rows={4}
                        value={metaDescription} 
                        onChange={e => setMetaDescription(e.target.value)} 
                        className="w-full border-[0.5px] border-zinc-300 rounded-[2px] text-sm py-3 px-4 focus:outline-none focus:border-[#18181b] resize-none"
                      />
                    </div>
                  </div>

                  {/* SERP Preview */}
                  <div className="bg-zinc-50 p-6 border-[0.5px] border-zinc-200 rounded-[2px] self-start">
                    <h3 className="tracking-widest text-[11px] font-bold text-zinc-500 uppercase mb-4">Live SERP Preview</h3>
                    <div className="bg-white p-4 rounded-[2px] border-[0.5px] border-zinc-200 shadow-sm">
                      <p className="text-[12px] text-[#1a0dab] truncate">siphorahq.in › products › {handle || 'product-slug'}</p>
                      <h4 className="text-[16px] text-[#1a0dab] hover:underline cursor-pointer truncate mt-1">
                        {metaTitle || title || 'Product Title'} | Siphorahq Luxury
                      </h4>
                      <p className="text-[13px] text-[#4d5156] mt-1 line-clamp-2 leading-relaxed">
                        {metaDescription || description.replace(/<[^>]+>/g, '').substring(0, 150) || 'Discover luxury porcelain and timeless elegance with Siphorahq...'}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
