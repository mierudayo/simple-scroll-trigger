import { SimpleScrollTrigger } from "../src/SimpleScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  const triggerElement = document.querySelector(".trigger");

  const textElement = document.querySelector(".callbackText");
  if (!textElement) {
    return;
  }
  new SimpleScrollTrigger({
    trigger: triggerElement,
    onEnter: () => {
      console.log("onEnter");
      textElement.textContent = "onEnter";
    },
    onLeaveBack: () => {
      console.log("onLeaveBack");
      textElement.textContent = "onLeaveBack";
    },
    onLeave: () => {
      console.log("onLeave");
      textElement.textContent = "onLeave";
    },
    onEnterBack: () => {
      console.log("onEnterBack");
      textElement.textContent = "onEnterBack";
    },
    startViewPortPoint: { value: 90, unit: "%" },
    startTriggerPoint: { value: 200, unit: "px" },
    // endViewPortPoint: { value: 50, unit: "%" },
    // endTriggerPoint: { value: 100, unit: "%" },
    // once: true,
  });
});
