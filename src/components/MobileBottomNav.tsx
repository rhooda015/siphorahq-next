import React from 'react';

export default function MobileBottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 w-full h-16 bg-white border-t border-gray-200 z-40 flex justify-around items-center">
      <span>Home</span>
      <span>Shop</span>
      <span>Cart</span>
    </div>
  );
}
