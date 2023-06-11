import G6 from '../../../src/index';
import { container, height, width } from '../../datasets/const';

// 1. Now, G6v5 already supports users to use different types of id
// 2. At the same time, it also supports users to pass in mixed type ids.
// 3. like: id:1, id:'2', id:'node1', etc.
export default () => {
    const data = {
        nodes: [
            {
                id: 1,
                data: {
                    x: 100,
                    y: 100,
                    badgeShapes: {
                        tag: 'badgeShape',
                        position: 'topRight', // Support ’topRight‘,’topLeft‘ and some other positions that contain uppercase ‘Right’ or ‘Left’.
                        text: 'label'
                    }
                }
            },
            {
                id: '2',
                data: {
                    x: 200,
                    y: 100,
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
    });


    return graph

}