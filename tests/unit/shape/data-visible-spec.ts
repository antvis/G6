import Graph from '../../../src/graph/graph';
import '../../../src/shape/node';
import '../../../src/shape/nodes';
import '../../../src/shape/edge';
import '../../../src/shape/edges';
import '../../../src/shape/combo';
import '../../../src/shape/combos';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('node: hide by assigning visibile in data', () => {
    const cfg = {
        container: div,
        width: 500,
        height: 500,
    };
    const graph = new Graph(cfg);
    const data = {
        nodes: [
            {
                id: 'node',
                x: 100,
                y: 100,
                visible: false
            },
        ],
    };
    it('node: hide by data and update', () => {
        graph.data(data);
        graph.render();

        const node = graph.getNodes()[0];
        expect(node.isVisible()).toEqual(false);
        graph.updateItem(node, {
            visible: true
        })
        expect(node.isVisible()).toEqual(true);
    });
    it('node: hide by data and show by graph', () => {
        data.nodes[0].visible = false;
        graph.data(data);
        graph.render();

        console.log(data);

        const node = graph.getNodes()[0];
        expect(node.isVisible()).toEqual(false);
        graph.showItem(node)
        expect(node.isVisible()).toEqual(true);
        graph.destroy();
    });
});


describe('edge: hide by assigning visibile in data', () => {
    const cfg = {
        container: div,
        width: 500,
        height: 500,
    };
    const data = {
        nodes: [
            {
                id: '1',
                x: 100,
                y: 100
            },
            {
                id: '2',
                x: 100,
                y: 200
            },
        ],
        edges: [{
            id: 'e12',
            source: '1',
            target: '2',
            visible: false
        }]
    };
    const graph = new Graph(cfg);
    it('edge: hide by data and update', () => {
        graph.data(data);
        graph.render();

        const edge = graph.getEdges()[0];
        expect(edge.isVisible()).toEqual(false);
        graph.updateItem(edge, {
            visible: true
        })
        expect(edge.isVisible()).toEqual(true);
    });
    it('edge: hide by data and show by graph', () => {
        data.edges[0].visible = false;
        graph.data(data);
        graph.render();

        const edge = graph.getEdges()[0];
        expect(edge.isVisible()).toEqual(false);
        graph.showItem(edge)
        expect(edge.isVisible()).toEqual(true);
        graph.destroy();
    });
});


describe('combo: hide by assigning visibile in data', () => {
    const cfg = {
        container: div,
        width: 500,
        height: 500,
    };
    const data = {
        nodes: [
            {
                id: '1',
                x: 100,
                y: 100,
                comboId: 'c1'
            },
            {
                id: '2',
                x: 100,
                y: 200
            },
        ],
        edges: [{
            id: 'e12',
            source: '1',
            target: '2'
        }],
        combos: [{
            id: 'c1',
            visible: false
        }]
    };
    const graph = new Graph(cfg);
    it('combo: hide by data and update', () => {
        graph.data(data);
        graph.render();

        const combo = graph.getCombos()[0];
        expect(combo.isVisible()).toEqual(false);
        graph.updateItem(combo, {
            visible: true
        })
        expect(combo.isVisible()).toEqual(true);
    });
    it('combo: hide by data and show by graph', () => {
        data.combos[0].visible = false;
        graph.data(data);
        graph.render();

        const combo = graph.getCombos()[0];
        expect(combo.isVisible()).toEqual(false);
        graph.showItem(combo)
        expect(combo.isVisible()).toEqual(true);
        graph.destroy();
    });
});