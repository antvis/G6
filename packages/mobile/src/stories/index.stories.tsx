import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { BasicDemo, BasicProps } from './Basic';

export default {
  title: 'Example/basic-demo',
  component: BasicDemo,
} as Meta;

const Template: Story<BasicProps> = (args) => <BasicDemo {...args} />;

export const MobileBasicDemo = Template.bind({});
MobileBasicDemo.args = {};
