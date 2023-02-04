import { data } from "../utils/data";

type Callback = (() => void) | undefined;

type Arg = {
  forwardCallback: Callback;
  backCallback: Callback;
  isOnce: boolean;
};

/**
 * Intersection Observerのコールバック関数を作成します
 */
export const useIntersectionCallback = ({
  forwardCallback,
  backCallback,
  isOnce,
}: Arg) => {
  const isEntered = data<boolean>(false);
  const isForwardCalled = data<boolean>(false);
  const isBackCalled = data<boolean>(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    // 判定範囲の矩形のy座標とトリガー要素のy座標。入った時はこの差は必ずマイナスになる。
    const rectY =
      (entries[0].rootBounds?.y ?? 0) - entries[0].boundingClientRect.y;
    if (!isForwardCalled.value) {
      // 交差判定があり、y座標の差がマイナスの時は入ったときのコールバックを呼ぶ
      if (entries[0].isIntersecting && rectY < 0) {
        // 初めて入ったときに入域済みフラグをたてる
        if (isEntered.value === false) {
          isEntered.value = true;
        }
        if (forwardCallback) {
          // isOnceが有効な場合に呼ばれたらフラグを建てる
          if (isOnce) {
            isForwardCalled.value = true;
          }

          forwardCallback();
        }
      }
    }
    if (!isBackCalled.value) {
      // 交差判定がなく、y座標の差がマイナスの時は入ったとき、さらに入域済みフラグがある場合は出ていったときのコールバックを呼ぶ
      if (!entries[0].isIntersecting && rectY < 0 && isEntered.value) {
        if (backCallback) {
          // isOnceが有効な場合に呼ばれたらフラグを建てる
          if (isOnce) {
            isBackCalled.value = true;
          }
          backCallback();
        }
      }
    }
  };

  const isAllCalled = () => {
    if (whichCallbackEnabled(forwardCallback, backCallback) === "forward") {
      return Boolean(isForwardCalled.value);
    }
    if (whichCallbackEnabled(forwardCallback, backCallback) === "back") {
      return Boolean(isBackCalled.value);
    }
    if (whichCallbackEnabled(forwardCallback, backCallback) === "both") {
      return Boolean(isForwardCalled.value && isBackCalled.value);
    }
    return false;
  };
  return { callback, isAllCalled };
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
