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
export type StarPortPosition = 'top' | 'left' | 'right' | 'left-bottom' | 'right-bottom';
export type TrianglePortPosition = 'top' | 'left' | 'right' | 'bottom';

export type BadgePosition = RelativePosition;
export type LabelPosition = RelativePosition;
