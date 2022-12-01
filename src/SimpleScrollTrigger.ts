type Options = {
  trigger: Element;
  onEnter?: () => void;
  onLeaveBack?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  startViewPortPoint?: number | PointOption;
  startTriggerPoint?: number | PointOption;
  endViewPortPoint?: number | PointOption;
  endTriggerPoint?: number | PointOption;
};

type PointOption = {
  value: number;
  unit: "px" | "%";
};

export class SimpleScrollTrigger {
  #triggerElemet: Element;

  #onEnterCallback: (() => void) | undefined;
  #onLeaveBackCallback: (() => void) | undefined;
  #onLeaveCallback: (() => void) | undefined;
  #onEnterBackCallback: (() => void) | undefined;

  #startObserver: IntersectionObserver | null = null;
  #endObserver: IntersectionObserver | null = null;

  #startViewPortPoint: number | PointOption;

  #startTriggerPoint: number | PointOption;

  #endViewPortPoint: number | PointOption | undefined;

  #endTriggerPoint: number | PointOption | undefined;

  #resizeFlag = false;

  #isStartEnterd = false;
  #isEndEnterd = false;

  constructor({
    trigger,
    onEnter,
    onLeaveBack,
    onLeave,
    onEnterBack,
    startViewPortPoint,
    startTriggerPoint,
    endViewPortPoint,
    endTriggerPoint,
  }: Options) {
    this.#triggerElemet = trigger;
    this.#onEnterCallback = onEnter;
    this.#onLeaveBackCallback = onLeaveBack;
    this.#onLeaveCallback = onLeave;
    this.#onEnterBackCallback = onEnterBack;

    this.#startViewPortPoint = startViewPortPoint ?? 0;
    this.#startTriggerPoint = startTriggerPoint ?? 0;

    // 終点の指定
    this.#endViewPortPoint = endViewPortPoint;
    this.#endTriggerPoint = endTriggerPoint;

    this.#setupObserver();

    // リサイズしたら再セットアップします。
    window.addEventListener("resize", () => {
      if (this.#resizeFlag) {
        return;
      }
      this.#resizeFlag = true;
      this.disconnectObserve();
      this.#startObserver = null;
      this.#endObserver = null;
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
    const startCallback = (entries: IntersectionObserverEntry[]) => {
      const rectY =
        (entries[0].rootBounds?.y ?? 0) - entries[0].boundingClientRect.y;
      if (entries[0].isIntersecting && rectY < 0) {
        // 初めて入ったときに入域済みフラグをたてる
        if (!this.#isStartEnterd) {
          this.#isStartEnterd = true;
        }
        if (this.#onEnterCallback) {
          this.#onEnterCallback();
        }
      }
      if (!entries[0].isIntersecting && rectY < 0 && this.#isStartEnterd) {
        if (this.#onLeaveBackCallback) {
          this.#onLeaveBackCallback();
        }
      }
    };

    const endCallback = (entries: IntersectionObserverEntry[]) => {
      const rectY =
        (entries[0].rootBounds?.y ?? 0) - entries[0].boundingClientRect.y;
      if (entries[0].isIntersecting && rectY < 0) {
        // 初めて入ったときに入域済みフラグをたてる
        if (!this.#isEndEnterd) {
          this.#isEndEnterd = true;
        }
        if (this.#onLeaveCallback) {
          this.#onLeaveCallback();
        }
      }
      if (!entries[0].isIntersecting && rectY < 0 && this.#isEndEnterd) {
        if (this.#onEnterBackCallback) {
          this.#onEnterBackCallback();
        }
      }
    };

    const startViewPortPx = this.#convertPxViewPortPointOption(
      this.#startViewPortPoint
    );
    const startTargetPx = this.#convertPxTargetPointOption(
      this.#startTriggerPoint
    );

    this.#startObserver = new IntersectionObserver(startCallback, {
      rootMargin: `${startTargetPx + startViewPortPx}px 0px ${-(
        startTargetPx + startViewPortPx
      )}px`,
      threshold: threshold,
    });

    this.#startObserver.observe(this.#triggerElemet);

    // 終点のオブザーバー
    if (!this.#endViewPortPoint && !this.#endTriggerPoint) {
      return;
    }

    const endViewPortPx = this.#convertPxViewPortPointOption(
      this.#endViewPortPoint
    );
    const endTargetPx = this.#convertPxTargetPointOption(this.#endTriggerPoint);

    this.#endObserver = new IntersectionObserver(endCallback, {
      rootMargin: `${endViewPortPx + endTargetPx}px 0px ${-(
        endViewPortPx + endTargetPx
      )}px`,
      threshold: threshold,
    });

    this.#endObserver.observe(this.#triggerElemet);
  }

  /**
   * 監視を停止します
   */
  public disconnectObserve() {
    this.#startObserver?.disconnect();
  }
}
