if (typeof window !== 'undefined') {
  window.onresize = () => {
    const { graph, container, widthOffset = 0, heightOffset = 0 } = window as any;

    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize(container.scrollWidth + widthOffset, container.scrollHeight + heightOffset);
  };
}
