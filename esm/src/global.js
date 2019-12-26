export default {
    version: '3.3.0',
    rootContainerClassName: 'root-container',
    nodeContainerClassName: 'node-container',
    edgeContainerClassName: 'edge-container',
    customGroupContainerClassName: 'custom-group-container',
    delegateContainerClassName: 'delegate-container',
    defaultShapeFillColor: '#91d5ff',
    defaultShapeStrokeColor: '#91d5ff',
    defaultLoopPosition: 'top',
    nodeLabel: {
        style: {
            fill: '#595959',
            textAlign: 'center',
            textBaseline: 'middle'
        },
        offset: 5 // 节点的默认文本不居中时的偏移量
    },
    defaultNode: {
        shape: 'circle',
        style: {
            fill: '#fff',
            stroke: '#000'
        },
        size: 40,
        color: '#333'
    },
    edgeLabel: {
        style: {
            fill: '#595959',
            textAlign: 'center',
            textBaseline: 'middle'
        }
    },
    defaultEdge: {
        shape: 'line',
        style: {},
        size: 1,
        color: '#333'
    },
    // 节点应用状态后的样式，默认仅提供 active 和 selected 用户可以自己扩展
    nodeStateStyle: {
        active: {
            fillOpacity: 0.8
        },
        selected: {
            lineWidth: 2
        }
    },
    delegateStyle: {
        fill: '#F3F9FF',
        fillOpacity: 0.5,
        stroke: '#1890FF',
        strokeOpacity: 0.9,
        lineDash: [5, 5]
    }
};
//# sourceMappingURL=global.js.map