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

export type AnchorPosition = [number, number] | 'top' | 'left' | 'right' | 'bottom';

export type BadgePosition = RelativePosition;
export type LabelPosition = RelativePosition;
