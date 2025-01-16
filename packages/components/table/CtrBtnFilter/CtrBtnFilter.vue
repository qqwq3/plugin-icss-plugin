<script>
export default {
  name: 'CtrBtnFilter',
  props: {
    max: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      cut: false,
      threshold: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.checkSlots(this.$slots.default)
    })
  },
  updated() {
    this.$nextTick(() => {
      this.checkSlots(this.$slots.default)
    })
  },
  methods: {
    filterItem(item, createElement) {
      return createElement('el-button', {
        style: {
          width: '100%',
          margin: '0 -20px',
          paddingLeft: '20px',
          paddingRight: '20px',
          boxSizing: 'content-box'
        },
        attrs: {
          type: 'text',
          disabled: item.componentOptions ? (item.componentOptions.propsData && item.componentOptions.propsData.disabled) : false
        },
        directives: item['data'] && item['data']['directives'],
        on: item.componentOptions ? item.componentOptions.listeners : {}
      }, this.filterText((item.children || (item.componentOptions ? item.componentOptions.children : []))))
    },
    filterText(val, txt = '') {
      val.forEach(v => {
        txt = txt + (v.text || '')
        if (v.children) txt = txt + this.filterText(v.children, txt)
      })
      return txt || ''
    },
    checkSlots(slots) {
      const slotsIndex = slots ? slots.map((v, i) => !v.isComment && (i + '')).filter(Boolean) : []
      if (slotsIndex.length > this.max) {
        this.cut = true
        this.threshold = slotsIndex[this.max - 2] || -1
      } else {
        this.cut = false
      }
    }
  },
  render(createElement) {
    const slots = this.$slots.default
    const more = this.$slots.more
    if (this.cut) {
      const moreSlots = slots.filter((item, i) => !item.isComment && i > this.threshold)
      return (
        <div style='display: flex; align-items: center;'>
          {slots.filter((item, i) => i <= this.threshold)}
          <el-dropdown trigger='click' placement='bottom'>
            {more || (<el-link type='primary' underline={false} style='margin-left:10px'>更多</el-link>)}
            <el-dropdown-menu slot='dropdown'>
              {moreSlots.map(item => <el-dropdown-item>{this.filterItem(item, createElement)}</el-dropdown-item>)}
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      )
    }
    return (<div>{slots}</div>)
  }
}
</script>

<style lang="scss" scoped>
  .el-link + .el-link {
    margin-left: 10px;
  }
</style>
