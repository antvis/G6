/**
 * @fileOverview mode
 * @author wuyue.lwy <wyueliu@gmail.com>
 */

const Mode = function() {};
Mode.CFG = {
  /**
    * mode list  key - value, key - mode name, value - behaviors
    * @type {object}
    */
  modes: {
    default: []
  },

  /**
    * current mode name
    * @type {string}
    */
  mode: 'default',
  // event cache
  _eventCache: {}
};

Mode.INIT = '_initModes';
Mode.AUGMENT = {
  _initModes() {
    const mode = this.get('mode');
    this.changeMode(mode);
  },
  /**
    * change mode
    * @param {string} modeName - name of mode
    */
  changeMode() {},
  /**
    * add behavior to the current mode
    * @param {Array | String} behaviour - add a behaviour or a list behaviours to the mode
    * @param {String} mode - if not set use current mode
    * @return {object} - graph object
    */
  addBehaviour(behaviour, mode) {
    return { behaviour, mode };
  },
  /**
    * remove behavior from the current mode
    * @param {Array | String} behaviour - a behaviour or a list behaviours
    * @return {object} this
    */
  removeBehaviour(behaviour) {
    return behaviour;
  },
  /**
    * add a behaviour
    * @param {string} type - behaviour type
    * @param {function} fn - behaivour body
    * @return {object} this
    */
  behaviourOn(type, fn) {
    return { type, fn };
  },
  /**
    * remove all behaviours added by user
    */
  _off() {}
};
module.exports = Mode;
