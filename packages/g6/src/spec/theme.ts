import type { BuiltInTheme } from '../themes/types';

/**
 * <zh/> 主题配置项
 *
 * <en/> Theme Options
 * @public
 */
export type ThemeOptions = BuiltInTheme | CustomTheme;

type CustomTheme = string;
