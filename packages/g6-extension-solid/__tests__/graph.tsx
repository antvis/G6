/* @jsx preserve */
/* @jsxImportSource solid-js */
import { Graph as G6Graph, GraphOptions } from '@antv/g6';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';

export interface GraphProps {
  options: GraphOptions;
  onRender?: (graph: G6Graph) => void;
  onDestroy?: () => void;
}

export const Graph = (props: GraphProps) => {
  const [graph, setGraph] = createSignal<G6Graph>();
  let container!: HTMLDivElement;

  const setGraphOptions = async (options: GraphOptions) => {
    const g = graph();
    if (!g) return;

    g.setOptions(options);

    await g.render();
    props.onRender?.(g);
  };

  onMount(() => {
    const graph = new G6Graph({ container });
    setGraph(graph);

    createEffect(() => {
      void setGraphOptions(props.options);
    });

    onCleanup(() => {
      graph.destroy();
      props.onDestroy?.();
      setGraph(undefined);
    });
  });

  return <div ref={container} style={{ width: '100%', height: '100%' }} />;
};
