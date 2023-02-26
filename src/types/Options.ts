import { PointOption } from "./PointOption";

/** 読み込み時にonEnter判定のオプションです */
export type InitOnCallOption = {
  /** onEnterの判定範囲です。endTriggerは位置がstart判定からend判定の場合にコールバックを呼びます。allの場合はstart判定を超えていたら呼びます */
  range: "endTrigger" | "all";
};

/** 交差時に呼ばれるコールバック関数です */
export type Callback = (() => void) | undefined;

/**
 * 設定内容
 */
export type Options = {
  /** 交差対象の要素です */
  trigger: Element | null;
  /** 入ったときに呼ばれる関数です */
  onEnter?: Callback;
  /** 出戻ったときに呼ばれる関数です */
  onLeaveBack?: Callback;
  /** 通過したときに呼ばれる関数です */
  onLeave?: Callback;
  /** 入り戻ったときに呼ばれる関数です */
  onEnterBack?: Callback;
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
  initOnEnter?: InitOnCallOption | boolean;
  /** 読み込み時にonLeave判定をするか */
  initOnLeave?: boolean;
};
