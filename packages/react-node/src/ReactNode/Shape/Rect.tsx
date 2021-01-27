import React from 'react';
import { CommonProps } from '../Group';
import { CommonShapeProps } from './common';

export interface RectStyle extends CommonShapeProps {
  /**
   * @description.en-US The radius of the rect corner.
   * @description.zh-CN 矩形圆角
   */
  radius?: number | number[];
  /**
   * @description.en-US The width of the rect.
   * @description.zh-CN 矩形宽度
   */
  width?: number | 'auto';
  /**
   * @description.en-US The height of the rect.
   * @description.zh-CN 矩形高度
   */
  height?: number | 'auto';
}

interface RectProps extends CommonProps {
  /**
   * @description.en-US style of shape
   */
  style: RectStyle;
}

const Rect: React.FC<RectProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <div
      data-attr={{
        ...rest,
        type: 'rect',
      }}
    >
      {children}
    </div>
  );
};

export default Rect;
