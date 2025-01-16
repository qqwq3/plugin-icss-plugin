// 组件导出
import FormItemTip from '../packages/components/form/FormItem'
import FileImportDialog from '../packages/components/dialog/FileImportDialog'
import FileExportDialog from '../packages/components/dialog/FileExportDialog'
import CheckboxGroup from '../packages/components/checkbox/CheckboxGroup'
import TableFilter from '../packages/components/table/TableFilter'
import CtrBtnFilter from '../packages/components/table/CtrBtnFilter'
import Progress from '../packages/components/progress/Progress'
import Timeline from '../packages/components/timeline/Timeline/Timeline'
import TitleIndicate from '../packages/components/title/TitleIndicate/TitleIndicate'
import ToolTipWithEllipsis from '../packages/components/toolTip/ToolTipWithEllipsis'
import SimpleTransfer from '../packages/components/transfer/SimpleTransfer'
import SwapTransfer from '../packages/components/transfer/SwapTransfer'
import CateTree from '../packages/components/tree/CateTree'
import MenuTree from '../packages/components/tree/MenuTree'
import SelectListAsyn from '../packages/components/select/SelectListAsyn'
import SelectButtonTree from '../packages/components/select/SelectButtonTree'
import SelectTree from '../packages/components/select/SelectTree'
import WaterfallSelect from '../packages/components/select/WaterfallSelect'
import YearRange from '../packages/components/yearRange/YearRange'
import AsideWithCollapse from '../packages/components/layouts/AsideWithCollapse'

// 工具类导出
import utils from '@/utils'

const components = [
  FormItemTip,
  FileImportDialog,
  FileExportDialog,
  CheckboxGroup,
  TableFilter,
  CtrBtnFilter,
  Progress,
  Timeline,
  TitleIndicate,
  ToolTipWithEllipsis,
  SimpleTransfer,
  SwapTransfer,
  CateTree,
  MenuTree,
  SelectListAsyn,
  SelectButtonTree,
  SelectTree,
  WaterfallSelect,
  YearRange,
  AsideWithCollapse
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  utils,
  install,
  FormItemTip,
  FileImportDialog,
  FileExportDialog,
  CheckboxGroup,
  TableFilter,
  CtrBtnFilter,
  Progress,
  Timeline,
  TitleIndicate,
  ToolTipWithEllipsis,
  SimpleTransfer,
  SwapTransfer,
  CateTree,
  MenuTree,
  SelectListAsyn,
  SelectButtonTree,
  SelectTree,
  WaterfallSelect,
  YearRange,
  AsideWithCollapse
}
