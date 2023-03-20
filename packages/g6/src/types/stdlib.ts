import { BehaviorRegistry } from "./behavior";

export type StdLibCategory = 'transform' | 'behavior' | 'layout' | 'node' | 'edge' | 'combo' | 'theme' | 'themeSolver' | 'plugin';

export interface Lib {
  transforms?: object,
  behaviors?: BehaviorRegistry,
  layouts?: object,
  nodes?: object,
  edges?: object,
  combos?: object,
  themes?: object,
  plugins?: object,
}