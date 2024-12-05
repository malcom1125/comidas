import * as React from "react";
import { ScrollView, FlexboxLayout, Label, Image } from "@nativescript/core";
import { categories } from "../../data/categories";
import { useCartStore } from "../../store/cartStore";

export function HomeScreen({ navigation }) {
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ScrollView>
      <FlexboxLayout flexDirection="column">
        {/* Header Image */}
        <Image
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
          stretch="aspectFill"
          height={200}
        />
        
        {/* Categories */}
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

      {/* Cart Button */}
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