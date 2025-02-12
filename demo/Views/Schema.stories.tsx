import React from 'react'
import { Story, Meta } from '@storybook/react'
import Schema from '../../src/components/Views/Schema'

export default {
  title: 'Views/Schema',
  component: Schema,
} as Meta

const Template: Story<Parameters<typeof Schema>[0]> = (args) => <Schema {...args} />

export const Default = Template.bind({})
Default.args = {
  descriptor: {
    fields: [
      { name: 'id', type: 'integer', format: 'default' },
      { name: 'name', type: 'string', format: 'default' },
    ],
    missingValues: [''],
  },
  onCommit: (schema: any) => console.log(schema),
  onRevert: (schema: any) => console.log(schema),
}
