import { isNumber } from '@antv/util'

/**
 * 将 number | Function 类型的参数转换为 return number 的 Function
 * @param  {number | Function}  value 需要被转换的值
 * @param  {number}  defaultV 返回函数的默认返回值
 * @return {Function} 转换后的函数 
 */
export const proccessToFunc = (value: number | Function, defaultV?: number): ((d?: any) => number) => {
    let func;
    if (!value) {
        func = d => {
            return defaultV || 1;
        }
    } else if (isNumber(value)) {
        func = d => {
            return value;
        }
    } else {
        func = value
    }
    return func;
};

/**
 * 将节点和边数据转换为 GPU 可读的数组。并返回 maxEdgePerVetex，每个节点上最多的边数
 * @param  {NodeConfig[]}  nodes 需要被转换的值
 * @param  {EdgeConfig[]}  edges 返回函数的默认返回值
 * @return {Object} 转换后的数组及 maxEdgePerVetex 组成的对象
 */
export const buildTextureData = (nodes, edges): {
    array: Float32Array,
    maxEdgePerVetex: number
} => {
    const dataArray = [];
    const nodeDict = [];
    const mapIdPos = {};
    let i = 0;
    for (i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        mapIdPos[n.id] = i;
        dataArray.push(n.x);
        dataArray.push(n.y);
        dataArray.push(0);
        dataArray.push(0);
        nodeDict.push([]);
    }
    for (i = 0; i < edges.length; i++) {
        const e = edges[i];
        nodeDict[mapIdPos[e.source]].push(mapIdPos[e.target]);
        nodeDict[mapIdPos[e.target]].push(mapIdPos[e.source]);
    }

    let maxEdgePerVetex = 0;
    for (i = 0; i < nodes.length; i++) {
        const offset = dataArray.length;
        const dests = nodeDict[i];
        const len = dests.length;
        dataArray[i * 4 + 2] = offset;
        dataArray[i * 4 + 3] = dests.length;
        maxEdgePerVetex = Math.max(maxEdgePerVetex, dests.length);
        for (let j = 0; j < len; ++j) {
            const dest = dests[j];
            dataArray.push(+dest);
        }
    }

    while (dataArray.length % 4 !== 0) {
        dataArray.push(0);
    }
    return {
        array: new Float32Array(dataArray),
        maxEdgePerVetex
    };
}

/**
 * 将节点和边数据转换为 GPU 可读的数组，每条边带有一个属性。并返回 maxEdgePerVetex，每个节点上最多的边数
 * @param  {NodeConfig[]}  nodes 节点数组
 * @param  {EdgeConfig[]}  edges 边数组
 * @param  {Function}  attrs 读取边属性的函数
 * @return {Object} 转换后的数组及 maxEdgePerVetex 组成的对象
 */
export const buildTextureDataWithOneEdgeAttr = (nodes, edges, attrs: Function): {
    array: Float32Array,
    maxEdgePerVetex: number
} => {
    const dataArray = [];
    const nodeDict = [];
    const mapIdPos = {};
    let i = 0;
    for (i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        mapIdPos[n.id] = i;
        dataArray.push(n.x);
        dataArray.push(n.y);
        dataArray.push(0);
        dataArray.push(0);
        nodeDict.push([]);
    }
    for (i = 0; i < edges.length; i++) {
        const e = edges[i];
        nodeDict[mapIdPos[e.source]].push(mapIdPos[e.target]);
        nodeDict[mapIdPos[e.source]].push(attrs(e)); // 理想边长，后续可以改成每条边不同
        nodeDict[mapIdPos[e.target]].push(mapIdPos[e.source]);
        nodeDict[mapIdPos[e.target]].push(attrs(e)); // 理想边长，后续可以改成每条边不同
    }

    let maxEdgePerVetex = 0;
    for (i = 0; i < nodes.length; i++) {
        const offset = dataArray.length;
        const dests = nodeDict[i]; // dest 中节点 id 与边长间隔存储，即一位节点 id，一位边长……
        const len = dests.length;
        dataArray[i * 4 + 2] = offset;
        dataArray[i * 4 + 3] = len / 2; // 第四位存储与该节点相关的所有节点个数
        maxEdgePerVetex = Math.max(maxEdgePerVetex, len / 2);
        for (let j = 0; j < len; ++j) {
            const dest = dests[j];
            dataArray.push(+dest);
        }
    }

    // 不是 4 的倍数，填充 0
    while (dataArray.length % 4 !== 0) {
        dataArray.push(0);
    }
    return {
        array: new Float32Array(dataArray),
        maxEdgePerVetex
    }
}

