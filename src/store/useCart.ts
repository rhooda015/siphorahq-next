import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

export interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
  isGiftWrapped?: boolean;
}

export interface CustomerDetails {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  pincode: string;
  city: string;
  state: string;
}

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (product: Product, quantity: number, isGiftWrapped?: boolean) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  cartTotal: () => number;
  customerDetails: CustomerDetails | null;
  setCustomerDetails: (details: CustomerDetails) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      customerDetails: null,
      setCustomerDetails: (details) => set({ customerDetails: details }),
      addItem: (product, quantity, isGiftWrapped = false) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === product.id && item.isGiftWrapped === isGiftWrapped
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems, isDrawerOpen: true };
          }

          return {
            items: [
              ...state.items,
              { ...product, cartItemId: `${product.id}-${isGiftWrapped ? 'gift' : 'regular'}`, quantity, isGiftWrapped },
            ],
            isDrawerOpen: true,
          };
        });
      },
      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        })),
      updateQuantity: (cartItemId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      cartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const itemTotal = (item.salePrice || item.price) * item.quantity;
          const giftTotal = item.isGiftWrapped ? 500 * item.quantity : 0;
          return total + itemTotal + giftTotal;
        }, 0);
      },
    }),
    {
      name: 'siphorahq-cart',
      partialize: (state) => ({ 
        items: state.items,
        customerDetails: state.customerDetails 
      }),
      merge: (persistedState: any, currentState) => {
        if (persistedState?.items) {
          persistedState.items = persistedState.items.map((item: any) => ({
            ...item,
            image: item.image?.replace(/\.png$/, '.webp'),
            img: item.img?.replace(/\.png$/, '.webp')
          }));
        }
        return { ...currentState, ...persistedState };
      },
    }
  )
);
