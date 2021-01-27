import React from 'react';
import { CommonProps } from '../Group';
import { Arrow, CommonShapeProps, GPath } from './common';

export interface PathStyle extends CommonShapeProps {
  /**
   * @description.en-US SVG like Path array.
   * @description.zh-CN G使用的SVG路径数组，参考SVG路径
   */
  path: GPath[];
  /**
   * @description.en-US Show the arrow on the start of the path.
   * @description.zh-CN 开头的箭头，可以设置SVG路径字符串
   */
  startArrow?: Arrow;
  /**
   * @description.en-US Show the arrow on the end of the path.
   * @description.zh-CN 结尾的箭头，可以设置SVG路径字符串
   */
  endArrow?: Arrow;
  /**
   * @description.en-US The hitting area of the path. Enlarge the hitting area by enlarging its value.
   * @description.zh-CN 路径响应事件宽度。
   */
  lineAppendWidth?: number;
  /**
   * @description.en-US The style of two ends of the path.
   * @description.zh-CN 两端路径结尾链接方式
   * @default 'miter'
   */
  lineCap?: 'bevel' | 'round' | 'miter';
  /**
   * @description.en-US The style of the intersection of two path.
   * @description.zh-CN 路径交叉的连接方式
   * @default 'miter'
   */
  lineJoin?: 'bevel' | 'round' | 'miter';
  /**
   * @description.en-US The maximum miter length.
   * @description.zh-CN 结合最大长度
   */
  miterLimit?: number;
}

interface PathProps extends CommonProps {
  /**
   * @description.en-US style of shape
   */
  style: PathStyle;
}

const Path: React.FC<PathProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <div
      data-attr={{
        ...rest,
        type: 'path',
      }}
    >
      {children}
    </div>
  );
};

export default Path;
