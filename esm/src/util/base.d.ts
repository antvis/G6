import { G6GraphEvent } from '@g6/interface/behavior';
import { IG6GraphEvent, Padding } from '@g6/types';
/**
 * turn padding into [top, right, bottom, right]
 * @param  {Number|Array} padding input padding
 * @return {array} output
 */
export declare const formatPadding: (padding: Padding) => number[];
/**
 * clone event
 * @param e
 */
export declare const cloneEvent: (e: IG6GraphEvent) => G6GraphEvent;
