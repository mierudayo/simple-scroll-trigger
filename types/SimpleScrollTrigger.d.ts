declare type Options = {
    trigger: Element;
    onEnter?: () => void;
    onLeaveBack?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    startViewPortPoint?: number | PointOption;
    startTriggerPoint?: number | PointOption;
    endViewPortPoint?: number | PointOption;
    endTriggerPoint?: number | PointOption;
};
declare type PointOption = {
    value: number;
    unit: "px" | "%";
};
export declare class SimpleScrollTrigger {
    #private;
    constructor({ trigger, onEnter, onLeaveBack, onLeave, onEnterBack, startViewPortPoint, startTriggerPoint, endViewPortPoint, endTriggerPoint, }: Options);
    /**
     * 監視を停止します
     */
    disconnectObserve(): void;
}
export {};
//# sourceMappingURL=SimpleScrollTrigger.d.ts.map