import { InitOnCallOption } from "../../types/Options";

/**
 * 終点の初期読み込みの設定をチェックします。
 * @param startInitOption
 * @param endInitOption
 */
export const checkEndInitOption = (
  startInitOption: InitOnCallOption | boolean | undefined,
  endInitOption: boolean | undefined
) => {
  // 始点の初期読み込みオプションが無効ならそのまま
  if (!startInitOption) {
    return endInitOption;
  }
  //始点の初期読み込みが全域の場合は無効に上書き
  if (startInitOption === true || startInitOption.range === "all") {
    return false;
  }
  return endInitOption;
};
