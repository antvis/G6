/**
 * <zh/> 模块配置项
 *
 * <en/> Module options
 */
export type ModuleOptions<Registry extends Record<string, unknown> = Record<string, unknown>> = ModuleOption<
  Registry | LooselyModuleOption
>[];

/**
 * <zh/> 模块配置项
 *
 * <en/> Module option
 */
type ModuleOption<Registry extends Record<string, unknown> = Record<string, unknown>> = AbbrModuleOption<
  LooselyModuleOption<Registry>
>;

/**
 * <zh/> 标准模块配置项
 *
 * <en/> Standard module options
 */
export type STDModuleOption<Registry extends Record<string, unknown> = Record<string, unknown>> = {
  type: string;
  key: string;
} & Registry;

/**
 * <zh/> 宽松的模块配置项，可以不传入 key
 *
 * <en/> Loosely module option, key can be omitted
 */
export type LooselyModuleOption<Registry extends Record<string, unknown> = Record<string, unknown>> = {
  type: string;
  key?: string;
} & Registry;

/**
 * <zh/> 模块配置项简写，支持直接传入 type 字符串
 *
 * <en/> Module option abbreviation, support directly passing in type string
 */
type AbbrModuleOption<S extends LooselyModuleOption> = (S & { key?: string }) | S['type'];
