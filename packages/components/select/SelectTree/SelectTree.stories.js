import Vue from 'vue'
import { Input, Tree, Row, Col, Tooltip, Tag } from 'element-ui'

Vue.use(Input)
Vue.use(Tree)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tooltip)
Vue.use(Tag)

import SelectTree from './SelectTree.vue'
// global css
import '@/comStyles/global.scss'

export default {
  title: 'Components/select/SelectTree',
  component: SelectTree,
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
    isBottom: {
      name: 'is-bottom',
      description: '是否固定弹窗位置-朝下'
    },
    disabled: {
      name: 'disabled',
      description: '是否禁用'
    },
    placeholder: {
      name: 'placeholder',
      description: '搜索提示语'
    },
    showCheckedBox: {
      name: 'showCheckedBox',
      description: '是否显示勾选面板(checkbox)'
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
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { SelectTree },
  props: Object.keys(argTypes),
  template: `
    <select-tree v-model="$props.selected" :init-data="$props.initData" :type="$props.type" v-bind="$props" />
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
  },
  isBottom: true
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
  },
  isBottom: true
}

