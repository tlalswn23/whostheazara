import { ShopCharacter } from "../components/shop/ShopCharacter";
import { ShopList } from "../components/shop/ShopList";
import { ShopLayout } from "../layouts/ShopLayout";
import { useEffect, useState } from "react";

export const Shop = () => {
  const [cap, setCap] = useState(0);
  const [face, setFace] = useState(0);
  const [clothing, setClothing] = useState(0);
  const changePreview = (index: number, num: number) => {
    if (index === 0) {
      setCap(num);
    } else if (index === 1) {
      setFace(num);
    } else if (index === 2) {
      setClothing(num);
    }
  };
  const [outfit, setOutfit] = useState<[cap: number, face: number, clothing: number]>([cap, face, clothing]);

  useEffect(() => {
    setOutfit([cap, face, clothing]);
  }, [cap, face, clothing]);
  return (
    <ShopLayout>
      <ShopCharacter outfit={outfit} />
      <ShopList changePreview={changePreview} outfit={outfit} />
    </ShopLayout>
  );
};
