/**
 * @fileoverview constants for layout
 * @author changzhe.zb@antfin.com
 */
// layout message type
const LAYOUT_MESSAGE = {
  // run layout
  RUN: 'LAYOUT_RUN',
  // layout ended with success
  END: 'LAYOUT_END',
  // layout error
  ERROR: 'LAYOUT_ERROR',
  // layout tick, used in force directed layout
  TICK: 'LAYOUT_TICK'
};

module.exports = {
  LAYOUT_MESSAGE
};
