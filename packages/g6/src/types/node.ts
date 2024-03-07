import type { DisplayObject, CircleStyleProps as GCircleStyleProps } from '@antv/g';
import type { Placement } from './placement';

export type PortPosition = [number, number] | 'top' | 'left' | 'right' | 'bottom';
export type StarPortPosition = [number, number] | 'top' | 'left' | 'right' | 'left-bottom' | 'right-bottom';
export type TrianglePortPosition = [number, number] | 'top' | 'left' | 'right' | 'bottom';

export type BadgePosition = Placement;
export type LabelPosition = Placement;

export type PortStyleProps = GCircleStyleProps & {
  /**
   * <zh/> 是否连接到中心
   * <en/> Whether to connect to the center
   */
  linkToCenter?: boolean;
};
export type Port = DisplayObject<PortStyleProps>;
