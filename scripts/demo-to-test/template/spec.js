const specTemplate = ({ imported, content, describe }) => {
  return `import {
    ${imported}
  } from '@@/demo/case';
  import { createDemoGraph } from '@@/utils';

  describe('${describe}', () => {
    ${content}
  })`;
};

module.exports = specTemplate;
