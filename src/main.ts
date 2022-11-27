import { SimpleScrollTrigger } from "./SimpleScrollTrigger";

const trigger = document.querySelector(".trigger");
if(trigger){
  new SimpleScrollTrigger(trigger,()=>{console.log("onEnter")})
}
