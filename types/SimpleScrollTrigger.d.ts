/**
 * 設定内容
 */
declare type Options = {
    /** 交差対象の要素です */
    trigger: Element | null;
    /** 入ったときに呼ばれる関数です */
    onEnter?: () => void;
    /** 出戻ったときに呼ばれる関数です */
    onLeaveBack?: () => void;
    /** 通過したときに呼ばれる関数です */
    onLeave?: () => void;
    /** 入り戻ったときに呼ばれる関数です */
    onEnterBack?: () => void;
    /** start判定基準となる画面上端からの距離です */
    startViewPortPoint?: number | PointOption;
    /** start判定基準となる要素上端からの距離です */
    startTriggerPoint?: number | PointOption;
    /** end判定基準となる画面上端からの距離です */
    endViewPortPoint?: number | PointOption;
    /** start判定基準となる要素上端からの距離です */
    endTriggerPoint?: number | PointOption;
};
/**
 * 距離指定のオプションです
 */
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