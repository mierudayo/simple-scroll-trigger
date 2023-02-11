import { PointOption } from "./PointOption";

/**
 * 設定内容
 */
export type Options = {
  /** 交差対象の要素です */
  trigger: Element | null;
  /** 入ったときに呼ばれる関数です */
  onEnter?: () => void;
  /** 出戻ったときに呼ばれる関数です */
  onLeaveBack?: () => void;
  /** 通過したときに呼ばれる関数です */
  onLeave?: () => void;
  /** 入り戻ったときに呼ばれる関数です */
  onEnterBack?: () => void;
  /** start判定基準となる画面上端からの距離です */
  startViewPortPoint?: number | PointOption;
  /** start判定基準となる要素上端からの距離です */
  startTriggerPoint?: number | PointOption;
  /** end判定基準となる画面上端からの距離です */
  endViewPortPoint?: number | PointOption;
  /** start判定基準となる要素上端からの距離です */
  endTriggerPoint?: number | PointOption;
  /** コールバックの実行を1度だけにするか */
  once?: boolean;
  /** 読み込み時にonEnter判定をするか */
  isInitOnEnter?: boolean;
};
