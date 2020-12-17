import { ShapeStyle, ModelConfig, StateStyles } from '@antv/g6-core';

/* eslint @typescript-eslint/no-use-before-define: 0 */

export type TimeBarType = 'trend' | 'simple' | 'tick';

export type WaterMarkerConfig = Partial<{
  // 水印 canvas 容器的宽高
  width: number;
  height: number;
  compatible: boolean;
  text: {
    x?: number;
    y?: number;
    lineHeight?: number;
    rotate?: number;
    fontSize?: number;
    fontFamily?: string;
    fill?: string;
    baseline?: string;
  };
  image: {
    x?: number;
    y?: number;
    // 图片的宽高
    width?: number;
    height: number;
    rotate?: number;
  };
}>;

export interface TreeGraphData {
  id: string;
  label?: string;
  x?: number;
  y?: number;
  children?: TreeGraphData[];
  data?: ModelConfig;
  side?: 'left' | 'right';
  depth?: number;
  collapsed?: boolean;
  style?:
    | ShapeStyle
    | {
        [key: string]: ShapeStyle;
      };
  stateStyles?: StateStyles;
  [key: string]: unknown;
}
