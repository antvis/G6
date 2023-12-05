import React from 'react';
import { CommonProps } from '../Group';
import { CommonShapeProps } from './common';

export interface EllipseStyle extends CommonShapeProps {
  /**
   * @description.en-US The horizontal radius of the ellipse.
   * @description.zh-CN 椭圆的水平半径
   */
  rx: number;
  /**
   * @description.en-US The vertical radius of the ellipse.
   * @description.zh-CN 椭圆的纵向半径
   */
  ry: number;
}

interface EllipseProps extends CommonProps {
  /**
   * @description.en-US style of shape
   */
  style: EllipseStyle;
}

const Ellipse: React.FC<EllipseProps> = (props) => {
  // @ts-ignore
  const { children, ...rest } = props;

  return (
    <div
      data-attr={{
        ...rest,
        type: 'ellipse',
      }}
    >
      {children}
    </div>
  );
};

export default Ellipse;
