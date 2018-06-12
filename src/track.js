/**
 * @fileOverview track g6
 * Experience improvement program
 */
const Global = require('./global');
const SERVER_URL = 'https://kcart.alipay.com/web/bi.do';
const version = require('./version');

// 延迟发送请求
setTimeout(function() {
  if (Global.trackable) {
    const image = new Image();
    const newObj = {
      pg: document.URL,
      r: new Date().getTime(),
      g6: true,
      version,
      page_type: 'syslog'
    };
    const d = encodeURIComponent(JSON.stringify([ newObj ]));
    image.src = `${SERVER_URL}?BIProfile=merge&d=${d}`;
  }
}, 3000);
