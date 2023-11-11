## IG6GraphEvent

| Name             | Type                                    | Description                                              |
| :--------------- | :-------------------------------------- | :------------------------------------------------------- |
| `itemType`       | `'node'\| 'edge'\| 'combo' \| 'canvas'` | 事件发生在哪一类元素上，`undefined` 表示发生在画布空白处 |
| `itemId`         | `ID`                                    | 事件发生在的元素的 id，发生在画布空白处则为 `undefined`  |
| `target`         | `Shape`                                 | 事件发生在的图形                                         |
| `key`            | `string`                                | 键盘事件中，被按下或抬起的键盘 key                       |
| `canvas`         | `{ x: number, y: number, z: number}`    | 事件发生时画布上的绘制坐标                               |
| `viewport`       | `{ x: number, y: number, z: number}`    | 事件发生时视窗 DOM 上的坐标                              |
| `clieant`        | `{ x: number, y: number, z: number}`    | 事件发生时浏览器上的坐标                                 |
| `preventDefault` | `() => void`                            | 阻止浏览器默认事件的发生                                 |
