import { data } from "../utils/data";

type Callback = (() => void) | undefined;

type Arg = {
  forwardCallback: Callback;
  backCallback: Callback;
  isOnce: boolean;
  isInitOnEnter?: boolean;
  startTriggerPoint?: string;
};

/**
 * Intersection Observerのコールバック関数を作成します
 */
export const useIntersectionCallback = ({
  forwardCallback,
  backCallback,
  isOnce,
  isInitOnEnter,
}: Arg) => {
  const isEntered = data<boolean>(false);
  const isForwardCalled = data<boolean>(false);
  const isBackCalled = data<boolean>(false);

  const isInitCalled = data<boolean>(false);

  const callback = (entries: IntersectionObserverEntry[]) => {
    // 判定範囲の矩形のy座標とトリガー要素のy座標。入った時はこの差は必ずマイナスになる。
    const rectY =
      (entries[0].rootBounds?.y ?? 0) - entries[0].boundingClientRect.y;
    // 初回コールバックの処理
    if (!isInitCalled.value) {
      isInitCalled.value = true;
      if (!entries[0].rootBounds || !forwardCallback || !isInitOnEnter) {
        return;
      }
      // 開始位置を過ぎていたら、実行
      if (entries[0].rootBounds.height + rectY > 0) {
        // 初めて入ったときに入域済みフラグをたてる
        isEntered.value = true;
        forwardCallback();
        if (isOnce) {
          isForwardCalled.value = true;
        }
      }
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
      }
    }
    if (!isBackCalled.value && backCallback) {
      // 交差判定がなく、y座標の差がマイナスの時は入ったとき、さらに入域済みフラグがある場合は出ていったときのコールバックを呼ぶ
      if (!entries[0].isIntersecting && rectY < 0 && isEntered.value) {
        // isOnceが有効な場合に呼ばれたらフラグを建てる
        if (isOnce) {
          isBackCalled.value = true;
        }
        backCallback();
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