/**
 * 将节点和边数据转换为 GPU 可读的数组，每条边带有一个以上属性。并返回 maxEdgePerVetex，每个节点上最多的边数
 * @param  {NodeConfig[]}  nodes 节点数组
 * @param  {EdgeConfig[]}  edges 边数组
 * @param  {Function}  attrs 读取边属性的函数
 * @return {Object} 转换后的数组及 maxEdgePerVetex 组成的对象
 */
export const buildTextureDataWithTwoEdgeAttr = (nodes, edges, attrs1: Function, attrs2: Function): {
    array: Float32Array,
    maxEdgePerVetex: number
} => {
    const dataArray = [];
    const nodeDict = [];
    const mapIdPos = {};
    let i = 0;
    for (i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        mapIdPos[n.id] = i;
        dataArray.push(n.x);
        dataArray.push(n.y);
        dataArray.push(0);
        dataArray.push(0);
        nodeDict.push([]);
    }
    for (i = 0; i < edges.length; i++) {
        const e = edges[i];
        nodeDict[mapIdPos[e.source]].push(mapIdPos[e.target]);
        nodeDict[mapIdPos[e.source]].push(attrs1(e));
        nodeDict[mapIdPos[e.source]].push(attrs2(e));
        nodeDict[mapIdPos[e.source]].push(0);
        nodeDict[mapIdPos[e.target]].push(mapIdPos[e.source]);
        nodeDict[mapIdPos[e.target]].push(attrs1(e));
        nodeDict[mapIdPos[e.target]].push(attrs2(e));
        nodeDict[mapIdPos[e.target]].push(0);
    }

    let maxEdgePerVetex = 0;
    for (i = 0; i < nodes.length; i++) {
        const offset = dataArray.length;
        const dests = nodeDict[i]; // dest 中节点 id 与边长间隔存储，即一位节点 id，一位边长……
        const len = dests.length;
        // dataArray[i * 4 + 2] = offset;
        // dataArray[i * 4 + 3] = len / 4; // 第四位存储与该节点相关的所有节点个数
        // pack offset & length into float32: offset 20bit, length 12bit
        dataArray[i * 4 + 2] = offset + 1048576 * len / 4;
        dataArray[i * 4 + 3] = 0; // 第四位存储与上一次的距离差值
        maxEdgePerVetex = Math.max(maxEdgePerVetex, len / 4);
        for (let j = 0; j < len; ++j) {
            const dest = dests[j];
            dataArray.push(+dest);
        }
    }

    // 不是 4 的倍数，填充 0
    while (dataArray.length % 4 !== 0) {
        dataArray.push(0);
    }
    return {
        array: new Float32Array(dataArray),
        maxEdgePerVetex
    }
}
/**
 * transform the extended attributes of nodes or edges to a texture array
 * @param  {string[]}  attributeNames attributes' name to be read from items and put into output array
 * @param  {ModelConfig[]}  items the items to be read
 * @return {Float32Array} the attributes' value array to be read by GPU
 */
export const attributesToTextureData = (attributeNames: string[], items): { array: Float32Array, count: number } => {
    const dataArray = [];
    const attributeNum = attributeNames.length;
    const attributteStringMap = {};
    items.forEach(item => {
        attributeNames.forEach((name, i) => {
            if (attributteStringMap[item[name]] === undefined) {
                attributteStringMap[item[name]] = Object.keys(attributteStringMap).length;
            }
            dataArray.push(attributteStringMap[item[name]]);
            // insure each node's attributes take inter number of grids
            if (i === attributeNum - 1) {
                while (dataArray.length % 4 !== 0) {
                    dataArray.push(0);
                }
            }
        });
    });
    return {
        array: new Float32Array(dataArray),
        count: Object.keys(attributteStringMap).length
    };
}

/**
 * transform the number array format of extended attributes of nodes or edges to a texture array
 * @param  {string[]}  attributeNames attributes' name to be read from items and put into output array
 * @return {Float32Array} the attributes' value array to be read by GPU
 */
export const arrayToTextureData = (valueArrays: number[][]): Float32Array => {
    const dataArray = [];
    const attributeNum = valueArrays.length;
    const itemNum = valueArrays[0].length;
    for (let j = 0; j < itemNum; j++) {
        valueArrays.forEach((valueArray, i) => {
            dataArray.push(valueArray[j]);
            // insure each node's attributes take inter number of grids
            if (i === attributeNum - 1) {
                while (dataArray.length % 4 !== 0) {
                    dataArray.push(0);
                }
            }
        });
    }

    return new Float32Array(dataArray);
}
