import Vue from 'vue'
import { Checkbox, CheckboxGroup as ELCheckboxGroup } from 'element-ui'

Vue.use(Checkbox)
Vue.use(ELCheckboxGroup)

import CheckboxGroup from './CheckboxGroup.vue'
// global css
import '@/comStyles/global.scss'

export default {
  title: 'Components/checkbox/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    initData: {
      name: 'init-data',
      description: '数据源'
    },
    selected: {
      name: 'selected',
      description: '选中节点',
      table: {
        type: { summary: 'array' },
        category: 'props'
      }
    },
    'v-model': {
      name: 'v-model',
      description: 'selected值的双向绑定',
      control: '-',
      table: {
        type: { summary: 'array' },
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
  components: { CheckboxGroup },
  props: Object.keys(argTypes),
  template: `
    <checkbox-group v-model="$props.selected" :init-data="$props.initData" v-bind="$props" />
  `
})

export const Default = Template.bind({})
Default.args = {
  initData: [
    { key: '1', value: '星期一' },
    { key: '2', value: '星期二' },
    { key: '3', value: '星期三' },
    { key: '4', value: '星期四' },
    { key: '5', value: '星期五' },
    { key: '6', value: '星期六' },
    { key: '7', value: '星期日' }
  ],
  selected: ['3']
}

