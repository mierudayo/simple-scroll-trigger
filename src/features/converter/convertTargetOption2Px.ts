import { PointOption } from "../../types/PointOption";

/**
 * 位置指定オプションからビューポートの位置に変換します
 */
export const convertTargetOption2Px = (
  element: Element,
  option: number | PointOption | undefined
):number => {
  const targetElementHeight = element.clientHeight;
  if (option === undefined) {
    return 0;
  }
  if (typeof option === "number") {
    return option;
  }
  if (option.unit === "px") {
    return option.value;
  }
  return (targetElementHeight * option.value) / 100;
};
