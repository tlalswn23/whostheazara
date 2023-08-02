import axios from "axios";
import { ShopCharacter } from "../components/shop/ShopCharacter";
import { ShopList } from "../components/shop/ShopList";
import { ShopLayout } from "../layouts/ShopLayout";
import { useEffect, useState } from "react";
import { ShopType } from "../types/ShopType";

export const Shop = () => {
  const [cap, setCap] = useState(0);
  const [face, setFace] = useState(0);
  const [clothing, setClothing] = useState(0);
  const changeItem = (index: number, num: number) => {
    if (index === 0) {
      setCap(num);
    } else if (index === 1) {
      setFace(num);
    } else if (index === 2) {
      setClothing(num);
    }
  };
  const [selectList, setSelectList] = useState<[cap: number, face: number, clothing: number]>([cap, face, clothing]);
  const [shopAllItem, setShopAllItem] = useState<ShopType>({ cap: [], face: [], clothing: [] });

  useEffect(() => {
    const custom = {
      cap: [],
      face: [],
      clothing: [],
    };

    const init = async () => {
      let response = await axios.get(`http://192.168.100.181:8080/api/v1/shops/cap`);
      custom.cap = response.data;
      response = await axios.get(`http://192.168.100.181:8080/api/v1/shops/face`);
      custom.face = response.data;
      response = await axios.get(`http://192.168.100.181:8080/api/v1/shops/clothing`);
      custom.clothing = response.data;

      setShopAllItem(custom);
    };

    init();
  }, []);

  useEffect(() => {
    setSelectList([cap, face, clothing]);
  }, [cap, face, clothing]);

  return (
    <ShopLayout>
      <ShopCharacter selectList={selectList} shopAllItem={shopAllItem} />
      <ShopList changeItem={changeItem} selectList={selectList} shopAllItem={shopAllItem} />
    </ShopLayout>
  );
};
