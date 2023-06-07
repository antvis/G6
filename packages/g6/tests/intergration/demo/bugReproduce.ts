import G6 from '../../../src/index';
import { CircleNode } from '../../../src/stdlib/item/node';
import { container, data, height, width } from '../../datasets/const';


export default () => {

    const data = {
        nodes: [
            {
                id: 1,
                data: {
                    x: 100,
                    y: 100,
                    type: 'circle'
                }
            },
            {
                id: 2,
                data: {
                    x: 200,
                    y: 100,
                    type: 'circle'
                }
            },
        ],
    };
    const graph = new G6.Graph({
        container,
        width,
        height,
        data,
        type: 'graph',
        layout: {
            type: 'grid',
        },
    });


    return graph

}