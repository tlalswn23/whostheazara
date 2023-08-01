import { ShopCharacter } from "../components/shop/ShopCharacter";
import { ShopList } from "../components/shop/ShopList";
import { ShopLayout } from "../layouts/ShopLayout";

export const Shop = () => {
  return (
    <ShopLayout>
      <ShopCharacter />
      <ShopList />
    </ShopLayout>
  );
};
