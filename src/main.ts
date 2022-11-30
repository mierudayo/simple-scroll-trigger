import { SimpleScrollTrigger } from "./SimpleScrollTrigger";

const trigger = document.querySelector(".trigger");
if (trigger) {
  new SimpleScrollTrigger({
    trigger,
    onEnter: () => {
      console.log("onEnter");
    },
    onLeaveBack: () => {
      console.log("onLeaveBack");
    },
    startViewPortPoint: { value: 0, unit: "%" },
    startTriggerPoint: { value: 0, unit: "px" },
  });
}
