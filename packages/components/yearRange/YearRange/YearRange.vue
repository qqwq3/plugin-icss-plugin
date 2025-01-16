<template>
  <div class="range">
    <el-date-picker
      v-model="start"
      :size="size"
      :clearable="clearable"
      :editable="editable"
      :picker-options="{
        disabledDate: startRange
      }"
      type="year"
      placeholder="开始年份"
      @change="setTime"
    />
    至
    <el-date-picker
      v-model="end"
      :size="size"
      :clearable="clearable"
      :editable="editable"
      :picker-options="{
        disabledDate: endRange
      }"
      type="year"
      placeholder="结束年份"
      @change="setTime"
    />
  </div>
</template>

<script>
export default {
  name: 'YearRange',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    size: {
      type: String,
      default: 'small'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      start: this.value[0] || '',
      end: this.value[1] || ''
    }
  },
  watch: {
    value: {
      handler: function(val) {
        if (val[0] && val[1]) {
          this.start = this.value[0]
          this.end = this.value[1]
        }
      },
      deep: true
    }
  },
  methods: {
    startRange(v) {
      return v.getTime() > Date.now() ? true : this.end ? v.getTime() > this.end.getTime() : false
    },
    endRange(v) {
      return v.getTime() > Date.now() ? true : this.start ? v.getTime() < this.start.getTime() : false
    },
    setTime() {
      if (this.start && this.end) this.$emit('input', [this.start, this.end])
    }
  }
}
</script>

<style lang="scss" scoped>
  .range {
    display: inline-block;

    .el-date-editor {
      width: 120px;
    }
  }
</style>
