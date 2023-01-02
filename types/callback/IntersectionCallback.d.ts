declare type Callback = (() => void) | undefined;
declare type Constructor = {
    forwardCallback: Callback;
    backCallback: Callback;
    isOnce: boolean;
};
/**
 * Intersection Observerのコールバック関数を作成します
 */
export declare class IntersectionCallback {
    #private;
    constructor({ forwardCallback, backCallback, isOnce }: Constructor);
    get callback(): (entries: IntersectionObserverEntry[]) => void;
    get isAllCalled(): boolean;
}
export {};
//# sourceMappingURL=IntersectionCallback.d.ts.map