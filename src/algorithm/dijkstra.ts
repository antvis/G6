import { IGraph } from '../interface/graph';

const dijkstra = (graph: IGraph, source: string, directed?: boolean, weightPropertyName?: string) => {

    const nodes = graph.getNodes();

    const nodeIdxMap = {};
    let i, v;
    const marks = [];
    const D = [];
    nodes.forEach((node, i) => {
        const id = node.getID();
        nodeIdxMap[id] = i;
        D[i] = Infinity;
        if (id === source) D[i] = 0;
    });

    const nodeNum = nodes.length;
    for (i = 0; i < nodeNum; i++) { //Process the vertices
        v = minVertex(D, nodeNum, marks);
        if (D[v] === Infinity) return; //Unreachable vertices
        marks[i] = true;

        let relatedEdges = [];
        if (!directed) relatedEdges = nodes[v].getOutEdges();
        else relatedEdges = nodes[v].getEdges();

        relatedEdges.forEach(e => {
            const w = nodeIdxMap[e.getTarget().getID()];
            const weight = (weightPropertyName && e.getModel()[weightPropertyName]) ? e.getModel()[weightPropertyName] : 1;
            if (D[w] > (D[v] + weight)) D[w] = D[v] + weight;
        });
    }
    return D
}

function minVertex(D: number[], nodeNum: number, marks: boolean[]) {//找出最小的点
    let i, v;
    for (i = 0; i < nodeNum; i++) { //找没有被访问的点
        if (marks[i] == false) v = i; break;
    }
    for (i++; i < nodeNum; i++) { //找比上面还小的未被访问的点（注意此时的i++）
        if (!marks[i] && D[i] < D[v]) v = i;
        return v;
    }
}

export default dijkstra;
