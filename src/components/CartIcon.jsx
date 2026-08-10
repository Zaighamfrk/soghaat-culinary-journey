import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function CartIcon() {
  const { totalItems, setIsOpen } = useCart();

  return (
    <button 
      onClick={() => setIsOpen(true)}
      className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
      aria-label="Open cart"
    >
      <ShoppingBag className="w-6 h-6 text-[#f5f0e8]" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#1a1a1a] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
          {totalItems}
        </span>
      )}
    </button>
  );
}
