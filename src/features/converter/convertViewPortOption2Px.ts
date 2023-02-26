import { PointOption } from "../../types/PointOption";

/**
 * 位置指定オプションからビューポートの位置に変換します
 */
export const convertViewPortOption2Px = (
  option: number | PointOption | undefined
): number => {
  const windowHeight = window.innerHeight;

  // 未指定の場合は画面上端
  if (option === undefined) {
    return windowHeight;
  }
  // 数値指定の場合はその値
  if (typeof option === "number") {
    return windowHeight - option;
  }
  // 下端からの計算指定が有効の場合
  if (option.from === "bottom") {
    // 単位がpx指定の場合
    if (option.unit === "px") {
      return option.value;
    }
    // 単位が％の場合
    return (windowHeight * option.value) / 100;
  }
  // fromオプション未指定or上端からの指定
  else {
    if (option.unit === "px") {
      return windowHeight - option.value;
    }
    return (windowHeight * (100 - option.value)) / 100;
  }
};
