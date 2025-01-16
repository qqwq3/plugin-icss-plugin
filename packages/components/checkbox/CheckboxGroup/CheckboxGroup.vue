<template>
  <div class="CheckboxGroup">
    <el-checkbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      style="margin-right: 30px;"
      @change="handleCheckAllChange"
    >全选
    </el-checkbox>
    <el-checkbox-group v-model="checked" style="display: inline-flex;" @change="handleChange">
      <el-checkbox v-for="item in list" :key="item.key" :label="item.key">
        {{ item.value }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'CheckboxGroup',
  model: {
    prop: 'selected', // 指向props的参数名
    event: 'change' // 事件名称
  },
  props: {
    // 数据源
    initData: {
      type: Array,
      required: true
    },
    // 选中节点
    selected: {
      default: () => {
      },
      validator: (value) => value instanceof Object
    }
  },
  data() {
    return {
      checkAll: false,
      checked: [],
      list: [],
      isIndeterminate: false
    }
  },
  watch: {
    initData(value) {
      this.list = value
    },
    // 监听值变化，再赋值给selected
    checked(value) {
      this.$emit('change', value)
    },
    // 监听值变化，再赋值给selectNodes
    selected(value) {
      this.checked = value
    }
  },
  created() {
    this.list = this.initData
    this.checked = this.selected
    this.handleChange(this.checked)
  },
  methods: {
    handleCheckAllChange(val) {
      this.checked = val ? this.initData.map(item => item.key) : []
      this.isIndeterminate = false
    },
    handleChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.list.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
