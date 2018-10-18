const Global = require('../global');

module.exports = {
  /**
   * scale in animate
   * @param  {object}  item - graph item
   * @param  {function} callback callback when animate finshed
   */
  scaleIn(item, callback) {
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
  },
  /**
   * scale out animate
   * @param  {object}  item - graph item
   * @param  {function} callback callback when animate finshed
   */
  scaleOut(item, callback) {
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
};
