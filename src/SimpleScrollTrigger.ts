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

  setupObserver() {
    // 閾値の配列作成
    const threshold = [0];
    for (let i = 1; i < 100; i++) {
      threshold.push(i / 100);
    }

    const windowHeight = window.innerHeight;
    const targetElementHeight = this.triggerElemet.clientHeight;

    const heightDiff = targetElementHeight - windowHeight;
    const bottomMargin =
      -(windowHeight * (100 - this.startViewPortPoint)) / 100;

    const callback = (entries: IntersectionObserverEntry[]) => {
      console.log(entries[0].intersectionRatio);
      if (
        entries[0].isIntersecting &&
        entries[0].intersectionRatio >= this.startTriggerPoint / 100
      ) {
        this.onEnterCallback();
      }
    };

    console.log(`${heightDiff - bottomMargin}px 0px ${bottomMargin}px`);
    this.observer = new IntersectionObserver(callback, {
      rootMargin: `${heightDiff - bottomMargin}px 0px ${bottomMargin}px`,
      threshold: threshold,
    });

    this.observer.observe(this.triggerElemet);
  }
}
