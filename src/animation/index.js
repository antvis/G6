/**
 * @fileOverview entry file
 * the animation cfg description
 * @param {object} cfg - animate config
 * @property  {object} cfg.element - G.Element
 * @property  {object} cfg.item - G6.Item
 * @property  {object} cfg.startKeyFrame - start key frame
 * @property  {object} cfg.endKeyFrame - end key frame
 * @property  {object} cfg.startStashes - start key frames stashes
 * @property  {object} cfg.endStashes - end key frames stashes
 * @property  {function} cfg.done - should be executed when animate finished
 * @author huangtonger@aliyun.com
 */

const Global = require('../global');
// const Util = require('../util/');

/**
 * scale in animate
 * @param  {object}  item - graph item
 * @param  {function} callback callback when animate finshed
 */
function scaleIn(item, callback) {
  const group = item.getGraphicGroup();
  const box = item.getBBox();
  const x = (box.minX + box.maxX) / 2;
  const y = (box.minY + box.maxY) / 2;
  const m = group.getMatrix();
  const s = m[0];
  group.transform([
      [ 't', -x, -y ],
      [ 's', 0.01 / s, 0.01 / s ],
      [ 't', x, y ]
  ]);
  group.animate({
    transform: [
        [ 't', -x, -y ],
        [ 's', 100 * s, 100 * s ],
        [ 't', x, y ]
    ]
  }, Global.enterDuration, Global.enterEasing, callback);
}

/**
 * scale out animate
 * @param  {object}  item - graph item
 * @param  {function} callback callback when animate finshed
 */
function scaleOut(item, callback) {
  const group = item.getGraphicGroup();
  const box = item.getBBox();
  const x = (box.minX + box.maxX) / 2;
  const y = (box.minY + box.maxY) / 2;
  const m = group.getMatrix();
  const s = m[0];
  group.animate({
    transform: [
        [ 't', -x, -y ],
        [ 's', 0.01 / s, 0.01 / s ],
        [ 't', x, y ]
    ]
  }, Global.leaveDuration, Global.leaveEasing, callback);
}

/**
 * fade in animate
 * @param  {object}  element - graph item
 * @param  {function} callback callback when animate finshed
 */
function fadeIn(element, callback) {
  if (element.isShape) {
    const fillOpacity = element.attr('fillOpacity');
    const strokeOpacity = element.attr('strokeOpacity');
    element.attr({
      fillOpacity: 0,
      strokeOpacity: 0
    });
    element.animate({
      fillOpacity,
      strokeOpacity
    }, Global.leaveDuration, Global.leaveEasing, callback);
  }
}
/**
 * fade out animate
 * @param  {object}  element - graph item
 * @param  {function} callback callback when animate finshed
 */
function fadeOut(element, callback) {
  if (element.isShape) {
    element.animate({
      fillOpacity: 0,
      strokeOpacity: 0
    }, Global.enterDuration, Global.enterEasing, callback);
  }
}

module.exports = {
  enterScaleIn({ item, element }) {
    if (!element.isItemContainer) return;
    scaleIn(item);
  },
  showScaleIn({ item, element }) {
    if (!element.isItemContainer) return;
    scaleIn(item);
  },
  leaveScaleOut({ item, element, done }) {
    if (!element.isItemContainer) return;
    scaleOut(item, () => {
      done();
    });
  },
  hideScaleOut({ item, element, done }) {
    if (!element.isItemContainer) return;
    scaleOut(item, () => {
      done();
    });
  },
  enterFadeIn({ element }) {
    fadeIn(element);
  },
  showFadeIn({ element }) {
    fadeIn(element);
  },
  leaveFadeOut({ element, done }) {
    fadeOut(element, done);
  },
  hideFaseOut({ element, done }) {
    fadeOut(element, done);
  }
};
