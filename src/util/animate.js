const Global = require('../global');

module.exports = {
  /**
   * scale in animate
   * @param  {object}  element g element
   * @param  {object}  x to x
   * @param  {object}  y to y
   * @param  {object}  centerX scale centerX
   * @param  {object}  centerY scale centerY
   */
  scaleIn(element, x, y, centerX, centerY) {
    centerX = centerX ? centerX : x;
    centerY = centerY ? centerY : y;
    element.transform([
      [ 't', -centerX, -centerY ],
      [ 's', 0.01, 0.01 ],
      [ 't', x, y ]
    ]);
    element && !element.get('destroyed') && element.animate({
      transform: [
        [ 't', -x, -y ],
        [ 's', 100, 100 ],
        [ 't', centerX, centerY ]
      ]
    }, Global.enterDuration, Global.enterEasing);
  },
  /**
   * scale out animate
   * @param  {object}  element g element
   * @param  {object}  x to x
   * @param  {object}  y to y
   * @param  {object}  centerX scale centerX
   * @param  {object}  centerY scale centerY
   */
  scaleOut(element, x, y, centerX, centerY) {
    centerX = centerX ? centerX : x;
    centerY = centerY ? centerY : y;
    element && !element.get('destroyed') && element.animate({
      transform: [
        [ 't', -centerX, -centerY ],
        [ 's', 0.01, 0.01 ],
        [ 't', x, y ]
      ]
    }, Global.leaveDuration, Global.leaveEasing, function() {
      element.remove();
    });
  }
};
