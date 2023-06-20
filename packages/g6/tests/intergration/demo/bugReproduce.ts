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
                    type: 'star-node',
                },
            },
        ],
        edges: [
            {
                id: 'edge1',
                source: 1,
                target: 2,
                data: {
                    type: 'custom-edge'
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
                // labelShape: {
                //     text: 'label',
                //     position: 'bottom',
                // },
                iconShape: {
                    // img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
                    text: 'label',
                },
                labelBackgroundShape: {
                    fill: 'red'
                },
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