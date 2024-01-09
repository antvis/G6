// import { registry } from '../plugin';
// import { Graph } from '../runtime/graph';
// import { BehaviorRegistry } from '../types/behavior';
// import { EdgeRegistry } from '../types/edge';
// import { LayoutRegistry } from '../types/layout';
// import { NodeRegistry } from '../types/node';
// import { PluginRegistry } from '../types/plugin';
// import { ThemeSolverRegistry } from '../types/theme';

// /**
//  * Extend graph class with custom libs (extendLibrary), and extendLibrary will be merged into useLib.
//  * B1 is the Behavior lib from user, B2 is the Behavior lib of the graph to be extended(built-in graph)
//  * TODO: more templates, and might be merged to be two templates for the whole extendLibrary
//  */
// export const extend = <
//   B1 extends BehaviorRegistry,
//   B2 extends BehaviorRegistry,
//   T1 extends ThemeSolverRegistry,
//   T2 extends ThemeSolverRegistry,
// >(
//   GraphClass: typeof Graph<B2, T2>,
//   extendLibrary: {
//     behaviors?: B1;
//     themeSolvers?: T1;
//     nodes?: NodeRegistry;
//     edges?: EdgeRegistry;
//     layouts?: LayoutRegistry;
//     plugins?: PluginRegistry;
//   },
// ): typeof Graph<B1 & B2, T1 & T2> => {
//   // merged the extendLibrary to useLib for global usage
//   Object.keys(extendLibrary).forEach((cat) => {
//     registry.useLib[cat] = Object.assign({}, registry.useLib[cat], extendLibrary[cat] || {});
//     Object.keys(registry.useLib[cat]).forEach((type) => {
//       const extension = registry.useLib[cat][type];
//       extension.type = type;
//     });
//   });
//   return GraphClass as any;
// };
