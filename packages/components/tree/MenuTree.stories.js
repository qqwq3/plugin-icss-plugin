import Vue from 'vue'
import { Input, Tree, Button } from 'element-ui'

Vue.use(Input)
Vue.use(Tree)
Vue.use(Button)

import MenuTree from './MenuTree.vue'
import mdx from './MenuTree.mdx'
// global css
import '@/comStyles/global.scss'

export default {
  title: 'Components/tree/MenuTree',
  component: MenuTree,
  argTypes: {
    data: {
      name: 'data',
      description: '数据源',
      table: {
        category: 'props'
      }
    },
    props: {
      name: 'props',
      description: '数据源的字段别名',
      table: {
        category: 'props'
      }
    },
    selected: {
      name: 'selected',
      description: '初始选中节点',
      table: {
        category: 'props'
      }
    },
    placeholder: {
      name: 'placeholder',
      description: '搜索框占位符',
      table: {
        category: 'props'
      }
    },
    searchFlag: {
      name: 'searchFlag',
      description: '是否开启搜索框，默认开启',
      table: {
        category: 'props'
      }
    },
    'rootName': {
      name: 'root-name',
      description: '根节点名称',
      table: {
        category: 'props'
      }
    },
    'nodeKey': {
      name: 'node-key',
      description: '节点唯一标识字段名称',
      table: {
        category: 'props'
      }
    },
    'defaultExpandAll': {
      name: 'default-expand-all',
      description: '是否默认展开所有节点',
      table: {
        category: 'props'
      }
    },
    'node-click': {
      name: 'node-click',
      description: '点击节点触发函数',
      control: '-',
      table: {
        category: 'events'
      }
    },
    default: {
      name: 'default',
      description: '自定义节点展示',
      control: '-',
      table: {
        type: { summary: 'html' },
        category: 'slot'
      }
    }
  },
  parameters: {
    docs: {
      page: mdx
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { MenuTree },
  props: Object.keys(argTypes),
  template: `
    <menu-tree v-bind="$props">
      <template v-if="$scopedSlots.default" v-slot:default="{ node, data, filterText }">
        <slot :node="node" :data="data" :filterText="filterText" />
      </template>
    </menu-tree>
  `
})

export const Default = Template.bind({})
Default.args = {
  placeholder: '请输入名称',
  rootName: '组织机构',
  nodeKey: 'id',
  defaultExpandAll: true,
  data: [
    { id: '1', label: 'A部门', children: [{ id: '11', label: 'A1小组' }] },
    {
      id: '2',
      label: 'B部门',
      children: [{ id: '21', label: 'B1小组' }, { id: '22', label: 'B2小组' }]
    }
  ],
  selected: '1'
}

