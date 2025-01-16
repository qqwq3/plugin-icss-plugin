<template>
  <el-tooltip
    :disabled="disabled"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-if="$slots.content" v-slot:content>
      <div :data-qiankun="isQiankun?systemName:undefined" :style="{maxWidth: width}">
        <slot name="content" />
      </div>
    </template>
    <template v-else v-slot:content>
      <div :data-qiankun="isQiankun?systemName:undefined" :style="{maxWidth: width}">
        {{ content }}
      </div>
    </template>
    <div @mouseenter="handleMouseenter($event,)">
      <slot />
    </div>
  </el-tooltip>
</template>

<script>
// 自动检测内容长度，显示tooltip(注意！是主体内容，不是content的长度)
// 注意布局方式对主体内容的影响，比如 flex 布局
// 支持el-tooltip的所有属性和方法，新增 width 属性控制 content 的最大宽度
// 内容容器及其子集尽量不要写死宽度

export default {
  name: 'ToolTipWithEllipsis',
  props: {
    content: {
      type: [String, Number],
      default: ''
    },
    showLine: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '600px'
    },
    systemName: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      isQiankun: !!window.__POWERED_BY_QIANKUN__,
      disabled: false
    }
  },
  methods: {
    handleMouseenter({ target: targetElm }) {
      if (!this.$slots.default) return
      // 获取当前文本宽度
      const TemporaryTag = document.createElement('div')
      TemporaryTag.append(...this.$slots.default.map(v => v.elm.cloneNode(true)))
      TemporaryTag.style.position = 'absolute'
      TemporaryTag.style.display = 'inline-block'
      TemporaryTag.className = 'getTextWidth'
      targetElm.parentNode.appendChild(TemporaryTag)
      const currentElm = document.querySelector('.getTextWidth')
      const currentWidth = currentElm.getBoundingClientRect().width || currentElm.offsetWidth
      const targetWidth = targetElm.getBoundingClientRect().width || targetElm.offsetWidth
      document.querySelector('.getTextWidth').remove()
      if (currentWidth <= targetWidth * this.showLine) this.disabled = true
    }
  }
}
</script>

