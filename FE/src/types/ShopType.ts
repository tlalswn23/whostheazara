export interface ShopType {
  cap: ShopItemType[];
  face: ShopItemType[];
  clothing: ShopItemType[];
}

interface ShopItemType {
  itemSeq: number;
  price: number;
  image: string;
  sold: boolean;
}
