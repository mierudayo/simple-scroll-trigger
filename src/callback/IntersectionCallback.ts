type Callback = (() => void) | undefined;

type Constructor = {
  forwardCallback: Callback;
  backCallback: Callback;
  isOnce: boolean;
};

/**
 * Intersection Observerのコールバック関数を作成します
 */
export class IntersectionCallback {
  #isEntered = false;
  #forwardCallback: undefined | (() => void) = undefined;
  #backCallback: undefined | (() => void) = undefined;
  #isForwradCalled: null | boolean = null;
  #isBackCalled: null | boolean = null;
  #isOnce = false;
  constructor({ forwardCallback, backCallback, isOnce }: Constructor) {
    this.#forwardCallback = forwardCallback;
    this.#backCallback = backCallback;
    this.#isOnce = isOnce;
    if (forwardCallback !== undefined) {
      this.#isForwradCalled = false;
    }
    if (backCallback !== undefined) {
      this.#isBackCalled = false;
    }
  }

  get callback() {
    return (entries: IntersectionObserverEntry[]) => {
      // 判定範囲の矩形のy座標とトリガー要素のy座標。入った時はこの差は必ずマイナスになる。
      const rectY =
        (entries[0].rootBounds?.y ?? 0) - entries[0].boundingClientRect.y;
      if (!this.#isForwradCalled) {
        // 交差判定があり、y座標の差がマイナスの時は入ったときのコールバックを呼ぶ
        if (entries[0].isIntersecting && rectY < 0) {
          // 初めて入ったときに入域済みフラグをたてる
          if (this.#isEntered === false) {
            this.#isEntered = true;
          }
          if (this.#forwardCallback) {
            // isOnceが有効な場合に呼ばれたらフラグを建てる
            if (this.#isOnce) {
              this.#isForwradCalled = true;
            }

            this.#forwardCallback();
          }
        }
      }

      if (!this.#isBackCalled) {
        // 交差判定がなく、y座標の差がマイナスの時は入ったとき、さらに入域済みフラグがある場合は出ていったときのコールバックを呼ぶ
        if (!entries[0].isIntersecting && rectY < 0 && this.#isEntered) {
          if (this.#backCallback) {
            // isOnceが有効な場合に呼ばれたらフラグを建てる
            if (this.#isOnce) {
              this.#isBackCalled = true;
            }
            this.#backCallback();
          }
        }
      }
    };
  }

  get isAllCalled(): boolean {
    if (
      whichCallbackEnabled(this.#forwardCallback, this.#backCallback) ===
      "forward"
    ) {
      return Boolean(this.#isForwradCalled);
    }
    if (
      whichCallbackEnabled(this.#forwardCallback, this.#backCallback) === "back"
    ) {
      return Boolean(this.#isBackCalled);
    }
    if (
      whichCallbackEnabled(this.#forwardCallback, this.#backCallback) === "both"
    ) {
      return Boolean(this.#isForwradCalled) && Boolean(this.#isBackCalled);
    }
    return false;
  }
}

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
