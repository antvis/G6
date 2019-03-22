const expect = require('chai').expect;
const G6 = require('../../../../src/');
const ModeController = require('../../../../src/graph/controller').Mode;

const div = document.createElement('div');
div.id = 'mode-spec';
document.body.appendChild(div);

describe('mode', () => {
  it('new mode', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      pixelRatio: 2
    });
    const modeController = new ModeController(graph);
    expect(Object.keys(modeController.modes).length).to.equal(1);
    expect(modeController.modes.default).not.to.be.undefined;
    expect(modeController.modes.default.length).to.equal(0);
    expect(modeController.mode).to.equal('default');
  });
  it('add behavior to current mode', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      pixelRatio: 2,
      modes: {
        default: [],
        custom: []
      }
    });
    const modeController = graph.get('modeController');
    expect(Object.keys(modeController.modes).length).to.equal(2);
    modeController.manipulateBehaviors('aa', undefined, true);
    expect(Object.keys(modeController.modes).length).to.equal(2);
    expect(modeController.modes.default.length).to.equal(1);
    expect(modeController.modes.default[0].type).to.equal('aa');
    expect(modeController.modes.custom.length).to.equal(0);
    modeController.manipulateBehaviors('aa', undefined, false);
    expect(modeController.modes.default.length).to.equal(0);
  });
  it('add & remove behaviors to current mode', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      pixelRatio: 2,
      modes: {
        default: [],
        custom: []
      }
    });
    let triggered = false;
    const modeController = graph.get('modeController');
    expect(Object.keys(modeController.modes).length).to.equal(2);
    G6.registerBehavior('aa', { bind() { triggered = true; }, unbind() { triggered = false; } });
    G6.registerBehavior('bb', { bind() {}, unbind() {} });
    modeController.manipulateBehaviors('aa', undefined, true);
    modeController.manipulateBehaviors('bb', undefined, true);
    expect(Object.keys(modeController.modes).length).to.equal(2);
    expect(modeController.modes.default.length).to.equal(2);
    expect(modeController.modes.default[0].type).to.equal('aa');
    expect(modeController.modes.default[1].type).to.equal('bb');
    expect(triggered).to.be.true;
    modeController.setMode('custom');
    expect(modeController.mode).to.equal('custom');
    expect(triggered).to.be.false;
    modeController.manipulateBehaviors([ 'aa', 'bb' ], 'default', false);
    expect(modeController.modes.default.length).to.equal(0);
  });
  it('add & remove behavior to several modes', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      pixelRatio: 2,
      modes: {
        default: [],
        custom1: [],
        custom2: []
      }
    });
    const modeController = graph.get('modeController');
    expect(Object.keys(modeController.modes).length).to.equal(3);
    modeController.manipulateBehaviors([ 'aa', 'bb' ], [ 'custom1', 'custom2' ], true);
    expect(modeController.modes.custom1.length).to.equal(2);
    expect(modeController.modes.custom2.length).to.equal(2);
    expect(modeController.modes.custom1[0].type).to.equal('aa');
    expect(modeController.modes.custom1[1].type).to.equal('bb');
    expect(modeController.modes.custom2[0].type).to.equal('aa');
    expect(modeController.modes.custom2[1].type).to.equal('bb');
    modeController.manipulateBehaviors([ 'aa' ], [ 'custom1', 'custom2' ], false);
    expect(modeController.modes.custom1.length).to.equal(1);
    expect(modeController.modes.custom2.length).to.equal(1);
    expect(modeController.modes.custom1[0].type).to.equal('bb');
    expect(modeController.modes.custom2[0].type).to.equal('bb');
  });
});

