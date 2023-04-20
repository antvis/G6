import { BehaviorRegistry } from './behavior';

export type StdLibCategory =
  | 'transform'
  | 'behavior'
  | 'layout'
  | 'node'
  | 'edge'
  | 'combo'
  | 'theme'
  | 'themeSolver'
  | 'plugin';

export interface Lib {
  transforms?: Record<string, unknown>;
  behaviors?: BehaviorRegistry;
  layouts?: Record<string, unknown>;
  nodes?: Record<string, unknown>;
  edges?: Record<string, unknown>;
  combos?: Record<string, unknown>;
  themes?: Record<string, unknown>;
  plugins?: Record<string, unknown>;
}
