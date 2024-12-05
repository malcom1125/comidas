import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative text-center text-white z-10 px-4">
        <h1 className="text-5xl font-bold mb-4">El Sabor</h1>
        <p className="text-xl mb-8">La mejor comida casera y a la parrilla</p>
        <button className="bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition-colors">
          Ver Menú
        </button>
      </div>
    </div>
  );
};

export default Hero;