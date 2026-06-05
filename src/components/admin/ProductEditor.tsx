'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useDropzone } from 'react-dropzone';
import { 
  X, ChevronLeft, UploadCloud, Trash2, GripVertical, Image as ImageIcon,
  Bold, Italic, List, ListOrdered, Heading3
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

export default function ProductEditor({ initialData, onClose, onSave }: ProductEditorProps) {
  const isEdit = !!initialData?._id;
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [handle, setHandle] = useState(initialData?.handle || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price || 0);
  const [inventoryCount, setInventoryCount] = useState(initialData?.inventoryCount || 0);
  const [category, setCategory] = useState(initialData?.category || '');
  const [images, setImages] = useState<{url: string, altText?: string}[]>(initialData?.images || []);
  
  const [sizes, setSizes] = useState(initialData?.sizes?.join(', ') || '');
  const [colors, setColors] = useState(initialData?.colors?.join(', ') || '');
  
  const [variants, setVariants] = useState<any[]>(initialData?.variants || []);
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
        class: 'prose prose-sm focus:outline-none min-h-[150px] p-4 text-zinc-800 text-sm',
      },
    },
  });

  // Auto-slugification
  useEffect(() => {
    if (!isEdit && title && !handle) {
      setHandle(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
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
      variants
    });
    setIsSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
            {isEdit ? title : 'Add New Product'}
          </h1>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="px-5 py-2 text-sm font-medium text-zinc-600 bg-white border-[0.5px] border-zinc-200 rounded-[2px] hover:bg-zinc-50 transition-colors">
            Discard
          </button>
          <button onClick={handleSave} disabled={isSaving} className="px-5 py-2 text-sm font-medium text-white bg-zinc-900 rounded-[2px] hover:bg-zinc-800 transition-colors disabled:opacity-50">
            {isSaving ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Basic Info */}
          <div className="bg-white border-[0.5px] border-zinc-200 rounded-[2px] p-6">
            <div className="space-y-6">
              <div>
                <label className="block tracking-widest text-[10px] font-medium text-zinc-500 uppercase mb-2">Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="e.g. 46-Piece Gold Dinner Set"
                  className="w-full border-[0.5px] border-zinc-200 rounded-[2px] text-sm py-2.5 px-3 focus:outline-none focus:border-zinc-500 focus:ring-0 transition-colors"
                />
              </div>

              <div>
                <label className="block tracking-widest text-[10px] font-medium text-zinc-500 uppercase mb-2">Description</label>
                <div className="border-[0.5px] border-zinc-200 rounded-[2px] overflow-hidden focus-within:border-zinc-500 transition-colors">
                  {/* TipTap Toolbar */}
                  <div className="flex items-center gap-1 bg-zinc-50 border-b-[0.5px] border-zinc-200 p-2">
                    <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-1.5 rounded-[2px] ${editor?.isActive('bold') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}`}><Bold size={14}/></button>
                    <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-1.5 rounded-[2px] ${editor?.isActive('italic') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}`}><Italic size={14}/></button>
                    <div className="w-px h-4 bg-zinc-300 mx-1"></div>
                    <button onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-1.5 rounded-[2px] ${editor?.isActive('heading', { level: 3 }) ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}`}><Heading3 size={14}/></button>
                    <div className="w-px h-4 bg-zinc-300 mx-1"></div>
                    <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded-[2px] ${editor?.isActive('bulletList') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}`}><List size={14}/></button>
                    <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={`p-1.5 rounded-[2px] ${editor?.isActive('orderedList') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}`}><ListOrdered size={14}/></button>
                  </div>
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>
          </div>

          {/* Media Engine */}
          <div className="bg-white border-[0.5px] border-zinc-200 rounded-[2px] p-6">
            <h2 className="tracking-widest text-[10px] font-medium text-zinc-500 uppercase mb-4">Media</h2>
            
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mb-6">
                {images.map((img, idx) => (
                  <div key={idx} className="group relative aspect-square border-[0.5px] border-zinc-200 rounded-[2px] overflow-hidden bg-zinc-50">
                    <img src={img.url} alt="Product" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-zinc-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="p-1.5 bg-white text-zinc-900 rounded-[2px] cursor-grab"><GripVertical size={14}/></button>
                      <button onClick={() => setImages(images.filter((_, i) => i !== idx))} className="p-1.5 bg-white text-red-600 rounded-[2px] hover:bg-red-50"><Trash2 size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div {...getRootProps()} className={`border border-dashed rounded-[2px] p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-zinc-500 bg-zinc-50' : 'border-zinc-300 hover:bg-zinc-50'}`}>
              <input {...getInputProps()} />
              <UploadCloud size={24} className="mx-auto mb-2 text-zinc-400" />
              <p className="text-sm font-medium text-zinc-700">Click or drag images to upload</p>
              <p className="text-xs text-zinc-500 mt-1">High-res JPG/PNG (1080x1080 recommended)</p>
            </div>
          </div>

          {/* Variant Matrix */}
          <div className="bg-white border-[0.5px] border-zinc-200 rounded-[2px] p-6">
            <h2 className="tracking-widest text-[10px] font-medium text-zinc-500 uppercase mb-4">Variant Matrix</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Sizes (Comma separated)</label>
                <input type="text" value={sizes} onChange={e => setSizes(e.target.value)} placeholder="Standard, Luxury, Mini" className="w-full border-[0.5px] border-zinc-200 rounded-[2px] text-sm py-2 px-3 focus:outline-none focus:border-zinc-500 focus:ring-0" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">Colors (Comma separated)</label>
                <input type="text" value={colors} onChange={e => setColors(e.target.value)} placeholder="Gold, Silver, Platinum" className="w-full border-[0.5px] border-zinc-200 rounded-[2px] text-sm py-2 px-3 focus:outline-none focus:border-zinc-500 focus:ring-0" />
              </div>
            </div>

            {variants.length > 0 && (
              <div className="mt-6 border-t-[0.5px] border-zinc-200 pt-6">
                <table className="w-full text-sm text-left">
                  <thead className="text-[10px] uppercase tracking-widest text-zinc-500">
                    <tr>
                      <th className="pb-3 font-medium">Variant</th>
                      <th className="pb-3 font-medium">Price</th>
                      <th className="pb-3 font-medium">Inventory</th>
                      <th className="pb-3 font-medium">SKU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {variants.map((variant, idx) => (
                      <tr key={idx}>
                        <td className="py-3 font-medium text-zinc-900">{variant.title}</td>
                        <td className="py-3">
                          <input type="number" value={variant.price} onChange={e => {
                            const newV = [...variants]; newV[idx].price = e.target.value; setVariants(newV);
                          }} className="w-24 border-[0.5px] border-zinc-200 rounded-[2px] text-sm py-1.5 px-2" />
                        </td>
                        <td className="py-3">
                          <input type="number" value={variant.inventoryCount} onChange={e => {
                            const newV = [...variants]; newV[idx].inventoryCount = e.target.value; setVariants(newV);
                          }} className="w-20 border-[0.5px] border-zinc-200 rounded-[2px] text-sm py-1.5 px-2" />
                        </td>
                        <td className="py-3">
                          <input type="text" value={variant.sku} onChange={e => {
                            const newV = [...variants]; newV[idx].sku = e.target.value; setVariants(newV);
                          }} className="w-32 border-[0.5px] border-zinc-200 rounded-[2px] text-sm py-1.5 px-2 font-mono text-xs" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* SIDEBAR */}
        <div className="space-y-8">
          
          {/* Status & Category */}
          <div className="bg-white border-[0.5px] border-zinc-200 rounded-[2px] p-6 space-y-6">
            <div>
              <label className="block tracking-widest text-[10px] font-medium text-zinc-500 uppercase mb-2">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border-[0.5px] border-zinc-200 rounded-[2px] text-sm py-2.5 px-3 focus:outline-none focus:border-zinc-500 bg-white">
                <option value="">Select Category...</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block tracking-widest text-[10px] font-medium text-zinc-500 uppercase mb-2 flex justify-between">
                <span>URL Handle / Slug</span>
                {title && <button onClick={() => setHandle(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))} className="text-blue-600 hover:underline">Reset</button>}
              </label>
              <input 
                type="text" 
                value={handle} 
                onChange={e => setHandle(e.target.value)}
                className="w-full border-[0.5px] border-zinc-200 rounded-[2px] text-sm py-2 px-3 focus:outline-none focus:border-zinc-500 bg-zinc-50 font-mono text-xs"
              />
            </div>
          </div>

          {/* Pricing fallback (if no variants) */}
          {variants.length === 0 && (
            <div className="bg-white border-[0.5px] border-zinc-200 rounded-[2px] p-6 space-y-6">
              <div>
                <label className="block tracking-widest text-[10px] font-medium text-zinc-500 uppercase mb-2">Base Price (₹)</label>
                <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full border-[0.5px] border-zinc-200 rounded-[2px] text-sm py-2.5 px-3 focus:outline-none focus:border-zinc-500" />
              </div>
              <div>
                <label className="block tracking-widest text-[10px] font-medium text-zinc-500 uppercase mb-2">Base Inventory</label>
                <input type="number" value={inventoryCount} onChange={e => setInventoryCount(Number(e.target.value))} className="w-full border-[0.5px] border-zinc-200 rounded-[2px] text-sm py-2.5 px-3 focus:outline-none focus:border-zinc-500" />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
