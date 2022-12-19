import { convertTargetOption2Px } from "./converter/convertTargetOption2Px";
import { convertViewPortOption2Px } from "./converter/convertViewPortOption2Px";
import { Options } from "./types/Options";
import { PointOption } from "./types/PointOption";

export class SimpleScrollTrigger {
  #triggerElemet: Element | null = null;

  #onEnterCallback: (() => void) | undefined;
  #onLeaveBackCallback: (() => void) | undefined;
  #onLeaveCallback: (() => void) | undefined;
  #onEnterBackCallback: (() => void) | undefined;

  #startObserver: IntersectionObserver | null = null;
  #endObserver: IntersectionObserver | null = null;

  #startViewPortPoint: number | PointOption = 0;

  #startTriggerPoint: number | PointOption = 0;

  #endViewPortPoint: number | PointOption | undefined;

  #endTriggerPoint: number | PointOption | undefined;

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
    if (!trigger) {
      console.warn("Trigger element is Null");
      return;
    }
    this.#triggerElemet = trigger;
    this.#onEnterCallback = onEnter;
    this.#onLeaveBackCallback = onLeaveBack;
    this.#onLeaveCallback = onLeave;
    this.#onEnterBackCallback = onEnterBack;

    // 始点の設定
    if (startViewPortPoint !== undefined) {
      this.#startViewPortPoint = startViewPortPoint;
    }
    if (startTriggerPoint !== undefined) {
      this.#startTriggerPoint = startTriggerPoint;
    }

    // 終点の指定
    this.#endViewPortPoint = endViewPortPoint;
    this.#endTriggerPoint = endTriggerPoint;

    this.#setupObserver();

    // リサイズしたら再セットアップします。
    window.addEventListener("resize", () => {
      this.disconnectObserve();
      this.#startObserver = null;
      this.#endObserver = null;
      this.#setupObserver();
    });
  }


  /**
   * オブザーバーをセットアップします。
   */
  #setupObserver() {
    if (!this.#triggerElemet) {
      return;
    }
    // 閾値の配列作成
    const threshold = [0, 1];
    const startCallback = (entries: IntersectionObserverEntry[]) => {
      // 判定範囲の矩形のy座標とトリガー要素のy座標。入った時はこの差は必ずマイナスになる。
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

    const startViewPortPx = convertViewPortOption2Px(this.#startViewPortPoint);
    const startTargetPx = convertTargetOption2Px(
      this.#triggerElemet,
      this.#startTriggerPoint
    );
    if (startTargetPx === undefined) {
      return;
    }

    this.#startObserver = new IntersectionObserver(startCallback, {
      rootMargin: `${startTargetPx + startViewPortPx}px 0px ${-(
        startTargetPx + startViewPortPx
      )}px`,
      threshold: threshold,
    });

    this.#startObserver.observe(this.#triggerElemet);

    // 終点のオブザーバー
    if (
      this.#endViewPortPoint === undefined &&
      this.#endTriggerPoint === undefined
    ) {
      return;
    }

    const endViewPortPx = convertViewPortOption2Px(this.#endViewPortPoint);
    const endTargetPx = convertTargetOption2Px(
      this.#triggerElemet,
      this.#endTriggerPoint
    );

    if (endTargetPx === undefined) {
      return;
    }
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
    this.#endObserver?.disconnect();
  }
}
