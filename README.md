Simple Scroll Trigger はGSAPのScrollTriggerライクな判定指定ができる、シンプルで軽量なスクロール判定ライブラリです。

Intersection Observer APIを利用しているので動作が軽量です。画面をリサイズした時も自動で位置の再計算が行われます。

# NPM Install

```
npm i simple-scroll-trigger
```

# 使い方

```js
// トリガーとする領域の要素
const triggerElement = document.querySelector(".trigger");

new SimpleScrollTrigger({
  // トリガー要素
  trigger: triggerElement,
  // 指定した開始位置に開始判定が上から下へ入ったときに呼ばれる関数
  onEnter: () => {
    console.log("onEnter");
  },
  // 指定した開始位置に開始判定が下から上へ出たときに呼ばれる関数
  onLeaveBack: () => {
    console.log("onLeaveBack");
  },
  // 指定した終了位置に終了判定が上から下へ出たときに呼ばれる関数
  onLeave: () => {
    console.log("onLeave");
  },
  // 指定した終了位置に終了判定が下から上へ入ったときに呼ばれる関数
  onEnterBack: () => {
    console.log("onEnterBack");
  },
  // 開始判定する画面上端からの位置。単位は%もしくはpx。100%とした場合は、画面下端が判定位置です
  startViewPortPoint: { value: 100, unit: "%" },
  // 開始位置の要素上端からの位置。単位は%もしくはpx。50pxとした場合は要素上端から50pxの位置に開始判定がくると発火します
  startTriggerPoint: { value: 50, unit: "px" },
  // 終了判定する画面上端からの位置。単位は%もしくはpx。0%とした場合は、画面上端が判定位置です  
  endViewPortPoint: { value: 0, unit: "%" },
  // 終了位置の要素上端からの位置。単位は%もしくはpx。100%とした場合は要素下端の位置に終了判定がくると発火します
  endTriggerPoint: { value: 100, unit: "%" },
});
```

# License
MIT

# その他
- 縦スクロールのみに対応しています。
- 現在、デバッグ用のマーカー機能はありません。

