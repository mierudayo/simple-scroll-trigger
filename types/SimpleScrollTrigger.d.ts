import { Options } from "./types/Options";
export declare class SimpleScrollTrigger {
    #private;
    constructor({ trigger, onEnter, onLeaveBack, onLeave, onEnterBack, startViewPortPoint, startTriggerPoint, endViewPortPoint, endTriggerPoint, once, initOnEnter, initOnLeave, }: Options);
    /**
     * 監視を停止します
     */
    disconnectObserve(): void;
}
//# sourceMappingURL=SimpleScrollTrigger.d.ts.map