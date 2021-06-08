import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import { BasicDemo, BasicProps } from './Basic';

export default {
  title: 'Example/basic-demo',
  component: BasicDemo,
};

const Template = (args) => <BasicDemo {...args} />;

export const MobileBasicDemo = Template.bind({});
MobileBasicDemo.args = {};
