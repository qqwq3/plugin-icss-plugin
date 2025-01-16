import Vue from 'vue'
import { Dialog, Form, FormItem, InputNumber, Tag, Button } from 'element-ui'

Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(InputNumber)
Vue.use(Tag)
Vue.use(Button)

import FileExportDialog from './FileExportDialog.vue'
import { action } from '@storybook/addon-actions'
import mdx from './FileExportDialog.mdx'
// global css
import '@/comStyles/global.scss'

export default {
  title: 'Components/dialog/FileExportDialog',
  component: FileExportDialog,
  argTypes: {
    title: {
      name: 'title',
      description: '标题'
    },
    visible: {
      name: 'visible',
      description: '是否显示'
    },
    columns: {
      name: 'columns',
      description: '导出字段'
    },
    onDownFile: {
      name: 'onDownFile',
      description: '导出列表函数'
    }
  },
  parameters: {
    docs: {
      page: mdx
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { FileExportDialog },
  props: Object.keys(argTypes),
  template: `
    <file-export-dialog v-bind="$props" />
  `
})

export const Default = Template.bind({})
Default.args = {
  columns: [
    { code: 'name', name: '姓名' },
    { code: 'date', name: '日期' },
    { code: 'address', name: '地址' }
  ],
  onDownFile: action('导出列表函数'),
  visible: true
}
