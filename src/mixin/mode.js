/**
 * @fileOverview mode
 * @author wuyue.lwy <wyueliu@gmail.com>
 */
const Util = require('../util');
const Handler = require('../handler');
const Mixin = {};
Mixin.CFG = {
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

Mixin.INIT = '_initModes';
Mixin.AUGMENT = {
  _initModes() {
    const mode = this.get('mode');
    this.changeMode(mode);
  },
  /**
    * change mode
    * @param {string} modeName - name of mode
    */
  changeMode(modeName) {
    const modes = this.get('modes');
    if (Util.isEmpty(modes) || Util.isEmpty(modes[modeName])) {
      return;
    }
    Handler.resetMode(modes[modeName], this);
    this.set('mode', modeName);
  },
  /**
    * add behavior to the current mode
    * @param {Array | String} behaviour - add a behaviour or a list behaviours to the mode
    * @param {String} mode - if not set use current mode
    * @return {object} - graph object
    */
  addBehaviour(behaviour, mode) {
    const modes = this.get('modes');
    mode = mode ? mode : this.get('mode');
    if (Util.isEmpty(modes[mode])) {
      modes[mode] = [];
    }
    // remove  repetition
    const currentModes = modes[mode];
    const list = [].concat(behaviour);
    Util.each(list, tmp => {
      if (currentModes.indexOf(tmp) === -1) {
        currentModes.push(tmp);
      }
    });
    Handler.resetMode(modes[mode], this);
    return this;
  },
  /**
    * remove behavior from the current mode
    * @param {Array | String} behaviour - a behaviour or a list behaviours
    * @return {object} this
    */
  removeBehaviour(behaviour) {
    const modes = this.get('modes');
    const mode = this.get('mode');
    let currentModes = modes[mode];
    if (Util.isEmpty(currentModes)) {
      return;
    }
    const removes = [].concat(behaviour);
    currentModes = currentModes.filter(item => {
      return removes.indexOf(item) === -1;
    });
    modes[mode] = currentModes;
    Handler.resetMode(currentModes, this);
    return this;
  },
  /**
    * add a behaviour
    * @param {string} type - behaviour type
    * @param {function} fn - behaivour body
    */
  behaviourOn(type, fn) {
    const eventCache = this._eventCache;
    if (!eventCache[type]) {
      eventCache[type] = [];
    }
    eventCache[type].push(fn);
    this.on(type, fn);
  },
  /**
    * remove all behaviours added by user
    */
  _off() {
    const eventCache = this._eventCache;
    Util.each(eventCache, (fns, type) => {
      Util.each(fns, fn => {
        this.off(type, fn);
      });
    });
    this._eventCache = {};
  }
};
module.exports = Mixin;
