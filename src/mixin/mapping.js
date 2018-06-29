/**
 * @fileOverview mapping mixin
 * @author huangtonger@aliyun.com
 */

const Mapper = require('../controller/mapper');
const Mixin = {};
Mixin.INIT = '_initMapper';
Mixin.AUGMENT = {
  _initMapper() {
    const controllers = this.get('_controllers');
    controllers.nodeMapper = new Mapper({
      graph: this
    });
    controllers.edgeMapper = new Mapper({
      graph: this
    });
    controllers.groupMapper = new Mapper({
      graph: this
    });
    controllers.guideMapper = new Mapper({
      graph: this
    });
  },
  /**
   * node mapping
   * @param  {array} channels mapping channel
   * @return {object} nodeMapper
   */
  node(channels) {
    const nodeMapper = this._getController('nodeMapper');
    channels && nodeMapper.addChannels(channels);
    return nodeMapper;
  },
  /**
   * edge mapping
   * @param  {array} channels mapping channel
   * @return {object} edgeMapper
   */
  edge(channels) {
    const edgeMapper = this._getController('edgeMapper');
    channels && edgeMapper.addChannels(channels);
    return edgeMapper;
  },
  /**
   * group mapping
   * @param  {array} channels mapping channel
   * @return {object} groupMapper
   */
  group(channels) {
    const groupMapper = this._getController('groupMapper');
    channels && groupMapper.addChannels(channels);
    return this._getController('groupMapper');
  },
  /**
   * guide mapping
   * @param  {array} channels mapping channel
   * @return {object} guideMapper
   */
  guide(channels) {
    const guideMapper = this._getController('guideMapper');
    channels && guideMapper.addChannels(channels);
    return this._getController('guideMapper');
  }
};

module.exports = Mixin;
