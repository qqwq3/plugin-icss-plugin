<template>
  <el-select
    :value="defaultVal"
    filterable
    remote
    :value-key="valueKey.value"
    :remote-method="(val) => getList(val)"
    :style="{ width: width }"
    v-bind="$attrs"
    @change="(val) => $emit('input', val)"
    @visible-change="visibleCg"
    v-on="$listeners"
  >
    <div
      v-infinite-scroll="getMoreData"
      v-loading="loading"
      :infinite-scroll-disabled="scrollDisabled"
    >
      <el-option
        v-for="v in optionFilter"
        :key="v[valueKey.value]"
        :disabled="disabledOption.includes(v[valueKey.value])"
        :label="v[valueKey.label]"
        :value="v"
      />
    </div>
  </el-select>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'SelectListAsyn',
  props: {
    width: {
      type: String,
      default: '200px'
    },
    asyn: {
      type: Boolean,
      default: false
    },
    apiFn: {
      type: Function,
      required: true
    },
    disabledOption: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: Object,
      default: () => {
        return { label: 'label', value: 'id' }
      }
    },
    defaultVal: {
      type: [Array, Object],
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      noMore: false,
      keyword: '',
      list: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    optionFilter() {
      return _.unionBy(Array.isArray(this.defaultVal) ? this.defaultVal : (Object.keys(this.defaultVal).length === 0 ? [] : [this.defaultVal]), this.list, this.valueKey.value)
    },
    scrollDisabled() {
      return this.loading || this.noMore
    }
  },
  created() {
    !this.asyn && this.getList()
  },
  methods: {
    async getList(val) {
      this.loading = true
      this.currentPage = 1
      this.keyword = val
      const { data } = await this.apiFn({
        keyword: this.keyword,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.list = data.list
      this.noMore = data.list.length < this.pageSize
      this.loading = false
    },
    async getMoreData() {
      this.loading = true
      this.currentPage++
      const { data } = await this.apiFn({
        keyword: this.keyword,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      data.list.length && (this.list = this.list.concat(data.list))
      this.noMore = this.list.length === data.total
      this.loading = false
    },
    visibleCg(val) {
      if (this.keyword && !val) {
        this.clear()
        this.getList()
      }
    },
    clear() {
      this.noMore = false
      this.keyword = ''
      this.list = []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
