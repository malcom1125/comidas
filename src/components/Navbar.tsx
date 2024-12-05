import React, { useState } from 'react';
import { Menu, ShoppingCart, ChevronDown } from 'lucide-react';
import { categories } from '../data/categories';
import { useCartStore } from '../store/cartStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, items } = useCartStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-orange-600 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">El Sabor</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#promociones" className="hover:text-orange-200 transition-colors">
              Promociones
            </a>
            
            <div className="relative group">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center hover:text-orange-200 transition-colors"
              >
                Categorías <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700">
                  {categories.map((category) => (
                    <a
                      key={category.id}
                      href={`#${category.id}`}
                      className="block px-4 py-2 hover:bg-orange-100 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
            
            <a href="#sancochos" className="hover:text-orange-200 transition-colors">
              Sancochos
            </a>
          </div>

          <button 
            onClick={toggleCart}
            className="flex items-center relative"
          >
            <ShoppingCart className="h-6 w-6 cursor-pointer hover:text-orange-200 transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;