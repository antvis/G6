export interface FitViewRules {
  /** Whether fit it only when the graph is out of the viewport.  */
  onlyOutOfViewport?: boolean;
  /** Whether zoom the graph only when the graph is larger than the viewport. */
  onlyZoomAtLargerThanViewport?: boolean;
  /** Axis to fit.  */
  direction?: 'x' | 'y' | 'both';
  /** Ratio rule to fit. */
  ratioRule?: 'max' | 'min';
  /** Bounds type. 'render' means calculate the bounds by get rendering bounds. 'layout' for the situation that layout algorithm is done but the positions are not animated rendered. */
  boundsType?: 'render' | 'layout';
}

export type GraphAlignment =
  | 'left-top'
  | 'right-top'
  | 'left-bottom'
  | 'right-bottom'
  | 'center'
  | [number, number];

export type GraphTransformOptions = {
  translate?: Partial<{
    dx: number;
    dy: number;
    dz: number;
    targetX: number;
    targetY: number;
    targetZ: number;
  }>;
  rotate?: {
    angle: number;
  };
  zoom?: {
    ratio: number;
  };
  origin?: {
    x: number;
    y: number;
  };
};
