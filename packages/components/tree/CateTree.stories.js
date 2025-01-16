import Vue from 'vue'
import { Tree } from 'element-ui'

Vue.use(Tree)

import CateTree from './CateTree.vue'
import { action } from '@storybook/addon-actions'
import mdx from './CateTree.mdx'
// global css
import '@/comStyles/global.scss'

export default {
  title: 'Components/tree/CateTree',
  component: CateTree,
  argTypes: {
    loadNode: {
      name: 'loadNode',
      description: '异步加载数据函数',
      control: '-',
      table: {
        category: 'events'
      }
    },
    handleNodeClick: {
      name: 'handleNodeClick',
      type: 'function',
      description: '点击节点触发函数',
      control: '-'
    }
  },
  parameters: {
    docs: {
      page: mdx
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { CateTree },
  props: Object.keys(argTypes),
  template: `
    <cate-tree v-bind="$props" @loadNode="$props.loadNode" @handleNodeClick="$props.handleNodeClick" />
  `
})

export const Default = Template.bind({})
Default.args = {
  loadNode: function(nodeId, callback) {
    const arr = []
    for (let i = 0; i < 5; i++) {
      const nodeId = Math.ceil(Math.random() * 10000)
      arr.push({
        id: nodeId,
        name: 'Tree Node ' + nodeId,
        isLeaf: nodeId < 5000
      })
    }
    callback(arr)
  },
  handleNodeClick: action('点击节点触发函数')
}

