import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1a1a1a] z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col border-l border-[#d4af37]/20">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#d4af37]/20">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#d4af37]" />
            <h2 className="text-xl font-serif text-[#f5f0e8]">Your Order</h2>
            <span className="bg-[#d4af37] text-[#1a1a1a] text-xs font-bold px-2 py-1 rounded-full">
              {totalItems}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#f5f0e8]" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-[#d4af37]/30 mx-auto mb-4" />
              <p className="text-[#f5f0e8]/60 font-serif text-lg">Your cart is empty</p>
              <p className="text-[#f5f0e8]/40 text-sm mt-2">Add some delicious dishes!</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-[#f5f0e8] font-serif font-medium">{item.name}</h3>
                  <p className="text-[#d4af37] font-bold mt-1">Rs. {item.price}</p>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-colors flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-[#f5f0e8] font-medium w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-colors flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="self-start p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#d4af37]/20 space-y-4 bg-[#1a1a1a]">
            <div className="flex justify-between items-center text-[#f5f0e8]">
              <span className="font-serif text-lg">Total</span>
              <span className="text-2xl font-bold text-[#d4af37]">Rs. {totalPrice.toLocaleString()}</span>
            </div>
            
            <a 
              href={`https://wa.me/923001234567?text=${encodeURIComponent(
                `Hello Soghaat Cuisine! I'd like to order:\n\n${items.map(i => `• ${i.name} x${i.quantity} - Rs. ${i.price * i.quantity}`).join('\n')}\n\nTotal: Rs. ${totalPrice}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#d4af37] hover:bg-[#c9a227] text-[#1a1a1a] font-bold py-4 rounded-xl text-center transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Order via WhatsApp
            </a>
            
            <button 
              onClick={clearCart}
              className="w-full text-[#f5f0e8]/50 hover:text-red-400 text-sm py-2 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
