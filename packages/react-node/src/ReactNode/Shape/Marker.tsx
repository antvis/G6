import React from 'react';
import { CommonProps } from '../Group';
import { CommonShapeProps, GPath } from './common';

export interface MarkerStyle extends CommonShapeProps {
  /**
   * @description.en-US The radius of the marker.
   * @description.zh-CN 标记的半径
   */
  r: number;
  /**
   * @description.en-US Built-in shapes or function return path array;
   * @description.zh-CN 内建标记 或者 生成标记路径的函数
   */
  symbol:
    | 'circle'
    | 'square'
    | 'diamond'
    | 'triangle'
    | 'triangle-down'
    | ((x: number, y: number, r: number) => GPath[]);
}

interface MarkerProps extends CommonProps {
  /**
   * @description.en-US style of shape
   */
  style: MarkerStyle;
}

const Marker: React.FC<MarkerProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <div
      data-attr={{
        ...rest,
        type: 'marker',
      }}
    >
      {children}
    </div>
  );
};

export default Marker;
