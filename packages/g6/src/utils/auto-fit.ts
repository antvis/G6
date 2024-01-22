import type { AutoFit, STDAutoFit } from '../spec/viewport';

/**
 * <zh/> 解析自适应规则配置
 *
 * <en/> parse auto fit rules
 * @param autoFit - <zh/> 自适应规则配置 | <en/> auto fit rules
 * @returns <zh/> 标准自适应规则配置 | <en/> standard auto fit rules
 */
export function parseAutoFit(autoFit?: AutoFit): STDAutoFit {
  if (!autoFit) return undefined;
  return typeof autoFit === 'string' ? { type: autoFit } : autoFit;
}
