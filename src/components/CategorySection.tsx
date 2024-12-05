import React from 'react';
import ProductCard from './ProductCard';

interface Category {
  title: string;
  id: string;
  products: {
    name: string;
    price: number;
    ingredients: string[];
    image: string;
  }[];
}

const CategorySection: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <section id={category.id} className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{category.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;