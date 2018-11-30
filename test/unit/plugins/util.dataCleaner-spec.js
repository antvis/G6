const G6 = require('../../../src/index');
const expect = require('chai').expect;
const Util = G6.Util;
require('../../../plugins/util.dataCleaner/');
describe('plugin data cleaner test', () => {
  it('cleanData', () => {
    const data = {
      nodes: [{
        id: 1
      }, {
        id: 2
      }],
      edges: [{
        source: 1,
        target: 3
      }, {
        source: 3,
        target: 1
      }, {
        source: 1,
        target: 2
      }]
    };
    Util.cleanData(data);
    expect(data.edges.length).eql(1);
  });
});
