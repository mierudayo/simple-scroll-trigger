type Options = {
  trigger: Element;
  onEnter: () => void;
  startViewPortPoint?: number;
  startTriggerPoint?: number;
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
      startViewPortPoint === undefined ? 0 : startViewPortPoint;
    this.startTriggerPoint =
      startTriggerPoint === undefined ? 0 : startTriggerPoint;
    console.log(startTriggerPoint, this.startTriggerPoint);
    this.setupObserver();
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
    const windowHeight = window.innerHeight;
    const targetElementHeight = this.triggerElemet.clientHeight;

    const targetPointFromTop =
      (targetElementHeight * this.startTriggerPoint) / 100;
    const viewPortPointFromTop =
      (windowHeight * (100 - this.startViewPortPoint)) / 100;

    const callback = (entries: IntersectionObserverEntry[]) => {
      console.log(
        entries[0].intersectionRatio,
        entries[0].rootBounds!.y - entries[0].boundingClientRect.y
      );
      // if(entries[0].intersectionRatio > 0.9){
      //   console.log("over 90")
      // }
      if (entries[0].isIntersecting) {
        this.onEnterCallback();
      }
    };

    console.log(
      targetPointFromTop,
      viewPortPointFromTop,
      `${targetPointFromTop + viewPortPointFromTop}px 0px ${-(
        targetPointFromTop + viewPortPointFromTop
      )}px`
    );
    this.observer = new IntersectionObserver(callback, {
      rootMargin: `${targetPointFromTop + viewPortPointFromTop}px 0px ${-(
        targetPointFromTop + viewPortPointFromTop
      )}px`,
      threshold: threshold,
    });

    this.observer.observe(this.triggerElemet);
  }
}
