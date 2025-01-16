import _ from 'lodash'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@plugin/icss-plugin/lib/utils/storage'

// 必须有getData方法来提供查询
// paginationChange方法必须有current, pageSize参数（对象形式）

export default {
  name: 'search',
  data() {
    return {
      queryKey: 'query:' + location.pathname,
      current: 1,
      pageSize: 10,
      searchForm: {},
      formCopy: {},
      resetForm: {},
      isCacheQuery: false
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      // 设置重置初始值
      _this.resetForm = _.cloneDeep(_this.searchForm)
      if (_this.queryKey) {
        // 回显
        const { searchForm, current, pageSize } = _this.getQuery() || {}
        if (searchForm && current && pageSize) {
          _this.isCacheQuery = true
          if (typeof (_this.loadQuery) !== 'function') {
            _this.current = current
            _this.pageSize = pageSize
            _this.searchForm = searchForm
            _this.searchChangeCurrent(current)
          } else {
            // 特殊子页面进行处理，参数为回显查询参数，页码，每页条数
            _this.loadQuery({ searchForm, current, pageSize })
          }
        } else {
          if (typeof (_this.loadQuery) !== 'function') {
            _this.search()
          } else {
            _this.loadQuery({ searchForm: null, current: this.current, pageSize: this.pageSize })
          }
        }
      }
    })
  },
  methods: {
    // 保存查询参数
    setQuery(object) {
      const _this = this
      if (_this.queryKey) {
        // 比对参数，和初始条件一样则清除
        if (JSON.stringify(object) === JSON.stringify({
          searchForm: { ..._this.resetForm },
          current: 1,
          pageSize: 10
        })) {
          removeLocalStorage(_this.queryKey)
        } else {
          setLocalStorage(_this.queryKey, object)
        }
      }
    },
    // 提取查询参数
    getQuery() {
      const _this = this
      return JSON.parse(getLocalStorage(_this.queryKey) || '{}')
    },
    // 删除查询参数
    clearQuery() {
      const _this = this
      if (_this.queryKey) removeLocalStorage(_this.queryKey)
    },
    // 根据参数，获取查询结果
    async getData() {
    },
    // 不更新条件参数，进行查询
    searchQuery: _.debounce(function() {
      this.setQuery({ searchForm: { ...this.formCopy }, current: this.current, pageSize: this.pageSize })
      this.getData(this.formCopy)
    }, 200, { 'leading': true, 'maxWait': 500 }),
    searchChange: _.debounce(async function() {
      this.setQuery({ searchForm: { ...this.searchForm }, current: this.current, pageSize: this.pageSize })
      await this.getData(this.searchForm)
      this.isCacheQuery = false
    }, 200, { 'leading': true, 'maxWait': 500 }),
    searchChangeCurrent(current) {
      this.formCopy = _.cloneDeep(this.searchForm)
      this.current = /^\d+$/.test(current) ? parseInt(current) : this.current
      this.searchChange()
    },
    // 更新条件参数，进行查询
    search() {
      this.searchChangeCurrent(1)
    },
    // 翻页
    paginationChange({ current = this.current, pageSize = this.pageSize }) {
      Object.assign(this, { current, pageSize })
      this.searchQuery()
    },
    // 重置
    reset() {
      Object.assign(this.searchForm, this.resetForm)
      this.search()
    },
    // 刷新
    refresh() {
      Object.assign(this.searchForm, this.formCopy)
      this.searchChangeCurrent(this.current)
    }
  }
}

