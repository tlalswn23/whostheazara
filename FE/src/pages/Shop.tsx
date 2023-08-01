import { ShopCharacter } from "../components/Shop/ShopCharacter";
import { ShopList } from "../components/Shop/ShopList";
import { ShopLayout } from "../layouts/ShopLayout";

export const Shop = () => {
  return (
    <ShopLayout>
      <ShopCharacter />
      <ShopList />
    </ShopLayout>
  );
};
