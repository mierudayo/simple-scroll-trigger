import { SimpleScrollTrigger } from "./SimpleScrollTrigger";

const trigger = document.querySelector(".trigger");
if (trigger) {
  new SimpleScrollTrigger({
    trigger,
    onEnter: () => {
      console.log("onEnter");
    },
    startViewPortPoint: { value: 0, unit: "%" },
    startTriggerPoint: { value: 500, unit: "px" },
  });
}
