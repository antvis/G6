import React from 'react';
import { CommonProps } from '../Group';
import { CommonShapeProps } from './common';
import type { Properties as CSSProperties } from 'csstype';

export interface TextStyle extends CommonShapeProps {
  /**
   * @description.en-US text align way, affect relative position of x
   * @description.zh-CN 对齐方式，对齐的点为文字x的点
   */
  textAlign?: 'center' | 'end' | 'left' | 'right' | 'start';
  /**
   * @description.en-US text baseline, affect relative position of y
   * @description.zh-CN 文字基线，基线在y坐标上
   */
  textBaseline?: 'top' | 'middle' | 'bottom' | 'alphabetic' | 'hanging';
  /**
   * @description.en-US CSS font-style
   * @description.zh-CN CSS font-style
   */
  fontStyle?: CSSProperties['fontStyle'];
  /**
   * @description.en-US CSS font-weight
   * @description.zh-CN CSS font-weight
   */
  fontWeight?: CSSProperties['fontWeight'];
  /**
   * @description.en-US CSS font-variant
   * @description.zh-CN CSS font-variant
   */
  fontVariant?: CSSProperties['fontVariant'];
  /**
   * @description.en-US CSS font-size
   * @description.zh-CN CSS font-size
   */ fontSize?: CSSProperties['fontSize'];
  /**
   * @description.en-US CSS font-family
   * @description.zh-CN CSS font-family
   */
  fontFamily?: CSSProperties['fontFamily'];
  /**
   * @description.en-US CSS line-height
   * @description.zh-CN CSS line-height
   */
  lineHeight?: CSSProperties['lineHeight'];
}

interface TextProps extends CommonProps {
  /**
   * @description.en-US style of shape
   */
  style?: TextStyle;
}

const Text: React.FC<TextProps> = (props) => {
  // @ts-ignore
  const { children, ...rest } = props;

  return (
    <div
      data-attr={{
        ...rest,
        type: 'text',
      }}
    >
      {children}
    </div>
  );
};

export default Text;
