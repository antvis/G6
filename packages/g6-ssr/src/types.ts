import type { GraphOptions } from '@antv/g6';
import { Graph as G6Graph } from '@antv/g6';

export interface Options extends Omit<GraphOptions, 'renderer' | 'container'> {
  width: number;
  height: number;
  /**
   * <zh/> 输出文件类型，默认导出为图片
   *
   * <en/> output file type, default export as image
   * @defaultValue 'image'
   */
  outputType?: 'image' | 'pdf' | 'svg';
}

export interface Graph extends G6Graph {
  exportToFile: (file: string) => void;
  toBuffer: () => Buffer;
}
