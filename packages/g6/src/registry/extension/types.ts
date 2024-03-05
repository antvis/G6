type ExtensionMetaOptions = {
  type: string;
  key: string;
};

type CustomExtensionOptions = Record<string, any>;

/**
 * <zh/> 扩展配置项
 *
 * <en/> Extension options
 */
export type ExtensionOptions<Registry extends CustomExtensionOptions = CustomExtensionOptions> = ExtensionOption<
  Registry | LooselyExtensionOption
>[];

/**
 * <zh/> 扩展配置项
 *
 * <en/> Extension option
 */
type ExtensionOption<Registry extends CustomExtensionOptions> = AbbrExtensionOption<LooselyExtensionOption<Registry>>;

/**
 * <zh/> 标准扩展配置项
 *
 * <en/> Standard extension options
 */
export type STDExtensionOption<Registry extends CustomExtensionOptions = CustomExtensionOptions> =
  ExtensionMetaOptions & Registry;

/**
 * <zh/> 宽松的扩展配置项，可以不传入 key
 *
 * <en/> Loosely extension option, key can be omitted
 */
export type LooselyExtensionOption<Registry extends CustomExtensionOptions = CustomExtensionOptions> =
  Partial<ExtensionMetaOptions> & Registry;

/**
 * <zh/> 扩展配置项简写，支持直接传入 type 字符串
 *
 * <en/> Extension option abbreviation, support directly passing in type string
 */
type AbbrExtensionOption<S extends LooselyExtensionOption> = S | S['type'];
