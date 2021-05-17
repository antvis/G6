# g6-component-alipay

G6 Component for alipay miniapp, it's part of G6Mobile

| 属性名       | 默认值 | 类型     | 是否必传 | 描述                                                                                                      |
| ------------ | ------ | -------- | -------- | --------------------------------------------------------------------------------------------------------- |
| width        | 100    | Number   | 否       | canvas 的宽度，这个值是页面中组件的宽度                                                                   |
| height       | 100    | Number   | 否       | canvas 的高度，这个值是页面中组件的高度                                                                   |
| pixelRatio   | 1      | Number   | 否       | 设备像素比，这个字段很关键！！！不传递绘制的图非高清！！！字段来自 getSystemInfo/getSystemInfoSync        |
| onInit       | 空     | Function | 否       | canvas 初始化完成后返回，会携带相关的信息回来，具体看下方表格                                             |
| onTouchEvent | 空     | Function | 否       | 所有的 touch 事件都来源这里，如果需要 g6 处理事件，都需自行传递，未统一处理的原因为，业务方可能需自行定制 |
| onError      | 空     | Function | 否       | canvas 创建失败的回调                                                                                     |
| style        | 空     | String   | 否       | 就是简单的 css 样式                                                                                       |

onInit 函数的回调

| 参数     | 描述                                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------------- |
| context  | canvas 的 context，由组件创建                                                                            |
| rect     | 组件当前所在的位置                                                                                       |
| canvas   | native canvas 返回的 element                                                                             |
| renderer | 渲染模式，在小程序下，G6Mobile 由两种模式， `mini` 和 `mini-native` 分别对应 web-canvas 和 native-canvas |

# demo

https://github.com/openwayne/g6-component-alipay-demo
