import React from 'react';
import { CommonProps } from '../Group';
import { CommonShapeProps } from './common';

export interface PolygonStyle extends CommonShapeProps {
  /**
   * @description.en-US The points of the polygon x,y
   * @description.zh-CN 组成多边形的点 x, y
   */
  points: [number, number][];
}

interface PolygonProps extends CommonProps {
  /**
   * @description.en-US style of shape
   */
  style: PolygonStyle;
}

const Polygon: React.FC<PolygonProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <div
      data-attr={{
        ...rest,
        type: 'polygon',
      }}
    >
      {children}
    </div>
  );
};

export default Polygon;
