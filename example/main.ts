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
    startViewPortPoint: { value: 10, unit: "%",from:"bottom" },
    startTriggerPoint: { value: 800, unit: "px", from: "bottom" },
    endViewPortPoint: { value: 50, unit: "%", from: "top" },
    endTriggerPoint: { value: 90, unit: "%" },
    once: false,
    initOnEnter: { range: "end" },
    initOnLeave: true,
  });
});
