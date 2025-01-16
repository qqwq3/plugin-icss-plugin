import Vue from 'vue'
import { Select, Option } from 'element-ui'

Vue.use(Select)
Vue.use(Option)

import WaterfallSelect from './WaterfallSelect.vue'
// global css
import '@/comStyles/global.scss'

export default {
  title: 'Components/select/WaterfallSelect',
  component: WaterfallSelect,
  argTypes: {
    value: {
      name: 'value',
      description: '选中值',
      table: {
        type: { summary: 'string' },
        category: 'props'
      }
    },
    props: {
      name: 'props',
      description: '组件参数'
    },
    dataList: {
      name: 'dataList',
      description: '实时数据列表',
      control: '-',
      table: {
        type: { summary: 'array' },
        category: 'props'
      }
    },
    'v-model': {
      name: 'v-model',
      description: 'value值的双向绑定',
      control: '-',
      table: {
        type: { summary: 'string' },
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
    'update:dataList': {
      name: '-',
      description: '-',
      control: '-',
      table: {
        category: 'props'
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { WaterfallSelect },
  props: Object.keys(argTypes),
  template: `
    <WaterfallSelect v-model="$props.value" :props="$props.props" />
  `
})

export const Default = Template.bind({})
Default.args = {
  value: '1',
  props: {
    query: 'name', // 查询字段
    label: 'name', // 显示字段
    value: 'id', // 值字段
    apiMethod: (val) => {
      return Promise.resolve({ data: { list: [{ id: '1', name: '张三' }, { id: '2', name: '李四' }], total: 2 } })
    },
    single: { id: '1', name: '张三' }
  }
}
