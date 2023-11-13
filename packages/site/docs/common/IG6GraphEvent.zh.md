---

```ts
type IG6GraphEvent = {
  /** 事件发生在哪一类元素上，`undefined` 表示发生在画布空白处 */
  itemType: 'node' | 'edge' | 'combo' | 'canvas';
  /** 事件发生在的元素的 id，发生在画布空白处则为 `undefined` */
  itemId: ID;
  /** 事件发生在的图形 */
  target: Shape;
  /** 键盘事件中，被按下或抬起的键盘 key */
  key: string;
  /** 事件发生时画布上的绘制坐标 */
  canvas: { x: number; y: number; z: number };
  /** 事件发生时视窗 DOM 上的坐标 */
  viewport: { x: number; y: number; z: number };
  /** 事件发生时浏览器上的坐标 */
  client: { x: number; y: number; z: number };
  /** 阻止浏览器默认事件 */
  preventDefault: () => void;
};
```
