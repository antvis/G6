import G6, { ICombo } from '../../../src';
import { returnNestedChildrenModels } from '../../../src/util/combo-util';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);


describe('Return all modelConfigs for children of combo, including combo model', () => {
    it('should return selected combo and all nodes (no combo child)', () => {
        const data = {
            nodes: [
                {
                    id: "node1"
                },
                {
                    id: "node2"
                }
            ]
        };

        const graph = new G6.Graph({
            container: 'container'
        });

        graph.data(data);
        graph.render();

        //create combo
        graph.createCombo('combo1', ['node1', 'node2'])

        const item = graph.findById('combo1');
        graph.setItemState(item, 'selected', true);

        const combos = graph.findAllByState('combo', 'selected') as ICombo[];
        const children = returnNestedChildrenModels(combos);


        expect(children.nodes).toHaveLength(2);
        expect(children.combos).toHaveLength(1);
        expect(children.nodes.map(node => node.id)).toStrictEqual(["node1", "node2"])
        expect(children.combos.map(combo => combo.id)).toStrictEqual(["combo1"])
    })

    it('should return selected combo and all nodes/combos within, nested 1 level', () => {
        const data = {
            nodes: [
                {
                    id: "node1"
                },
                {
                    id: "node2"
                },
                {
                    id: "node3"
                },
                {
                    id: "node4"
                },
                {
                    id: "node5"
                }
            ]
        };

        const graph = new G6.Graph({
            container: 'container'
        });

        graph.data(data);
        graph.render();

        //create combo
        graph.createCombo('combo1', ['node1', 'node3'])
        graph.createCombo('combo2', ['node5'])
        graph.createCombo('combo3', ['node2', 'node4', 'combo2'])

        const item = graph.findById('combo3');
        graph.setItemState(item, 'selected', true);

        const combos = graph.findAllByState('combo', 'selected') as ICombo[];
        const children = returnNestedChildrenModels(combos);


        expect(children.nodes).toHaveLength(3);
        expect(children.combos).toHaveLength(2);
        expect(children.nodes.map(node => node.id)).toStrictEqual(["node2", "node4", "node5"])
        expect(children.combos.map(combo => combo.id)).toStrictEqual(["combo3", "combo2"])
    })

    it('Should return multiple selected combos and all nodes/combos within, nested 2 levels', () => {
        const data = {
            nodes: [
                {
                    id: "node1"
                },
                {
                    id: "node2"
                },
                {
                    id: "node3"
                },
                {
                    id: "node4"
                },
                {
                    id: "node5"
                },
                {
                    id: "node6"
                },
                {
                    id: "node7"
                },
                {
                    id: "node8"
                }
            ]
        };

        const graph = new G6.Graph({
            container: 'container'
        });

        graph.data(data);
        graph.render();

        //create combo
        // third level
        graph.createCombo('childOfchildOfSelected', ['node8'])

        // second level
        graph.createCombo('childOfSelected', ['node5', 'childOfchildOfSelected'])

        // top level
        graph.createCombo('select1', ['node1', 'node3'])
        graph.createCombo('select2', ['node2', 'node4', 'childOfSelected'])
        graph.createCombo('unselected1', ['node7', 'node6'])

        const item = graph.findById('select1');
        const item2 = graph.findById('select2');
        graph.setItemState(item, 'selected', true);
        graph.setItemState(item2, 'selected', true);

        const combos = graph.findAllByState('combo', 'selected') as ICombo[];
        const children = returnNestedChildrenModels(combos);

        expect(children.nodes).toHaveLength(6);
        expect(children.combos).toHaveLength(4);
        expect(children.nodes.map(node => node.id)).toStrictEqual(['node1', 'node3', 'node2', 'node4', 'node5', 'node8'])
        expect(children.combos.map(combo => combo.id)).toStrictEqual(['select1', 'select2', 'childOfSelected', 'childOfchildOfSelected'])
    })

    it('Should return selected combo and all adjacent nested combos, and its nodes', () => {
        const data = {
            nodes: [
                {
                    id: "node1"
                },
                {
                    id: "node2"
                }
            ]
        };

        const graph = new G6.Graph({
            container: 'container'
        });

        graph.data(data);
        graph.render();

        //create combo
        graph.createCombo('childCombo2', ['node2'])
        graph.createCombo('childCombo1', ['node1'])

        graph.createCombo('parentGroup', ['childCombo1', 'childCombo2'])

        const item = graph.findById('parentGroup');
        graph.setItemState(item, 'selected', true);

        const combos = graph.findAllByState('combo', 'selected') as ICombo[];
        const children = returnNestedChildrenModels(combos);

        expect(children.nodes).toHaveLength(2);
        expect(children.combos).toHaveLength(3);
        expect(children.nodes.map(node => node.id)).toEqual(['node1', 'node2'])
        expect(children.combos.map(combo => combo.id)).toEqual(['parentGroup', 'childCombo1', 'childCombo2'])
    })
})