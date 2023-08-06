import { ShopCharacter } from "../components/shop/ShopCharacter";
import ShopList from "../components/shop/ShopList";
import { ShopLayout } from "../layouts/ShopLayout";
import { useEffect, useState } from "react";
import { ShopAllItemType } from "../types/ShopType";
import { useShopApiCall } from "../api/axios/useShopApiCall";
import { SelectedItemsType, ShopItemType } from "../types/ShopType";

export const Shop = () => {
  const defaultSelectedItem: ShopItemType = {
    itemSeq: 0,
    price: 0,
    image: "",
    sold: false,
  };

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
      // TODO: 기존에 장착하고 있는 아이템을 초기값으로 설정해야 함, 장착중인 아이템 api 불러오기
      setSelectedItems([capList[0], faceList[0], clothingList[0]]);
    })();
  }, []);

  return (
    <ShopLayout>
      <ShopCharacter selectedItems={selectedItems} />
      <ShopList
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        shopAllItem={shopAllItem}
        setShopAllItem={setShopAllItem}
      />
    </ShopLayout>
  );
};
