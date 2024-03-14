const itTemplate = ({ kebabName, camelName }) => {
  return `it('${camelName}', async () => {
    const graph = await createDemoGraph(${camelName});
    await expect(graph).toMatchSnapshot(__filename, '${kebabName}');
    graph.destroy();
  });`;
};

module.exports = itTemplate;
