export class SimpleScrollTrigger {
  constructor(trigger: HTMLElement, onEnter: () => void) {
    this.triggerElemet = trigger;
    this.observer.observe(this.triggerElemet);
    this.onEnterCallback = onEnter;
  }
  private triggerElemet: HTMLElement;

  private onEnterCallback: () => void;

  private callback(entries: IntersectionObserverEntry[]) {
    console.log(entries);
  }

  observer = new IntersectionObserver(this.callback, {
    rootMargin: "",
    threshold: 0,
  });
}
