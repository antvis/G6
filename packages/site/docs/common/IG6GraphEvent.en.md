<details>
  <summary style="color: #873bf4; cursor: pointer;">
    IG6GraphEvent
  </summary>
  
```ts
type IG6GraphEvent = {
  /** The event occurs on which type of element; `undefined` indicates it occurs on a blank part of the canvas */
  itemType: 'node' | 'edge' | 'combo' | 'canvas';
  /** The id of the element where the event occurs; if it occurs on a blank part of the canvas, then it's `undefined` */
  itemId: ID;
  /** The graph where the event occurs */
  target: Shape;
  /** In keyboard events, the key that is pressed or released key */
  key: string;
  /** The drawing coordinates on the canvas at the time of the event */
  canvas: { x: number; y: number; z: number };
  /** The coordinates on the window DOM at the time of the event */
  viewport: { x: number; y: number; z: number };
  /** The coordinates on the browser at the time of the event */
  client: { x: number; y: number; z: number };
  /** Prevents the browser's default event from occurring */
  preventDefault: () => void;
};
```
</details>