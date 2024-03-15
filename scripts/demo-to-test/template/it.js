const itTemplate = ({ camelName, sampleKebabName, sampleKebabNameWithSpace }) => {
  return `it('${sampleKebabNameWithSpace}', async () => {
    const graph = await createDemoGraph(${camelName});
    await expect(graph).toMatchSnapshot(__filename, '${sampleKebabName}');
    graph.destroy();
  });`;
};

module.exports = itTemplate;
