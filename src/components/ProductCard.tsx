import React from 'react';
import { Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  id?: string;
  name: string;
  price: number;
  ingredients: string[];
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id = crypto.randomUUID(), name, price, ingredients, image }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({ id, name, price, image });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">
          {ingredients.join(', ')}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-orange-600">
            ${price.toLocaleString()}
          </span>
          <button 
            onClick={handleAddToCart}
            className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;