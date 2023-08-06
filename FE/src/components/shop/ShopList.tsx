import { SHOP_ITEM_CATEGORY_MAP } from "../../constants/shop/ShopItemCategoryMap";
import { ShopAllItemType } from "../../types/ShopType";
import { ShopListBottom } from "./ShopListBottom";
import { ShopListBox } from "./ShopListBox";
import { ShopListTab } from "./ShopListTab";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ShopItemType, SelectedItemsType } from "../../types/ShopType";
import { useShopApiCall } from "../../api/axios/useShopApiCall";

interface ShopListProps {
  selectedItems: SelectedItemsType;
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItemsType>>;
  shopAllItem: ShopAllItemType;
  setShopAllItem: React.Dispatch<React.SetStateAction<ShopAllItemType>>;
}

const ShopList = ({ selectedItems, setSelectedItems, shopAllItem, setShopAllItem }: ShopListProps) => {
  const { buyItems, getCoin, getShopAllItem, equipItems, getEquippedItems } = useShopApiCall();
  const [selectTab, setSelectTab] = useState(SHOP_ITEM_CATEGORY_MAP.CAP);
  const [cost, setCost] = useState(0);
  const [coin, setCoin] = useState(0);

  const isPossibleBuy = (item: ShopItemType): boolean => {
    return !(item.sold || item.itemSeq % 100 === 0);
  };

  const buyAndReSettingShopInfo = async () => {
    const buyItemSeqList: number[] = [];
    selectedItems.forEach((item) => {
      if (isPossibleBuy(item)) {
        buyItemSeqList.push(item.itemSeq);
      }
    });

    await buyItems(buyItemSeqList);
    await equipItems(selectedItems);
    const { capList, faceList, clothingList } = await getShopAllItem();
    setShopAllItem({ capList, faceList, clothingList });
    setCoin(await getCoin());
    const { equippedCap, equippedFace, equippedClothing } = await getEquippedItems();
    setSelectedItems([equippedCap || capList[0], equippedFace || faceList[0], equippedClothing || clothingList[0]]);
  };

  const onBuyRequest = async () => {
    if (cost === 0) {
      toast.warn("구매 가능한 아이템이 없습니다.");
      return;
    }
    if (coin < cost) {
      toast.warn("금액이 부족합니다.");
      return;
    }

    await toast.promise(buyAndReSettingShopInfo(), {
      pending: "아이템 구매 중...",
      success: "아이템 구매가 완료되었습니다.",
    });
  };

  useEffect(() => {
    (async () => {
      setCoin(await getCoin());
    })();
  }, []);

  useEffect(() => {
    let finalCost = 0;
    selectedItems.forEach((item) => {
      if (isPossibleBuy(item)) {
        finalCost += item.price;
      }
    });
    setCost(finalCost);
  }, [selectedItems]);

  const resetSelectedItems = () => {
    setSelectedItems([shopAllItem.capList[0], shopAllItem.faceList[0], shopAllItem.clothingList[0]]);
  };

  return (
    <div className="w-[60%] h-full flex flex-col mt-10">
      <ShopListTab selectTab={selectTab} setSelectTab={setSelectTab} selectedItems={selectedItems} />
      <ShopListBox
        selectTab={selectTab}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        shopAllItem={shopAllItem}
      />
      <ShopListBottom coin={coin} cost={cost} resetSelectedItems={resetSelectedItems} onBuyRequest={onBuyRequest} />
    </div>
  );
};

export default ShopList;
