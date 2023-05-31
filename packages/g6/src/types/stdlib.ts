import { BehaviorRegistry } from './behavior';
import { ThemeRegistry } from './theme';

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
  behaviors?: BehaviorRegistry;
  themes?: ThemeRegistry;
  // TODO: type templates
  transforms?: Record<string, unknown>;
  layouts?: Record<string, unknown>;
  nodes?: Record<string, unknown>;
  edges?: Record<string, unknown>;
  combos?: Record<string, unknown>;
  plugins?: Record<string, unknown>;
}
