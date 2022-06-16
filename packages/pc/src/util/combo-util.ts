import { NodeConfig, ICombo, ComboConfig, INode } from "@antv/g6-core";

interface NestedChildren {
    nodes: NodeConfig[],
    combos: ComboConfig[]
}

/**
 * Recursive function that returns modelConfig 
 * array of combos and it's nested children (combos | nodes)
 * @param {ICombo} combos 
 * @returns {NestedChildren}
 */
export const returnNestedChildrenModels = (combos: ICombo[], nestedChildren?: NestedChildren): NestedChildren => {
    let childNodes: NodeConfig[] = nestedChildren ? [...nestedChildren.nodes] : [];
    let childCombos: ComboConfig[] = nestedChildren ? [...nestedChildren.combos] : [];
    let children: { nodes: INode[]; combos: ICombo[] } = null;

    if (!combos.length) {
        return;
    }

    // Iterate through given combos
    // & push nodes/combo to arrays
    combos.map(combo => {
        children = combo.getChildren();
        children.nodes.map(node => {
            childNodes.push(node.getModel() as NodeConfig);
        })
        childCombos.push(combo.getModel() as NodeConfig);
    })

    // Iterate through child combos or return arrays
    if (children.combos.length !== 0) {
        return children.combos
            .map(combo =>
                returnNestedChildrenModels(
                    [combo],
                    { nodes: childNodes, combos: childCombos }
                )
            )
            .reduce((prev, next) => {
                // combine nodes/combos of adjacent child combos
                return {
                    nodes: Array.from(new Set([...prev.nodes, ...next.nodes])),
                    combos: Array.from(new Set([...prev.combos, ...next.combos]))
                }
            })
    }

    return {
        nodes: childNodes,
        combos: childCombos
    }
}