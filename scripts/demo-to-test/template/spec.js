const specTemplate = ({ imported, content }) => {
  return `import {
    ${imported}
  } from '@@/demo/case';
  import { createDemoGraph } from '@@/utils';

  describe('layout circular', () => {
    ${content}
  })`;
};

module.exports = specTemplate;
