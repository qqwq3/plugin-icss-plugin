<template>
  <div class="el-transfer">
    <simple-transfer-panel
      ref="leftPanel"
      v-bind="$props"
      :data="sourceData"
      :title="titles[0] || t('el.transfer.titles.0')"
      :default-checked="leftDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @checked-change="onSourceCheckedChange"
    >
      <slot name="left-footer" />
    </simple-transfer-panel>
    <div class="el-transfer__buttons">
      <el-button
        type="primary"
        size="small"
        :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToRight"
      >
        <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
        <i class="el-icon-d-arrow-right ml5" />
      </el-button>
      <el-button
        type="primary"
        size="small"
        :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToLeft"
      >
        <i class="el-icon-d-arrow-left mr5" />
        <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
      </el-button>
    </div>
    <simple-transfer-panel
      ref="rightPanel"
      v-bind="$props"
      :data="targetData"
      :title="titles[1] || t('el.transfer.titles.1')"
      :default-checked="rightDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @checked-change="onTargetCheckedChange"
    >
      <slot name="right-footer" />
    </simple-transfer-panel>
  </div>
</template>

<script>
import Emitter from 'element-ui/lib/mixins/emitter'
import Locale from 'element-ui/lib/mixins/locale'
import SimpleTransferPanel from './SimpleTransferPanel'
import Migrating from 'element-ui/lib/mixins/migrating'

export default {
  name: 'SimpleTransfer',
  components: { SimpleTransferPanel },
  mixins: [Emitter, Locale, Migrating],
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    titles: {
      type: Array,
      default() {
        return []
      }
    },
    buttonTexts: {
      type: Array,
      default() {
        return []
      }
    },
    filterPlaceholder: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-default-prop
    filterMethod: Function,
    leftDefaultChecked: {
      type: Array,
      default() {
        return []
      }
    },
    rightDefaultChecked: {
      type: Array,
      default() {
        return []
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    renderContent: Function,
    value: {
      type: Array,
      default() {
        return []
      }
    },
    format: {
      type: Object,
      default() {
        return {}
      }
    },
    filterable: Boolean,
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          key: 'key',
          disabled: 'disabled'
        }
      }
    },
    targetOrder: {
      type: String,
      default: 'original'
    }
  },
  data() {
    return {
      leftChecked: [],
      rightChecked: []
    }
  },
  computed: {
    dataObj() {
      const key = this.props.key
      return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {})
    },
    sourceData() {
      const _this = this
      return _this.data.slice().map(item => {
        const temp = { ...item }
        if (_this.value.indexOf(item[_this.props.key]) === -1) {
          temp['disabled'] = false
        } else {
          _this.leftDefaultChecked.push(temp[_this.props.key])
          temp['disabled'] = true
        }
        return temp
      })
    },
    targetData() {
      if (this.targetOrder === 'original') {
        return this.data.filter(item => this.value.indexOf(item[this.props.key]) > -1)
      } else {
        return this.value.reduce((arr, cur) => {
          const val = this.dataObj[cur]
          if (val) {
            arr.push(val)
          }
          return arr
        }, [])
      }
    },
    hasButtonTexts() {
      return this.buttonTexts.length === 2
    }
  },
  watch: {
    value(val) {
      this.dispatch('ElFormItem', 'el.form.change', val)
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {
          'footer-format': 'footer-format is renamed to format.'
        }
      }
    },
    onSourceCheckedChange(val, movedKeys) {
      this.leftChecked = val
      if (movedKeys === undefined) return
      this.$emit('left-check-change', val, movedKeys)
    },
    onTargetCheckedChange(val, movedKeys) {
      this.rightChecked = val
      if (movedKeys === undefined) return
      this.$emit('right-check-change', val, movedKeys)
    },
    addToLeft() {
      const currentValue = this.value.slice()
      this.rightChecked.forEach(item => {
        const index = currentValue.indexOf(item)
        if (index > -1) {
          currentValue.splice(index, 1)
        }
      })
      this.$emit('input', currentValue)
      this.$emit('change', currentValue, 'left', this.rightChecked)
    },
    addToRight() {
      let currentValue = this.value.slice()
      const itemsToBeMoved = []
      const key = this.props.key
      this.data.forEach(item => {
        const itemKey = item[key]
        if (
          this.leftChecked.indexOf(itemKey) > -1 &&
          this.value.indexOf(itemKey) === -1
        ) {
          itemsToBeMoved.push(itemKey)
        }
      })
      currentValue = this.targetOrder === 'unshift'
        ? itemsToBeMoved.concat(currentValue)
        : currentValue.concat(itemsToBeMoved)
      this.$emit('input', currentValue)
      this.$emit('change', currentValue, 'right', this.leftChecked)
    },
    clearQuery(which) {
      if (which === 'left') {
        this.$refs.leftPanel.query = ''
      } else if (which === 'right') {
        this.$refs.rightPanel.query = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-transfer {
    padding: 0;
  }

  .el-transfer__buttons {
    padding: 0 16px;

    .el-transfer__button {
      display: block;
      margin: 0 auto;
      height: 32px;
      padding: 0;
      line-height: 30px;
      text-align: center;
      border: 1px solid var(--color-primary);
      background-color: #FFFFFF;
      color: var(--color-primary);
    }

    .el-transfer__button:first-child {
      margin-bottom: 16px;
    }
  }
</style>
