import React from 'react';
import { CommonProps } from '../Group';
import { CommonShapeProps } from './common';

export interface ImageStyle extends CommonShapeProps {
  /**
   * @description.en-US The width of the image.
   * @description.zh-CN 图片宽度
   */
  width?: number;
  /**
   * @description.en-US The height of the image.
   * @description.zh-CN 图片高度
   */
  height?: number;
  /**
   * @description.en-US The img source of the image.
   * @description.zh-CN 图片数据源
   */
  img: string | ImageData | CanvasImageData;
}

interface ImageProps extends CommonProps {
  /**
   * @description.en-US style of shape
   */
  style: ImageStyle;
}

const Image: React.FC<ImageProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <div
      data-attr={{
        ...rest,
        type: 'image',
      }}
    >
      {children}
    </div>
  );
};

export default Image;
