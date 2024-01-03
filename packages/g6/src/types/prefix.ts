export type PrefixKey<P extends string = string, K extends string = string> = `${P}${Capitalize<K>}`;

export type PrefixObject<T extends object, P extends string> = {
  [K in keyof T as K extends string ? PrefixKey<P, K> : never]?: T[K];
};

export type ReplacePrefix<T, OldPrefix extends string, NewPrefix extends string> = {
  [K in keyof T as K extends `${OldPrefix}${infer Rest}` ? `${NewPrefix}${Rest}` : K]: T[K];
};
