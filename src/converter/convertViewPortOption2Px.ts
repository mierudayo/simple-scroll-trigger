import { PointOption } from "../types/PointOption";

/**
 * 位置指定オプションからビューポートの位置に変換します
 */
export const convertViewPortOption2Px = (
  option: number | PointOption | undefined
): number => {
  const windowHeight = window.innerHeight;

  if (option === undefined) {
    return windowHeight;
  }
  if (typeof option === "number") {
    return windowHeight - option;
  }
  if (option.unit === "px") {
    return windowHeight - option.value;
  }
  return (windowHeight * (100 - option.value)) / 100;
};
