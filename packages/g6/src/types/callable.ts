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
export type CallableValue<R, P = R> = R | ((args: P) => R);

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
export type CallableObject<O extends Record<string, unknown>, P = never> = {
  [K in keyof O]: CallableValue<O[K], P>;
};
