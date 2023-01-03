export interface FitViewRules {
  onlyOutOfViewPort?: boolean; // whehter fit it only when the graph is out of the view
  direction?: 'x' | 'y' | 'both'; // axis to fit
  ratioRule?: 'max' | 'min'; // ratio rule to fit
}

export type GraphAlignment = 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' | 'center' | [number, number];