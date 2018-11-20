/**
 * @fileOverview mapper controller
 * @author huangtonger@aliyun.com
 */

const Base = require('./base');
const Util = require('../util/');
const CHANNEL_NAMES = [ 'color', 'shape', 'size', 'label', 'style' ];

class Controller extends Base {
  _init() {
    const channels = {};
    Util.each(CHANNEL_NAMES, channel => {
      channels[channel] = {};
      this[channel] = input => {
        channels[channel].input = input;
        return this;
      };
    });
    this.channels = channels;
  }
  addChannels(inputChannels) {
    const channels = this.channels;
    Util.each(inputChannels, (channel, name) => {
      channels[name] = {
        input: channel
      };
    });
  }
  /**
   * @param  {object} model origin model
   */
  mapping(model) {
    const channels = this.channels;
    Util.each(channels, (channel, name) => {
      if (Util.isFunction(channel.input)) {
        model[name] = channel.input(model);
      } else if (channel.input) {
        model[name] = channel.input;
      }
    });
  }
}

module.exports = Controller;
