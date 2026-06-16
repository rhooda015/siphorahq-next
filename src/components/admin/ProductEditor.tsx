'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, UploadCloud, Trash2, GripVertical, Image as ImageIcon,
  Bold, Italic, List, ListOrdered, Heading3, Sparkles, Smartphone, Monitor, Check, ArrowRight,
  Search, ShoppingBag, Star
} from 'lucide-react';

interface ProductEditorProps {
  initialData: any;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

const CATEGORIES = [
  'Dinnerware', 'Tea Sets', 'Mugs & Cups', 'Serveware', 'Gifting', 'Accessories'
];

const STEPS = [
  { id: 'general', label: '01 General Information' },
  { id: 'pricing', label: '02 Pricing & Inventory' },
  { id: 'media', label: '03 Media Manager' },
  { id: 'variants', label: '04 Variants' },
  { id: 'specs', label: '05 Specifications' },
  { id: 'seo', label: '06 SEO & Visibility' }
];

export default function ProductEditor({ initialData, onClose, onSave }: ProductEditorProps) {
  const isEdit = !!initialData?._id;
  
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = STEPS[activeStepIndex];
  
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Form State
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [status, setStatus] = useState(initialData?.status || 'Live');

  const [mrp, setMrp] = useState(initialData?.mrp || initialData?.price || 0);
  const [price, setPrice] = useState(initialData?.price || 0);
  const [inventoryCount, setInventoryCount] = useState(initialData?.inventoryCount || 0);

  const [images, setImages] = useState<{url: string, altText?: string}[]>(initialData?.images || []);

  const [sizes, setSizes] = useState(initialData?.sizes?.join(', ') || '');
  const [colors, setColors] = useState(initialData?.colors?.join(', ') || '');
  const [variants, setVariants] = useState<any[]>(initialData?.variants || []);

  const [handle, setHandle] = useState(initialData?.handle || '');
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || '');
  const [keywords, setKeywords] = useState(initialData?.keywords || '');

