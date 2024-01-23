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
export type CallableValue<Returns, Param = Returns> = Returns | ((args: Param) => Returns);

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
export type CallableObject<Obj extends Record<string, unknown>, Param = never> = {
  [K in keyof Obj]: CallableValue<Obj[K], Param>;
};
