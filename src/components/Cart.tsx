import React from 'react';
import { X, Minus, Plus, CreditCard } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_publishable_key'); // Replace with your Stripe key

const Cart: React.FC = () => {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, clearCart } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    // Here you would typically make a request to your backend to create a Stripe session
    // For demo purposes, we'll just show an alert
    alert('En un entorno de producción, esto conectaría con Stripe para procesar el pago.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Carrito de Compras</h2>
            <button onClick={toggleCart} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="text-center text-gray-500">El carrito está vacío</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center mb-4 border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-orange-600">${item.price.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-orange-600">${total.toLocaleString()}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="w-full bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:bg-gray-400"
            >
              <CreditCard className="h-5 w-5" />
              Pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;