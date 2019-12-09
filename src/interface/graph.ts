import { G6Event } from '../../types'

export interface IGraph {
  on: (event: G6Event, handler: () => void) => void;
  off: (event: G6Event, handler: () => void) => void;
}

