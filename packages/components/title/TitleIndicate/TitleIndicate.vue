<template>
  <div class="icss-title" :class="{'icss-title-underline' : underline}">
    <template v-if="title">{{ title }}</template>
    <slot v-else />
  </div>
</template>

<script>
export default {
  name: 'TitleIndicate',
  props: {
    title: {
      type: String,
      default: ''
    },
    underline: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .icss-title {
    width: 100%;
    padding-left: 8px;
    margin-bottom: 16px;
    line-height: 16px;
    color: var(--color-text-primary);
    font-size: 14px;
    font-weight: 600;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      width: 0;
      height: 14px;
      border-left: 4px solid var(--color-primary);
      left: 0;
      top: 1px;
    }

    &-underline {
      margin-bottom: 24px;

      &:after {
        content: " ";
        border-bottom: 1px solid var(--border-color-extra-light);
        width: 100%;
        position: absolute;
        left: 0;
        bottom: -8px;
      }
    }
  }
</style>
