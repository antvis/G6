/**
 * <zh/> 可回调值
 *
 * <en/> Callable value
 * @example
 * type Prop = number;
 * type CallableProp = Callable<Prop>;
 * const prop1: CallableProp = 1;
 * const prop2: CallableProp = (value) => value;
 */
export type CallableValue<Returns, Params extends unknown[] = [Returns]> = Returns | ((...args: Params) => Returns);

/**
 * <zh/> 可回调对象
 *
 * <en/> Callable object
 * @example
 * type Style = {
 *  fill?: string;
 * }
 * type CallableObjectStyle = CallableObject<Style, { model: { value: string } }>;
 * const style1: CallableObjectStyle = {
 *  fill: 'red',
 * }
 * const style2: CallableObjectStyle = {
 *  fill: ({ model }) => model.value,
 * }
 */
export type CallableObject<Obj extends Record<string, unknown>, Params extends unknown[] = unknown[]> = {
  [K in keyof Obj]: CallableValue<Obj[K], Params>;
};
