import { Callback, InitOnCallOption } from "../types/Options";
import { data } from "../utils/data";
import { initCallback } from "./initCallback";

type Arg = {
  forwardCallback: Callback;
  backCallback: Callback;
  isOnce: boolean;
  initCall?: InitOnCallOption | boolean;
  endViewPortPx?: number;
  endTargetPx?: number;
  lastEndCalled?: "onLeave" | "onEnterBack" | null;
};

/**
 * Intersection Observerのコールバック関数を作成します
 */
export const useIntersectionCallback = ({
  forwardCallback,
  backCallback,
  isOnce,
  initCall,
  endViewPortPx,
  endTargetPx,
  lastEndCalled,
}: Arg) => {
  const isEntered = data<boolean>(false);
  const isForwardCalled = data<boolean>(false);
  const lastCalled = data<"forward" | "back" | null>(null);
  let isBackCalled = false;
  let isInitCalled = false;

  const callback = (entries: IntersectionObserverEntry[]) => {
    // 判定範囲の矩形のy座標とトリガー要素のy座標。入った時はこの差は必ずマイナスになる。
    const rectY =
      (entries[0].rootBounds?.y ?? 0) - entries[0].boundingClientRect.y;
    // 初回コールバックの処理
    if (!isInitCalled) {
      isInitCalled = true;
      initCallback({
        entries,
        forwardCallback,
        initCall,
        endViewPortPx,
        endTargetPx,
        isOnce,
        isEntered,
        isForwardCalled,
        lastCalled,
        lastEndCalled,
      });
      return;
    }
    if (!isForwardCalled.value && forwardCallback) {
      // 交差判定があり、y座標の差がマイナスの時は入ったときのコールバックを呼ぶ
      if (entries[0].isIntersecting && rectY < 0) {
        // 初めて入ったときに入域済みフラグをたてる
        if (isEntered.value === false) {
          isEntered.value = true;
        }
        // isOnceが有効な場合に呼ばれたらフラグを建てる
        if (isOnce) {
          isForwardCalled.value = true;
        }

        forwardCallback();
        lastCalled.value = "forward";
      }
    }
    if (!isBackCalled && backCallback) {
      // 交差判定がなく、y座標の差がマイナスの時は入ったとき、さらにforward関数がある場合は入域済みフラグがある時に出ていったときのコールバックを呼ぶ
      if (
        !entries[0].isIntersecting &&
        rectY < 0 &&
        ((forwardCallback && isEntered.value) || !forwardCallback)
      ) {
        // isOnceが有効な場合に呼ばれたらフラグを建てる
        if (isOnce) {
          isBackCalled = true;
        }
        backCallback();
        lastCalled.value = "back";
      }
    }
  };

  const isAllCalled = () => {
    if (whichCallbackEnabled(forwardCallback, backCallback) === "forward") {
      return Boolean(isForwardCalled.value);
    }
    if (whichCallbackEnabled(forwardCallback, backCallback) === "back") {
      return Boolean(isBackCalled);
    }
    if (whichCallbackEnabled(forwardCallback, backCallback) === "both") {
      return Boolean(isForwardCalled.value && isBackCalled);
    }
    return false;
  };

  const getLastCalled = () => lastCalled.value;
  return { callback, isAllCalled, getLastCalled };
};

const whichCallbackEnabled = (forward: Callback, back: Callback) => {
  if (forward !== undefined && back == undefined) {
    return "forward";
  }
  if (forward == undefined && back !== undefined) {
    return "back";
  }
  if (forward !== undefined && back !== undefined) {
    return "both";
  }
  return "nothing";
};
