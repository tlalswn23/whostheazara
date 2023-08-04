import axios from "axios";
import { TAB_MAP } from "../../constants/shop/TabMap";
import { ShopType } from "../../types/ShopType";
import { ShopListBottom } from "./ShopListBottom";
import { ShopListBox } from "./ShopListBox";
import { ShopListTab } from "./ShopListTab";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
interface ShopListProps {
  changeItem: (index: number, num: number) => void;
  selectList: [cap: number, face: number, clothing: number];
  shopAllItem: ShopType;
  init: () => void;
}

interface buyListData {
  items: number[];
}

export const ShopList = ({ changeItem, selectList, shopAllItem, init }: ShopListProps) => {
  const [selectTab, setSelectTab] = useState(TAB_MAP.CAP);
  const [selectItem, setSelectItem] = useState(0);
  const [cost, setCost] = useState(0);
  const [coin, setCoin] = useState(0);

  const onBuyRequest = async () => {
    const buyList: buyListData = {
      items: [],
    };

    if (coin < cost) {
      toast.warn("금액이 부족합니다.");
      return;
    }

    let no;
    if (!shopAllItem.cap[selectList[0]].sold) {
      no = shopAllItem.cap[selectList[0]].itemSeq;
      if (no !== 100 && no !== 200 && no !== 300) {
        buyList.items.push(shopAllItem.cap[selectList[0]].itemSeq);
      }
    }
    if (!shopAllItem.face[selectList[1]].sold) {
      no = shopAllItem.face[selectList[1]].itemSeq;
      if (no !== 100 && no !== 200 && no !== 300) {
        buyList.items.push(shopAllItem.face[selectList[1]].itemSeq);
      }
    }
    if (!shopAllItem.clothing[selectList[2]].sold) {
      no = shopAllItem.clothing[selectList[2]].itemSeq;
      if (no !== 100 && no !== 200 && no !== 300) {
        buyList.items.push(shopAllItem.clothing[selectList[2]].itemSeq);
      }
    }
    console.log(buyList.items);
    if (buyList.items.length === 0) {
      toast.warn("선택한 제품이 없거나, 모두 가지고 있는 제품입니다.");
    }

    let response = await axios.post(`http://192.168.100.181:8080/api/v1/shop/buy`, buyList);
    console.log(response);
    onRequestCoin();
    changeItem(0, 0);
    changeItem(1, 0);
    changeItem(2, 0);
    setSelectItem(0);
    setCost(0);
    init();
  };

  const onRequestCoin = async () => {
    const response = await axios.get(`http://192.168.100.181:8080/api/v1/shop/point`);
    setCoin(response.data);
  };

  useEffect(() => {
    onRequestCoin();
  }, []);

  useEffect(() => {
    setSelectItem(selectList[selectTab]);
  }, [selectTab]);

  useEffect(() => {
    changeItem(selectTab, selectItem);
  }, [selectItem]);

  useEffect(() => {
    const finalCost =
      shopAllItem.cap.length > 0
        ? (shopAllItem.cap[selectList[0]].sold ? 0 : shopAllItem.cap[selectList[0]].price) +
          (shopAllItem.face[selectList[1]].sold ? 0 : shopAllItem.face[selectList[1]].price) +
          (shopAllItem.clothing[selectList[2]].sold ? 0 : shopAllItem.clothing[selectList[2]].price)
        : 0;
    setCost(finalCost);
  }, [selectList]);

  return (
    <div className="w-[60%] h-full flex flex-col">
      <ShopListTab selectTab={selectTab} setSelectTab={setSelectTab} />
      <ShopListBox
        selectTab={selectTab}
        selectItem={selectItem}
        setSelectItem={setSelectItem}
        shopAllItem={shopAllItem}
      />
      <ShopListBottom
        coin={coin}
        cost={cost}
        initSelect={() => {
          changeItem(0, 0);
          changeItem(1, 0);
          changeItem(2, 0);
          setSelectItem(0);
          setCost(0);
        }}
        onBuyRequest={onBuyRequest}
      />
    </div>
  );
};
