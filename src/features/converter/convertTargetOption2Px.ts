import { PointOption } from "../../types/PointOption";

/**
 * 位置指定オプションからターゲットの位置に変換します
 */
export const convertTargetOption2Px = (
  element: Element,
  option: number | PointOption | undefined
): number => {
  const targetElementHeight = element.clientHeight;

  // 未指定の場合は要素上端
  if (option === undefined) {
    return 0;
  }
  // 数値指定の場合はその値
  if (typeof option === "number") {
    return option;
  }
  // 下端からの計算指定が有効の場合
  if (option.from === "bottom") {
    // 単位がpx指定の場合
    if (option.unit === "px") {
      return targetElementHeight - option.value;
    }
    // 単位が％の場合
    return targetElementHeight * ((100 - option.value) / 100);
  } else {
    if (option.unit === "px") {
      return option.value;
    }
    return (targetElementHeight * option.value) / 100;
  }
};
