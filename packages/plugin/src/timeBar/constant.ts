import { ShapeStyle } from '@antv/g6-core';

export const TIMELINE_START = 'timebarstartplay';
export const TIMELINE_END = 'timebarendplay';

export const VALUE_CHANGE = 'valuechange';

export const TIMEBAR_CONFIG_CHANGE = 'timebarConfigChanged';

export const PLAY_PAUSE_BTN = 'playPauseBtn';
export const NEXT_STEP_BTN = 'nextStepBtn';
export const PRE_STEP_BTN = 'preStepBtn';

export interface ExtendedShapeStyle extends ShapeStyle {
  scale?: number;
  offsetX?: number;
  offsetY?: number;
}
