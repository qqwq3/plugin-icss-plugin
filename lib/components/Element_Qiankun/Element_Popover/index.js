import Popover from './main'
import directive from './directive'
import Vue from 'vue'

Vue.directive('popover', directive)

/* istanbul ignore next */
Popover.install = function(Vue) {
  Vue.directive('popover', directive)
  Vue.component(Popover.name, Popover)
}
Popover.directive = directive

export default Popover
export { Popover }
