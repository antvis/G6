export type CardinalPlacement = 'left' | 'right' | 'top' | 'bottom';

export type CornerPlacement =
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type RelativePlacement = [number, number];

export type DirectionalPlacement = CardinalPlacement | CornerPlacement | 'center';

export type Placement = RelativePlacement | DirectionalPlacement;
