<template>
  <div class="el-transfer-panel">
    <p class="el-transfer-panel__header">
      <el-checkbox
        v-model="allChecked"
        :indeterminate="isIndeterminate"
        @change="handleAllCheckedChange"
      >
        {{ title }}
        <span>{{ checkedSummary }}</span>
      </el-checkbox>
    </p>

    <div :class="['el-transfer-panel__body', hasFooter ? 'is-with-footer' : '']">
      <el-input v-if="filterable" v-model="query" :placeholder="placeholder" size="small" @keyup.enter.native="search">
        <i v-if="query.length > 0" slot="suffix" class="el-input__icon el-icon-circle-close" @click="clearQuery" />
        <el-button slot="append" @click="search">搜索</el-button>
      </el-input>
      <el-checkbox-group
        v-show="!hasNoMatch && data.length > 0"
        v-model="checked"
        :class="{ 'is-filterable': filterable }"
        class="el-transfer-panel__list"
      >
        <el-checkbox
          v-for="item in filteredData"
          :key="item[keyProp]"
          class="el-transfer-panel__item"
          :label="item[keyProp]"
          :disabled="item[disabledProp]"
        >
          <option-content :option="item" />
        </el-checkbox>
      </el-checkbox-group>
      <p
        v-show="hasNoMatch"
        class="el-transfer-panel__empty"
      >{{ t('el.transfer.noMatch') }}</p>
      <p
        v-show="data.length === 0 && !hasNoMatch"
        class="el-transfer-panel__empty"
      >{{ t('el.transfer.noData') }}</p>
    </div>
    <p v-if="hasFooter" class="el-transfer-panel__footer">
      <slot />
    </p>
  </div>
</template>

<script>
import Locale from 'element-ui/lib/mixins/locale'

export default {
  name: 'SimpleTransferPanel',
  components: {
    OptionContent: {
      props: {
        option: Object
      },
      render(h) {
        const getParent = vm => {
          if (vm.$options.componentName === 'ElTransferPanel') {
            return vm
          } else if (vm.$parent) {
            return getParent(vm.$parent)
          } else {
            return vm
          }
        }
        const panel = getParent(this)
        const transfer = panel.$parent || panel
        return panel.renderContent
          ? panel.renderContent(h, this.option)
          : transfer.$scopedSlots.default
            ? transfer.$scopedSlots.default({ option: this.option })
            : <span>{this.option[panel.labelProp] || this.option[panel.keyProp]}</span>
      }
    }
  },
  mixins: [Locale],
  componentName: 'ElTransferPanel',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    renderContent: Function,
    // eslint-disable-next-line vue/require-default-prop
    placeholder: String,
    // eslint-disable-next-line vue/require-default-prop
    title: String,
    filterable: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    format: Object,
    // eslint-disable-next-line vue/require-default-prop
    filterMethod: Function,
    // eslint-disable-next-line vue/require-default-prop
    defaultChecked: Array,
    // eslint-disable-next-line vue/require-default-prop
    props: Object
  },
  data() {
    return {
      disabledChecked: [],
      checked: [],
      allChecked: false,
      query: '',
      checkChangeByUser: true,
      filteredList: null
    }
  },
  computed: {
    filteredData() {
      return this.filteredList ? this.data.filter(item => this.filteredList.indexOf(item[this.keyProp]) > -1) : this.data
    },
    checkableData() {
      return this.filteredData.filter(item => !item[this.disabledProp])
    },
    checkedSummary() {
      const checkedLength = this.checked.length
      const dataLength = this.data.length
      const { noChecked, hasChecked } = this.format
      if (noChecked && hasChecked) {
        return checkedLength > 0
          ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength)
          : noChecked.replace(/\${total}/g, dataLength)
      } else {
        return `${checkedLength}/${dataLength}`
      }
    },
    isIndeterminate() {
      const checkedLength = this.checked.length
      return checkedLength > 0 && checkedLength < this.checkableData.length
    },
    hasNoMatch() {
      return this.query.length > 0 && this.filteredData.length === 0
    },
    labelProp() {
      return this.props.label || 'label'
    },
    keyProp() {
      return this.props.key || 'key'
    },
    disabledProp() {
      return this.props.disabled || 'disabled'
    },
    hasFooter() {
      return !!this.$slots.default
    }
  },
  watch: {
    checked(val, oldVal) {
      this.updateAllChecked()
      if (this.checkChangeByUser) {
        const movedKeys = val.concat(oldVal).filter(v => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1)
        this.$emit('checked-change', val, movedKeys)
      } else {
        this.$emit('checked-change', val)
        this.checkChangeByUser = true
      }
    },
    data() {
      const checked = []
      const disabledChecked = []
      const filteredDataKeys = this.filteredData.map(item => item[this.keyProp])
      const disabledDataMap = this.filteredData.filter(item => item[this.disabledProp]).reduce((o, cur) => (o[cur[this.keyProp]] = cur) && o, {})
      this.checked.forEach(item => {
        if (filteredDataKeys.indexOf(item) > -1) {
          checked.push(item)
        }
        if (disabledDataMap[item]) {
          disabledChecked.push(item)
        }
      })
      this.checkChangeByUser = false
      this.disabledChecked = disabledChecked
      this.checked = checked
    },
    checkableData() {
      this.updateAllChecked()
    },
    defaultChecked: {
      immediate: true,
      handler(val, oldVal) {
        if (oldVal && val.length === oldVal.length &&
          val.every(item => oldVal.indexOf(item) > -1)) return
        const checked = []
        const checkableDataKeys = this.checkableData.map(item => item[this.keyProp])
        val.forEach(item => {
          if (checkableDataKeys.indexOf(item) > -1) {
            checked.push(item)
          }
        })
        this.checkChangeByUser = false
        this.checked = checked
      }
    }
  },
  methods: {
    updateAllChecked() {
      const checkableDataKeys = this.checkableData.map(item => item[this.keyProp])
      this.allChecked = checkableDataKeys.length > 0 &&
        checkableDataKeys.every(item => this.checked.indexOf(item) > -1)
    },
    handleAllCheckedChange(value) {
      this.checked = value
        ? this.checkableData.map(item => item[this.keyProp]).concat(this.disabledChecked)
        : this.disabledChecked
    },
    clearQuery() {
      this.query = ''
      this.search()
    },
    search() {
      this.filteredList = this.data.filter(item => {
        if (typeof this.filterMethod === 'function') {
          return this.filterMethod(this.query, item)
        } else {
          const label = item[this.labelProp] || item[this.keyProp].toString()
          return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1
        }
      }).map(item => item[this.keyProp])
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-transfer-panel {
    width: 300px;
    border: 1px solid var(--border-color-base);

    ::v-deep .el-transfer-panel__header {
      background: var(--background-color-base);
      border-bottom: 1px solid var(--border-color-base);

      .el-checkbox .el-checkbox__label {
        font-size: var(--font-size-base);

        > span {
          display: none;
        }
      }
    }

    ::v-deep .el-transfer-panel__body {
      height: 346px;
    }

    ::v-deep .el-transfer-panel__list {
      height: 326px;

      &.is-filterable {
        height: 274px;
      }
    }

    ::v-deep .el-input-group {
      padding: 16px;

      .el-input__suffix {
        right: 17px;
        top: 16px;
        height: 32px;
        cursor: pointer;
      }

      .el-input-group__append {
        color: #FFFFFF;
        background-color: var(--color-primary);
        border: 0;

        .el-button {
          width: 60px;
          padding-left: 0;
          padding-right: 0;
        }
      }
    }
  }
</style>
