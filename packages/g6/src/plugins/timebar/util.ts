export type Datum = Record<string, any>;

/**
 * <zh> 水平方向的位置转化为 timebar 外部 dom 对应样式.
 *
 * <en> The horizontal position is converted to a timebar external dom corresponding style.
 * @param position 'bottom' | 'top'
 * @param bound [number, number]
 * @returns string
 */
export function parseLevelPositionToStyle(position: 'bottom' | 'top', bound: [number, number]) {
  let style = 'position:relative;';

  if (position === 'top') {
    style += `top:0;`;
  } else {
    style += `bottom:-${bound[1]}px;`;
  }

  return style;
}

/**
 * <zh> 从对象中获取 keys 数组中的任意一个key的值
 *
 * <en> Gets the value of any key in the keys array from the object.
 * @param datum Datum
 * @param optionsKeys string[]
 * @param defaultValue any
 * @returns any
 */
export function tryToGet<T = any>(datum: Datum, optionsKeys: string[], defaultValue?: T): T | undefined {
  for (let i = 0; i < optionsKeys.length; i++) {
    const key = optionsKeys[i];
    const val = datum?.[key] as T;
    if (val) return val;
  }
  return defaultValue;
}
