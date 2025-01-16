<template>
  <el-select
    v-model="waterfallSelect"
    v-el-select-scroll="handlerScroll"
    clearable
    filterable
    remote
    :remote-method="searchData"
    v-bind="$attrs"
    @focus="clearData"
    @clear="clearData"
    @change="changeData"
  >
    <el-option
      v-for="item in list"
      :key="item[config.value]"
      :label="item[config.label]"
      :value="item[config.value]"
    />
    <el-option
      v-show="loading"
      style="text-align: center;color: var(--color-text-secondary);cursor: default;"
      :disabled="true"
      value="********"
    >
      <span class="el-tree-node__loading-icon el-icon-loading" />加载中...
    </el-option>
    <el-option
      v-show="noData"
      style="text-align: center;color: var(--color-text-secondary);cursor: default;"
      :disabled="true"
      value="********"
    >暂无数据
    </el-option>
  </el-select>
</template>

<script>

export default {
  name: 'WaterfallSelect',
  model: {
    prop: 'value', // 指向props的参数名
    event: 'change' // 事件名称
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default: () => (this.initProps())
    },
    dataList: {
      default: () => {
      },
      validator: (value) => value instanceof Object
    }
  },
  data() {
    return {
      loading: false,
      keyword: '',
      waterfallSelect: null,
      list: [],
      config: {},
      waterfall: null,
      noData: false
    }
  },
  watch: {
    value(value) {
      const props = this.config
      this.waterfallSelect = value
      if (value && this.list.filter(v => v[props.value] === value).length === 0 && !this.waterfall && (props.single && (typeof props.single) === 'function')) {
        this.getById()
      }
    },
    'props.single'(value) {
      const props = this.config
      if (value && (typeof value) === 'object' && value[props.value]) {
        this.waterfall = value
        this.list = this.list.filter(v => v[props.value] !== this.waterfall[props.value])
        this.list.unshift(this.waterfall)
      }
    },
    waterfallSelect(value) {
      const props = this.config
      this.waterfall = this.list.find(v => v[props.value] === value) || null
    },
    list(value) {
      this.$emit('update:dataList', value)
    }
  },
  created() {
    this.config = Object.assign(this.initProps(), this.props)
    const props = this.config
    this[props.currentPage] = 1
    this[props.pageSize] = props.pageSizeNum
    this[props.total] = 0
    if (this.value) {
      if (props.single && (typeof props.single) === 'function') {
        this.waterfallSelect = this.value
        this.getById()
      } else {
        if (props.single && (typeof props.single) === 'object') this.waterfall = props.single
        this.getData(() => {
          this.waterfallSelect = this.value
        })
      }
    } else {
      this.getData()
    }
  },
  methods: {
    searchData(keyword) {
      this[this.config.currentPage] = 1
      this.keyword = keyword
      this.list = []
      this.getData()
    },
    clearData() {
      this[this.config.currentPage] = 1
      this.keyword = ''
      this.list = []
      this.getData()
    },
    getData(callback) {
      const _this = this
      _this.loading = true
      _this.noData = false
      const keyword = _this.keyword.trim()
      const props = _this.config
      const params = {}
      params[props.pageSize] = 10
      params[props.currentPage] = _this[props.currentPage]
      params[props.query] = keyword
      props.apiMethod(params).then(res => {
        const { data } = res
        _this.noData = params[props.currentPage] === 1 && data.list.length === 0 && _this.list.length === 0
        const ids = _this.list.map(v => v[props.value])
        _this.list.push(...data.list.filter(v => !ids.includes(v[props.value])))
        if (_this.waterfall && _this.waterfall[props.value]) {
          _this.list = _this.list.filter(v => v[props.value] !== _this.waterfall[props.value])
          _this.list.unshift(_this.waterfall)
        }
        _this[props.total] = data[props.total]
        _this.loading = false
        callback && callback()
      })
    },
    changeData() {
      this.$emit('change', this.waterfallSelect)
    },
    getById(callback) {
      const props = this.config
      props.single({ [props.value]: this.waterfallSelect }).then(r => {
        this.waterfall = r.data
        this.getData(callback)
      })
    },
    initProps() {
      return {
        query: 'name', // 查询字段
        label: 'name', // 显示字段
        value: 'id', // 值字段
        total: 'total', // 总数字段
        currentPage: 'currentPage', // 当前页字段
        pageSize: 'pageSize', // 每页数量字段
        pageSizeNum: 10,
        apiMethod: () => Promise.resolve({
          data: [],
          total: 0
        }),
        single: null // 请求方法函数 对象 两种选择
      }
    },
    handlerScroll(scroll) {
      const props = this.config
      if (scroll && this[props.total] > (this[props.currentPage] * this[props.pageSize])) {
        this[props.currentPage] = ++this[props.currentPage]
        this.getData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-input__icon.el-icon-:before {
    content: "\e6e1";
  }
</style>
