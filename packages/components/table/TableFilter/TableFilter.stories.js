import Vue from 'vue'
import { Table, TableColumn, Pagination, Link, Popover } from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Link)
Vue.use(Popover)

import TableFilter from './TableFilter.vue'
import { action } from '@storybook/addon-actions'
import mdx from './TableFilter.mdx'
// global css
import '@/comStyles/globalForE.scss'

export default {
  title: 'Components/table/TableFilter',
  component: TableFilter,
  argTypes: {
    noPagination: {
      name: 'noPagination',
      description: '是否显示分页'
    },
    data: {
      name: 'data',
      description: '表格数据。有分页时为对象类型，无分页时（noPagination:true）为数组类型'
    },
    column: {
      name: 'column',
      description: '表头数据'
    },
    emptyCol: {
      name: 'emptyCol',
      description: '空值时，单元格显示的字符串。默认为"--"。'
    },
    ctrFilter: {
      name: 'ctrFilter',
      description: '是否开启表头栏筛选，默认关闭'
    },
    paginationChange: {
      name: 'paginationChange',
      description: '分页时执行的函数，会传递{ current, pageSize, total }，注意是对象，需要解构。'
    }
  },
  parameters: {
    docs: {
      page: mdx
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { TableFilter },
  props: Object.keys(argTypes),
  template: `
    <table-filter v-bind="$props" @paginationChange="onChange">
      <template v-slot:footBtn>
        <el-link type="primary" :underline="false">批量删除</el-link>
      </template>
    </table-filter>
  `,
  methods: {
    onChange: action('paginationChange')
  }
})

export const Default = Template.bind({})
Default.args = {
  ctrFilter: true,
  column: [
    { type: 'selection' },
    { type: 'index', width: 70, label: '序号' },
    { prop: 'date', label: '日期' },
    { prop: 'name', label: '姓名' },
    { prop: 'address', label: '地址', showOverflowTooltip: true, toolTipCfg: { width: '200px' } },
    { prop: 'description', label: '描述', showOverflowTooltip: true }
  ],
  data: {
    currentPage: 1,
    pageSize: 10,
    total: 15,
    list: [
      {
        date: '2016-05-02',
        name: '王小虎',
        address: 'wertwertweryertyerturtyu 1518 1123 45645wertwertwert 123123twertweryertyerturtyu 1518 1123 45645wertwertwert 123123'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄',
        description: 0
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        description: '详细描述详细描述详细描述详细描述详细描述详细描述详细描述详细描述详细描述详细描述'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }
    ]
  }
}

export const Nopagination = Template.bind({})
Nopagination.args = {
  noPagination: true,
  column: [
    { prop: 'date', label: '日期' },
    { prop: 'name', label: '姓名' },
    { prop: 'address', label: '地址' }
  ],
  data: [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }
  ]
}
