<template>
  <div class="el-transfer">
    <simple-transfer-panel
      ref="leftPanel"
      v-bind="$props"
      :data="data[0]"
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
        :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToRight"
      >
        <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
        <i class="el-icon-d-arrow-right ml5" />
      </el-button>
      <el-button
        type="primary"
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
      :data="data[1]"
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
  model: {
    prop: 'value', // 指向props的参数名
    event: 'change' // 事件名称
  },
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
    }
  },
  data() {
    return {
      leftChecked: [],
      rightChecked: []
    }
  },
  computed: {
    hasButtonTexts() {
      return this.buttonTexts.length === 2
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
    onSourceCheckedChange(val) {
      this.leftChecked = val
    },
    onTargetCheckedChange(val) {
      this.rightChecked = val
    },
    addToLeft() {
      const _this = this
      const key = _this.props.key
      const currentValue = _this.rightChecked.slice()
      const itemsToBeMoved = _this.data[1].filter(item => currentValue.indexOf(item[key]) !== -1).slice()
      itemsToBeMoved.forEach(item => {
        const index = _this.data[1].findIndex(text => text[key] === item[key])
        _this.data[1].splice(index, 1)
      })
      _this.data[0] = _this.data[0].concat(itemsToBeMoved)

      _this.$emit('change', _this.data[1])
    },
    addToRight() {
      const _this = this
      const key = _this.props.key
      const currentValue = _this.leftChecked.slice()
      const itemsToBeMoved = _this.data[0].filter(item => currentValue.indexOf(item[key]) !== -1).slice()
      itemsToBeMoved.forEach(item => {
        const index = _this.data[0].findIndex(text => text[key] === item[key])
        _this.data[0].splice(index, 1)
      })
      _this.data[1] = _this.data[1].concat(itemsToBeMoved)

      _this.$emit('change', _this.data[1])
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
      width: 64px;
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
