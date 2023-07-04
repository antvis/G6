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
                    type: 'rect-node',
                },
            },
            {
                id: 2,
                data: {
                    x: 200,
                    y: 100,
                    type: 'rect-node',
                },
            },
            {
                id: 3,
                data: {
                    x: 100,
                    y: 200,
                    type: 'rect-node',
                },
            },
            {
                id: 4,
                data: {
                    x: 200,
                    y: 200,
                    type: 'rect-node',
                },
            },
        ],
    };


    const graph = new G6.Graph({
        container,
        width,
        height,
        data,
        type: 'graph',
        modes: {
            default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
        },
        plugins: [{
            key: 'menu1',
            type: 'menu',
            trigger: 'contextmenu',
            handleMenuClick: (e, id) => {
                console.log(id);
            },
            /** async string menu */
            getContent: (e) => {
                return new Promise((resolve => {
                    const data = `
          <ul class='g6-contextmenu-ul'>
            <li class='g6-contextmenu-li'>${e.itemId}</li>
            <li class='g6-contextmenu-li'>异步菜单项2</li>
          </ul>
        `
                    setTimeout(() => {
                        resolve(data);
                    }, 2000);
                }))
            }
        }],
        /** default menu */
        // plugins: ['menu'],
        node: (nodeInnerModel: any) => {
            const { id, data } = nodeInnerModel;
            return {
                id,
                data: {
                    ...data,
                    keyShape: {
                        height: 50,
                        width: 50,
                    },
                    labelShape: {
                        text: 'label',
                        position: 'bottom',
                    },
                    iconShape: {
                        img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
                        // text: 'label',
                    },
                    badgeShapes: [
                        {
                            text: '1',
                            position: 'rightTop',
                            color: 'blue',
                        },
                    ],
                    labelBackgroundShape: {
                        fill: 'red'
                    },
                    anchorShapes: [
                        {
                            position: [0, 0.5],
                            r: 2,
                            fill: 'red'
                        },

                    ]
                }
            }
        },
    });

    return graph;

}