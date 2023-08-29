export enum LOOP_POSITION {
  'top' = 'top',
  'top-right' = 'top-right',
  'right' = 'right',
  'bottom-right' = 'bottom-right',
  'bottom' = 'bottom',
  'bottom-left' = 'bottom-left',
  'left' = 'left',
  'top-left' = 'top-left',
}

export type LoopPosition = `${LOOP_POSITION}`;

export type LoopCfg = {
  /** Specifies the relative position of the self-loop to the node. Default: top. */
  position?: LoopPosition;
  /** Determine the position from the edge of the node keyShape to the top of the self-loop, used to specify the curvature of the self-loop, the default is the height. */
  dist?: number;
  /** Specify whether to draw the ring clockwise. Default: true */
  clockwise?: boolean;
  /** For non-circular nodes, the offset between the connection point and the center coordinates of the node (top-right, bottom-right, top-left, bottom-left are special, which are four corner coordinates) in the x-axis or y-axis direction, The default is 1/4 of the minimum value of node width and high. */
  pointPadding?: number;
};
