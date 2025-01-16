import Vue from 'vue'
import { Checkbox, CheckboxButton, CheckboxGroup, Input, Button, Transfer } from 'element-ui'

Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Input)
Vue.use(Button)
Vue.use(Transfer)

import SimpleTransfer from './SimpleTransfer.vue'
// global css
import '@/comStyles/global.scss'

export default {
  title: 'Components/transfer/SimpleTransfer',
  component: SimpleTransfer,
  argTypes: {
    value: {
      name: 'value',
      description: '绑定值'
    },
    data: {
      name: 'data',
      description: '数据源'
    },
    props: {
      name: 'props',
      description: '数据源的字段别名'
    },
    titles: {
      name: 'titles',
      description: '自定义列表标题'
    },
    buttonTexts: {
      name: 'buttonTexts',
      description: '自定义按钮文案'
    },
    filterable: {
      name: 'filterable',
      description: '是否可搜索'
    },
    filterPlaceholder: {
      name: 'filterPlaceholder',
      description: '搜索框占位符'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { SimpleTransfer },
  props: Object.keys(argTypes),
  template: `
    <simple-transfer v-bind="$props" v-model="$props.value" />
  `
})

export const Default = Template.bind({})
Default.args = {
  value: ['1'],
  titles: ['可选数据', '已选数据'],
  buttonTexts: ['添加', '移除'],
  data: [{ key: '1', label: '张三' }, { key: '2', label: '李四' }, { key: '3', label: '王五' }],
  filterPlaceholder: '请输入名称',
  filterable: true
}

