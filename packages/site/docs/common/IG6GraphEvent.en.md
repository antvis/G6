## IG6GraphEvent

| Name             | Type                                    | Description                                                                                                     |
| :--------------- | :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `itemType`       | `'node'\| 'edge'\| 'combo' \| 'canvas'` | The event occurs on which type of element; `undefined` indicates it occurs on a blank part of the canvas        |
| `itemId`         | `ID`                                    | The id of the element where the event occurs; if it occurs on a blank part of the canvas, then it's `undefined` |
| `target`         | `Shape`                                 | The graph where the event occurs 形                                                                             |
| `key`            | `string`                                | In keyboard events, the key that is pressed or released key                                                     |
| `canvas`         | `{ x: number, y: number, z: number}`    | The drawing coordinates on the canvas at the time of the event                                                  |
| `viewport`       | `{ x: number, y: number, z: number}`    | The coordinates on the window DOM at the time of the event                                                      |
| `clieant`        | `{ x: number, y: number, z: number}`    | The coordinates on the browser at the time of the event                                                         |
| `preventDefault` | `() => void`                            | Prevents the browser's default event from occurring                                                             |
