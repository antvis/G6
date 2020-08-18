---
title: combo Theory
order: 3
---

> The English version is in progress

## The Rendering Logic of combo

When there are no combos but nodes and edges, the visual index (zIndex) of edges are lower than nodes by default. For a graph with combos, rules about visual index should be specified to achieve reasonable result. For convenience, z(X) indicates the visual index(zIndex) in the following.

- Rule 1: For one unnested combo, z(Node) > z(Edge) > z(combo), as shown below

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*q96OSKiu_F8AAAAAAAAAAABkARQnAQ' width=400 alt="img" />

> z(a) = z(b) > z(e0) > z(combo A)

- Rule 1+: Suppose that combo A has sub combos and nodes, and there are edges between the nodes, z(sub combo) > z(Node) > z(Edge) > z(combo A it self), as shown below:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wKcnQoN4c-MAAAAAAAAAAABkARQnAQ' width=400 alt="img" />

> z(b1) = z(b2) > z(e2) > z(combo B) > z(a1) = z(a2) > z(e1) > z(combo A)

- Rule 2: We now abtain all the visual indexes of combos and nodes by rule 1. If there is an edge E with end nodes a and b from different combos, and we already know z(a) and z(b), the z(E) will be equal to the visual index of the edges in the combo which contains the end node with larger z(x). That is:
  - When z(a) > z(b), z(E) is equal to the visual index of the edges in the combo which contains a;
  - When z(a) <= z(b), z(E) is equal to the visual index of the edges in the combo which contains b.

As shown in the figure below, The edges with red label matches Rule 2:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dQwAQr0lCjQAAAAAAAAAAABkARQnAQ' width=400 alt="img" />

> z(e4) = z(e2) z(e5) = z(e2) z(e6) = z(e1)=z(e3)

- Rule 2+: The combo B of upper figure is collapsed as following figure. The related nodes and edges are hidden, and some vitual edges are added to represent the relationships between items inside and outside combo B.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*RTF-Q5NgVtMAAAAAAAAAAABkARQnAQ' width=350 alt="img" />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sN2BRproFKQAAAAAAAAAAABkARQnAQ' width=350 alt="img" />

## combo Layout Theory

G6 provides a force-directed based layout for combo named 'comboForce'. There are three situations to be considered:

1. Layout all the items;
2. Expand a combo interactively;
3. Collapse a combo interactively.

The principle of traditional force-directed layout: There are repulsive forces between all the node pairs as `Fr = k/r2`; There are attractive forces between the node pairs which have connections(edges) as `Fa = ks * r`. Where `r` is the distance between two nodes, `k` and `ks` are coefficient. To meet the requirement of combo layout, we add some additional strategies to make the nodes inside a combo more compact and avoid the combo overlappings.

#### Define a coefficient m = f(c) for the attractive force Fa on the edge

- 「Inter Edge」means an edge with two end nodes from different combos. All the edges in the below figure are inter edges. The attractive forces on them should be reduce the avoid this two combos overlapped. So the coefficient is `m = f(c) < 1`. Higher difference of the combos' depths, `m` should be smaller. E.g. the differences of `e46`, `e23`, `e12`, and `e15` are 1, and `e34`、`e13` are 2. So `f(c)` is a function about difference of the depths bewteen two end nodes' combos, e.g. `m = 1/c`;
- 「Intra Edge」means an edge with two end nodes form the same combo,the coefficient is `m = f(c) = 1`.

#### Gravity for combo

- For convenience, we say `P(X)` is the hierarchy depth of combo X. As shown in the figure below, `P(A) > P(B) > P(C) > P(D)`;
- Each combo has a gravity force G(X) for its succeeding nodes from their mean center. The mean center will be updated in each iteration;
- Smaller `P(X)`, larger `G(X)`. e.g. `G(X) = 1/P(X)`;
- Some nodes might be affected by multiple gravity forces. Such as the node #6 in the figure below, it is affected by the gravity forces `G(C)` from combo C with red stroke, `G(B)` from combo B with green stroke, and `G(A)` from combo A with yellow stroke, where `G(C) > G(B) > G(A)`.

#### Overlapping detection

- Detect the overlappings between nodes in each iteration, and:
  - If two node overlapped, magnify a coefficient `R` to the repulsive force between them to take them apart.
- Detect the overlappings between combos in each iteration (or each `q` iteraction in reduce the computation):
  - First of all, compute the bounding box of the children (including nodes and sub combos);
  - Then traverse the combo tree from top to bottom to find the overlapped combo pairs with same depth in a parent combo;
  - Increase the gravity of the parent combo if two sub combos are overlapped.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Eu4FRJVqPScAAAAAAAAAAABkARQnAQ' width=400 alt="img" />

> The combos with same hierarchy depths are in the same color. The hierarchy depths on this graph is: A > B > C > D
