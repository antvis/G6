const Global = require('../global');

module.exports = {
  /**
   * scale in animate
   * @param  {object}  element g element
   * @param  {object}  x to x
   * @param  {object}  y to y
   * @param  {function} callback callback when animate finshed
   */
  scaleIn(element, x, y, callback) {
    element.transform([
      [ 't', -x, -y ],
      [ 's', 0.01, 0.01 ],
      [ 't', x, y ]
    ]);
    element && !element.get('destroyed') && element.animate({
      transform: [
        [ 't', -x, -y ],
        [ 's', 100, 100 ],
        [ 't', x, y ]
      ]
    }, Global.enterDuration, Global.enterEasing, callback);
  },
  /**
   * scale out animate
   * @param  {object}  element g element
   * @param  {object}  x to x
   * @param  {object}  y to y
   * @param  {function} callback callback when animate finshed
   */
  scaleOut(element, x, y, callback) {
    element && !element.get('destroyed') && element.animate({
      transform: [
        [ 't', -x, -y ],
        [ 's', 0.01, 0.01 ],
        [ 't', x, y ]
      ]
    }, Global.leaveDuration, Global.leaveEasing, callback);
  }
};
