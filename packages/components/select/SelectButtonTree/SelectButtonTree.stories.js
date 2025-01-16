import Vue from 'vue'
import { Button, Tree } from 'element-ui'

Vue.use(Button)
Vue.use(Tree)

import SelectButtonTree from './SelectButtonTree.vue'
// global css
import '@/comStyles/global.scss'

export default {
  title: 'Components/select/SelectButtonTree',
  component: SelectButtonTree,
  argTypes: {
    initData: {
      name: 'init-data',
      description: '数据源'
    },
    type: {
      name: 'type',
      description: '复选(checkbox)、单选(radio)'
    },
    selected: {
      name: 'selected',
      description: '选中节点',
      table: {
        type: { summary: ['array', 'object'] },
        category: 'props'
      }
    },
    nodeKey: {
      name: 'node-key',
      description: 'el-tree 组件参数'
    },
    props: {
      name: 'props',
      description: 'el-tree 组件参数'
    },
    'v-model': {
      name: 'v-model',
      description: 'selected值的双向绑定',
      control: '-',
      table: {
        type: { summary: ['array', 'object'] },
        category: 'props'
      }
    },
    'change': {
      name: 'change',
      description: '选中数据变更触发函数',
      control: '-',
      table: {
        category: 'events'
      }
    },
    'buttonText': {
      name: 'button-text',
      description: '按钮显示内容',
      control: '-',
      table: {
        type: { summary: ['html'] }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { SelectButtonTree },
  props: Object.keys(argTypes),
  template: `
    <select-button-tree v-model="$props.selected" :init-data="$props.initData" :type="$props.type" v-bind="$props" />
  `
})

export const Checkbox = Template.bind({})
Checkbox.args = {
  initData: [
    { id: '1', name: 'A部门', children: [{ id: '11', name: 'A1小组' }] },
    {
      id: '2',
      name: 'B部门',
      children: [{ id: '21', name: 'B1小组' }, { id: '22', name: 'B2小组' }]
    }
  ],
  type: 'checkbox',
  selected: [{ id: '1' }],
  nodeKey: 'id',
  props: {
    label: 'name',
    children: 'children',
    disabled: 'disabled',
    isLeaf: 'isLeaf'
  }
}

export const Radio = Template.bind({})
Radio.args = {
  initData: [
    { id: '1', name: 'A部门', children: [{ id: '11', name: 'A1小组' }] },
    {
      id: '2',
      name: 'B部门',
      children: [{ id: '21', name: 'B1小组' }, { id: '22', name: 'B2小组' }]
    }
  ],
  type: 'radio',
  selected: { id: '1' },
  nodeKey: 'id',
  props: {
    label: 'name',
    children: 'children',
    disabled: 'disabled',
    isLeaf: 'isLeaf'
  }
}

