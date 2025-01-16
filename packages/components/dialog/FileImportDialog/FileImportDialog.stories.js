import Vue from 'vue'
import { Dialog, Alert, Form, FormItem, Upload, Button } from 'element-ui'

Vue.use(Dialog)
Vue.use(Alert)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Upload)
Vue.use(Button)

import FileImportDialog from './FileImportDialog.vue'
import { action } from '@storybook/addon-actions'
import mdx from './FileImportDialog.mdx'
// global css
import '@/comStyles/global.scss'

export default {
  title: 'Components/dialog/FileImportDialog',
  component: FileImportDialog,
  argTypes: {
    title: {
      name: 'title',
      description: '标题'
    },
    visible: {
      name: 'visible',
      description: '是否显示'
    },
    accept: {
      name: 'accept',
      description: '文件类型'
    },
    onDownFile: {
      name: 'onDownFile',
      description: '下载样例'
    },
    onUploadFile: {
      name: 'onUploadFile',
      description: '上传文件'
    }
  },
  parameters: {
    docs: {
      page: mdx
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { FileImportDialog },
  props: Object.keys(argTypes),
  template: `
    <file-import-dialog v-bind="$props">
      <template slot="warning">
        <p>1、中文名称、英文名称不能重复</p>
        <p>2、必填字段不能为空</p>
      </template>
    </file-import-dialog>
  `
})

export const Default = Template.bind({})
Default.args = {
  onDownFile: action('下载样例函数'),
  onUploadFile: action('上传文件函数'),
  visible: true
}
