import { extend, Extensions, Graph } from '@antv/g6';

/**
 * State
 * 0    init
 * 1    playing
 * 2    win
 * 3    lost
 */
const STATE = {
    INIT: 0,
    PLAYING: 1,
    WIN: 2,
    LOST: 3,
}

class TournamentNode extends Extensions.RectNode {
    afterDraw(model, shapeMap, diffData, diffState) {
        const {data: cfg, id} = model;
        const afterShapes = {};

        // 奖杯
        if (id === 'winner') {
            afterShapes['winner-shape'] = this.upsertShape(
                'text',
                'winner-shape',
                {
                    text: '🏆',
                    x: 0,
                    y: -50,
                    fontSize: 50,
                    textAlign: 'center',
                    textBaseline: 'middle',
                    fill: 'white',
                },
                {
                    model,
                    shapeMap,
                    diffData,
                    diffState,
                },
            );
        }

        // 名称
        if (cfg.name) {
            afterShapes['name-text-shape'] = this.upsertShape(
                'text',
                'name-text-shape',
                {
                    text: cfg.name,
                    x: 0,
                    y: 0,
                    fontSize: 12,
                    textAlign: id === 'winner' ? 'center' : 'right',
                    textBaseline: 'middle',
                    fill: 'white',
                },
                {
                    model,
                    shapeMap,
                    diffData,
                    diffState,
                },
            );
        }

        // 得分
        if (cfg.score) {
            afterShapes['score-text-shape'] = this.upsertShape(
                'text',
                'score-text-shape',
                {
                    text: `${cfg.score}`,
                    x: 40,
                    y: 0,
                    fontSize: 12,
                    textAlign: 'right',
                    textBaseline: 'middle',
                    fill: 'black',
                },
                {
                    model,
                    shapeMap,
                    diffData,
                    diffState,
                },
            );
        }

        // lost tag
        if (cfg.state === STATE.LOST) {
            Object.keys(shapeMap).forEach((key) => {
                const shape = shapeMap[key];
                shape.style.filter = 'grayscale(1)';
            });
            Object.keys(afterShapes).forEach((key) => {
                const shape = afterShapes[key];
                shape.style.filter = 'grayscale(1)';
            });
            afterShapes['lost-text-shape'] = this.upsertShape(
                'text',
                'lost-text-shape',
                {
                    text: 'LOST',
                    x: 50,
                    y: 0,
                    fontSize: 14,
                    fontWeight: 700,
                    textAlign: 'right',
                    textBaseline: 'middle',
                    fill: 'white',
                },
                {
                    model,
                    shapeMap,
                    diffData,
                    diffState,
                },
            );
            afterShapes['lost-text-shape'].rotate(-45)
        }

        // win tag
        if (cfg.state === STATE.WIN) {
            afterShapes['win-text-shape'] = this.upsertShape(
                'text',
                'win-text-shape',
                {
                    text: 'WIN',
                    x: 50,
                    y: 0,
                    fontSize: 14,
                    fontWeight: 700,
                    textAlign: 'right',
                    textBaseline: 'middle',
                    fill: 'yellow',
                },
                {
                    model,
                    shapeMap,
                    diffData,
                    diffState,
                },
            );
            afterShapes['win-text-shape'].rotate(-45)
        }

        return afterShapes;
    }
}

class TournamentEdge extends Extensions.PolylineEdge {
    drawKeyShape(model, sourcePoint, targetPoint, shapeMap, diffData, diffState) {
        const shape = super.drawKeyShape(model, sourcePoint, targetPoint, shapeMap, diffData, diffState);
        const mid = shape.getPoint(0.6)
        shape.style.path = [
            ['M', targetPoint.x, targetPoint.y],
            ['L', mid.x, targetPoint.y],
            ['L', mid.x, sourcePoint.y],
            ['L', sourcePoint.x, sourcePoint.y],
        ]
        return shape;
    }

    getPath(model, points) {
        return [
            ['M', points[1].x, points[1].y],
            ['L', points[0].x, points[0].y],
        ]
    }

