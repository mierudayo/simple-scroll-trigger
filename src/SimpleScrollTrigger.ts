import { useIntersectionCallback } from "./callback/IntersectionCallback";
import { convertTargetOption2Px } from "./converter/convertTargetOption2Px";
import { convertViewPortOption2Px } from "./converter/convertViewPortOption2Px";
import { Options } from "./types/Options";
import { PointOption } from "./types/PointOption";

type CallBack = {
  callback: (entries: IntersectionObserverEntry[]) => void;
  isAllCalled: () => boolean;
};

export class SimpleScrollTrigger {
  #triggerElemet: Element | null = null;

  #startCallbacks: CallBack | null = null;
  #endCallbacks: CallBack | null = null;

  #startObserver: IntersectionObserver | null = null;
  #endObserver: IntersectionObserver | null = null;

  #startViewPortPx: number = 0;
  #startTargetPx: number = 0;

  #endViewPortPx: number = 0;
  #endTargetPx: number = 0;

  #isOnce: boolean = false;

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
    once,
  }: Options) {
    if (!trigger) {
      console.warn("Trigger element is Null");
      return;
    }
    this.#triggerElemet = trigger;
    this.#isOnce = Boolean(once);

    // 始点の設定
    this.#startViewPortPx = convertViewPortOption2Px(startViewPortPoint);
    this.#startTargetPx = convertTargetOption2Px(
      this.#triggerElemet,
      startTriggerPoint
    );

    // 終点の指定
    this.#endViewPortPx = convertViewPortOption2Px(endViewPortPoint);
    this.#endTargetPx = convertTargetOption2Px(
      this.#triggerElemet,
      endTriggerPoint
    );

    // コールバックの作成
    this.#startCallbacks = useIntersectionCallback({
      forwardCallback: onEnter,
      backCallback: onLeaveBack,
      isOnce: this.#isOnce,
    });

    this.#endCallbacks = useIntersectionCallback({
      forwardCallback: onLeave,
      backCallback: onEnterBack,
      isOnce: this.#isOnce,
    });

    this.#setupObserver();

    // リサイズしたら再セットアップします。
    window.addEventListener("resize", () => {
      this.disconnectObserve();
      this.#startObserver = null;
      this.#endObserver = null;
      if (!this.#isSetupPrevented) {
        this.#setupObserver();
      }
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

    

    this.#startObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (!this.#startCallbacks) {
          return;
        }
        this.#startCallbacks.callback(entries);
        // onceフラグがあり、すべてのコールバックが呼ばれたら監視を停止する
        if (this.#isOnce && this.#startCallbacks.isAllCalled()) {
          this.#startObserver?.disconnect();
        }
      },
      {
        rootMargin: `${this.#startTargetPx + this.#startViewPortPx}px 0px ${-(
          this.#startTargetPx + this.#startViewPortPx
        )}px`,
        threshold: threshold,
      }
    );

    this.#startObserver.observe(this.#triggerElemet);

    // 終点のオブザーバー
    if (
      this.#endViewPortPx === undefined &&
      this.#endTargetPx === undefined
    ) {
      return;
    }

    this.#endObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (!this.#endCallbacks) {
          return;
        }
        this.#endCallbacks.callback(entries);
        // onceフラグがあり、すべてのコールバックが呼ばれたら監視を停止する

        if (this.#isOnce && this.#endCallbacks.isAllCalled()) {
          this.#endObserver?.disconnect();
        }
      },
      {
        rootMargin: `${this.#endViewPortPx + this.#endTargetPx}px 0px ${-(
          this.#endViewPortPx + this.#endTargetPx
        )}px`,
        threshold: threshold,
      }
    );

    this.#endObserver.observe(this.#triggerElemet);
  }

  /**
   * 監視を停止します
   */
  public disconnectObserve() {
    this.#startObserver?.disconnect();
    this.#endObserver?.disconnect();
  }

  /**
   * onceが有効ですべてのコールバックが呼ばれていたら再セットアップはしない
   */
  get #isSetupPrevented(): boolean {
    return (
      this.#isOnce &&
      Boolean(this.#startCallbacks?.isAllCalled) &&
      Boolean(this.#endCallbacks?.isAllCalled)
    );
  }
}
