const G6 = require('../../../src/index');
const expect = require('chai').expect;
const Util = G6.Util;
require('../../../plugins/util.randomData/');
describe('plugin random data test', () => {
  it('createChainData', () => {
    const data = Util.createChainData(10);
    expect(data.nodes.length).eql(10);
    expect(data.edges.length).eql(9);
  });
  it('createCyclicData', () => {
    const data = Util.createCyclicData(10);
    expect(data.nodes.length).eql(10);
    expect(data.edges.length).eql(10);
  });
  it('createNodesData', () => {
    const data = Util.createNodesData(10);
    expect(data.nodes.length).eql(100);
  });
});