    afterDraw(model, shapeMap) {
        const {data: cfg} = model;
        const keyShape = shapeMap.keyShape;
        const afterShape = {}
        // 虚线动画
        if (cfg.state === STATE.PLAYING) {
            keyShape.style.lineDash = [10, 10];
            keyShape.animate([{lineDashOffset: 20}, {lineDashOffset: 0}], {
                duration: 500,
                iterations: Infinity,
            })
        } else if (cfg.state === STATE.WIN) {
            keyShape.style.stroke = '#53cdd5';
            keyShape.style.lineWidth = 3;
        }
        return afterShape;
    }
}

const ExtGraph = extend(Graph, {
    nodes: {
        'tournament-node': TournamentNode,
    },
    edges: {
        'tournament-edge': TournamentEdge,
    },
});

const data = {
    id: 'winner',
    data: {
        layer: 4,
    },
    children: [
        {
            id: 'layer3-1',
            data: {
                layer: 3,
            },
            children: [
                {
                    id: 'layer2-1',
                    data: {
                        layer: 2,
                    },
                    children: [
                        {
                            id: 'layer1-1',
                            data: {
                                layer: 1,
                            },
                        },
                        {
                            id: 'layer1-2',
                            data: {
                                layer: 1,
                            },
                        }
                    ]
                },
                {
                    id: 'layer2-2',
                    data: {
                        layer: 2,
                    },
                    children: [
                        {
                            id: 'layer1-3',
                            data: {
                                layer: 1,
                            },
                        },
                        {
                            id: 'layer1-4',
                            data: {
                                layer: 1,
                            },
                        }
                    ]
                }
            ]
        },
        {
            id: 'layer3-2',
            data: {
                layer: 3,
            },
            children: [
                {
                    id: 'layer2-3',
                    data: {
                        layer: 2,
                    },
                    children: [
                        {
                            id: 'layer1-5',
                            data: {
                                layer: 1,
                            },
                        },
                        {
                            id: 'layer1-6',
                            data: {
                                layer: 1,
                            },
                        }
                    ]
                },
                {
                    id: 'layer2-4',
                    data: {
                        layer: 2,
                    },
                    children: [
                        {
                            id: 'layer1-7',
                            data: {
                                layer: 1,
                            },
                        },
                        {
                            id: 'layer1-8',
                            data: {
                                layer: 1,
                            },
                        }
                    ]
                }
            ]
        }
    ]
};

// 参赛选手
const playerInfo = [
    {
        id: 'layer1-1',
        name: 'player1',
        state: 0,
    },
    {
        id: 'layer1-2',
        name: 'player2',
        state: 0,
    },
    {
        id: 'layer1-3',
        name: 'player3',
        state: 0,
    },
    {
        id: 'layer1-4',
        name: 'player4',
        state: 0,
    },
    {
        id: 'layer1-5',
        name: 'player5',
        state: 0,
    },
    {
        id: 'layer1-6',
        name: 'player6',
        state: 0,
    },
    {
        id: 'layer1-7',
        name: 'player7',
        state: 0,
    },
    {
        id: 'layer1-8',
        name: 'player8',
        state: 0,
    }
];

const container = document.getElementById('container');
const width = container.offsetWidth;
const height = container.offsetHeight;
const graph = new ExtGraph({
    container: 'container',
    width,
    height,
    modes: {
        default: ['drag-canvas', 'zoom-canvas'],
    },
    theme: {
        type: 'spec',
        base: 'dark'
    },
    node: {
        type: 'tournament-node',
        width: 200,
        keyShape: {
            width: 100,
            radius: 10,
            fill: '#5c9eb9'
        },
        anchorPoints: [
            [0.5, 0.5],
            [1, 0.5],
        ],
    },
    edge: {
        type: 'tournament-edge',
        controlPoints: true,
        sourceAnchor: 0,
        targetAnchor: 1,
    },
    layout: {
        type: 'compactBox',
        direction: 'RL',
        getId: function getId(d) {
            return d.id;
        },
        getHeight: function getHeight() {
            return 16;
        },
        getVGap: function getVGap() {
            return 30;
        },
        getHGap: function getHGap() {
            return 100;
        },
        getWidth: function getWidth(d) {
            return d.id.length + 20;
        },
    },
    autoFit: 'view',
    data: {
        type: 'treeData',
        value: data,
    },
});

