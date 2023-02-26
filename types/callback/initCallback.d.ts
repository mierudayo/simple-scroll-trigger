import { Callback, InitOnCallOption } from "../types/Options";
import { Data } from "../utils/data";
declare type Arg = {
    entries: IntersectionObserverEntry[];
    forwardCallback: Callback;
    initCall: boolean | InitOnCallOption | undefined;
    endViewPortPx?: number;
    endTargetPx?: number;
    isOnce: boolean;
    isEntered: Data<boolean>;
    isForwardCalled: Data<boolean>;
    lastCalled: Data<"forward" | "back" | null>;
    lastEndCalled?: "onLeave" | "onEnterBack" | null;
};
/**
 * 初期読み込み時のコールバック処理
 */
export declare const initCallback: ({ entries, forwardCallback, initCall: initOnEnter, endViewPortPx, endTargetPx, isOnce, isEntered, isForwardCalled, lastCalled, lastEndCalled, }: Arg) => void;
export {};
//# sourceMappingURL=initCallback.d.ts.map