/**
 * <zh/> 标准扩展配置项
 *
 * <en/> Standard extension options
 */
export interface STDExtensionOption {
  /**
   * <zh/> 扩展类型
   *
   * <en/> Extension type
   */
  type: string;
  /**
   * <zh/> 扩展 key，即唯一标识
   *
   * <en/> Extension key, that is, the unique identifier
   */
  key: string;
  [key: string]: unknown;
}
