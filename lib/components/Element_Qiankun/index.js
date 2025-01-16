import { Cascader } from './Element_Cascader'
import { Dialog } from './Element_Dialog'
import { Empty } from './Element_Empty'
import { Popover } from './Element_Popover'
import { MessageBox } from './Element_MessageBox'
import { Notification } from './Element_Notification'

const ElementQiankun = {
  // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
  install: function(Vue, serverName) {
    Cascader.props.wrapperAttr.default = () => ({ 'data-qiankun': serverName })
    Dialog.props.wrapperAttr.default = () => ({ 'data-qiankun': serverName })
    Dialog.props.customClass.default = serverName
    Dialog.props.closeOnPressEscape.default = false
    Popover.props.wrapperAttr.default = () => ({ 'data-qiankun': serverName })
    MessageBox.setDefaults({
      customClass: serverName,
      wrapperAttr: { 'data-qiankun': serverName }
    })
    Notification.setDefaults({ wrapperAttr: { 'data-qiankun': serverName } })
    Vue.use(Cascader)
    Vue.use(Dialog)
    Vue.use(Empty)
    Vue.use(Popover)
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$notify = Notification
  }
}
// 导出
export default ElementQiankun
