import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import Cart from './components/Cart';
import { categories } from './data/categories';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Cart />
      <main className="pt-16">
        <Hero />
        {categories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </main>
      <footer className="bg-orange-600 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">El Sabor - La mejor comida casera</p>
          <p className="mt-2">Contacto: (123) 456-7890</p>
        </div>
      </footer>
    </div>
  );
}

export default App;