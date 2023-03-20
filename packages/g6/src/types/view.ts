export interface FitViewRules {
  onlyOutOfViewPort?: boolean; // Whehter fit it only when the graph is out of the view.
  direction?: 'x' | 'y' | 'both'; // Axis to fit.
  ratioRule?: 'max' | 'min'; // Ratio rule to fit.
}

export type GraphAlignment =
  | 'left-top'
  | 'right-top'
  | 'left-bottom'
  | 'right-bottom'
  | 'center'
  | [number, number];

export type GraphTransformOptions = {
  translate?: {
    dx: number;
    dy: number;
  };
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
