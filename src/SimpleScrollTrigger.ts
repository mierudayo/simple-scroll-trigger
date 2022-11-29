type Options = {
  trigger: Element;
  onEnter: () => void;
  startViewPortPoint?: number | PointOption;
  startTriggerPoint?: number | PointOption;
};

type PointOption = {
  value: number;
  unit: "px" | "%";
};
export class SimpleScrollTrigger {
  private triggerElemet: Element;

  private onEnterCallback: () => void;

  private observer: IntersectionObserver | null = null;

  private startViewPortPoint: number;

  private startTriggerPoint: number;

  constructor({
    trigger,
    onEnter,
    startViewPortPoint,
    startTriggerPoint,
  }: Options) {
    this.triggerElemet = trigger;
    this.onEnterCallback = onEnter;

    this.startViewPortPoint =
      this._convertPxViewPortPointOption(startViewPortPoint);
    this.startTriggerPoint = this._convertPxTargetointOption(startTriggerPoint);
    console.log(startTriggerPoint, this.startTriggerPoint);
    this.setupObserver();
  }

  private _convertPxViewPortPointOption(
    arg: number | PointOption | undefined
  ): number {
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

  private _convertPxTargetointOption(arg: number | PointOption | undefined) {
    const targetElementHeight = this.triggerElemet.clientHeight;
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

  private setupObserver() {
    // 閾値の配列作成
    const threshold = [0, 1];
    // for (let i = 1; i < 100; i++) {
    //   threshold.push(i / 100);
    // }
    // for (let i = 1; i < 10; i++) {
    //   threshold.push(0.99 + i / 1000);
    // }
    const callback = (entries: IntersectionObserverEntry[]) => {
      console.log(
        entries[0].intersectionRatio,
        entries[0].rootBounds!.y - entries[0].boundingClientRect.y
      );
      if (entries[0].isIntersecting) {
        this.onEnterCallback();
      }
    };

    console.log(
      `${this.startTriggerPoint + this.startViewPortPoint}px 0px ${-(
        this.startTriggerPoint + this.startViewPortPoint
      )}px`
    );
    this.observer = new IntersectionObserver(callback, {
      rootMargin: `${
        this.startTriggerPoint + this.startViewPortPoint
      }px 0px ${-(this.startTriggerPoint + this.startViewPortPoint)}px`,
      threshold: threshold,
    });

    this.observer.observe(this.triggerElemet);
  }
}
