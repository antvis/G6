// import Group from '@antv/g-canvas/lib/group';
// import clone from '@antv/util/lib/clone'
// import deepMix from '@antv/util/lib/deep-mix'
// import each from '@antv/util/lib/each'
// import isArray from '@antv/util/lib/is-array'
// import isObject from '@antv/util/lib/is-object'
// import isString from '@antv/util/lib/is-string'
// import upperFirst from '@antv/util/lib/upper-first'
// import Edge from '@g6/item/edge';
// import Node from '@g6/item/node';
// import { EdgeConfig, ModelConfig, NodeConfig } from '@g6/types';
// import Graph from '../graph';

// import { IItem } from '@g6/interface/item';

// interface IItemConstroller {
//   addItem: (type: ITEM_TYPE, model: ModelConfig) => Node | Edge;
//   updateItem<T extends  string | IItem>(item: T, cfg: ModelConfig): void;
//   removeItem: (item: Node & Edge) => void;
//   setItemState: (item, state: string, enabled: boolean) => void;
//   clearItemStates: (item: string | Node & Edge, states: string[]) => void;
//   refreshItem: (item: Node & Edge) => void;
//   changeItemVisibility: (item, visible: boolean) => void;
//   destroy: () => void;
// }

// enum ITEM_TYPE {
//   NODE = 'node',
//   EDGE = 'edge'
// }

// const NODE = 'node';
// const EDGE = 'edge';
// const CFG_PREFIX = 'default';
// const MAPPER_SUFFIX = 'Mapper';
// const STATE_SUFFIX = 'stateStyles';
// const hasOwnProperty = Object.hasOwnProperty;

// export default class ItemController implements IItemConstroller {
//   private graph: Graph
//   constructor(graph: Graph) {
//     this.graph = graph
//   }

//   /**
//    * 增加 Item 实例
//    *
//    * @param {ITEM_TYPE} type 实例类型，node 或 edge
//    * @param {(NodeConfig & EdgeConfig)} model 数据模型
//    * @returns {(Node | Edge)}
//    * @memberof ItemController
//    */
//   public addItem(type: ITEM_TYPE, model: NodeConfig & EdgeConfig): Node | Edge {
//     const graph = this.graph;
//     const parent: Group = graph.get(type + 'Group') || graph.get('group');
//     const upperType = upperFirst(type);

//     let item;
//     let styles = graph.get(type + upperFirst(STATE_SUFFIX)) || {};
//     const defaultModel = graph.get(CFG_PREFIX + upperType);
//     const mapper = graph.get(type + MAPPER_SUFFIX);

//     if (mapper) {
//       const mappedModel = mapper(model);
//       if (mappedModel[STATE_SUFFIX]) {
//         styles = mappedModel[STATE_SUFFIX];
//         delete mappedModel[STATE_SUFFIX];
//       }

//       // 如果配置了 defaultEdge 或 defaultNode，则将默认配置的数据也合并进去
//       model = deepMix({}, defaultModel, model, mappedModel);
//     } else if (defaultModel) {
//       // 很多布局会直接修改原数据模型，所以不能用 merge 的形式，逐个写入原 model 中
//       each(defaultModel, (val, cfg) => {
//         if (!hasOwnProperty.call(model, cfg)) {
//           if (isObject(val)) {
//             model[cfg] = clone(val);
//           } else {
//             model[cfg] = defaultModel[cfg];
//           }
//         }
//       });
//     }

//     graph.emit('beforeadditem', { type, model });

//     if(type === EDGE) {
//       let source: string | IItem = model.source
//       let target: string | IItem = model.target

//       if (source && isString(source)) {
//         source = graph.findById(source);
//       }
//       if (target && isString(target)) {
//         target = graph.findById(target);
//       }

//       if (!source || !target) {
//         console.warn('The source or target node of edge ' + model.id + ' does not exist!');
//         return;
//       }

//       item = new Edge({
//         model,
//         source,
//         target,
//         styles,
//         linkCenter: graph.get('linkCenter'),
//         group: parent.addGroup()
//       })
//     } else if(type === NODE) {
//       item = new Node({
//         model,
//         styles,
//         group: parent.addGroup()
//       })
//     }

//     graph.get(type + 's').push(item);
//     graph.get('itemMap')[item.get('id')] = item;
//     graph.autoPaint();
//     graph.emit('afteradditem', { item, model });
//     return item;
//   }

//   public updateItem(item: string | Node | Edge, cfg: EdgeConfig | NodeConfig) {
//     const graph = this.graph;
    
//     if (isString(item)) {
//       item = graph.findById(item) as Node | Edge;
//     }

//     if (!item || item.destroyed) {
//       return;
//     }

//     // 更新的 item 的类型
//     const type = item.getType()

//     const mapper = graph.get(type + MAPPER_SUFFIX)
//     const model = item.getModel()

//     if(mapper) {
//       const result: ModelConfig = deepMix({}, model, cfg);
//       const mappedModel: ModelConfig = mapper(result);
//       // 将 update 时候用户传入的参数与mapperModel做deepMix，以便复用之前设置的参数值
//       const newModel: ModelConfig = deepMix({}, model, mappedModel, cfg);
      
//       if (mappedModel[STATE_SUFFIX]) {
//         item.set('styles', newModel[STATE_SUFFIX]);
//         delete newModel[STATE_SUFFIX];
//       }

//       each(newModel, (val, key) => {
//         cfg[key] = val;
//       });
//     } else {
//       // merge update传进来的对象参数，model中没有的数据不做处理，对象和字符串值也不做处理，直接替换原来的
//       each(cfg, (val, key) => {
//         if (model[key]) {
//           if (isObject(val) && isArray(val)) {
//             cfg[key] = Object.assign({}, model[key], cfg[key]);
//           }
//         }
//       });
//     }

//     // emit beforeupdateitem 事件
//     graph.emit('beforeupdateitem', { item, cfg });

//     if(type === EDGE) {
//       // 若是边要更新source || target, 为了不影响示例内部model，并且重新计算startPoint和endPoint，手动设置
//       if (cfg.source) {
//         let source = cfg.source;
//         if (isString(source)) {
//           source = graph.findById(source);
//         }
//         item.setSource(source);
//       }
//       if (cfg.target) {
//         let target = cfg.target;
//         if (isString(target)) {
//           target = graph.findById(target);
//         }
//         item.setTarget(target);
//       }
//     }

//     item.update(cfg)
    
//     if(type === NODE) {
//       const autoPaint = graph.get('autoPaint');
//       graph.setAutoPaint(false);
//       each(item.getEdges(), edge => {
//         graph.refreshItem(edge);
//       });
//       graph.setAutoPaint(autoPaint);
//     }

//     graph.autoPaint();
//     graph.emit('afterupdateitem', { item, cfg });
//   }
// }