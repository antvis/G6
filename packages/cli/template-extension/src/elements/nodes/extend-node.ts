import type { CircleStyleProps } from '@antv/g6';
import { Circle } from '@antv/g6';

export interface ExtendNodeStyleProps extends CircleStyleProps {}

export class ExtendNode extends Circle {}
