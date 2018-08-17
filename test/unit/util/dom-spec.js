
const expect = require('chai').expect;
const Util = require('../../../src/util/');
describe('dom util test', () => {
  it('createDOM', () => {
    const dom = Util.createDOM('<div>ddd</div>');
    document.body.appendChild(dom);
    dom.hide();
    expect(dom.style.visibility).eql('hidden');
    dom.show();
    expect(dom.style.visibility).eql('visible');
    dom.css({
      width: '701px',
      height: '18px'
    });
    expect(dom.width()).eql(701);
    expect(dom.height()).eql(18);
    dom.on('click', () => {
    });
    if (dom.addEventListener) {
      dom.attachEvent = dom.addEventListener;
    }
    dom.on('click', () => {

    });
    dom.off();
    dom.destroy();
  });
});
