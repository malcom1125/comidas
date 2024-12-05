import { Application, ScrollView, FlexboxLayout, Label, Image, Button, alert } from '@nativescript/core';
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { create } from 'zustand';

// Tipos y interfaces
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

// Datos de categorías y productos
const categories = [
  {
    title: "Promociones",
    id: "promociones",
    products: [
      {
        id: "combo-familiar",
        name: "Combo Familiar",
        price: 45000,
        ingredients: ["1 Pollo asado", "Papas", "Ensalada", "4 Bebidas"],
        image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80"
      },
      {
        id: "duo-hamburguesas",
        name: "Dúo Hamburguesas",
        price: 32000,
        ingredients: ["2 Hamburguesas", "2 Papas", "2 Bebidas"],
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    title: "Asados",
    id: "asados",
    products: [
      {
        id: "pollo-asado",
        name: "Pollo Asado",
        price: 28000,
        ingredients: ["Pollo entero", "Papas", "Ensalada"],
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    title: "Salchipapas",
    id: "salchipapas",
    products: [
      {
        id: "salchipapa-especial",
        name: "Salchipapa Especial",
        price: 18000,
        ingredients: ["Papas", "Salchicha", "Queso", "Salsas"],
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    title: "Hamburguesas",
    id: "hamburguesas",
    products: [
      {
        id: "hamburguesa-doble",
        name: "Hamburguesa Doble",
        price: 22000,
        ingredients: ["Doble carne", "Queso", "Tocineta", "Vegetales"],
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80"
      }
    ]
  },
  {
    title: "Pizzas",
    id: "pizzas",
    products: [
      {
        id: "pizza-suprema",
        name: "Pizza Suprema",
        price: 42000,
        ingredients: ["Pepperoni", "Champiñones", "Pimentón", "Cebolla"],
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80"
      }
    ]
  }
];

// Store de carrito
const useCartStore = create<CartStore>((set) => ({
  items: [],
  isOpen: false,
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set({ items: [] }),
}));

// Componentes de pantalla
function HomeScreen({ navigation }) {
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ScrollView>
      <FlexboxLayout flexDirection="column">
        <Image
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
          stretch="aspectFill"
          height={200}
        />
        
        {categories.map((category) => (
          <FlexboxLayout
            key={category.id}
            className="p-4 m-2 bg-white rounded-lg"
            flexDirection="column"
            onTap={() => navigation.navigate('Category', { 
              categoryId: category.id,
              title: category.title 
            })}
          >
            <Label text={category.title} className="text-xl font-bold" />
            <Label text={`${category.products.length} productos`} className="text-gray-600" />
          </FlexboxLayout>
        ))}
      </FlexboxLayout>

      <FlexboxLayout
        className="bg-orange-600 rounded-full p-4"
        horizontalAlignment="right"
        verticalAlignment="bottom"
        margin={16}
        onTap={() => navigation.navigate('Cart')}
      >
        <Label text={`🛒 ${totalItems}`} color="white" />
      </FlexboxLayout>
    </ScrollView>
  );
}

function CategoryScreen({ route }) {
  const { categoryId } = route.params;
  const category = categories.find((c) => c.id === categoryId);
  const addItem = useCartStore((state) => state.addItem);

  if (!category) return <Label text="Categoría no encontrada" />;

  return (
    <ScrollView>
      <FlexboxLayout flexDirection="column" padding={16}>
        {category.products.map((product) => (
          <FlexboxLayout
            key={product.id}
            className="bg-white rounded-lg mb-4 p-4"
            flexDirection="column"
          >
            <Image
              src={product.image}
              stretch="aspectFill"
              height={200}
              className="rounded-lg"
            />
            <Label text={product.name} className="text-xl font-bold mt-2" />
            <Label text={product.ingredients.join(", ")} className="text-gray-600" />
            <FlexboxLayout justifyContent="space-between" alignItems="center" marginTop={8}>
              <Label text={`$${product.price.toLocaleString()}`} className="text-orange-600 font-bold" />
              <FlexboxLayout
                className="bg-orange-600 rounded-full p-2"
                onTap={() => addItem(product)}
              >
                <Label text="+" color="white" />
              </FlexboxLayout>
            </FlexboxLayout>
          </FlexboxLayout>
        ))}
      </FlexboxLayout>
    </ScrollView>
  );
}

function CartScreen() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert({
      title: "Procesar Pago",
      message: "En una versión de producción, aquí se procesaría el pago.",
      okButtonText: "OK"
    });
  };

  return (
    <ScrollView>
      <FlexboxLayout flexDirection="column" padding={16}>
        {items.length === 0 ? (
          <Label text="El carrito está vacío" className="text-center text-gray-500" />
        ) : (
          <>
            {items.map((item) => (
              <FlexboxLayout
                key={item.id}
                className="bg-white rounded-lg mb-4 p-4"
                flexDirection="row"
              >
                <Image
                  src={item.image}
                  stretch="aspectFill"
                  width={80}
                  height={80}
                  className="rounded"
                />
                <FlexboxLayout flexDirection="column" flexGrow={1} marginLeft={16}>
                  <Label text={item.name} className="font-bold" />
                  <Label text={`$${item.price.toLocaleString()}`} className="text-orange-600" />
                  <FlexboxLayout alignItems="center" marginTop={8}>
                    <Button text="-" onTap={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))} />
                    <Label text={item.quantity.toString()} marginHorizontal={8} />
                    <Button text="+" onTap={() => updateQuantity(item.id, item.quantity + 1)} />
                    <Button 
                      text="🗑️" 
                      onTap={() => removeItem(item.id)}
                      className="ml-auto text-red-500"
                    />
                  </FlexboxLayout>
                </FlexboxLayout>
              </FlexboxLayout>
            ))}

            <FlexboxLayout className="bg-white rounded-lg p-4 mt-4">
              <Label text="Total:" className="font-bold" />
              <Label 
                text={`$${total.toLocaleString()}`}
                className="text-orange-600 font-bold ml-auto"
              />
            </FlexboxLayout>

            <Button
              text="Proceder al Pago"
              className="bg-orange-600 text-white rounded-lg mt-4 p-4"
              onTap={handleCheckout}
            />
          </>
        )}
      </FlexboxLayout>
    </ScrollView>
  );
}

// Configuración de navegación
const Stack = createStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ea580c',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'El Sabor' }}
        />
        <Stack.Screen 
          name="Category" 
          component={CategoryScreen}
          options={({ route }) => ({ title: route.params?.title })}
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen}
          options={{ title: 'Carrito' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Inicialización de la aplicación
Application.run({ create: () => AppContainer });