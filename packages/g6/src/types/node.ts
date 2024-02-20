import type { DisplayObject, CircleStyleProps as GCircleStyleProps } from '@antv/g';

export type RelativePosition =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'right'
  | 'right-top'
  | 'right-bottom'
  | 'center';

export type PortPosition = [number, number] | 'top' | 'left' | 'right' | 'bottom';
export type StarPortPosition = [number, number] | 'top' | 'left' | 'right' | 'left-bottom' | 'right-bottom';
export type TrianglePortPosition = [number, number] | 'top' | 'left' | 'right' | 'bottom';

export type BadgePosition = RelativePosition;
export type LabelPosition = RelativePosition;

export type PortStyleProps = GCircleStyleProps & {
  /**
   * <zh/> 是否连接到中心
   * <en/> Whether to connect to the center
   */
  linkToCenter?: boolean;
};
export type Port = DisplayObject<PortStyleProps>;