graph.on('afterrender', async () => {
    const allEdges = graph.getAllEdgesData()
    const allNodes = graph.getAllNodesData()

    const layer1 = allNodes.filter(node => node.data.layer === 1)
    const layer2 = allNodes.filter(node => node.data.layer === 2)
    const layer3 = allNodes.filter(node => node.data.layer === 3)

    const layer = [layer1, layer2, layer3, [data]]

    const setScore = () => parseFloat((Math.random() * 10).toFixed(2)) || 1;

    // 角色初登场
    playerInfo.forEach(info => {
        graph.updateData('node', {
            id: info.id,
            data: {
                name: info.name,
                state: STATE.PLAYING,
                score: setScore(),
            },
        });
        const edge = allEdges.find(edge => edge.target === info.id);
        graph.updateData('edge', {
            id: edge.id,
            data: {
                state: STATE.PLAYING,
            },
        });
    })

    let timer = null;

    const updateScore = (layerNum, resolve) => {
        let index = 0;
        const currentLayer = layer[layerNum - 1];
        currentLayer.forEach(info => {
            const edge = allEdges.find(edge => edge.target === info.id);
            graph.updateData('edge', {
                id: edge.id,
                data: {
                    state: STATE.PLAYING,
                },
            });
        })
        timer = setInterval(() => {
            index++;
            currentLayer.forEach(info => {
                const score = setScore();
                const prevScore = graph.getNodeData(info.id).data.score || 0;
                graph.updateData('node', {
                    id: info.id,
                    data: {
                        score: parseFloat((score + prevScore).toFixed(2)),
                    },
                });
            })
            if (index === 20) {
                clearInterval(timer);
                timer = null;
                resolve();
            }
        }, 100)
    }

    const setNextLayer = (layerNum) => {
        const currentLayer = layer[layerNum - 1];
        Array.from({length: currentLayer.length}).map((_, index) => {
            let id = `layer${layerNum}-${index + 1}`;
            if (layerNum === 4) {
                id = 'winner'
            }
            const layer = graph.getNodeData(id);
            const childrenIds = layer.data.childrenIds;
            const player1 = graph.getNodeData(childrenIds[0]);
            const player2 = graph.getNodeData(childrenIds[1]);

            const winNode = player1.data.score > player2.data.score ? player1 : player2;
            const lostNode = childrenIds[0] === winNode.id ? player2 : player1;

            graph.updateData('node', {
                id: id,
                data: {
                    name: winNode.data.name,
                    state: id === 'winner' ? STATE.WIN : STATE.INIT,
                },
            });
            graph.updateData('node', {
                id: winNode.id,
                data: {
                    state: STATE.WIN,
                },
            });
            graph.updateData('node', {
                id: lostNode.id,
                data: {
                    state: STATE.LOST,
                },
            });

            const winEdge = allEdges.find(edge => edge.source === id && edge.target === winNode.id);
            const lostEdge = allEdges.find(edge => edge.source === id && edge.target === lostNode.id);

            graph.updateData('edge', {
                id: winEdge.id,
                data: {
                    state: STATE.WIN,
                },
            });
            graph.updateData('edge', {
                id: lostEdge.id,
                data: {
                    state: STATE.LOST,
                },
            });
            // 覆盖一层吧
            graph.addData('edge', {
                source: id,
                target: winNode.id,
                data: {
                    state: STATE.WIN,
                },
            });
        });
    }

    new Promise(resolve => updateScore(1, resolve))
        .then(() => {
            return setNextLayer(2)
        })
        .then(() => {
            return new Promise(resolve => {
                updateScore(2, resolve)
            })
        })
        .then(() => {
            return setNextLayer(3)
        })
        .then(() => {
            return new Promise(resolve => {
                updateScore(3, resolve)
            })
        })
        .then(() => {
            return setNextLayer(4)
        });

    window.graph = graph;
})
