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
    onLeave: () => {
      console.log("onLeave");
    },
    onEnterBack: () => {
      console.log("onEnterBack");
    },
    startViewPortPoint: { value: 100, unit: "%" },
    startTriggerPoint: { value: 500, unit: "px" },
    endViewPortPoint: { value: 100, unit: "%" },
    endTriggerPoint: { value: 100, unit: "%" },
  });
}