  const [specifications, setSpecifications] = useState({
    setIncludes: initialData?.specifications?.setIncludes || '',
    color: initialData?.specifications?.color || '',
    finish: initialData?.specifications?.finish || '',
    designStyle: initialData?.specifications?.designStyle || '',
    handleType: initialData?.specifications?.handleType || '',
    occasion: initialData?.specifications?.occasion || '',
    microwaveSafe: initialData?.specifications?.microwaveSafe || '',
    dishwasherSafe: initialData?.specifications?.dishwasherSafe || '',
    countryOfOrigin: initialData?.specifications?.countryOfOrigin || '',
    idealFor: initialData?.specifications?.idealFor || ''
  });

  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[200px] text-zinc-700 font-sans p-4 bg-transparent',
      },
    },
  });

  // Calculations
  const discountPercent = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const estimatedCost = price * 0.4; 
  const margin = price - estimatedCost;
  const marginPercent = price > 0 ? Math.round((margin / price) * 100) : 0;

  useEffect(() => {
    if (!isEdit && title && !handle) {
      setHandle(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
    if (!isEdit && title && !metaTitle) {
      setMetaTitle(title);
    }
  }, [title, isEdit]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      url: URL.createObjectURL(file),
      altText: ''
    }));
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }
  });

  const handleSave = async () => {
    setIsSaving(true);
    await onSave({
      ...(initialData || {}),
      title, description, category, status,
      mrp, price, inventoryCount, images,
      sizes: sizes.split(',').map((s: string) => s.trim()).filter(Boolean),
      colors: colors.split(',').map((c: string) => c.trim()).filter(Boolean),
      variants, handle, metaTitle, metaDescription, keywords, specifications
    });
    setIsSaving(false);
  };

  const renderStep = () => {
    switch(activeStep.id) {
      case 'general': return (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Product Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Emperor Royal Teacup Set" className="w-full bg-zinc-50 border border-transparent focus:border-luxury-gold/50 rounded-xl px-4 py-3 font-serif text-lg text-zinc-900 focus:ring-4 focus:ring-luxury-gold/10 outline-none transition-all placeholder:font-sans placeholder:text-sm placeholder:text-zinc-400" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-zinc-50 border border-transparent focus:border-luxury-gold/50 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:ring-4 focus:ring-luxury-gold/10 outline-none transition-all appearance-none">
                <option value="">Select Category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="w-full bg-zinc-50 border border-transparent focus:border-luxury-gold/50 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:ring-4 focus:ring-luxury-gold/10 outline-none transition-all appearance-none">
                <option value="Live">Live (Published)</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Product Description</label>
              <button className="text-[11px] font-bold text-luxury-gold uppercase tracking-widest flex items-center gap-1 hover:text-zinc-900 transition-colors">
                <Sparkles size={12} /> Optimize with AI
              </button>
            </div>
            <div className="border border-zinc-200/60 rounded-xl overflow-hidden bg-white focus-within:border-luxury-gold/50 focus-within:ring-4 focus-within:ring-luxury-gold/10 transition-all">
              <div className="bg-zinc-50 border-b border-zinc-200/60 p-2 flex gap-1">
                <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-2 rounded-lg text-zinc-600 hover:bg-zinc-200/50 ${editor?.isActive('bold') ? 'bg-zinc-200/80 text-zinc-900' : ''}`}><Bold size={16} /></button>
                <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-2 rounded-lg text-zinc-600 hover:bg-zinc-200/50 ${editor?.isActive('italic') ? 'bg-zinc-200/80 text-zinc-900' : ''}`}><Italic size={16} /></button>
                <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`p-2 rounded-lg text-zinc-600 hover:bg-zinc-200/50 ${editor?.isActive('bulletList') ? 'bg-zinc-200/80 text-zinc-900' : ''}`}><List size={16} /></button>
                <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded-lg text-zinc-600 hover:bg-zinc-200/50 ${editor?.isActive('heading') ? 'bg-zinc-200/80 text-zinc-900' : ''}`}><Heading3 size={16} /></button>
              </div>
              <EditorContent editor={editor} />
            </div>
          </div>
        </motion.div>
      );
      case 'pricing': return (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">MRP (Maximum Retail Price)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-sans">₹</span>
                <input type="number" value={mrp} onChange={e => setMrp(Number(e.target.value))} className="w-full bg-zinc-50 border border-transparent focus:border-luxury-gold/50 rounded-xl pl-8 pr-4 py-3 font-mono text-zinc-900 focus:ring-4 focus:ring-luxury-gold/10 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Selling Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-sans">₹</span>
                <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full bg-zinc-50 border border-transparent focus:border-luxury-gold/50 rounded-xl pl-8 pr-4 py-3 font-mono text-zinc-900 focus:ring-4 focus:ring-luxury-gold/10 outline-none transition-all" />
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-900 rounded-xl p-6 text-white border border-zinc-800 shadow-xl">
            <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Margin Analysis</h4>
            <div className="grid grid-cols-3 gap-6 divide-x divide-zinc-800">
              <div>
                <p className="text-zinc-400 text-sm mb-1">Discount</p>
                <p className="text-2xl font-serif text-emerald-400">{discountPercent}%</p>
              </div>
              <div className="pl-6">
                <p className="text-zinc-400 text-sm mb-1">Est. Profit Margin</p>
                <p className="text-2xl font-serif text-luxury-gold">₹{margin.toLocaleString()}</p>
              </div>
              <div className="pl-6">
                <p className="text-zinc-400 text-sm mb-1">Margin %</p>
                <p className="text-2xl font-serif text-luxury-gold">{marginPercent}%</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Inventory Count</label>
            <input type="number" value={inventoryCount} onChange={e => setInventoryCount(Number(e.target.value))} className="w-1/2 bg-zinc-50 border border-transparent focus:border-luxury-gold/50 rounded-xl px-4 py-3 font-mono text-zinc-900 focus:ring-4 focus:ring-luxury-gold/10 outline-none transition-all" />
          </div>
        </motion.div>
      );
      case 'media': return (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-6">
          <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${isDragActive ? 'border-luxury-gold bg-luxury-gold/5' : 'border-zinc-200 hover:border-luxury-gold hover:bg-zinc-50'}`}>
            <input {...getInputProps()} />
            <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
              <UploadCloud size={24} />
            </div>
            <p className="text-zinc-900 font-medium mb-1">Drag and drop images here</p>
            <p className="text-sm text-zinc-500">Supports JPG, PNG, WEBP (Max 5MB)</p>
          </div>
          
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {images.map((img, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-zinc-100 border border-zinc-200/60 shadow-sm">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-zinc-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-zinc-900 hover:text-red-500 transition-colors shadow-sm" onClick={() => setImages(imgs => imgs.filter((_, idx) => idx !== i))}>
                      <Trash2 size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-zinc-900 hover:text-luxury-gold transition-colors shadow-sm">
                      <Sparkles size={14} />
                    </button>
                  </div>
                  {i === 0 && <span className="absolute top-2 left-2 bg-zinc-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Primary</span>}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      );
      case 'seo': return (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm mb-8">
            <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Google Search Preview</h4>
            <div className="max-w-xl">
              <div className="text-[#1a0dab] font-sans text-xl hover:underline cursor-pointer truncate mb-1">
                {metaTitle || title || 'Product Title'} - Siphorahq
              </div>
              <div className="text-[#006621] font-sans text-sm mb-1 truncate">
                https://siphorahq.com/products/{handle || 'product-handle'}
              </div>
              <div className="text-[#545454] font-sans text-sm line-clamp-2">
                {metaDescription || description?.replace(/<[^>]*>?/gm, '').substring(0, 160) || 'Product description will appear here. Write a compelling description to increase click-through rates.'}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Meta Title</label>
              <input value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className="w-full bg-zinc-50 border border-transparent focus:border-luxury-gold/50 rounded-xl px-4 py-3 text-zinc-900 focus:ring-4 focus:ring-luxury-gold/10 outline-none transition-all" />
              <p className={`text-xs mt-1 ${metaTitle.length > 60 ? 'text-red-500' : 'text-zinc-500'}`}>{metaTitle.length}/60 characters</p>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Meta Description</label>
              <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} rows={3} className="w-full bg-zinc-50 border border-transparent focus:border-luxury-gold/50 rounded-xl px-4 py-3 text-zinc-900 focus:ring-4 focus:ring-luxury-gold/10 outline-none transition-all resize-none" />
              <p className={`text-xs mt-1 ${metaDescription.length > 160 ? 'text-red-500' : 'text-zinc-500'}`}>{metaDescription.length}/160 characters</p>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">URL Slug</label>
              <input value={handle} onChange={e => setHandle(e.target.value)} className="w-full bg-zinc-50 border border-transparent focus:border-luxury-gold/50 rounded-xl px-4 py-3 font-mono text-zinc-900 focus:ring-4 focus:ring-luxury-gold/10 outline-none transition-all" />
            </div>
          </div>
        </motion.div>
      );
      case 'variants': return (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-6">
          <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/60">
            <h3 className="text-sm font-semibold text-zinc-900 mb-4">Variant Options</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Sizes (Comma separated)</label>
                <input value={sizes} onChange={e => setSizes(e.target.value)} placeholder="e.g. S, M, L" className="w-full bg-white border border-transparent focus:border-luxury-gold/50 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:ring-4 focus:ring-luxury-gold/10 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Colors (Comma separated)</label>
                <input value={colors} onChange={e => setColors(e.target.value)} placeholder="e.g. Gold, Silver" className="w-full bg-white border border-transparent focus:border-luxury-gold/50 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:ring-4 focus:ring-luxury-gold/10 outline-none transition-all" />
              </div>
            </div>
          </div>
        </motion.div>
      );
      case 'specs': return (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-6">
           <div className="grid grid-cols-2 gap-6">
             {Object.keys(specifications).map(key => (
               <div key={key}>
                 <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                   {key.replace(/([A-Z])/g, ' $1').trim()}
                 </label>
                 <input 
                   value={(specifications as any)[key]} 
                   onChange={e => setSpecifications(prev => ({...prev, [key]: e.target.value}))} 
                   className="w-full bg-zinc-50 border border-transparent focus:border-luxury-gold/50 rounded-xl px-4 py-3 text-sm text-zinc-900 focus:ring-4 focus:ring-luxury-gold/10 outline-none transition-all" 
                 />
               </div>
             ))}
           </div>
        </motion.div>
      );
      default: return null;
    }
  };

  const renderPreview = () => {
    return (
      <div className={`mx-auto bg-white transition-all duration-500 origin-top shadow-2xl ${previewMode === 'mobile' ? 'w-[375px] h-[812px] rounded-[3rem] border-[8px] border-zinc-900 overflow-y-auto custom-scrollbar' : 'w-full h-full rounded-2xl border border-zinc-200/60 overflow-y-auto custom-scrollbar'}`}>
        
        {previewMode === 'mobile' && (
          <div className="h-6 w-full flex justify-center pt-2 pb-1 sticky top-0 bg-white z-50">
            <div className="w-20 h-5 bg-zinc-900 rounded-full"></div>
          </div>
        )}

        <div className="bg-warm-ivory min-h-full">
          {/* Mock header */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200/50 bg-white sticky top-0 z-40">
            <div className="font-serif font-bold text-xl tracking-wider text-zinc-900">Siphorahq</div>
            <div className="flex gap-4">
              <Search size={18} className="text-zinc-900" />
              <ShoppingBag size={18} className="text-zinc-900" />
            </div>
          </header>

          <main className={previewMode === 'desktop' ? 'max-w-6xl mx-auto p-12 grid grid-cols-2 gap-16' : 'p-4 flex flex-col gap-6'}>
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-zinc-100 w-full overflow-hidden relative">
                {images[0]?.url ? (
                  <img src={images[0].url} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-300">
                    <ImageIcon size={64} />
                  </div>
                )}
              </div>
              {previewMode === 'desktop' && images.length > 1 && (
                <div className="flex gap-4">
                  {images.slice(1, 4).map((img, i) => (
                    <div key={i} className="aspect-square w-24 bg-zinc-100 overflow-hidden">
                      <img src={img.url} className="w-full h-full object-cover" alt="" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-[0.2em] mb-2">{category || 'Category'}</p>
              <h1 className="text-3xl font-serif text-zinc-900 mb-4">{title || 'Product Title'}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-zinc-900"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
                <span className="text-xs text-zinc-500">(12 Reviews)</span>
              </div>

              <div className="flex items-end gap-3 mb-8 pb-8 border-b border-zinc-200">
                <span className="text-2xl font-mono text-zinc-900">₹{price.toLocaleString() || '0'}</span>
                {mrp > price && (
                  <span className="text-sm font-mono text-zinc-400 line-through mb-1">₹{mrp.toLocaleString()}</span>
                )}
              </div>

              <div className="prose prose-sm text-zinc-600 font-sans mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: description || '<p>Product description will appear here...</p>' }} />

              <button className="w-full bg-zinc-900 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 hover:bg-luxury-gold transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </main>
        </div>

      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-50 flex flex-col font-sans animate-in slide-in-from-bottom-full duration-500">
      
      {/* Editor Header */}
      <header className="h-[80px] bg-white border-b border-zinc-200/60 px-8 flex items-center justify-between flex-shrink-0 z-10 shadow-sm relative">
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="font-serif font-bold text-2xl tracking-wide text-zinc-900">{isEdit ? 'Edit Product' : 'New Product'}</h1>
            <p className="text-xs text-zinc-500 font-medium">Save as draft or publish to live store.</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* Device Toggle */}
          <div className="bg-zinc-100 p-1.5 rounded-xl flex items-center">
            <button onClick={() => setPreviewMode('desktop')} className={`p-2 rounded-lg transition-colors ${previewMode === 'desktop' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'}`}>
              <Monitor size={18} />
            </button>
            <button onClick={() => setPreviewMode('mobile')} className={`p-2 rounded-lg transition-colors ${previewMode === 'mobile' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'}`}>
              <Smartphone size={18} />
            </button>
          </div>
          <button onClick={onClose} className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors px-2">Cancel</button>
          <button onClick={handleSave} disabled={isSaving} className="bg-zinc-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-luxury-gold transition-colors shadow-sm flex items-center gap-2">
            {isSaving ? <span className="animate-pulse">Saving...</span> : <><Check size={16} /> Save Product</>}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden flex relative">
        
        {/* Left: Editor Sidebar & Form */}
        <div className="w-[600px] flex-shrink-0 flex border-r border-zinc-200/60 bg-white">
          
          {/* Steps Sidebar */}
          <div className="w-64 border-r border-zinc-200/60 bg-[#F7F5F0] p-6 flex flex-col gap-2">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4 mt-2">Steps</p>
            {STEPS.map((step, idx) => (
              <button 
                key={step.id} 
                onClick={() => setActiveStepIndex(idx)}
                className={`text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeStepIndex === idx 
                    ? 'bg-zinc-900 text-white shadow-md scale-105 ml-2' 
                    : 'text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-10 bg-white">
            <AnimatePresence mode="wait">
              <motion.div key={activeStep.id} initial={{opacity:0, x:10}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-10}} transition={{duration: 0.2}}>
                <h2 className="font-serif text-3xl font-semibold text-zinc-900 mb-8 border-b border-zinc-100 pb-5 tracking-wide">{activeStep.label.substring(3)}</h2>
                {renderStep()}

                <div className="mt-12 flex justify-end">
                  {activeStepIndex < STEPS.length - 1 && (
                    <button onClick={() => setActiveStepIndex(activeStepIndex + 1)} className="flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-luxury-gold transition-colors">
                      Next Step <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="flex-1 bg-zinc-50 overflow-hidden flex items-center justify-center p-8 relative">
          
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-zinc-200">Live Preview</span>
          </div>

          {renderPreview()}

        </div>

      </div>
    </div>
  );
}
