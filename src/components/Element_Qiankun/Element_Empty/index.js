import Empty from './main'

Empty.install = (Vue) => {
  Vue.component(Empty.name, Empty)
}

export default Empty
export { Empty }
