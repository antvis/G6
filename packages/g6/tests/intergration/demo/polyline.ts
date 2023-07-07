import G6 from '../../../src/index';
import { container, height, width } from '../../datasets/const';

export default () => {
    const data = {
        nodes: [
            {
                id: 1,
                data: {
                    x: 100,
                    y: 100,
                    type: 'circle-node',
                },
            },
            {
                id: 2,
                data: {
                    x: 200,
                    y: 100,
                    type: 'circle-node',
                },
            },
        ],
        edges: [
            {
                id: 'edge1',
                source: 1,
                target: 2,
                data: {
                    type: 'polyline-edge'
                }
            }
        ]
    };


    const edge: ((data: any) => any) = (edgeInnerModel: any) => {

        const { id, data } = edgeInnerModel
        return {
            id,
            data: {
                ...data,
                keyShape: {
                    points: [[200, 300]]
                }
            }
        }
    }
    const graph = new G6.Graph({
        container,
        width,
        height,
        data,
        type: 'graph',
        modes: {
            default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
        },
        node: (nodeInnerModel: any) => {
            const { id, data } = nodeInnerModel;
            // 返回值类型见下方 DisplayNodeModel 类型
            return {
                id,
                data: {
                    ...data,
                    keyShape: {
                        r: 16
                    },
                }
            }
        },
        edge,
    });

    return graph;

}