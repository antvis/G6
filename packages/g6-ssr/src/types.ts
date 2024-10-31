import type { GraphOptions } from '@antv/g6';
import { Graph as G6Graph } from '@antv/g6';
import type { PdfConfig, PngConfig } from 'canvas';

export interface Options extends Omit<GraphOptions, 'renderer' | 'container'> {
  width: number;
  height: number;
  /**
   * <zh/> 等待渲染的时间，默认为 16ms
   *
   * <en/> The time to wait for rendering, default is 16ms
   * @defaultValue 16
   */
  waitForRender?: number;
  /**
   * <zh/> 输出文件类型，默认导出为图片
   *
   * <en/> output file type, default export as image
   * @defaultValue 'image'
   */
  outputType?: 'image' | 'pdf' | 'svg';
}

export type MetaData = PdfConfig | PngConfig;

export interface Graph extends G6Graph {
  exportToFile: (file: string, meta?: MetaData) => void;
  toBuffer: (meta?: MetaData) => Buffer;
}
