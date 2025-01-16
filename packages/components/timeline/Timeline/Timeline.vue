<template>
  <li class="el-timeline-item" :style="{'--color': color,'--colorOpacity': colorOpacity}">
    <div class="el-timeline-item__tail" />
    <div
      v-if="!$scopedSlots.dot"
      class="el-timeline-item__node"
      :class="[
        `el-timeline-item__node--${size || ''}`,
        `el-timeline-item__node--${type || ''}`
      ]"
    >
      <i
        v-if="icon"
        class="el-timeline-item__icon"
        :class="icon"
      />
    </div>
    <div v-else class="el-timeline-item__dot">
      <slot name="dot" :type="type" :color="color" :size="size" />
    </div>
    <div class="el-timeline-item__wrapper">
      <div
        v-if="!hideTimestamp"
        class="el-timeline-item__timestamp is-top"
        :style="{lineHeight: $scopedSlots.timestamp ? 1.7 : '57px'}"
      >
        <template v-if="!$scopedSlots.timestamp">{{ timestamp }}</template>
        <slot v-else name="timestamp" :type="type" :color="color" :size="size" />
      </div>
      <div class="el-timeline-item__content">
        <slot />
      </div>
    </div>
  </li>
</template>

<script>
// 对ElTimelineItem的改造，除 placement 属性外，其他使用方法完全相同。
// 添加了timestamp的slot
import { colorRgba } from '@/utils/color'

export default {
  name: 'Timeline',
  inject: ['timeline'],
  props: {
    timestamp: String,

    hideTimestamp: {
      type: Boolean,
      default: false
    },

    type: String,

    color: {
      type: String,
      default: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#036fae'
    },

    size: {
      type: String,
      default: 'normal'
    },

    icon: String
  },
  computed: {
    colorOpacity() {
      return colorRgba(this.color, 0.3)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-timeline-item {
    &__node {
      background-color: var(--colorOpacity);

      &:before {
        content: " ";
        width: 10px;
        height: 10px;
        background-color: var(--color);
        position: absolute;
        border-radius: 50%;
      }
    }

    &__tail {
      position: absolute;
      left: 150px;
      height: 100%;
      border-left: 2px solid var(--border-color-light);
    }

    &__node--normal {
      left: 142px;
      top: 37px;
      width: 18px;
      height: 18px;
    }

    &__node--large {
      left: 140px;
      top: 35px;
      width: 22px;
      height: 22px;
    }

    &__timestamp {
      width: 130px;
      text-align: right;
      position: absolute;
      left: 0;
      line-height: 1.7;
      font-weight: 400;
      color: var(--color-text-primary);
    }

    &__wrapper {
      padding-left: 180px;
      line-height: 30px;
      top: 13px;
    }

    &__content {
      padding: 10px 25px 0;
      box-shadow: 0 0 3px var(--border-color-base);
      font-size: var(--font-size-base);
      font-weight: 400;
      color: var(--color-text-primary);
      min-height: 66px;

      .el-descriptions-item {
        padding-bottom: 10px;
      }

      &:before {
        position: absolute;
        content: " ";
        border-top: 6px solid transparent;
        border-right: 10px solid var(--border-color-base);
        border-bottom: 6px solid transparent;
        top: 27px;
        left: 169px;
        opacity: 0.3;
      }

      &:after {
        position: absolute;
        content: " ";
        border-top: 5px solid transparent;
        border-right: 10px solid #FFFFFF;
        border-bottom: 5px solid transparent;
        top: 28px;
        left: 172px;
      }
    }
  }

  .el-timeline-item:last-child .el-timeline-item__tail {
    display: block;
  }
</style>
