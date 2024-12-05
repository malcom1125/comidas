import * as React from "react";
import { ScrollView, FlexboxLayout, Label, Image } from "@nativescript/core";
import { categories } from "../../data/categories";
import { useCartStore } from "../../store/cartStore";

export function CategoryScreen({ route }) {
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