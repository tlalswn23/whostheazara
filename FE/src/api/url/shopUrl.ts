import { baseUrl } from "./baseUrl";

export default {
  getCapList: () => `${baseUrl}/shop/cap`,
  getFaceList: () => `${baseUrl}/shop/face`,
  getClothingList: () => `${baseUrl}/shop/clothing`,
  buyItems: () => `${baseUrl}/shop/buy`,
  getCoin: () => `${baseUrl}/shop/point`,
};
