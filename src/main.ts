import { SimpleScrollTrigger } from "./SimpleScrollTrigger";

const trigger = document.querySelector(".trigger");
if (trigger) {
  new SimpleScrollTrigger({
    trigger,
    onEnter: () => {
      console.log("onEnter");
    },
    startViewPortPoint: 50,
    startTriggerPoint: 0,
  });
}
