import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

export default function MenuItemCard({ dish }) {
  const { addItem } = useCart();

  return (
    <div className="group relative bg-[#f5f0e8] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-[#d4af37]/10">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={dish.image} 
          alt={dish.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {dish.popular && (
          <span className="absolute top-3 left-3 bg-[#d4af37] text-[#1a1a1a] text-xs font-bold px-3 py-1 rounded-full">
            Popular
          </span>
        )}
        {dish.vegetarian && (
          <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Veg
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif text-[#1a1a1a] font-medium">{dish.name}</h3>
          <span className="text-lg font-bold text-[#d4af37]">Rs. {dish.price}</span>
        </div>
        
        <p className="text-[#1a1a1a]/60 text-sm mb-4 line-clamp-2">{dish.description}</p>
        
        <button
          onClick={() => addItem(dish)}
          className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#d4af37] text-[#f5f0e8] hover:text-[#1a1a1a] font-medium py-3 rounded-xl transition-all duration-300 transform active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
