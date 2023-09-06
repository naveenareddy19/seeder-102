import { Meta, StoryFn } from '@storybook/react';
import { CircularProgressBar } from '.';

export default {
  title: 'Atoms/CircularProgressBar',
  component: CircularProgressBar,
} as Meta;

const Template: StoryFn<{ value: number }> = (args) => <CircularProgressBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: 75
};
