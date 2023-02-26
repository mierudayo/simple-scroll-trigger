import { Callback, InitOnCallOption } from "../types/Options";
declare type Arg = {
    forwardCallback: Callback;
    backCallback: Callback;
    isOnce: boolean;
    initCall?: InitOnCallOption | boolean;
    endViewPortPx?: number;
    endTargetPx?: number;
    lastEndCalled?: "onLeave" | "onEnterBack" | null;
};
/**
 * Intersection Observerのコールバック関数を作成します
 */
export declare const useIntersectionCallback: ({ forwardCallback, backCallback, isOnce, initCall, endViewPortPx, endTargetPx, lastEndCalled, }: Arg) => {
    callback: (entries: IntersectionObserverEntry[]) => void;
    isAllCalled: () => boolean;
    getLastCalled: () => "forward" | "back" | null;
};
export {};
//# sourceMappingURL=IntersectionCallback.d.ts.map