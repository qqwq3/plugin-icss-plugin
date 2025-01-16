import Vue from 'vue'
import SelectListAsyn from './SelectListAsyn.vue'
import { action } from '@storybook/addon-actions'
import mdx from './SelectListAsyn.mdx'
// global css
import '@/comStyles/global.scss'

import { InfiniteScroll, Loading, Select, Option } from 'element-ui'

Vue.use(InfiniteScroll)
Vue.use(Loading.directive)
Vue.use(Select)
Vue.use(Option)

export default {
  title: 'Components/select/SelectListAsyn',
  component: SelectListAsyn,
  argTypes: {
    width: {
      name: 'width',
      description: '宽度，默认200px'
    },
    asyn: {
      name: 'asyn',
      description: '是否创建时立即查询列表。默认false，需手动调用getList方法来查询列表。'
    },
    apiFn: {
      name: 'apiFn',
      description: '查询列表的方法，需返回promise函数'
    },
    valueKey: {
      name: 'valueKey',
      description: '对应取值的关键字和显示用的关键字，默认为 { label: \'label\', value: \'id\' }'
    },
    disabledOption: {
      name: 'disabledOption',
      description: '数组形式，内含需禁用的选项列表id（valueKey中的value字段）'
    },
    defaultVal: {
      name: 'defaultVal',
      description: '默认选中的值，支持数组或对象。单选状态下仅支持对象形式。对象结构尽量与查询列表中返回的数据对象结构一致。'
    }
  },
  parameters: {
    docs: {
      page: mdx
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { SelectListAsyn },
  props: Object.keys(argTypes),
  template: `
    <SelectListAsyn v-bind="$props" @change="onChange" :api-fn="getList" />
  `,
  methods: {
    onChange: action('change'),
    getList(params) {
      return Promise.resolve({
        data: {
          list: Array.from({ length: 10 }, (v, i) => ({
            label: `第${params.pageSize * (params.currentPage - 1) + i + 1}项`,
            id: params.pageSize * (params.currentPage - 1) + i + 1
          })),
          total: 1000
        }
      })
    }
  }
})

export const Default = Template.bind({})
Default.args = {
  width: '300px',
  multiple: true,
  disabledOption: [2, 3, 4],
  defaultVal: [{ label: '第5项', id: 5 }, { label: '第6项', id: 6 }, { label: '第20项', id: 20 }]
}
