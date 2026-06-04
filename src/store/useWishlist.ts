import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  items: string[]; // array of product IDs
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  setItems: (productIds: string[]) => void;
  hasItem: (productId: string) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) => set((state) => ({ 
        items: state.items.includes(productId) ? state.items : [...state.items, productId] 
      })),
      removeItem: (productId) => set((state) => ({ 
        items: state.items.filter(id => id !== productId) 
      })),
      setItems: (productIds) => set({ items: productIds }),
      hasItem: (productId) => get().items.includes(productId)
    }),
    {
      name: 'siphorahq_wishlist',
    }
  )
);
