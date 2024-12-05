import * as React from "react";
import { ScrollView, FlexboxLayout, Label, Image, Button } from "@nativescript/core";
import { useCartStore } from "../../store/cartStore";

export function CartScreen() {
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
                    <Button text="-" onTap={() => updateQuantity(item.id, item.quantity - 1)} />
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