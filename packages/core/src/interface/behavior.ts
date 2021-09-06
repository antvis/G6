import { G6Event, IG6GraphEvent, BehaviorOption } from '../types';
import { IAbstractGraph } from './graph';

export interface IBehavior {
  registerBehavior: (type: string, behavior: BehaviorOption) => void;
  hasBehavior: (type: string) => boolean;
  getBehavior: (type: string) => any;
}

export interface IBehaviorOption {
  type: string;
  getEvents: () => {
    [key in G6Event]?: string;
  };
  updateCfg: (cfg: object) => {};
  getDefaultCfg?: () => object;
  shouldBegin?: (e?: IG6GraphEvent) => boolean;
  shouldUpdate?: (e?: IG6GraphEvent) => boolean;
  shouldEnd?: (e?: IG6GraphEvent) => boolean;
  bind?: (e: IAbstractGraph) => void;
  unbind?: (e: IAbstractGraph) => void;
}
