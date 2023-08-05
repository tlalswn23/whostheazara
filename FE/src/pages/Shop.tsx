import { ShopCharacter } from "../components/shop/ShopCharacter";
import ShopList from "../components/shop/ShopList";
import { ShopLayout } from "../layouts/ShopLayout";
import { useEffect, useState } from "react";
import { ShopAllItemType } from "../types/ShopType";
import { useShopApiCall } from "../api/axios/useShopApiCall";
import { SelectedItemsType, ShopItemType } from "../types/ShopType";

export const defaultSelectedItem: ShopItemType = {
  itemSeq: 0,
  price: 0,
  image: "",
  sold: false,
};

export const Shop = () => {
  const [selectedItems, setSelectedItems] = useState<SelectedItemsType>([
    defaultSelectedItem,
    defaultSelectedItem,
    defaultSelectedItem,
  ]);

  const { getShopAllItem } = useShopApiCall();

  const [shopAllItem, setShopAllItem] = useState<ShopAllItemType>({
    capList: [],
    faceList: [],
    clothingList: [],
  });

  useEffect(() => {
    (async () => {
      const { capList, faceList, clothingList } = await getShopAllItem();
      setShopAllItem({ capList, faceList, clothingList });
    })();
  }, []);

  return (
    <ShopLayout>
      <ShopCharacter selectedItems={selectedItems} shopAllItem={shopAllItem} />
      <ShopList selectedItems={selectedItems} setSelectedItems={setSelectedItems} shopAllItem={shopAllItem} />
    </ShopLayout>
  );
};
