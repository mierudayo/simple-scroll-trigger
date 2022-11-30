type Options = {
  trigger: Element;
  onEnter?: () => void;
  onLeaveBack?: () => void;
  startViewPortPoint?: number | PointOption;
  startTriggerPoint?: number | PointOption;
};

type PointOption = {
  value: number;
  unit: "px" | "%";
};
export class SimpleScrollTrigger {
  #triggerElemet: Element;

  #onEnterCallback: (() => void) | undefined;
  #onLeaveBackCallback: (() => void) | undefined;

  #observer: IntersectionObserver | null = null;

  #startViewPortPoint: number | PointOption;

  #startTriggerPoint: number | PointOption;

  #resizeFlag = false;

  #isEnterd = false;

  constructor({
    trigger,
    onEnter,
    onLeaveBack,
    startViewPortPoint,
    startTriggerPoint,
  }: Options) {
    this.#triggerElemet = trigger;
    this.#onEnterCallback = onEnter;
    this.#onLeaveBackCallback = onLeaveBack;

    this.#startViewPortPoint = startViewPortPoint ?? 0;
    this.#startTriggerPoint = startTriggerPoint ?? 0;
    this.#setupObserver();

    // リサイズしたら再セットアップします。
    window.addEventListener("resize", () => {
      if (this.#resizeFlag) {
        return;
      }
      this.#resizeFlag = true;
      this.disconnectObserve();
      this.#observer = null;
      this.#setupObserver();
      setTimeout(() => {
        this.#resizeFlag = false;
      }, 200);
    });
  }

  /**
   * 位置指定オプションからビューポートの位置に変換します
   */
  #convertPxViewPortPointOption(arg: number | PointOption | undefined): number {
    const windowHeight = window.innerHeight;

    if (arg === undefined) {
      return windowHeight;
    }
    if (typeof arg === "number") {
      return windowHeight - arg;
    }
    if (arg.unit === "px") {
      return windowHeight - arg.value;
    }
    return (windowHeight * (100 - arg.value)) / 100;
  }

  /**
   * 位置指定オプションからターゲットの位置に変換します
   */
  #convertPxTargetPointOption(arg: number | PointOption | undefined) {
    const targetElementHeight = this.#triggerElemet.clientHeight;
    if (arg === undefined) {
      return 0;
    }
    if (typeof arg === "number") {
      return arg;
    }
    if (arg.unit === "px") {
      return arg.value;
    }
    return (targetElementHeight * arg.value) / 100;
  }

  /**
   * オブザーバーをセットアップします。
   */
  #setupObserver() {
    // 閾値の配列作成
    const threshold = [0, 1];
    const callback = (entries: IntersectionObserverEntry[]) => {
      const rectY =
        (entries[0].rootBounds?.y ?? 0) - entries[0].boundingClientRect.y;
      if (entries[0].isIntersecting && rectY < 0) {
        // 初めて入ったときに入域済みフラグをたてる
        if (!this.#isEnterd) {
          this.#isEnterd = true;
        }
        if (this.#onEnterCallback) {
          this.#onEnterCallback();
        }
      }
      if (!entries[0].isIntersecting && rectY < 0 && this.#isEnterd) {
        if (this.#onLeaveBackCallback) {
          this.#onLeaveBackCallback();
        }
      }
    };

    const startViewPortPx = this.#convertPxViewPortPointOption(
      this.#startViewPortPoint
    );
    const startTargetPx = this.#convertPxTargetPointOption(
      this.#startTriggerPoint
    );

    this.#observer = new IntersectionObserver(callback, {
      rootMargin: `${startTargetPx + startViewPortPx}px 0px ${-(
        startTargetPx + startViewPortPx
      )}px`,
      threshold: threshold,
    });

    this.#observer.observe(this.#triggerElemet);
  }

  /**
   * 監視を停止します
   */
  public disconnectObserve() {
    this.#observer?.disconnect();
  }
}
