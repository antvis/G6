import { G6Event } from './event'
export interface IGraph {
  on: (event: G6Event, handler: () => void) => void;
  off: (event: G6Event, handler: () => void) => void;
}