export class SimpleScrollTrigger {
  constructor(trigger: Element, onEnter: () => void) {
    this.triggerElemet = trigger;
    this.observer.observe(this.triggerElemet);
    this.onEnterCallback = onEnter;
  }
  private triggerElemet: Element;

  private onEnterCallback: () => void;

  private callback(entries: IntersectionObserverEntry[]) {
    console.log(entries);
  }

  observer = new IntersectionObserver(this.callback, {
    rootMargin: "",
    threshold: [0,0.01,0.02,0.03,0.04,0.05,0.1,0.2,],
  });
}
