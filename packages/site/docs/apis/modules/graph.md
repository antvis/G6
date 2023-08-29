[Overview - v5.0.0-alpha.9](../README.md) / [Modules](../modules.md) / graph

# Module: graph

## Classes

- [Graph](../classes/graph-Graph.md)

## Variables

### Util

• **Util**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `extend` | <B1, B2, T1, T2\>(`GraphClass`: typeof [`Graph`](../classes/graph-Graph.md), `extendLibrary`: { `behaviors?`: `B1` ; `edges?`: `any` ; `nodes?`: `any` ; `themeSolvers?`: `T1`  }) => typeof [`Graph`](../classes/graph-Graph.md) |
| `isEncode` | (`value`: `any`) => value is Encode<any\> |
| `mock` | (`nodeCount`: `number`) => { `circle`: (`centerId`: `string`) => { `edges`: `any`[] ; `nodes`: { `data`: {} = {}; `id`: `string`  }[]  } ; `random`: (`ratio`: `number`) => { `edges`: `any`[] ; `nodes`: { `data`: {} = {}; `id`: `string`  }[]  }  } |

#### Defined in

[util/index.ts:5](https://github.com/antvis/G6/blob/0b835e1b00/packages/g6/src/util/index.ts#L5)
