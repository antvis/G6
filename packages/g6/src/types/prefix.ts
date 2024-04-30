export type PrefixKey<P extends string = string, K extends string = string> = `${P}${Capitalize<K>}`;

/**
 * @remarks
 * <zh/> `Prefix<P, T>` 是一种类型模式，用于将特定的前缀 `P` 应用到类型 `T` 上。在我们的配置中，这意味着我们将为一组属性或行为添加一个前缀，以表示它们属于某个具体的上下文或分类。
 *
 * <zh/> 当你在文档中看到类似 `Prefix<'label', StyleProps>` 的表达式，它表示给 `StyleProps` 类型的属性加上 `label` 前缀，以形成新的属性名称。例如，`color` 属性将以 `labelColor` 形式使用。
 *
 * <en/> `Prefix<P, T>` is a type pattern used to apply a specific prefix `P` to the type `T`. In our configuration, this means adding a prefix to a set of properties or behaviors to indicate that they belong to a specific context or category.
 *
 * <en/> When you see expressions like `Prefix<'label', StyleProps>` in the document, it means adding the `label` prefix to the properties of the `StyleProps` type to form a new property name. For example, the `color` property will be used in the form of `labelColor`.
 */
export type Prefix<P extends string, T extends object> = {
  [K in keyof T as K extends string ? PrefixKey<P, K> : never]?: T[K];
};

export type ReplacePrefix<T, OldPrefix extends string, NewPrefix extends string> = {
  [K in keyof T as K extends `${OldPrefix}${infer Rest}` ? `${NewPrefix}${Rest}` : K]: T[K];
};
