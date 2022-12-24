type Constructor = {
  forwardCallback: (() => void) | undefined;
  backCallback: (() => void) | undefined;
};

/**
 * Intersection Observerのコールバック関数を作成します
 */
export class IntersectionCallback {
  #isEntered = false;
  #forwardCallback: undefined | (() => void) = undefined;
  #backCallback: undefined | (() => void) = undefined;
  constructor({ forwardCallback, backCallback }: Constructor) {
    this.#forwardCallback = forwardCallback;
    this.#backCallback = backCallback;
  }

  get callback() {
    return (entries: IntersectionObserverEntry[]) => {
      // 判定範囲の矩形のy座標とトリガー要素のy座標。入った時はこの差は必ずマイナスになる。
      const rectY =
        (entries[0].rootBounds?.y ?? 0) - entries[0].boundingClientRect.y;
      // 交差判定があり、y座標の差がマイナスの時は入ったときのコールバックを呼ぶ
      if (entries[0].isIntersecting && rectY < 0) {
        // 初めて入ったときに入域済みフラグをたてる
        if (this.#isEntered === false) {
          this.#isEntered = true;
        }
        if (this.#forwardCallback) {
          this.#forwardCallback();
        }
      }
      // 交差判定がなく、y座標の差がマイナスの時は入ったとき、さらに入域済みフラグがある場合は出ていったときのコールバックを呼ぶ
      if (!entries[0].isIntersecting && rectY < 0 && this.#isEntered) {
        if (this.#backCallback) {
          this.#backCallback();
        }
      }
    };
  }
}
